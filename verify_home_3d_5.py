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
        await page.wait_for_timeout(1000)

        # Add sprites with the textures directly near the player!
        await page.evaluate("""
            const scene = window.game.scene.scenes[0];
            const px = window.player.x;
            const py = window.player.y;

            // Add floors
            scene.add.image(px - 100, py - 100, 'home_floor_cyber_circuit').setDepth(10000);
            scene.add.image(px, py - 100, 'home_floor_zen_garden').setDepth(10000);
            scene.add.image(px + 100, py - 100, 'home_floor_rusty_industrial').setDepth(10000);

            // Add walls
            scene.add.image(px - 100, py + 100, 'home_wall_cyber_circuit').setDepth(10000);
            scene.add.image(px, py + 100, 'home_wall_zen_garden').setDepth(10000);
            scene.add.image(px + 100, py + 100, 'home_wall_rusty_industrial').setDepth(10000);
        """)

        await page.wait_for_timeout(2000)

        await page.screenshot(path='/home/jules/verification/screenshots/verification5.png', full_page=True)
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
