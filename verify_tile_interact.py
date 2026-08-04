import os
from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.on("console", lambda msg: print(f"BROWSER_LOG: {msg.text}"))

    print("Navigating to local server...")
    page.goto("http://localhost:3000")
    page.wait_for_timeout(2000)

    # Handle onboarding slides
    print("Handling onboarding slides...")
    for _ in range(5):
        if page.locator("#introNextBtn").is_visible():
            page.click("#introNextBtn")
            page.wait_for_timeout(500)

    # Save Customizations
    if page.locator("#saveCustomizationBtn").is_visible():
        page.click("#saveCustomizationBtn")
        page.wait_for_timeout(1000)

    # Start Game
    print("Clicking Start Game...")
    if page.locator("#startGameBtn").is_visible():
        page.click("#startGameBtn")
        page.wait_for_timeout(2000)

    # Register the tile overlap manually to mock standing on the Store tile, with future timestamp to bypass update loop clearing
    print("Mocking standing on the Store tile...")
    page.evaluate("""
        window.registerTileOverlap(1, 'store', () => {
            console.log("CALLBACK CALLED!");
            window.openStoreModal(window.player);
        });
        window.player.lastTileOverlapTime = Date.now() + 100000;
    """)
    page.wait_for_timeout(200)

    # Left click on the game container/viewport to trigger interaction
    print("Left-clicking viewport to open store...")
    page.mouse.click(200, 200)
    page.wait_for_timeout(1000)

    # Verify store modal is open
    is_store_open = page.is_visible("#storeModal")
    print(f"Is Store Modal visible after click: {is_store_open}")
    assert is_store_open, "Store modal should open after clicking while on the tile!"

    # Take screenshot of the opened store modal
    screenshot_path = "verification_screenshots/tile_interact.png"
    page.screenshot(path=screenshot_path)
    print(f"Saved screenshot to {screenshot_path}")

    # Close the store modal
    print("Closing store modal...")
    page.click("#storeModal .close-store-btn")
    page.wait_for_timeout(1000)

    # Verify store modal is closed
    is_store_open = page.is_visible("#storeModal")
    print(f"Is Store Modal visible after close: {is_store_open}")
    assert not is_store_open, "Store modal should be closed!"

    # Re-register to mock standing on the tile again
    print("Mocking standing on the Store tile again...")
    page.evaluate("""
        window.registerTileOverlap(1, 'store', () => {
            console.log("CALLBACK CALLED AGAIN!");
            window.openStoreModal(window.player);
        });
        window.player.lastTileOverlapTime = Date.now() + 100000;
    """)
    page.wait_for_timeout(200)

    # Dispatch custom keydown Enter event
    print("Dispatching custom keydown Enter event...")
    page.evaluate("""
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    """)
    page.wait_for_timeout(1000)

    # Verify store modal is open again
    is_store_open = page.is_visible("#storeModal")
    print(f"Is Store Modal visible after Dispatch Enter: {is_store_open}")
    assert is_store_open, "Store modal should open after dispatching Enter event!"

    page.wait_for_timeout(1000)

if __name__ == "__main__":
    os.makedirs("verification_screenshots", exist_ok=True)
    os.makedirs("verification_videos", exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="verification_videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
