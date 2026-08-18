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

        await page.evaluate("""() => {
            window.player.x = 58500;
            window.player.y = 58500;
            window.p1Inventory = [
                { id: 'furniture_couch', itemName: 'Neon Couch', quantity: 1 },
                { id: 'furniture_tv', itemName: 'Cyber TV', quantity: 1 }
            ];
            window.p1Level = 15;
        }""")

        await page.wait_for_timeout(1000)

        await page.evaluate("""() => {
            window.tryPlaceMiniTile(1, 'Neon Couch', 58500, 58400, 0);
            window.tryPlaceMiniTile(1, 'Cyber TV', 58600, 58400, 0);
        }""")

        await page.wait_for_timeout(1000)

        # Open store
        await page.evaluate("""() => {
            window.showStore(1);
        }""")

        await page.wait_for_timeout(1000)

        await page.screenshot(path="verification_store.png")
        print("Done!")
        await browser.close()

asyncio.run(main())
