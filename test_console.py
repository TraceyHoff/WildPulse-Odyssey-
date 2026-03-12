from playwright.sync_api import sync_playwright
import time

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Capture console messages
        def handle_console(msg):
            print(f"CONSOLE [{msg.type}]: {msg.text}")

        page.on("console", handle_console)

        # Capture page errors
        def handle_error(err):
            print(f"PAGE ERROR: {err.error}")

        page.on("pageerror", handle_error)

        print("Navigating to index.html...")
        page.goto("http://localhost:8000/index.html")

        print("Waiting for game to load...")
        time.sleep(2)

        print("Starting game...")
        # Start game by evaluating the start function or clicking join
        page.evaluate("window.startGame()")
        time.sleep(3)

        print("Done.")
        browser.close()

if __name__ == "__main__":
    main()
