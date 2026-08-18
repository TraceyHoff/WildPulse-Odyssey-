from playwright.sync_api import sync_playwright

def run_cuj(page):
    # Enable test onboarding before loading the page so that when it loads it forces it
    page.add_init_script("window.__test_onboarding = true;")
    page.goto("http://localhost:3000")

    # Wait for the Start game button to be visible
    page.wait_for_selector("#startGameBtn", state="visible", timeout=30000)
    page.wait_for_timeout(1000)

    # Set the flag just in case
    page.evaluate("window.__test_onboarding = true;")

    # Click Single Player
    page.evaluate("document.getElementById('startGameBtn').click()")
    page.wait_for_timeout(1000)

    # Click next to go to slide 2
    page.evaluate("document.getElementById('introNextBtn').click()")
    page.wait_for_timeout(1000)

    # Screenshot Slide 2
    page.screenshot(path="/home/jules/verification/screenshots/verification_slide2.png")

if __name__ == "__main__":
    import os
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
