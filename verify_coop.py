import os
import sys
from playwright.sync_api import sync_playwright

def run_cuj(page):
    print("Navigating to game...")
    page.goto("http://localhost:3000")
    page.wait_for_timeout(1000)

    # Bypass the start menu and start the game session
    print("Starting game session...")
    page.evaluate("() => { sessionStorage.setItem('wildpulse_skip_start_modal', 'true'); }")
    page.reload()
    page.wait_for_timeout(2000)

    # Click Menu button
    print("Opening Menu...")
    page.locator("#menuBtn").click()
    page.wait_for_timeout(500)

    # Toggle Co-op mode
    print("Enabling Co-op Mode...")
    page.locator("#coopToggleBtn").click()
    page.wait_for_timeout(2000)

    # Simulate Player 1 moving away from Player 2 by holding ArrowRight
    print("Moving Player 1 away from Player 2...")
    page.keyboard.down("ArrowRight")
    page.wait_for_timeout(1500)
    page.keyboard.up("ArrowRight")
    page.wait_for_timeout(1000)

    # Take screenshot of independent views in split screen
    screenshot_path1 = "/app/verification_screenshots/coop_independent_views.png"
    print(f"Taking screenshot of independent views at {screenshot_path1}...")
    page.screenshot(path=screenshot_path1)

    # Click Menu again to exit the game (which saves progress)
    print("Opening Menu to Exit Game...")
    page.locator("#menuBtn").click()
    page.wait_for_timeout(500)

    # Handle confirm dialog for exiting game
    page.once("dialog", lambda dialog: dialog.accept())
    print("Exiting Game (saving progress)...")
    page.locator("#exitGameBtn").click()
    page.wait_for_timeout(2000)

    # Reload the page to simulate a fresh return to the game
    print("Simulating return to the game (reloading)...")
    page.reload()
    page.wait_for_timeout(2000)

    # Auto-coop should be restored automatically since we left with it active
    print("Checking if co-op is automatically restored...")
    # Take screenshot to verify restoration of co-op mode & persisted positions
    screenshot_path2 = "/app/verification_screenshots/coop_auto_restored.png"
    print(f"Taking screenshot of auto restored state at {screenshot_path2}...")
    page.screenshot(path=screenshot_path2)
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/app/verification_videos",
            viewport={"width": 1280, "height": 720}
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
            print("Done!")
