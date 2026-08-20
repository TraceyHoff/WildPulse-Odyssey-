from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.goto("http://localhost:3000")

    # Bypass intro modal
    page.evaluate("localStorage.setItem('wildpulse_player_color', '#FFFFFF');")
    page.evaluate("localStorage.setItem('wildpulse_p1_level', '7');")

    page.goto("http://localhost:3000")
    page.wait_for_timeout(3000)

    # Click the start button first
    page.locator("#startGameBtn").click()
    page.wait_for_timeout(3000)

    # Open Party Modal Programmatically to avoid finding the menu button
    page.evaluate("window.openPartyModal(1)")
    page.wait_for_timeout(1000)

    # Switch to Stats Tab
    page.evaluate("window.switchPartyTab('stats', 1)")
    page.wait_for_timeout(1000)

    # Give Player 1 some XP
    page.evaluate("window.gainPlayerXp(1, 150)")
    page.wait_for_timeout(1000)

    # Take screenshot of Stats Tab with XP
    page.screenshot(path="/home/jules/verification/screenshots/verification_stats.png")
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
