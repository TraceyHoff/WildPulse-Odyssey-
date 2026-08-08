from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.goto("http://localhost:3000")
    page.wait_for_timeout(2500) # Give extra time for Phasers start screen to render nicely

    # 1. Take a screenshot of the main menu showing grass and plants (instead of black grass)
    page.screenshot(path="verification/screenshots/menu_with_grass_and_plants.png")
    page.wait_for_timeout(500)

    # 2. Click on singleplayer and enter the game (skipping onboarding automatically due to headless automation mode)
    page.click('#startGameBtn', force=True)
    page.wait_for_timeout(2000)

    # Now we are in the main game. Open action wheel and select Party
    page.keyboard.press('q')
    page.wait_for_timeout(500)
    page.click('[data-option="party"]', force=True)
    page.wait_for_timeout(1000)

    # Click stats tab
    page.click('#tabStats_P1', force=True)
    page.wait_for_timeout(1000)

    # Take screenshot of the Stats Modal
    page.screenshot(path="verification/screenshots/player_stats_tab.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
