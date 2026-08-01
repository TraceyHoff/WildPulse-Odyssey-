import os
import sys
from playwright.sync_api import sync_playwright

def run_npc_tests(page):
    # Go to the local game server
    page.goto("http://localhost:3000")
    page.wait_for_timeout(2000)

    # Click the start button
    page.click("#startGameBtn")
    page.wait_for_timeout(2000)

    # Check that NPC Trainer helper functions are globally accessible
    npc_name = page.evaluate("window.getNpcTrainerName('npc_trainer_1');")
    print(f"Verified NPC Trainer 1 Name: {npc_name}")
    assert len(npc_name) > 0, "NPC Trainer name should be generated"

    # Set up player's party to have 2 active creatures with levels 6 and 12
    setup_code = """
    window.collectedCreatures = [
        { id: "test_c1", name: "EmberBear", level: 6, currentHp: 100, stored: false, stats: { health: 100 } },
        { id: "test_c2", name: "TideHound", level: 12, currentHp: 120, stored: false, stats: { health: 120 } }
    ];
    localStorage.setItem('wildpulse_collected_creatures', JSON.stringify(window.collectedCreatures));
    """
    page.evaluate(setup_code)
    print("Set up Player 1 party with 2 creatures (levels 6 and 12)")

    # Simulate overlapping and accepting battle confirmation
    # We will temporarily mock window.confirm to return True to accept the battle
    mock_confirm = "window.confirm = () => true;"
    page.evaluate(mock_confirm)

    # Let's trigger handleNpcTrainerOverlap
    # Create fake collider and npc sprite
    trigger_overlap = """
    const pCollider = { x: 9850, y: 9850, lastTrainerTalkTime: 0, body: { setVelocity: () => {}, reset: () => {} } };
    const npcSprite = { getData: (key) => key === 'trainerId' ? 'npc_trainer_1' : 'Hiro' };
    window.handleNpcTrainerOverlap(pCollider, npcSprite);
    """
    page.evaluate(trigger_overlap)
    page.wait_for_timeout(1000)

    # Verify that battle has successfully started
    in_battle = page.evaluate("window.inBattle")
    is_npc_battle = page.evaluate("window.isNpcBattle")
    active_trainer_id = page.evaluate("window.activeNpcTrainerId")
    print(f"In Battle: {in_battle}, Is NPC Battle: {is_npc_battle}, Active Trainer ID: {active_trainer_id}")
    assert in_battle == True, "Should be in battle"
    assert is_npc_battle == True, "Should be NPC Trainer battle"
    assert active_trainer_id == 'npc_trainer_1', "Trainer ID should be npc_trainer_1"

    # Verify NPC has matching party size and matching levels
    npc_party_size = page.evaluate("window.npcEnemyParty.length")
    npc_creature_0_lvl = page.evaluate("window.npcEnemyParty[0].level")
    npc_creature_1_lvl = page.evaluate("window.npcEnemyParty[1].level")
    print(f"NPC Party Size: {npc_party_size}, Creature 0 Level: {npc_creature_0_lvl}, Creature 1 Level: {npc_creature_1_lvl}")
    assert npc_party_size == 2, "Trainer party size should match player party size of 2"
    assert npc_creature_0_lvl == 6, "Creature 0 level should be 6"
    assert npc_creature_1_lvl == 12, "Creature 1 level should be 12"

    # Take screenshot of the battle
    page.screenshot(path="verification_screenshots/verification_npc_battle_start.png")

    # Let's simulate currentEnemy faints -> next creature should enter battle
    current_enemy_name_1 = page.evaluate("window.currentEnemy.name")
    page.evaluate("window.handleFaint(window.currentEnemy);")
    page.wait_for_timeout(1000)
    current_enemy_name_2 = page.evaluate("window.currentEnemy.name")
    print(f"First Enemy: {current_enemy_name_1}, Second Enemy: {current_enemy_name_2}")
    assert current_enemy_name_1 != current_enemy_name_2, "Next creature should be sent out"

    # Defeat second enemy -> battle should end in victory and award coins
    page.evaluate("window.gameStats = { battlesWon: 0, coins: 0 };")
    page.evaluate("window.handleFaint(window.currentEnemy);")
    page.wait_for_timeout(2000)

    # Confirm coins and win stats are incremented
    coins = page.evaluate("window.gameStats.coins")
    wins = page.evaluate("window.gameStats.battlesWon")
    print(f"Coins: {coins}, Battles Won: {wins}")
    assert coins == 100, "Defeating Trainer should award 100 coins"

    # Verify cooldown (elapsed time is currently 0, cooldown is 300,000 ms)
    # Check trigger handles cooldown properly
    page.evaluate("window.inBattle = false;")
    trigger_cooldown_check = """
    (() => {
        var lastNotification = null;
        window.showModernNotification = (msg) => { lastNotification = msg; };
        const pCollider = { x: 9850, y: 9850, lastTrainerTalkTime: 0, body: { setVelocity: () => {}, reset: () => {} } };
        const npcSprite = { getData: (key) => key === 'trainerId' ? 'npc_trainer_1' : 'Hiro' };
        window.handleNpcTrainerOverlap(pCollider, npcSprite);
        return lastNotification;
    })()
    """
    notif_msg = page.evaluate(trigger_cooldown_check)
    print(f"Cooldown Notification: {notif_msg}")
    assert "resting" in notif_msg, "Trainer should be resting on cooldown"

    # Let's clear progress and verify everything is reset
    page.evaluate("window.deleteProgress();")
    page.wait_for_timeout(500)
    if page.is_visible("#customConfirmModal_p1"):
        page.click("#customConfirmYesBtn_p1")
    page.wait_for_timeout(1000)
    reset_data = page.evaluate("localStorage.getItem('wildpulse_npc_trainer_data')")
    print(f"Reset NPC Trainer Data: {reset_data}")
    assert reset_data is None or '"p1":{"weekBattles":{},"lastBattleTimeMs":0}' in reset_data, "NPC trainer data should be completely deleted or reset"

    print("ALL NPC TRAINER TESTS PASSED SUCCESSFULY!")

if __name__ == "__main__":
    os.makedirs("verification_screenshots", exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()
        try:
            run_npc_tests(page)
        finally:
            context.close()
            browser.close()
