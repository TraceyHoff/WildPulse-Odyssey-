import os
from playwright.sync_api import sync_playwright

def run_cuj(page):
    # Goto app
    page.goto("http://localhost:3000")
    page.wait_for_timeout(1000)

    # Initialize / clear local storage to ensure fresh starting state
    page.evaluate("localStorage.clear();")
    page.goto("http://localhost:3000")
    page.wait_for_timeout(2000)

    # Enable split-screen co-op mode to display the black vertical divider
    page.evaluate("if (window.enableCoop && game && game.scene.scenes[0]) { window.enableCoop(game.scene.scenes[0]); }")
    page.wait_for_timeout(1000)

    # Ensure the black divider element is present and visible
    divider_style = page.evaluate("(() => { const el = document.getElementById('coopSplitLine'); return el ? el.style.display : 'none'; })()")
    print(f"Divider display style: {divider_style}")

    # Take screenshot of the visual split screen layout showing the black line in action
    screenshot_path = "/home/jules/verification/screenshots/coop_split_divider.png"
    page.screenshot(path=screenshot_path)
    print(f"Screenshot taken and saved to {screenshot_path}")

    # Keep final state for a second
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
