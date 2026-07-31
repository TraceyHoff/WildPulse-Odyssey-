import os
from playwright.sync_api import sync_playwright

def run_cuj(page):
    os.makedirs("verification_screenshots", exist_ok=True)
    os.makedirs("verification_videos", exist_ok=True)

    print("Navigating to local server...")
    page.goto("http://localhost:3000")
    page.wait_for_timeout(2000)

    print("Clicking Start Game...")
    page.click("#startGameBtn")
    page.wait_for_timeout(2000)

    # Clean local storage and set up the egg
    print("Injecting custom test egg...")
    page.evaluate("""() => {
        const egg = {
            id: "egg_unit_test",
            name: "Mysterious Egg",
            isEgg: true,
            eggProgress: 999.0,
            eggHatchSteps: 1000,
            parentTypes: ["Fire", "Water"],
            childData: {
                id: "baby_dragon_test",
                name: "Baby Dragon",
                type: "Fire",
                generation: 2,
                stats: { health: 50, attack: 50, defense: 50, speed: 50, specialAttack: 50, specialDefense: 50 }
            },
            description: "A mysterious egg. Keep walking with it in your active party to hatch it!",
            level: 1, xp: 0, type: "Normal", features: [], stats: { health: 10, attack: 10, defense: 10, speed: 10, specialAttack: 10, specialDefense: 10 }
        };
        window.collectedCreatures = [egg];
        localStorage.setItem('wildpulse_collected_creatures', JSON.stringify(window.collectedCreatures));
        if (window.renderPartyList) window.renderPartyList();
    }""")
    page.wait_for_timeout(1000)

    # Take screenshot of the party list showing the egg in Steps
    print("Opening party modal to view Egg with Steps...")
    page.evaluate("window.renderPartyList();")
    page.wait_for_timeout(500)
    # If there's an active party modal button, click it, or open modal
    page.evaluate("document.getElementById('partyModal').style.display = 'flex';")
    page.wait_for_timeout(1000)
    page.screenshot(path="verification_screenshots/egg_progress_steps.png")

    # Close party modal
    page.evaluate("document.getElementById('partyModal').style.display = 'none';")
    page.wait_for_timeout(500)

    # Programmatically trigger the hatch by adding 2 steps to exceed 1000 threshold
    print("Simulating step to trigger hatching animation...")
    page.evaluate("""() => {
        const c = window.collectedCreatures[0];
        // Ensure not already hatching
        if (c.isEgg && !c.isHatching) {
            c.eggProgress += 2.0;
            if (c.eggProgress >= 1000) {
                c.isHatching = true;
                window.hatchEgg(c, 1);
            }
        }
    }""")
    page.wait_for_timeout(1000)

    # Verify overlay is present
    overlay_exists = page.evaluate("document.getElementById('hatchingOverlay_p1') !== null")
    print(f"Hatching overlay present: {overlay_exists}")
    assert overlay_exists, "Hatching overlay should be present!"

    # Verify movement is blocked
    movement_blocked = page.evaluate("window.p1HatchingActive === true")
    print(f"P1 movement blocked during hatching: {movement_blocked}")
    assert movement_blocked, "Player movement should be blocked during hatching!"

    # Capture shaking egg screenshot
    page.screenshot(path="verification_screenshots/egg_hatching_shaking.png")

    # Wait for hatch event to occur (takes 5.4 seconds in the animation sequence)
    print("Waiting for hatching animation sequence to complete...")
    page.wait_for_timeout(5000) # total 6 seconds from start of trigger

    # Capture hatched state screenshot
    page.screenshot(path="verification_screenshots/egg_hatched_result.png")

    # Click dismiss button
    print("Clicking Wonderful! dismiss button...")
    page.click(".hatch-dismiss-btn")
    page.wait_for_timeout(1000)

    # Verify overlay is removed
    overlay_removed = page.evaluate("document.getElementById('hatchingOverlay_p1') === null")
    print(f"Hatching overlay removed: {overlay_removed}")
    assert overlay_removed, "Hatching overlay should be removed after dismissal!"

    # Verify movement is unblocked
    movement_unblocked = page.evaluate("window.p1HatchingActive === false")
    print(f"P1 movement unblocked after hatching: {movement_unblocked}")
    assert movement_unblocked, "Player movement should be unblocked after dismissal!"

    # Verify creature is saved in-place of the egg
    creature_name = page.evaluate("window.collectedCreatures[0].name")
    print(f"Newborn creature name: {creature_name}")
    assert creature_name == "Baby Dragon", "Egg should have mutated in-place to Baby Dragon!"

    page.screenshot(path="verification_screenshots/egg_hatching_complete.png")
    print("Egg hatching verification script completed successfully!")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(record_video_dir="verification_videos")
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
