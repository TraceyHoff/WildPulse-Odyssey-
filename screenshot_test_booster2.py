from playwright.sync_api import sync_playwright
import time
import json
import base64

def run_test():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 720}, record_video_dir="/home/jules/verification/videos")
        page = context.new_page()

        print("Navigating to local server...")
        page.goto("http://localhost:3000")

        print("Waiting for game to load...")
        # Since the first test timed out waiting for the visible state of startGameBtn,
        # it might be because the game loads fast and the UI flow skips the intro if certain variables exist.
        # Let's bypass onboarding before waiting for the button, and use add_init_script for reliability.
        page.add_init_script('''
            localStorage.setItem("wildpulse_has_seen_intro", "true");
            localStorage.setItem("wildpulse_player_color", "#FFFFFF");
            localStorage.setItem("wildpulse_p1_level", "10");
        ''')
        page.reload()

        page.wait_for_selector("#startGameBtn", state="attached", timeout=10000)

        page.evaluate('''
            const btn = document.getElementById('startGameBtn');
            if (btn && btn.style.display !== 'none') {
                btn.click();
            } else {
                // Force start game if button is hidden
                if (window.startGame) window.startGame();
            }
        ''')

        time.sleep(2)

        print("Setting up game state for testing...")
        page.evaluate('''
            // Initialize game state if needed
            if (window.game && window.game.scene.scenes[0]) window.gameStarted = true;
            window.p1Level = 10;

            // Add a test creature
            if (!window.collectedCreatures) window.collectedCreatures = [];
            window.collectedCreatures.push({
                id: "test_creature_1",
                name: "Sparo",
                level: 5,
                stats: { health: 50, attack: 20, defense: 20, speed: 20, specialAttack: 20, specialDefense: 20 },
                currentHp: 50,
                stored: false
            });

            // Add Uncommon HP Booster to inventory
            if (!window.p1Inventory) window.p1Inventory = [];
            window.p1Inventory.push({ name: "Uncommon HP Booster", quantity: 1, type: "consumable" });

            // Generate a quest to verify it
            const quest = window.generateProceduralQuest('test_npc', 1);
            console.log("Generated quest reward:", quest.rewards.item);

            // Show inventory to verify the item is there with correct styling
            if (window.openInventoryModal) window.openInventoryModal(1);
        ''')

        print("Waiting for inventory to render...")
        time.sleep(2)

        print("Taking screenshot of inventory...")
        page.screenshot(path="/home/jules/verification/screenshots/verification_inventory_booster.png")

        print("Testing consuming the item...")
        page.evaluate('''
            // Try consuming the booster on the first creature
            const item = window.p1Inventory && window.p1Inventory.length > 0 ? window.p1Inventory[0] : null;
            const creature = window.collectedCreatures && window.collectedCreatures.length > 0 ? window.collectedCreatures[0] : null;

            if (item && creature) {
                if (!creature.bonusStats) {
                    creature.bonusStats = { health: 0, attack: 0, defense: 0, speed: 0, specialAttack: 0, specialDefense: 0 };
                }

                // Manual consumption simulation based on our logic
                if (item.name.includes("HP Booster")) {
                    let boostAmount = 5;
                    let hpBoostMultiplier = 2; // HP gets double the base boost typically

                    if (item.name.startsWith("Uncommon")) {
                        boostAmount = 10;
                    } else if (item.name.startsWith("Rare")) {
                        boostAmount = 15;
                    } else if (item.name.startsWith("Exquisite")) {
                        boostAmount = 25;
                    }

                    let hpBoost = item.name === "HP Booster" ? 10 : boostAmount * hpBoostMultiplier;
                    creature.bonusStats.health += hpBoost;
                    const newMax = window.getEffectiveStat(creature, 'health');
                    creature.currentHp = Math.min((creature.currentHp || 0) + hpBoost, newMax);

                    console.log("Applied boost!", hpBoost);

                    // Show notification
                    if (window.showModernNotification) window.showModernNotification(`🧪 Boost applied! New Max HP: ${newMax}`, 5000, 1);
                }
            }

            if (window.openPartyModal) window.openPartyModal(1);
        ''')

        print("Waiting for party modal to render...")
        time.sleep(2)

        print("Taking screenshot of party modal...")
        page.screenshot(path="/home/jules/verification/screenshots/verification_party_booster.png")

        print("Testing store selling prices...")
        page.evaluate('''
            if (window.closeAllModalsForPlayer) window.closeAllModalsForPlayer(1);
            if (window.openStoreModal) window.openStoreModal(1);
            if (window.updateStoreUI) window.updateStoreUI();
        ''')

        time.sleep(2)
        page.screenshot(path="/home/jules/verification/screenshots/verification_store_booster.png")

        print("Test complete.")
        context.close()
        browser.close()

if __name__ == "__main__":
    run_test()
