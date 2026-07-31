import os
from playwright.sync_api import sync_playwright

def test_new_features():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 720})

        # Load game
        print("Loading game...")
        page.goto("http://localhost:3000")
        page.wait_for_timeout(2000)

        # Handle onboarding slide to start customizations
        print("Handling onboarding slides...")
        # Since Skip and close are removed, click Next on onboarding
        for _ in range(5):
            if page.locator("#introNextBtn").is_visible():
                page.click("#introNextBtn")
                page.wait_for_timeout(500)

        # If customization modal is shown, save & start
        if page.locator("#saveCustomizationBtn").is_visible():
            page.click("#saveCustomizationBtn")
            page.wait_for_timeout(1000)

        # Ensure we can open start modal/gameplay
        if page.locator("#startGameBtn").is_visible():
            page.click("#startGameBtn")
            page.wait_for_timeout(1000)

        # Verify Action Wheel options
        print("Verifying Action Wheel options...")
        # Open action wheel
        page.evaluate("window.openActionWheel(1);")
        page.wait_for_timeout(1000)

        # Check that 'Shop' data-option does not exist, but 'help' does!
        shop_option = page.locator("#actionWheelModal .p1-col .action-wheel-option[data-option='inventory']")
        help_option = page.locator("#actionWheelModal .p1-col .action-wheel-option[data-option='help']")

        assert not shop_option.is_visible(), "Error: 'Shop' option should not be in the Action Wheel!"
        assert help_option.is_visible(), "Error: 'Help' option should be in the Action Wheel!"
        print("✅ Action Wheel options verified successfully: No Shop, Help is present.")

        # Click Help option to open help modal
        page.click("#actionWheelModal .p1-col .action-wheel-option[data-option='help']")
        page.wait_for_timeout(1000)

        # Verify Help Modal is visible and contains updated missing info
        help_modal = page.locator("#helpModal")
        assert help_modal.is_visible(), "Error: Help modal should be visible!"
        help_text = help_modal.inner_text()
        assert "Pedometer" in help_text, "Error: Help modal should document the Pedometer!"
        assert "Virtual Cursor" in help_text or "Aura" in help_text, "Error: Help modal should document game controls!"
        assert "Mutations" in help_text, "Error: Help modal should document Mutations!"
        print("✅ Help modal visibility and updated contents verified successfully.")

        # Close Help Modal
        page.click("#helpModal .close-help-btn")
        page.wait_for_timeout(1000)

        # Verify Pedometer item in Shop
        print("Verifying Pedometer item in the shop...")
        # Artificially trigger shop opening
        page.evaluate("window.openStoreModal(window.player);")
        page.wait_for_timeout(1000)

        # Verify Pedometer is in the list of products
        pedometer_item = page.locator("#storeModal :text('Pedometer')")
        assert pedometer_item.count() > 0, "Error: Pedometer should be sold in the shop!"
        print("✅ Pedometer item exists in the Shop UI.")

        # Close Store Modal
        page.evaluate("window.closeStoreModal(1);")
        page.wait_for_timeout(1000)

        # Verify Base Stats moved to Larger Preview Modal
        print("Verifying Base Stats display in larger preview modal...")
        # Create a mock creature with a nature that buffs attack and decreases defense
        page.evaluate("""
            window.collectedCreatures = [{
                id: 'test_creature_1',
                name: 'Pyrogriff',
                nickname: 'Burny',
                level: 10,
                generation: 1,
                xp: 0,
                type: 'Fire',
                stats: { health: 100, attack: 100, defense: 100, speed: 100, specialAttack: 100, specialDefense: 100 },
                nature: { name: 'Adamant', tier: 2, increase: 'attack', decrease: 'defense' },
                mood: null,
                friendLevel: 1,
                friendXp: 0,
                happiness: 80,
                isEgg: false
            }];
            window.collectedCreaturesIds = new Set(['test_creature_1']);
            window.renderPartyForPlayer(1);
            window.openPartyModal(1);
        """)
        page.wait_for_timeout(1000)

        # Verify party card does NOT display base stats section
        party_card_html = page.locator(".party-card").first.inner_html()
        assert "Base Stats" not in party_card_html, "Error: Base Stats should be removed from the party list card!"
        print("✅ Base Stats removed from party card.")

        # Click the canvas to trigger larger preview modal
        page.click(".party-card canvas", force=True)
        page.wait_for_timeout(1000)

        # Verify preview modal is open and has "Base Stats"
        preview_desc = page.locator("#fullSizeImageDesc")
        preview_desc_html = preview_desc.inner_html()
        assert "Base Stats" in preview_desc_html, "Error: Base Stats should be displayed in the preview modal!"

        # Check green for buff (attack) and red for debuff (defense) using precise data-tooltip matches
        attack_line = page.locator("#fullSizeImageDesc div[data-tooltip^='attack indicates']")
        defense_line = page.locator("#fullSizeImageDesc div[data-tooltip^='defense indicates']")

        attack_html = attack_line.inner_html()
        defense_html = defense_line.inner_html()

        print(f"Attack Line HTML: {attack_html}")
        print(f"Defense Line HTML: {defense_html}")

        assert "color: rgb(0, 255, 0)" in attack_html or "#00ff00" in attack_html or "lime" in attack_html or "rgb(0, 255, 0)" in attack_html, "Error: Buffed attack should be green!"
        assert "color: rgb(255, 51, 51)" in defense_html or "#ff3333" in defense_html or "rgb(255, 51, 51)" in defense_html, "Error: Debuffed defense should be red!"
        print("✅ Base Stats displayed in larger preview modal with correct green/red coloring for buffs/debuffs.")

        # Capture a screenshot for verification
        os.makedirs("verification_screenshots", exist_ok=True)
        page.screenshot(path="verification_screenshots/newly_added_features.png")
        print("Saved screenshot to verification_screenshots/newly_added_features.png")

        browser.close()

if __name__ == "__main__":
    test_new_features()
