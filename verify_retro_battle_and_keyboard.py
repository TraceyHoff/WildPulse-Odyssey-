import os
from playwright.sync_api import sync_playwright

def run_verification(page):
    # Capture console logs from browser
    page.on("console", lambda msg: print(f"BROWSER CONSOLE: {msg.text}"))

    print("Navigating to game server...")
    page.goto("http://localhost:3000")
    page.wait_for_timeout(1000)

    # Bypass the start modal to reach the game directly
    page.evaluate("sessionStorage.setItem('wildpulse_skip_start_modal', 'true')")
    page.reload()
    page.wait_for_timeout(1000)

    # Part 1: Verify Console/Mobile custom keyboard enforcement
    print("\nPart 1: Verifying Custom Keyboard Enforcement...")
    # Mock isConsoleOrMobile to return True to simulate a mobile/console environment
    page.evaluate("window.isConsoleOrMobile = () => true")

    # Click Menu to open character customization
    page.wait_for_selector("#menuBtn")
    page.click("#menuBtn")
    page.wait_for_timeout(500)
    page.click("#menuCustomizeBtn")
    page.wait_for_timeout(500)

    # Click the nickname/name input inside customization modal
    print("Clicking name input to trigger custom keyboard...")
    page.click("#playerNameInput")
    page.wait_for_timeout(500)

    # Verify that the custom keyboard modal is visible
    kb_visible = page.is_visible("#virtualKeyboardModal_p1")
    print(f"Custom virtual keyboard is visible: {kb_visible}")
    assert kb_visible, "Custom virtual keyboard modal should be visible!"

    # Verify that the input became readOnly under mobile/console simulation
    readonly_attr = page.evaluate("document.getElementById('playerNameInput').readOnly")
    inputmode_attr = page.evaluate("document.getElementById('playerNameInput').getAttribute('inputmode')")
    print(f"Input attributes - readOnly: {readonly_attr}, inputmode: {inputmode_attr}")
    assert readonly_attr, "Input should be readOnly on mobile/console!"
    assert inputmode_attr == "none", "Input inputmode should be 'none' on mobile/console!"

    # Capture a screenshot of the custom keyboard
    os.makedirs("./verification_screenshots", exist_ok=True)
    page.screenshot(path="./verification_screenshots/verification_custom_keyboard.png")
    print("Screenshot of custom keyboard captured.")

    # Cleanly close all modals using the in-game global function
    page.evaluate("window.closeAllModals()")
    page.wait_for_timeout(500)

    # Part 2: Verify Custom in-game exit confirmation modal
    print("\nPart 2: Verifying in-game exit confirmation modal...")
    # Open Menu
    page.click("#menuBtn")
    page.wait_for_timeout(500)
    # Click Exit Game
    page.click("#exitGameBtn")
    page.wait_for_timeout(500)

    # Check that custom confirm modal is visible
    confirm_visible = page.is_visible("#customConfirmModal_p1")
    print(f"Custom exit confirmation modal is visible: {confirm_visible}")
    assert confirm_visible, "Custom exit confirmation modal should be visible!"

    confirm_title = page.inner_text("#customConfirmTitle_p1")
    confirm_msg = page.inner_text("#customConfirmMessage_p1")
    print(f"Modal title: '{confirm_title}', message: '{confirm_msg}'")
    assert "EXIT" in confirm_title, "Title should contain 'EXIT'!"
    assert "exit to the main menu" in confirm_msg, "Message should mention exiting to the main menu!"

    # Capture a screenshot of the exit confirmation modal
    page.screenshot(path="./verification_screenshots/verification_exit_confirmation.png")
    print("Screenshot of exit confirmation captured.")

    # Click No/Cancel to dismiss
    page.click("#customConfirmNoBtn_p1")
    page.wait_for_timeout(500)

    # Ensure menu was reopened
    menu_visible = page.is_visible("#menuModal")
    print(f"Menu modal is visible after Cancel: {menu_visible}")
    assert menu_visible, "Menu modal should be reopened on cancel!"

    # Cleanly close all modals
    page.evaluate("window.closeAllModals()")
    page.wait_for_timeout(500)

    # Part 3: Verify battle modals Pokémon-style layout
    print("\nPart 3: Verifying battle modals Pokémon-style layout...")
    # Programmatically mock active battle state and trigger battle UI layout
    page.evaluate("""() => {
        window.coopActive = false;
        window.currentPlayer = { name: 'Chibi Spark', level: 5, type: 'Electric', maxHp: 30, currentHp: 30, ability: { name: 'Overcharge', color: '#ffeb3b', message: 'Extra damage on high HP', type: 'boost', value: 1.2 } };
        window.currentEnemy = { name: 'Giga Spark', level: 12, type: 'Electric', maxHp: 65, currentHp: 65, ability: { name: 'Static Shield', color: '#ffeb3b', message: 'Chances to paralyze', type: 'shield', value: 0.5 } };
        window.inBattle = true;
        window.pendingBattleResult = null;
        window.updateBattleUI();
        document.getElementById('battleModal').style.display = 'grid';
    }""")
    page.wait_for_timeout(1000)

    # Verify battle modal is visible
    battle_visible = page.is_visible("#battleModal")
    print(f"Battle modal is visible: {battle_visible}")
    assert battle_visible, "Battle modal should be visible!"

    # Check that new elements are visible
    info_card_visible = page.is_visible("#playerCombatant .combatant-info-card")
    pedestal_visible = page.is_visible("#playerCombatant .sprite-pedestal")
    print(f"Info card visible: {info_card_visible}, Pedestal visible: {pedestal_visible}")
    assert info_card_visible, "Combatant info card should be rendered!"
    assert pedestal_visible, "Sprite pedestal should be rendered!"

    # Capture a screenshot of the beautiful retro battle modal
    page.screenshot(path="./verification_screenshots/verification_retro_battle.png")
    print("Screenshot of retro battle modal captured.")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()
        try:
            run_verification(page)
        finally:
            context.close()
            browser.close()
    print("\nAll verifications completed successfully!")
