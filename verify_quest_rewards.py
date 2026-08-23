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

        new_items = ["Cyber-Core Upgrade", "Nano-Nurture Serum", "DNA Stabilizer", "NPC Dual Link", "Wild Dual Signal"]
        found_items = set()

        # Run loop to verify quests
        for i in range(1000):
            reward = await page.evaluate("""
                () => {
                    const quest = window.generateProceduralQuest('quest_npc_1', 1);
                    return quest.rewards.item;
                }
            """)
            if reward in new_items:
                found_items.add(reward)
            if len(found_items) == len(new_items):
                print("Successfully verified all new items as quest rewards!")
                break

        if len(found_items) < len(new_items):
            print(f"Failed to find all new items. Missing: {set(new_items) - found_items}")
            exit(1)

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
