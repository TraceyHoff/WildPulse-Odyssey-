import os
from playwright.sync_api import sync_playwright

def run_verification(page):
    # Set init script to clear localStorage and force onboarding
    page.add_init_script("""
        localStorage.clear();
        window.__test_onboarding = true;
    """)
    print("Navigating to local server...")
    page.goto("http://localhost:3000")
    page.wait_for_timeout(2000)

    # Click start game to trigger onboarding
    print("Clicking Start Game...")
    page.click("#startGameBtn")
    page.wait_for_timeout(1000)

    # Verify introModal is visible
    is_visible = page.is_visible("#introModal")
    print(f"Is intro modal visible: {is_visible}")

    # Snap screenshot of slide 1 showing reward thresholds
    screenshot_path = "/home/jules/verification/screenshots/crown_onboarding.png"
    page.screenshot(path=screenshot_path)
    print(f"Saved screenshot to {screenshot_path}")

if __name__ == "__main__":
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()
        try:
            run_verification(page)
        finally:
            context.close()
            browser.close()
