from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1280, "height": 720})
        page.on("console", lambda msg: print(f"Browser Console [{msg.type}]: {msg.text}"))

        page.goto("file:///app/index.html")
        page.wait_for_timeout(2000)

        # Start game by evaluating startGame instead of clicking joinBtn
        page.evaluate('''
            document.getElementById('lobbyModal').style.display = 'none';
            if (window.startGame) window.startGame();
        ''')

        page.wait_for_timeout(2000)

        page.screenshot(path="screenshot_normal2.png")
        print("Screenshot saved to screenshot_normal2.png")
        browser.close()

if __name__ == "__main__":
    run()
