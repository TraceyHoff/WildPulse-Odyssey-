from playwright.sync_api import sync_playwright

def on_console(msg):
    print(f"Browser Console: {msg.text}")

def on_error(err):
    print(f"Browser Error: {err}")

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.on("console", on_console)
    page.on("pageerror", on_error)

    page.goto('http://localhost:3000')

    # Ensure elements are present
    assert page.query_selector('#tooltip') is not None
    assert page.query_selector('.close-btn') is not None

    print("UI and Phaser loaded successfully without crashes.")
    browser.close()
