from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.on("console", lambda msg: print(f"Browser Console [{msg.type}]: {msg.text}"))
        page.goto("http://localhost:8080/")

        print("Clicking Join Room...")
        page.click("button:has-text('Join Room')")
        page.wait_for_timeout(2000)

        page.screenshot(path="screenshot_repro.png")
        print("Done")
        browser.close()

if __name__ == "__main__":
    run()
