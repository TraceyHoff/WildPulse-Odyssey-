import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        page.on("console", lambda msg: print(f"Browser console: {msg.text}"))

        await page.goto("http://localhost:3000")

        # Bypass intro by setting player color
        await page.evaluate("""() => {
            localStorage.setItem('wildpulse_player_color', '#FFFFFF');
        }""")

        # Wait for the Start Game button to be visible and click it
        start_btn = page.locator('#startGameBtn')
        await start_btn.wait_for(state="visible", timeout=30000)
        await start_btn.click()

        # Wait until window.player is defined and not undefined
        await page.wait_for_function("typeof window.player !== 'undefined' && window.player !== null", timeout=30000)

        # Give it a second to stabilize
        await page.wait_for_timeout(2000)

        # Teleport to the center of Player 1's new enlarged home
        # Player 1's home is rows 579-591, cols 579-591. Let's teleport to 58500, 58500.
        await page.evaluate("""() => {
            window.player.x = 58500;
            window.player.y = 58500;
            window.p1Inventory = [
                { id: 'furniture_divider', itemName: 'Room Divider', quantity: 5 },
                { id: 'furniture_holodoor', itemName: 'Holo-Door', quantity: 5 }
            ];
        }""")

        await page.wait_for_timeout(1000)

        # Place some furniture around the center
        await page.evaluate("""() => {
            window.tryPlaceMiniTile(1, 'Room Divider', 58500, 58400, 0);
            window.tryPlaceMiniTile(1, 'Room Divider', 58600, 58400, 0);
            window.tryPlaceMiniTile(1, 'Holo-Door', 58700, 58400, 0);
            window.tryPlaceMiniTile(1, 'Holo-Door', 58800, 58400, 0);

            window.tryPlaceMiniTile(1, 'Room Divider', 58400, 58500, 90);
            window.tryPlaceMiniTile(1, 'Room Divider', 58400, 58600, 90);
        }""")

        await page.wait_for_timeout(1000)

        await page.screenshot(path="verification5.png")
        print("Done!")
        await browser.close()

asyncio.run(main())
