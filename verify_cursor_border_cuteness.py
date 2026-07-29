import os
from playwright.sync_api import sync_playwright

def run_cuj(page):
    # Create verification directories
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)
    os.makedirs("/home/jules/verification/videos", exist_ok=True)

    # Goto app
    page.goto("http://localhost:3000")
    page.wait_for_timeout(1000)

    # Clear local storage for a clean start
    page.evaluate("localStorage.clear();")
    page.goto("http://localhost:3000")
    page.wait_for_timeout(2000)

    # 1. Verify Cursor Visibility when Start Menu is open (modalOpen should be True)
    has_modal_open_class = page.evaluate("document.body.classList.contains('modal-open')")
    print(f"Start Menu open - has 'modal-open' class on body: {has_modal_open_class}")
    assert has_modal_open_class == True, "Expected 'modal-open' class on body since start menu is open"

    # 2. Render a custom cute creature on the screen so we can visually verify its cuteness
    page.evaluate("""
        const canvas = document.createElement('canvas');
        canvas.id = 'testCuteCanvas';
        canvas.width = 150;
        canvas.height = 150;
        canvas.style.position = 'fixed';
        canvas.style.top = '20px';
        canvas.style.left = '20px';
        canvas.style.zIndex = '999999';
        canvas.style.border = '4px solid #fff';
        canvas.style.borderRadius = '15px';
        document.body.appendChild(canvas);
        window.renderCreatureCanvas(canvas, {
            name: 'KawaiiCute',
            color: 0xffb7c5,
            type: 'Normal',
            skinFurColor: '#ffb7c5',
            eyesColor: '#e91e63'
        }, 150, true);
    """)
    page.wait_for_timeout(1000)

    # Take screenshot of start menu showing the custom rendered cute creature & glowing buttons
    screenshot_menu_path = "/home/jules/verification/screenshots/start_menu_neon_cute.png"
    page.screenshot(path=screenshot_menu_path)
    print(f"Start menu screenshot saved to {screenshot_menu_path}")

    # 3. Open customization modal to check its glowing neon borders
    page.click("#customizeBtn")
    page.wait_for_timeout(1000)

    screenshot_customization_path = "/home/jules/verification/screenshots/customization_neon.png"
    page.screenshot(path=screenshot_customization_path)
    print(f"Customization modal screenshot saved to {screenshot_customization_path}")

    # Close customization
    page.click("#closeCustomizationBtn")
    page.wait_for_timeout(500)

    # Clear local storage right before starting game to guarantee isNewGame is True
    page.evaluate("localStorage.clear();")

    # 4. Start Game (triggers intro slide because we force onboarding)
    page.evaluate("window.__test_onboarding = true;")
    page.click("#startGameBtn")
    page.wait_for_timeout(1000)

    # Click Next > (slide 1) and Configure Avatar (slide 2) to start game session
    page.click("#introNextBtn")
    page.wait_for_timeout(1000)
    page.click("#introNextBtn")
    page.wait_for_timeout(1000)
    # Inside customization modal, click close/skip button
    page.click("#closeCustomizationBtn")
    page.wait_for_timeout(2000)

    # Now the game has started and no modal is open (active gameplay)
    has_modal_open_class_active = page.evaluate("document.body.classList.contains('modal-open')")
    print(f"Active gameplay - has 'modal-open' class on body: {has_modal_open_class_active}")
    assert has_modal_open_class_active == False, "Expected no 'modal-open' class on body during active gameplay"

    # Take screenshot of active gameplay (where mouse cursor is hidden!)
    screenshot_gameplay_path = "/home/jules/verification/screenshots/active_gameplay_cursor_hidden.png"
    page.screenshot(path=screenshot_gameplay_path)
    print(f"Active gameplay screenshot saved to {screenshot_gameplay_path}")

    # Hold final state for the video
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
