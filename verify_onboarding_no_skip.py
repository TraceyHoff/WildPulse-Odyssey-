import os
from playwright.sync_api import sync_playwright

def run_cuj(page):
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)
    os.makedirs("/home/jules/verification/videos", exist_ok=True)

    # Force onboarding
    page.add_init_script("window.__test_onboarding = true;")

    print("Navigating to game server...")
    page.goto("http://localhost:3000")
    page.wait_for_timeout(1000)

    print("Clicking Start Game...")
    page.click("#startGameBtn")
    page.wait_for_timeout(1000)

    # Take screenshot of Slide 1
    print("Capturing Slide 1...")
    page.screenshot(path="/home/jules/verification/screenshots/onboarding_no_skip_slide1.png")
    page.wait_for_timeout(500)

    # Click Next
    print("Clicking Next to advance to Slide 2...")
    page.click("#introNextBtn")
    page.wait_for_timeout(1000)

    # Take screenshot of Slide 2
    print("Capturing Slide 2...")
    page.screenshot(path="/home/jules/verification/screenshots/onboarding_no_skip_slide2.png")
    page.wait_for_timeout(500)

    # Click Configure Avatar 🧬
    print("Clicking Configure Avatar 🧬...")
    page.click("#introNextBtn")
    page.wait_for_timeout(1000)

    # Take screenshot of Customization Modal
    print("Capturing Customization Modal...")
    page.screenshot(path="/home/jules/verification/screenshots/onboarding_no_skip_customization.png")
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
        print("Done!")
