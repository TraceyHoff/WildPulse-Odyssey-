import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1280, "height": 720})

        await page.goto("http://localhost:3000/index.html")

        # Wait a bit for game to load
        await asyncio.sleep(2)

        # Click start
        await page.click('#startBtn')
        await asyncio.sleep(2)

        # Wait a bit to ensure textures loaded
        await asyncio.sleep(1)

        # Teleport to P1 home and create items
        await page.evaluate("""
            window.player1.x = 58500;
            window.player1.y = 58500;
            window.isPlayerInsideHome = true;
            window.triggerHomeTutorial(1);

            let floorItem = window.scene.add.sprite(58500, 58500, 'furniture_couch_tile');
            floorItem.setDepth(10);

            let floorItem2 = window.scene.add.sprite(58600, 58500, 'furniture_tv_tile');
            floorItem2.setDepth(10);

            window.p1Inventory = [
                {name: "Neon Couch", count: 1},
                {name: "Cyber TV", count: 1}
            ];
            window.updateInventoryUI();
            window.openHomeCustomizationMenu(1);
        """)
        await asyncio.sleep(2)

        await page.screenshot(path="test_customization_2.png")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
