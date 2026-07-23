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

    # 1. Take a screenshot showing inventory slots visible in game
    print("Capturing gameplay screenshot (slots should be visible)...")
    page.screenshot(path="/home/jules/verification/screenshots/inventory_slots_gameplay.png")
    page.wait_for_timeout(1000)

    # 2. Click Player 1 Menu Button to open Menu Modal
    print("Opening menu modal...")
    page.wait_for_selector("#menuBtn")
    page.click("#menuBtn")
    page.wait_for_timeout(1000)

    # Take screenshot with Menu Modal open (slots should be hidden)
    print("Capturing screenshot with menu open (slots should be hidden)...")
    page.screenshot(path="/home/jules/verification/screenshots/inventory_slots_hidden.png")
    page.wait_for_timeout(1000)

    # 3. Close the Menu Modal
    print("Closing menu modal...")
    # There is a close button inside menuModal with class close-menu-btn or .close-btn
    page.click("#menuModal .close-menu-btn")
    page.wait_for_timeout(1000)

    # Take final screenshot showing slots returned
    print("Capturing final gameplay screenshot (slots should be visible again)...")
    page.screenshot(path="/home/jules/verification/screenshots/inventory_slots_visible_again.png")
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
