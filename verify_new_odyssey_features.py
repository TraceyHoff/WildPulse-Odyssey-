import os
import glob
from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.on("pageerror", lambda err: print(f"PAGE ERROR: {err}"))
    page.on("console", lambda msg: print(f"PAGE LOG: {msg.text}"))

    # Setup session storage
    page.add_init_script("""() => {
        localStorage.clear();
    }""")

    # Go to app
    page.goto("http://localhost:3000")
    page.wait_for_timeout(2000)

    # Click the start/play game button on startModal
    page.wait_for_selector("#startGameBtn", state="visible")
    page.click("#startGameBtn")
    page.wait_for_timeout(2000)

    # 1. Inject custom collected creatures to verify:
    #   - pink friend stats display
    #   - breeding center level 5 requirements
    #   - shop selling dropdown and action
    page.evaluate("""() => {
        window.collectedCreatures = [
            {
                id: "c_id_1",
                name: "Phoenix",
                nickname: "FlameBird",
                type: "Fire",
                level: 3,
                generation: 1,
                xp: 12,
                friendLevel: 2,
                friendXp: 30,
                stats: { health: 120, attack: 110, defense: 90, speed: 105, specialAttack: 115, specialDefense: 95 },
                friendBonusStats: { health: 2, attack: 2, defense: 0, speed: 0, specialAttack: 0, specialDefense: 0 },
                description: "A gorgeous mythical fire bird."
            },
            {
                id: "c_id_2",
                name: "Titan",
                nickname: "Rocky",
                type: "Earth",
                level: 10,
                generation: 1,
                xp: 25,
                friendLevel: 3,
                friendXp: 45,
                stats: { health: 150, attack: 130, defense: 140, speed: 80, specialAttack: 90, specialDefense: 110 },
                friendBonusStats: { health: 4, attack: 0, defense: 4, speed: 0, specialAttack: 0, specialDefense: 0 },
                description: "An ancient stone colossus."
            }
        ];
        window.collectedCreaturesIds = new Set(["c_id_1", "c_id_2"]);
        window.gameStats = { coins: 500 };

        // Open menu and go to Party Modal to see pink stats (+2) and (+4)
        if (window.renderPartyList) window.renderPartyList();
    }""")
    page.wait_for_timeout(1000)

    # Wait for menu button and click to open the menu modal
    page.wait_for_selector("#menuBtn", state="visible")
    page.click("#menuBtn")
    page.wait_for_timeout(1000)

    # Open Party Modal
    page.click("#menuPartyBtn")
    page.wait_for_timeout(1000)

    # Take screenshot of the party list showing the pink stats
    page.screenshot(path="/home/jules/verification/screenshots/verification_party_pink_stats.png")
    page.wait_for_timeout(1000)

    # Close party modal using close button
    page.click("#partyModal .close-btn")
    page.wait_for_timeout(1000)

    # Re-open Menu Modal
    page.click("#menuBtn")
    page.wait_for_timeout(1000)

    # Open Breeding modal
    page.click("#breedBtn")
    page.wait_for_timeout(1000)

    # Capture breeding selectors showing levels
    page.screenshot(path="/home/jules/verification/screenshots/verification_breeding_levels.png")
    page.wait_for_timeout(1000)

    # Close breeding modal
    page.click("#breedingModal .close-btn")
    page.wait_for_timeout(1000)

    # Open Store modal directly
    page.evaluate("if (window.updateStoreUI) { window.updateStoreUI(); document.getElementById('storeModal').style.display = 'block'; }")
    page.wait_for_timeout(1000)

    # Capture store showing sell section
    page.screenshot(path="/home/jules/verification/screenshots/verification_store_selling.png")
    page.wait_for_timeout(1000)

    # Close store modal
    page.click("#storeModal .close-btn")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
