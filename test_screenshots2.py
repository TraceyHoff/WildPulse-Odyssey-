from playwright.sync_api import sync_playwright
import time

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        page.goto("http://localhost:8000/index_test.html")

        print("Starting game...")
        page.locator('button.close-btn.lobby-close-btn').click()
        page.evaluate("window.startGame()")
        time.sleep(3)
        page.screenshot(path="game_particles.png")

        browser.close()

if __name__ == "__main__":
    main()
