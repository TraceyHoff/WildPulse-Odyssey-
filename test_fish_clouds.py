from playwright.sync_api import sync_playwright
import time

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        page.goto("http://localhost:8000/index.html")

        # Let's execute some code to find out what's up with clouds and fish
        page.locator('button.close-btn.lobby-close-btn').click()
        page.evaluate("window.startGame()")
        time.sleep(1)

        # Check cloud info
        clouds = page.evaluate("window.cloudGroup ? window.cloudGroup.getChildren().length : 0")
        print(f"Clouds: {clouds}")
        if clouds > 0:
            cloud_x = page.evaluate("window.cloudGroup.getChildren()[0].x")
            cloud_y = page.evaluate("window.cloudGroup.getChildren()[0].y")
            print(f"Cloud 0 pos: {cloud_x}, {cloud_y}")

        # Check fish info
        fish = page.evaluate("window.fishGroup ? window.fishGroup.getChildren().length : 0")
        print(f"Fish: {fish}")
        if fish > 0:
            fish_x = page.evaluate("window.fishGroup.getChildren()[0].x")
            fish_y = page.evaluate("window.fishGroup.getChildren()[0].y")
            print(f"Fish 0 pos: {fish_x}, {fish_y}")

        # Check lake info
        lakes = page.evaluate("window.lakes ? window.lakes.length : 0")
        print(f"Lakes: {lakes}")

        # Check particles info
        pollen = page.evaluate("window.pollenEmitter ? window.pollenEmitter.getParticleCount() : 0")
        print(f"Pollen: {pollen}")

        browser.close()

if __name__ == "__main__":
    main()
