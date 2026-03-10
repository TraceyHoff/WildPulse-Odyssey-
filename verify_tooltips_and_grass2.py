from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1280, "height": 720})

        page.on("console", lambda msg: print(f"Browser Console [{msg.type}]: {msg.text}"))
        page.on("pageerror", lambda err: print(f"Browser Error: {err}"))

        # Load local index.html
        page.goto("file:///app/index.html")
        page.wait_for_timeout(3000)

        # Add a test creature by simulating finding one
        page.evaluate('''
            if (!window.collectedCreatures) window.collectedCreatures = [];
            if (!window.collectedCreaturesIds) window.collectedCreaturesIds = new Set();
            window.collectedCreatures.push(window.baseCreatures[0]);
            window.collectedCreaturesIds.add(window.baseCreatures[0].id);
        ''')

        # Open Party menu
        page.evaluate("window.openPartyModal()")
        page.wait_for_timeout(500)

        # Hover over the type element to trigger the tooltip
        type_el = page.locator('span[data-tooltip]').first
        if type_el.count() > 0:
            type_el.hover()
            page.wait_for_timeout(500)
            page.screenshot(path="/home/jules/verification/party_tooltip3.png")
            print("Screenshot saved to /home/jules/verification/party_tooltip3.png")
        else:
            print("Could not find type element with data-tooltip")

        # Verify grass
        page.screenshot(path="/home/jules/verification/grass_edges.png")
        print("Grass screenshot saved.")

        browser.close()

if __name__ == "__main__":
    run()
