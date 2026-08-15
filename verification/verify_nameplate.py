from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.goto("http://localhost:3000")
    page.wait_for_timeout(2000)

    # Click the start button
    try:
        page.get_by_text("START GAME").click()
    except:
        pass

    page.wait_for_timeout(2000)

    # Walk down slightly to see creatures
    page.keyboard.down("ArrowDown")
    page.wait_for_timeout(1000)
    page.keyboard.up("ArrowDown")

    # Wait for creatures to spawn and render
    page.wait_for_timeout(3000)

    # Take screenshot at the key moment
    page.screenshot(path="verification/screenshots/verification_nameplate.png")
    page.wait_for_timeout(2000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
