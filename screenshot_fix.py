from playwright.sync_api import sync_playwright
import time

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        print("Navigating to index.html...")
        page.goto("http://localhost:8000/index.html")
        time.sleep(2)

        # Start game and teleport player near a lake
        page.evaluate("window.startGame()")
        time.sleep(2)

        # Close lobby modal
        page.evaluate("document.querySelector('.lobby-close-btn').click()")
        time.sleep(1)

        # Teleport to 2000, 2000
        page.evaluate("player.x = 2000; player.y = 2000;")
        time.sleep(1)

        page.screenshot(path="screenshot_fix.png")
        print("Screenshot saved to screenshot_fix.png")

        browser.close()

if __name__ == "__main__":
    main()
