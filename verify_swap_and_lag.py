import asyncio
from playwright.async_api import async_playwright
import os
import time

async def verify_fixes():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={'width': 1280, 'height': 720})
        page = await context.new_page()

        # Load the game
        print("Loading game on port 3000...")
        await page.goto('http://localhost:3000')

        # Wait for the game to initialize
        await page.wait_for_selector('#startGameBtn')

        # Mock battle state and lag test
        print("Mocking battle state and testing lag...")
        await page.evaluate("""
            // Hide start modal
            document.getElementById('startModal').style.display = 'none';

            // Mock party with two healthy creatures
            window.playerParty = [
                { id: '1', name: 'Creature A', level: 5, type: 'Fire', currentHp: 20, maxHp: 20, stats: { speed: 10 }, moves: ['Tackle'] },
                { id: '2', name: 'Creature B', level: 5, type: 'Water', currentHp: 20, maxHp: 20, stats: { speed: 10 }, moves: ['Splash'] }
            ];
            window.collectedCreatures = [...window.playerParty];
            window.currentPlayer = { ...window.playerParty[0] };

            // Trigger battle
            window.inBattle = true;
            window.enemyCreature = { id: '3', name: 'Wild C', level: 5, type: 'Grass', currentHp: 20, maxHp: 20, stats: { speed: 5 }, moves: ['Growl'] };

            // Show battle modal
            document.getElementById('battleModal').style.display = 'flex';
            window.updateBattleUI();

            // Setup lag test: queue many messages
            const log = document.getElementById('battleLog');
            log.innerHTML = '';
            window.battleLogQueue = [
                "Message 1", "Message 2", "Message 3", "Message 4", "Message 5",
                "Message 6", "Message 7", "Message 8", "Message 9", "Message 10"
            ];
            window.processLogQueue();
        """)

        # Wait for the queue to be partially processed
        await asyncio.sleep(3)

        log_text = await page.inner_text('#battleLog')
        log_lines = [line for line in log_text.strip().split('\n') if line.strip()]
        print(f"Battle log lines: {len(log_lines)}")
        if len(log_lines) > 1:
            print("SUCCESS: Battle log processed multiple messages quickly.")
        else:
            print("FAILURE: Battle log still slow or didn't process queue.")

        # Take a screenshot of the battle UI
        os.makedirs('verification/screenshots', exist_ok=True)
        await page.screenshot(path='verification/screenshots/battle_ui.png')

        # Test Swapping
        print("Testing Swapping...")
        await page.click('.btn-swap')
        await asyncio.sleep(0.5)
        await page.screenshot(path='verification/screenshots/swap_modal.png')

        # Verify Creature B is in the list
        swap_list = await page.inner_text('#swapPartyList')
        if "Creature B" in swap_list:
            print("SUCCESS: Creature B found in swap list.")
        else:
            print("FAILURE: Creature B NOT found in swap list.")
            print(f"Swap list content: {swap_list}")

        # Swap to Creature B
        print("Swapping to Creature B...")
        await page.click('.swap-item:has-text("Creature B")')
        await asyncio.sleep(3)

        # Verify current player is now Creature B
        current_p_name = await page.inner_text('#pName')
        print(f"Current player after swap: {current_p_name}")
        if "Creature B" in current_p_name:
            print("SUCCESS: Swapped to Creature B.")
        else:
            print(f"FAILURE: Expected Creature B, got {current_p_name}")

        # Test Swapping BACK to Creature A
        print("Testing swapping BACK to Creature A...")
        await page.click('.btn-swap')
        await asyncio.sleep(0.5)
        await page.screenshot(path='verification/screenshots/swap_back_modal.png')

        swap_list_back = await page.inner_text('#swapPartyList')
        if "Creature A" in swap_list_back:
            print("SUCCESS: Creature A found in swap list (Swap back works).")
            await page.click('.swap-item:has-text("Creature A")')
            await asyncio.sleep(3)
            current_p_name_back = await page.inner_text('#pName')
            print(f"Current player after swap back: {current_p_name_back}")
            if "Creature A" in current_p_name_back:
                print("SUCCESS: Swapped back to Creature A.")
            else:
                print(f"FAILURE: Expected Creature A after swap back, got {current_p_name_back}")
        else:
            print("FAILURE: Creature A NOT found in swap list (Swap back broken).")
            print(f"Swap list content: {swap_list_back}")

        await browser.close()

if __name__ == '__main__':
    asyncio.run(verify_fixes())
