from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.goto("http://localhost:3000")
    page.wait_for_timeout(1000)

    # Start split-screen game
    page.locator("#startSplitScreenBtn").click()

    # Wait for the game to start and players to initialize
    page.wait_for_function("() => window.gameStarted === true")
    page.wait_for_timeout(1000)

    # 1. Turn on co-op mode and ensure both players have starter creatures
    page.evaluate("""() => {
        window.coopActive = true;
        if (window.collectedCreatures.length === 0) {
            window.collectedCreatures.push({
                id: 'p1_test',
                name: 'Volt-Pike',
                level: 5,
                currentHp: 40,
                maxHp: 40,
                type: 'Electric',
                color: '#ffeb3b',
                xp: 0
            });
        }
        if (window.collectedCreatures2.length === 0) {
            window.collectedCreatures2.push({
                id: 'p2_test',
                name: 'Ember-Hound',
                level: 5,
                currentHp: 45,
                maxHp: 45,
                type: 'Fire',
                color: '#ff5722',
                xp: 0
            });
        }
    }""")
    page.wait_for_timeout(500)

    # 2. Initiate NPC Trainer Dual Battle which triggers the transition overlay
    page.evaluate("""() => {
        window.startNpcDualBattle(window.player, 'npc_trainer_5', 'Morpheus');
    }""")

    # 3. Take screenshot immediately to capture the scanline/glitch overlay in action!
    page.wait_for_timeout(200)
    page.screenshot(path="/home/jules/verification/screenshots/verification_transition.png")
    page.wait_for_timeout(1000)

    # 4. Mock a "Critical Hit!" message in battle log to trigger the color glitch screen shake
    page.evaluate("""() => {
        window.logBattle('Volt-Pike scored a Critical Hit!');
    }""")
    page.wait_for_timeout(100)

    # Take screenshot of the critical hit color shake flash!
    page.screenshot(path="/home/jules/verification/screenshots/verification_critical_flash.png")
    page.wait_for_timeout(1500)

    # Final state hold
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos",
            viewport={"width": 1024, "height": 768}
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
