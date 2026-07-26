import os
from playwright.sync_api import sync_playwright

def run_verification():
    # Ensure folders exist
    os.makedirs("/app/verification_screenshots", exist_ok=True)
    os.makedirs("/app/verification_videos", exist_ok=True)

    with sync_playwright() as p:
        iphone_12 = p.devices['iPhone 12']
        browser = p.chromium.launch(headless=True)

        context = browser.new_context(
            **iphone_12,
            record_video_dir="/app/verification_videos"
        )
        page = context.new_page()

        # Critical: force onboarding in automated environment
        page.add_init_script("window.__test_onboarding = true;")

        print("Navigating to WildPulse Odyssey...")
        page.goto("http://localhost:3000")
        page.wait_for_timeout(1000)

        print("Clicking Start Game...")
        page.click("#startGameBtn")
        page.wait_for_timeout(1000)

        print("Capturing onboarding Slide 1...")
        page.screenshot(path="/app/verification_screenshots/mobile_intro_slide1.png")

        # Log element info
        rects = page.evaluate("""() => {
            const btn = document.getElementById('introNextBtn');
            const rect = btn.getBoundingClientRect();
            return {
                id: btn.id,
                visible: btn.offsetWidth > 0 && btn.offsetHeight > 0,
                rect: { left: rect.left, top: rect.top, width: rect.width, height: rect.height },
                display: window.getComputedStyle(btn).display,
                position: window.getComputedStyle(btn).position,
                zIndex: window.getComputedStyle(btn).zIndex,
                parentOverflow: window.getComputedStyle(btn.parentElement).overflow
            };
        }""")
        print("BUTTON RECTS:", rects)

        # 2. Advance to Slide 2
        print("Advancing to onboarding Slide 2...")
        page.click("#introNextBtn")
        page.wait_for_timeout(1000)
        page.screenshot(path="/app/verification_screenshots/mobile_intro_slide2.png")

        # 3. Open customization modal
        print("Advancing to character customization onboarding...")
        page.click("#introNextBtn")
        page.wait_for_timeout(1000)

        # Fill name
        page.fill("#playerNameInput", "CyberHero")
        page.wait_for_timeout(500)
        page.screenshot(path="/app/verification_screenshots/mobile_customization.png")

        # Click Save to start the game session
        print("Saving character and entering game session...")
        page.click("#saveCustomizationBtn")
        page.wait_for_timeout(1000)

        # 4. Inject test creatures with different card background colors and verify high-contrast text rendering
        print("Injecting high-contrast party creatures for visual verification...")
        page.evaluate("""() => {
            window.collectedCreatures = [
                {
                    id: 'light_c',
                    name: 'Solara',
                    nickname: 'Solara',
                    type: 'Light',
                    level: 5,
                    stored: false,
                    friendLevel: 1,
                    friendXp: 0,
                    friendBonusStats: { health: 0, attack: 0, defense: 0, speed: 0, specialAttack: 0, specialDefense: 0 },
                    stats: { health: 100, attack: 50, defense: 50, speed: 50, specialAttack: 50, specialDefense: 50 },
                    xp: 0,
                    generation: 1,
                    description: "A bright glowing creature of light."
                },
                {
                    id: 'electric_c',
                    name: 'Sparky',
                    nickname: 'Sparky',
                    type: 'Electric',
                    level: 5,
                    stored: false,
                    friendLevel: 1,
                    friendXp: 0,
                    friendBonusStats: { health: 0, attack: 0, defense: 0, speed: 0, specialAttack: 0, specialDefense: 0 },
                    stats: { health: 100, attack: 50, defense: 50, speed: 50, specialAttack: 50, specialDefense: 50 },
                    xp: 0,
                    generation: 1,
                    description: "An electric speedster generating sparks."
                },
                {
                    id: 'dark_c',
                    name: 'Nocturna',
                    nickname: 'Nocturna',
                    type: 'Dark',
                    level: 5,
                    stored: false,
                    friendLevel: 1,
                    friendXp: 0,
                    friendBonusStats: { health: 0, attack: 0, defense: 0, speed: 0, specialAttack: 0, specialDefense: 0 },
                    stats: { health: 100, attack: 50, defense: 50, speed: 50, specialAttack: 50, specialDefense: 50 },
                    xp: 0,
                    generation: 1,
                    description: "A shadow crawler of dark origin."
                }
            ];
            window.renderPartyForPlayer(1);
            document.getElementById('partyModal').style.display = 'block';
        }""")
        page.wait_for_timeout(1000)

        # Take screenshot of the party modal with high contrast card colors
        print("Capturing party card contrast rendering...")
        page.screenshot(path="/app/verification_screenshots/party_card_contrast.png")
        page.wait_for_timeout(1000)

        context.close()
        browser.close()
        print("Verification run completed successfully!")

if __name__ == "__main__":
    run_verification()
