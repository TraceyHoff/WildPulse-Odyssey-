import sys
from playwright.sync_api import sync_playwright

def run_cuj(page):
    print("Navigating to game...")
    page.goto("http://localhost:3000")
    page.wait_for_timeout(1000)

    # 1. Open and inspect Customization Modal
    print("Opening Customization Modal...")
    page.locator("#customizeBtn").click()
    page.wait_for_timeout(1000)

    # Take screenshot of customization modal
    page.screenshot(path="verification_customization_modal.png")
    page.wait_for_timeout(500)

    # Close customization modal
    print("Closing Customization Modal...")
    page.locator("#closeCustomizationBtn").click()
    page.wait_for_timeout(500)

    # 2. Start the game session
    print("Starting the game...")
    page.locator("#startGameBtn").click()
    page.wait_for_timeout(2000)

    # Take screenshot of gameplay
    page.screenshot(path="verification_gameplay.png")
    page.wait_for_timeout(500)

    # 3. Exit back to main menu
    print("Opening Menu...")
    page.locator("#menuBtn").click()
    page.wait_for_timeout(500)

    # Click Exit Game
    print("Exiting game...")
    # Since exitGame triggers confirm() dialog, handle dialog
    page.once("dialog", lambda dialog: dialog.accept())
    page.locator("#exitGameBtn").click()
    page.wait_for_timeout(1500)

    # Take final screenshot of main menu showing hidden weather elements
    page.screenshot(path="verification_main_menu_exit.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        except Exception as e:
            print(f"Error occurred: {e}")
            sys.exit(1)
        finally:
            context.close()
            browser.close()
    print("Verification script finished successfully!")
