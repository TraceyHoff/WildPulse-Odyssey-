import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1280, "height": 720})

        # Add error listener
        page.on("console", lambda msg: print(f"Console: {msg.text}") if msg.type in ("error", "warning") else None)

        await page.goto("http://localhost:3000/index.html", wait_until="networkidle")
        await asyncio.sleep(2)

        try:
            await page.click('#startBtn', timeout=5000)
            print("Clicked start")
        except Exception as e:
            print("Could not click start:", e)
            await page.screenshot(path="test_error.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
