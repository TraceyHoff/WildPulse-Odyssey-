import os
from playwright.sync_api import sync_playwright

def run_cuj(page):
    # Navigate to the game
    page.goto("http://localhost:3000")
    page.wait_for_timeout(1000)

    # Bypass the start modal to reach the game directly
    page.evaluate("sessionStorage.setItem('wildpulse_skip_start_modal', 'true')")
    page.reload()
    page.wait_for_timeout(1000)

    # Click Player 1 Menu Button
    page.wait_for_selector("#menuBtn")
    page.click("#menuBtn")
    page.wait_for_timeout(500)

    # Enable Co-op mode
    page.click("#coopToggleBtn")
    page.wait_for_timeout(1000)

    # Click Player 2 Menu Button to show the side-by-side menus
    page.wait_for_selector("#menuBtn_P2")
    page.click("#menuBtn_P2")
    page.wait_for_timeout(1000)

    # Take screenshot of the menu modal showing the removed buttons on Player 2 side
    screenshot_path = "/home/jules/verification/screenshots/verification_menu_changes.png"
    page.screenshot(path=screenshot_path)
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    os.makedirs("/home/jules/verification/videos", exist_ok=True)
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)
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
    print("Verification completed successfully!")
