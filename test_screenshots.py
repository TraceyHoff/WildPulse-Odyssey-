from playwright.sync_api import sync_playwright
import time

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        page.goto("http://localhost:8000/index.html")

        print("Starting game...")
        # Start game by evaluating the start function or clicking join
        page.locator('button.close-btn.lobby-close-btn').click()
        page.evaluate("window.startGame()")
        time.sleep(3)
        page.screenshot(path="game_started.png")

        # Let's see what happens to shadows/particles and fish
        time.sleep(5)
        page.screenshot(path="game_after_5_sec.png")

        browser.close()

if __name__ == "__main__":
    main()
