import os
from playwright.sync_api import sync_playwright

def run_scrolling_verification():
    os.makedirs("/app/verification_screenshots", exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1024, "height": 768})
        page = context.new_page()

        # Critical: force onboarding in automated environment
        page.add_init_script("window.__test_onboarding = true;")

        print("Navigating to WildPulse Odyssey...")
        page.goto("http://localhost:3000")
        page.wait_for_timeout(1000)

        print("Clicking 'Split Screen' button...")
        page.click("#startSplitScreenBtn")
        page.wait_for_timeout(1000)

        # 1. Verify side-by-side introductory modals are open and have correct scrolling properties
        print("Verifying scrolling style configurations...")
        styles = page.evaluate("""() => {
            const el1 = document.querySelector('#introModal > div');
            const el2 = document.querySelector('#introModal_p2 > div');

            const style1 = window.getComputedStyle(el1);
            const style2 = window.getComputedStyle(el2);

            return {
                p1_max_height: style1.maxHeight,
                p1_overflow_y: style1.overflowY,
                p2_max_height: style2.maxHeight,
                p2_overflow_y: style2.overflowY
            };
        }""")
        print("Intro Modal Styles:", styles)

        # Check that overflow is auto and max-height is correctly set (will resolve to ~691.2px for 768px height)
        assert styles['p1_overflow_y'] == "auto", f"Expected P1 intro overflow-y to be auto, got {styles['p1_overflow_y']}"
        assert styles['p2_overflow_y'] == "auto", f"Expected P2 intro overflow-y to be auto, got {styles['p2_overflow_y']}"
        assert "px" in styles['p1_max_height'], f"Expected P1 intro max-height to resolve to pixels, got {styles['p1_max_height']}"
        assert "px" in styles['p2_max_height'], f"Expected P2 intro max-height to resolve to pixels, got {styles['p2_max_height']}"

        # Verify exact pixel match for 90vh (768 * 0.9 = 691.2)
        h1 = float(styles['p1_max_height'].replace('px', ''))
        h2 = float(styles['p2_max_height'].replace('px', ''))
        assert abs(h1 - 691.2) < 2.0, f"Expected P1 intro max-height to be near 691.2px, got {h1}"
        assert abs(h2 - 691.2) < 2.0, f"Expected P2 intro max-height to be near 691.2px, got {h2}"

        page.screenshot(path="/app/verification_screenshots/coop_onboarding_side_by_side.png")

        # Move forward past intro slide 1 and 2 to open customization modal
        page.click("#introNextBtn")
        page.wait_for_timeout(500)
        page.click("#introNextBtn_p2")
        page.wait_for_timeout(500)
        page.click("#introNextBtn")
        page.wait_for_timeout(500)
        page.click("#introNextBtn_p2")
        page.wait_for_timeout(1000)

        # Fill name and start the game session
        print("Finishing customization name setup...")
        page.fill("#playerNameInput", "TrainerOne")
        page.fill("#playerNameInput_p2", "TrainerTwo")
        page.click("#saveCustomizationBtn")
        page.wait_for_timeout(1000)

        # Open party modal for Player 1 and show fullSizeImageModal
        print("Opening party list and launching full-sized preview modal...")
        page.evaluate("""() => {
            window.collectedCreatures = [
                {
                    id: 'preview_creature',
                    name: 'Meteorhorn',
                    nickname: 'Meteorhorn',
                    type: 'Cosmic',
                    level: 5,
                    stored: false,
                    friendLevel: 1,
                    friendXp: 0,
                    friendBonusStats: { health: 0, attack: 0, defense: 0, speed: 0, specialAttack: 0, specialDefense: 0 },
                    stats: { health: 100, attack: 50, defense: 50, speed: 50, specialAttack: 50, specialDefense: 50 },
                    xp: 0,
                    generation: 1,
                    description: "An ancient Cosmic-type entity that controls time and space."
                }
            ];
            window.showFullSizeImage(window.collectedCreatures[0], 1);
        }""")
        page.wait_for_timeout(1000)

        print("Verifying fullSizeImageModal scrolling properties...")
        full_size_styles = page.evaluate("""() => {
            const el = document.querySelector('#fullSizeImageModal > div');
            const style = window.getComputedStyle(el);
            return {
                max_height: style.maxHeight,
                overflow_y: style.overflowY
            };
        }""")
        print("Full Size Modal Styles:", full_size_styles)
        assert full_size_styles['overflow_y'] == "auto", f"Expected full-sized image preview card overflow-y to be auto, got {full_size_styles['overflow_y']}"
        h_fs = float(full_size_styles['max_height'].replace('px', ''))
        assert abs(h_fs - 691.2) < 2.0, f"Expected full-sized image preview card max-height to be near 691.2px, got {h_fs}"

        page.screenshot(path="/app/verification_screenshots/full_size_preview_scrollable.png")

        print("All scrolling and layout checks passed successfully!")
        browser.close()

if __name__ == "__main__":
    run_scrolling_verification()
