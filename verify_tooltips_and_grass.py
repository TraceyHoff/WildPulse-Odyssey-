from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1280, "height": 720})

        page.on("console", lambda msg: print(f"Browser Console [{msg.type}]: {msg.text}"))
        page.on("pageerror", lambda err: print(f"Browser Error: {err}"))

        # Load local index.html
        page.goto("file:///app/index.html")

        # Wait for game to initialize
        page.wait_for_timeout(3000)

        # Open Party menu
        page.evaluate("window.openPartyModal()")
        page.wait_for_timeout(500)

        # Add a test creature
        page.evaluate('''
            if (!window.collectedCreatures) window.collectedCreatures = [];
            window.collectedCreatures.push(window.baseCreatures[0]);
            window.collectedCreaturesIds.add(window.baseCreatures[0].id);
            window.updatePartyList();
        ''')
        page.wait_for_timeout(500)

        # Hover over the type element to trigger the tooltip
        type_el = page.locator('span[data-tooltip]').first
        if type_el.count() > 0:
            type_el.hover()
            page.wait_for_timeout(500)

            # Take screenshot showing tooltip
            page.screenshot(path="/home/jules/verification/party_tooltip2.png")
            print("Screenshot saved to /home/jules/verification/party_tooltip2.png")
        else:
            print("Could not find type element with data-tooltip")

        browser.close()

if __name__ == "__main__":
    run()
