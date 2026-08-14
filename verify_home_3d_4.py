import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()

        # Seed local storage to skip onboarding
        await page.goto("http://localhost:3000")
        await page.evaluate("localStorage.setItem('wildpulse_player_color', '#FFFFFF')")

        # Start game
        await page.goto("http://localhost:3000")

        # Wait for and click Start Game
        start_btn = page.locator('#startGameBtn')
        await start_btn.wait_for(state='visible', timeout=30000)
        await start_btn.click()

        # Wait for the game to start rendering (canvas visible)
        await page.wait_for_selector('canvas', state='visible')

        # Build the room tiles to be sure they are visible, in case the home was empty or not generated right
        await page.evaluate("""
            window.buildHomeInteriorRoom(582, 582, 8, 'wall_cyber_circuit', 'floor_cyber_circuit');
            window.player.x = 58250;
            window.player.y = 58250;
            window.playerObj.body.reset(58250, 58250);
            window.updateFromGameObject(window.player, window.playerObj);
            window.currentCamera.centerOn(58250, 58250);
        """)

        await page.wait_for_timeout(2000)

        await page.screenshot(path='/home/jules/verification/screenshots/verification4.png', full_page=True)
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
