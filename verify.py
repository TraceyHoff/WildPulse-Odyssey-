from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.goto("http://localhost:3000")
    page.wait_for_timeout(5000)

    # Click the start button if visible
    try:
        page.locator("#startGameBtn").click(timeout=1000)
    except:
        pass

    page.wait_for_timeout(4000)

    # Open the store modal
    page.evaluate("window.gameStarted = true")
    page.evaluate("window.updateStoreUI(1)")
    page.evaluate("document.getElementById('storeModal').style.display = 'block'")

    # Switch to home items tab
    page.evaluate("document.querySelectorAll('#storeModal .store-tab')[1].click()")
    page.wait_for_timeout(1000)

    # Scroll down by scrolling all divs with scrollbars
    page.evaluate('''
        Array.from(document.querySelectorAll('#storeModal div')).forEach(d => {
            if (d.scrollHeight > d.clientHeight) {
                d.scrollTop = 5000;
            }
        });
    ''')
    page.wait_for_timeout(1000)

    # Take screenshot
    page.screenshot(path="verification_store.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="videos",
            viewport={'width': 1280, 'height': 720}
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
