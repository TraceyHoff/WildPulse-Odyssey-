from playwright.sync_api import sync_playwright

def run_tests():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Attach console listeners to capture any errors from the game loop
        page.on("console", lambda msg: print(f"Browser Console [{msg.type}]: {msg.text}"))
        page.on("pageerror", lambda err: print(f"Browser Error: {err}"))

        # Load the local index.html file
        page.goto("file:///app/index.html", wait_until="networkidle")

        # Wait a bit for game to initialize
        page.wait_for_timeout(2000)

        # Test finding and adding a new creature to saveCollected directly
        page.evaluate("""
            const testCreature = { id: 'test_123', name: 'Testimon' };
            saveCollected(testCreature);
            if (!collectedCreatures.find(c => c.id === 'test_123')) {
                console.error("Test failed: test_123 not in array");
            } else {
                console.log("Test passed: test_123 in array");
            }
            if (!collectedCreaturesIds.has('test_123')) {
                console.error("Test failed: test_123 not in Set");
            } else {
                console.log("Test passed: test_123 in Set");
            }
        """)

        browser.close()

if __name__ == "__main__":
    run_tests()
