import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1280, "height": 720})

        await page.goto("http://localhost:3000/index_test.html")

        # Click start
        await page.click('#startBtn')
        await asyncio.sleep(2)

        # Teleport to P1 home
        await page.evaluate("""
            window.player1.x = 58500;
            window.player1.y = 58500;
            window.isPlayerInsideHome = true;
            window.triggerHomeTutorial(1);
            window.p1Inventory = [
                {name: "Neon Couch", count: 1},
                {name: "Cyber TV", count: 1}
            ];
            window.updateInventoryUI();

            let floorItem = window.scene.add.sprite(58500, 58500, 'furniture_couch_tile');
            floorItem.setDepth(10);

            let floorItem2 = window.scene.add.sprite(58600, 58500, 'furniture_tv_tile');
            floorItem2.setDepth(10);
        """)
        await asyncio.sleep(2)

        await page.screenshot(path="test_customization.png")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
