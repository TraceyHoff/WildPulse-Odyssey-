from playwright.sync_api import sync_playwright

def run_cuj(page):
    print("Navigating to game server...")
    page.goto("http://localhost:3000")
    page.wait_for_timeout(2000)

    print("Clicking Start Game button...")
    page.click("#startGameBtn")
    page.wait_for_timeout(2000)

    if page.is_visible("#introModal") and page.locator("#introModal").is_visible():
        print("Progressing through intro slides...")
        page.click("#introNextBtn")
        page.wait_for_timeout(1000)
        page.click("#introNextBtn")
        page.wait_for_timeout(1000)
        if page.is_visible("#closeCustomizationBtn"):
            page.click("#closeCustomizationBtn")
        elif page.is_visible("#saveCustomizationBtn"):
            page.click("#saveCustomizationBtn")
        page.wait_for_timeout(1500)

    print("Opening party modal...")
    page.evaluate("if (window.renderPartyList) { window.renderPartyList(); }")
    page.evaluate("document.getElementById('partyModal').style.display = 'block';")
    page.wait_for_timeout(1000)

    sprite_container_selector = "#partyList .party-card .creature-sprite-container canvas"
    if page.is_visible(sprite_container_selector):
        print("Clicking on the creature image canvas in the party modal...")
        page.click(sprite_container_selector, force=True)
        page.wait_for_timeout(1500)

    # Take screenshot of the open full size image modal!
    screenshot_path = "/home/jules/verification/screenshots/full_size_preview.png"
    page.screenshot(path=screenshot_path)
    print(f"Screenshot taken and saved to {screenshot_path}")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    import os
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)
    os.makedirs("/home/jules/verification/videos", exist_ok=True)
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
