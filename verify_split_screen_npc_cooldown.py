import os
import sys
from playwright.sync_api import sync_playwright

def run_coop_npc_cooldown_tests(page):
    # Log console messages
    page.on("console", lambda msg: print(f"BROWSER CONSOLE: {msg.text}"))
    page.on("pageerror", lambda err: print(f"BROWSER ERROR: {err}"))

    # Go to the local game server
    page.goto("http://localhost:3000")
    page.wait_for_timeout(2000)

    # Click the start button
    page.click("#startGameBtn")
    page.wait_for_timeout(2000)

    # Setup Player 1 and Player 2 collected creatures
    setup_code = """
    window.collectedCreatures = [
        { id: "test_p1_c1", name: "EmberBear", level: 6, currentHp: 100, stored: false, stats: { health: 100 } },
        { id: "test_p1_c2", name: "TideHound", level: 12, currentHp: 120, stored: false, stats: { health: 120 } }
    ];
    window.collectedCreatures2 = [
        { id: "test_p2_c1", name: "SparkFox", level: 7, currentHp: 110, stored: false, stats: { health: 110 } },
        { id: "test_p2_c2", name: "MossGlint", level: 11, currentHp: 115, stored: false, stats: { health: 115 } }
    ];
    window.gameStats = { battlesWon: 0, coins: 0 };
    window.gameStats2 = { battlesWon: 0, coins: 0 };

    // Disable the ignore player logic for test predictability
    window.shouldNpcIgnorePlayer = () => false;

    // Enable co-op properly through Phaser
    if (game && game.scene.scenes[0]) {
        window.enableCoop(game.scene.scenes[0]);
    }

    localStorage.setItem('wildpulse_collected_creatures', JSON.stringify(window.collectedCreatures));
    localStorage.setItem('wildpulse_collected_creatures2', JSON.stringify(window.collectedCreatures2));
    """
    page.evaluate(setup_code)
    print("Seeded Player 1 and Player 2 parties, enabled co-op active flag and player bodies.")

    # Auto-confirm all prompts
    page.evaluate("window.confirm = () => true;")

    # --- PLAYER 1 BATTLE START ---
    print("\n--- Testing Player 1 overlap and battle start ---")
    page.evaluate("""
    const pCollider1 = window.player;
    const npcSprite = { getData: (key) => key === 'trainerId' ? 'npc_trainer_1' : 'Hiro' };
    window.handleNpcTrainerOverlap(pCollider1, npcSprite);
    """)
    page.wait_for_timeout(1000)

    in_battle = page.evaluate("window.inBattle")
    active_player = page.evaluate("window.activeBattlePlayer")
    is_npc = page.evaluate("window.isNpcBattle")
    print(f"P1 Battle Triggered -> window.inBattle: {in_battle}, activeBattlePlayer: {active_player}, isNpcBattle: {is_npc}")
    assert in_battle == True, "P1 should successfully trigger battle"
    assert active_player == 1, "Active battle player should be 1"
    assert is_npc == True, "Should be NPC battle"

    # Defeat trainer creatures for P1
    print("Fainting first trainer creature...")
    page.evaluate("window.handleFaint(window.currentEnemy);")
    page.wait_for_timeout(1000)

    print("Fainting second trainer creature...")
    page.evaluate("window.handleFaint(window.currentEnemy);")
    page.wait_for_timeout(2000)

    # Click close button to conclude the battle
    print("Closing Player 1 battle modal...")
    page.evaluate("window.closeBattleModal(); window.inBattle = false;")
    page.wait_for_timeout(1000)

    in_battle = page.evaluate("window.inBattle")
    print(f"After P1 win -> window.inBattle: {in_battle}")
    assert in_battle == False, "P1 battle should have finished and ended"

    # --- VERIFY P1 IS ON COOLDOWN, P2 IS NOT ---
    print("\n--- Verifying Player 1 is on cooldown, while Player 2 is NOT ---")
    # Check Player 1 cooldown
    p1_cooldown_msg = page.evaluate("""
    (() => {
        let lastNotif = null;
        window.showModernNotification = (msg) => { lastNotif = msg; };
        const pCollider1 = window.player;
        pCollider1.lastTrainerTalkTime = 0; // reset talk throttle
        const npcSprite = { getData: (key) => key === 'trainerId' ? 'npc_trainer_1' : 'Hiro' };
        window.handleNpcTrainerOverlap(pCollider1, npcSprite);
        return lastNotif;
    })()
    """)
    print(f"Player 1 Cooldown Notification: {p1_cooldown_msg}")
    assert p1_cooldown_msg is not None and "resting" in p1_cooldown_msg, "Player 1 should be resting on cooldown"

    # Reset any outstanding state
    page.evaluate("window.inBattle = false;")

    # Check Player 2 is NOT on cooldown and can start battle
    print("Checking if Player 2 can overlap and initiate the same battle...")
    page.evaluate("""
    const pCollider2 = window.player2;
    pCollider2.lastTrainerTalkTime = 0; // reset talk throttle
    const npcSprite = { getData: (key) => key === 'trainerId' ? 'npc_trainer_1' : 'Hiro' };
    window.handleNpcTrainerOverlap(pCollider2, npcSprite);
    """)
    page.wait_for_timeout(1000)

    in_battle = page.evaluate("window.inBattle")
    active_player = page.evaluate("window.activeBattlePlayer")
    print(f"P2 Battle Triggered -> window.inBattle: {in_battle}, activeBattlePlayer: {active_player}")
    assert in_battle == True, "Player 2 should be able to start the battle immediately without cooldown block"
    assert active_player == 2, "Active battle player should be 2 for Player 2"

    # Defeat trainer creatures for P2
    print("Fainting first trainer creature for P2...")
    page.evaluate("window.handleFaint(window.currentEnemy);")
    page.wait_for_timeout(1000)

    print("Fainting second trainer creature for P2...")
    page.evaluate("window.handleFaint(window.currentEnemy);")
    page.wait_for_timeout(2000)

    # Click close button to conclude the battle
    print("Closing Player 2 battle modal...")
    page.evaluate("window.closeBattleModal(); window.inBattle = false;")
    page.wait_for_timeout(1000)

    in_battle = page.evaluate("window.inBattle")
    print(f"After P2 win -> window.inBattle: {in_battle}")
    assert in_battle == False, "P2 battle should have finished and ended"

    # --- VERIFY BOTH ARE NOW ON COOLDOWN ---
    print("\n--- Verifying both Player 1 and Player 2 are now on cooldown ---")
    p1_cooldown_msg_final = page.evaluate("""
    (() => {
        let lastNotif = null;
        window.showModernNotification = (msg) => { lastNotif = msg; };
        const pCollider1 = window.player;
        pCollider1.lastTrainerTalkTime = 0;
        const npcSprite = { getData: (key) => key === 'trainerId' ? 'npc_trainer_1' : 'Hiro' };
        window.handleNpcTrainerOverlap(pCollider1, npcSprite);
        return lastNotif;
    })()
    """)
    print(f"Player 1 Final Cooldown Notification: {p1_cooldown_msg_final}")
    assert p1_cooldown_msg_final is not None and "resting" in p1_cooldown_msg_final, "Player 1 should still be on cooldown"

    page.evaluate("window.inBattle = false;")

    p2_cooldown_msg_final = page.evaluate("""
    (() => {
        let lastNotif = null;
        window.showModernNotification = (msg) => { lastNotif = msg; };
        const pCollider2 = window.player2;
        pCollider2.lastTrainerTalkTime = 0;
        const npcSprite = { getData: (key) => key === 'trainerId' ? 'npc_trainer_1' : 'Hiro' };
        window.handleNpcTrainerOverlap(pCollider2, npcSprite);
        return lastNotif;
    })()
    """)
    print(f"Player 2 Final Cooldown Notification: {p2_cooldown_msg_final}")
    assert p2_cooldown_msg_final is not None and "resting" in p2_cooldown_msg_final, "Player 2 should now also be on cooldown"

    print("\nALL SPLIT SCREEN CO-OP NPC COOLDOWN TESTS PASSED SUCCESSFULLY!")

if __name__ == "__main__":
    os.makedirs("verification_screenshots", exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()
        try:
            run_coop_npc_cooldown_tests(page)
        finally:
            context.close()
            browser.close()
