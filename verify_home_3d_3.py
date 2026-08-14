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

        # Teleport to home coordinates and enter the home!
        await page.evaluate("""
            window.teleportPlayerToHome(1);
        """)

        # Wait for camera / game loop to settle inside the home
        await page.wait_for_timeout(2000)

        # Build the room tiles to be sure they are visible, in case the home was empty or not generated right
        await page.evaluate("""
            window.buildHomeInteriorRoom(450, 450, 8, 'wall_cyber_circuit', 'floor_cyber_circuit');
            window.player1.x = 45500;
            window.player1.y = 45500;
            window.player1Obj.body.reset(45500, 45500);
            window.updateFromGameObject(window.player1, window.player1Obj);
            window.currentCamera.centerOn(45500, 45500);
        """)

        await page.wait_for_timeout(2000)

        await page.screenshot(path='/home/jules/verification/screenshots/verification3.png', full_page=True)
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
