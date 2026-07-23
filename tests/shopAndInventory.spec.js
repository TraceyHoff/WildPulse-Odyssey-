const { test, expect } = require('@playwright/test');

test.describe('Shop and Inventory Systems', () => {
  test.beforeEach(async ({ page }) => {
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
    // Navigate to local port 3000
    await page.goto('http://localhost:3000');
    // Start game session by clicking start button
    await page.click('#startGameBtn');
    // Wait for the game to start and the main menu button to be visible
    await page.waitForSelector('#menuBtn', { state: 'visible' });
  });

  test('should buy items, display them, handle stacking, and enforce limits', async ({ page }) => {
    // 1. Grant initial coins and clear inventory for testing
    await page.evaluate(() => {
        if (!window.gameStats) window.gameStats = { coins: 0 };
        window.gameStats.coins = 500;
        window.updateMenuCoins();
        // Clear inventory to start fresh
        window.p1Inventory = [];
        window.saveInventory();

        // Reset stock to default (5) to ensure test isolated environment
        window.p1StoreStock = {
            "Repellent": 5,
            "HP Booster": 5,
            "Attack Booster": 5,
            "Defense Booster": 5,
            "Speed Booster": 5,
            "Sp. Atk Booster": 5,
            "Sp. Def Booster": 5,
            "Jank Juice": 5,
            "Healing Juice Bottle": 5,
            "Healing Juice Jug": 5
        };
        localStorage.setItem('wildpulse_store_stock_p1', JSON.stringify(window.p1StoreStock));

        window.updateInventoryUI();
    });

    // 2. Open store manually and update UI directly
    await page.evaluate(() => {
        document.getElementById('storeModal').style.display = 'block';
        window.updateStoreUI();
    });

    // Wait for store content to be visible
    await expect(page.locator('#storeModal')).toBeVisible();

    // Verify all 10 items are listed in the shop
    const items = ["Repellent", "HP Booster", "Attack Booster", "Defense Booster", "Speed Booster", "Sp. Atk Booster", "Sp. Def Booster", "Jank Juice", "Healing Juice Bottle", "Healing Juice Jug"];
    for (const item of items) {
        await expect(page.locator(`#storeContent`)).toContainText(item);
    }

    // Buy 1 Repellent
    const buyRepellentBtn = page.locator('button[onclick*="Repellent"]').first();
    await buyRepellentBtn.click();

    // Verify repellent was added to inventory
    await page.waitForTimeout(500);
    const p1Slots = page.locator('#p1InventorySlots .inventory-slot');
    await expect(p1Slots.first()).toContainText('🧴');
    await expect(p1Slots.first()).toContainText('1');

    // Buy another Repellent to test stacking (stack size 2)
    await buyRepellentBtn.click();
    await page.waitForTimeout(500);
    await expect(p1Slots.first()).toContainText('2');

    // Buy other items to fill up remaining 2 slots
    const buyHPBoosterBtn = page.locator('button[onclick*="HP Booster"]').first();
    const buyBottleBtn = page.locator('button[onclick*="Healing Juice Bottle"]').first();

    await buyHPBoosterBtn.click();
    await page.waitForTimeout(300);
    await buyBottleBtn.click();
    await page.waitForTimeout(300);

    // Verify all 3 slots are full
    await expect(p1Slots.nth(0)).toContainText('🧴');
    await expect(p1Slots.nth(1)).toContainText('💚');
    await expect(p1Slots.nth(2)).toContainText('🧪');

    // Try to buy a 4th unique item type (Jank Juice) and expect warning/rejection
    const buyJankJuiceBtn = page.locator('button[onclick*="Jank Juice"]').first();
    await buyJankJuiceBtn.click();
    await page.waitForTimeout(300);

    // Verify slots are still the same and did not include Jank Juice
    await expect(p1Slots.nth(0)).toContainText('🧴');
    await expect(p1Slots.nth(1)).toContainText('💚');
    await expect(p1Slots.nth(2)).toContainText('🧪');
  });

  test('should use items and apply their effects correctly', async ({ page }) => {
    // Prepare items directly in Player 1 inventory for testing
    await page.evaluate(() => {
        if (!window.gameStats) window.gameStats = { coins: 0 };
        window.gameStats.coins = 500;
        window.p1Inventory = [
            { name: "Repellent", quantity: 1 },
            { name: "Jank Juice", quantity: 1 },
            { name: "HP Booster", quantity: 1 }
        ];
        window.saveInventory();
        window.updateInventoryUI();
    });

    const html = await page.locator('#p1InventorySlots').innerHTML();
    console.log('p1InventorySlots INNER HTML:', html);

    const p1Slots = page.locator('#p1InventorySlots .inventory-slot');
    const buffsIndicator = page.locator('#p1ActiveBuffs');

    // Use items directly in page evaluate to test effect application
    await page.evaluate(() => {
        window.useInventoryItem(1, 0); // Use Repellent
    });
    await page.waitForTimeout(1000);

    const buffsText = await page.locator('#p1ActiveBuffs').innerText();
    console.log('p1ActiveBuffs CURRENT TEXT:', buffsText);

    // Verify repellent buff is active
    await expect(buffsIndicator).toContainText('Repel');
    // Verify repellent was consumed (remaining items shifted left, so Jank Juice is at slot 0)
    await expect(p1Slots.nth(0)).toContainText('🧃');

    await page.evaluate(() => {
        window.useInventoryItem(1, 0); // Use Jank Juice
    });
    await page.waitForTimeout(500);

    // Verify both Repellent and Jank Juice buffs are active
    await expect(buffsIndicator).toContainText('Repel');
    await expect(buffsIndicator).toContainText('Shiny');
  });

  test('should display dynamic available to buy quantity and each player coins', async ({ page }) => {
    // Grant coins and prepare empty inventory
    await page.evaluate(() => {
        if (!window.gameStats) window.gameStats = { coins: 0 };
        window.gameStats.coins = 350;
        window.updateMenuCoins();
        window.p1Inventory = [];
        window.saveInventory();

        // Reset stock to default (5) to ensure test isolated environment
        window.p1StoreStock = {
            "Repellent": 5,
            "HP Booster": 5,
            "Attack Booster": 5,
            "Defense Booster": 5,
            "Speed Booster": 5,
            "Sp. Atk Booster": 5,
            "Sp. Def Booster": 5,
            "Jank Juice": 5,
            "Healing Juice Bottle": 5,
            "Healing Juice Jug": 5
        };
        localStorage.setItem('wildpulse_store_stock_p1', JSON.stringify(window.p1StoreStock));

        window.updateInventoryUI();
    });

    // Open store modal (which now automatically calls updateStoreUI)
    await page.evaluate(() => {
        if (window.openStoreModal) window.openStoreModal();
    });

    await expect(page.locator('#storeModal')).toBeVisible();

    // Verify Player 1 Coins are displayed as 350
    const storeP1Col = page.locator('#storeContent');
    await expect(storeP1Col).toContainText('Coins: 350');

    // Since inventory is empty, dynamic available to buy for each item is 30 (10 per slot * 3 slots)
    const repelLabel = storeP1Col.locator('.available-qty-label').first();
    await expect(repelLabel).toContainText('Available to Buy: 30');

    // Buy 1 Repellent
    const buyRepellentBtn = page.locator('button[onclick*="Repellent"]').first();
    await buyRepellentBtn.click();
    await page.waitForTimeout(500);

    // Dynamic available to buy for Repellent should now be 29 (since 1 is in slot, leaving 9 in that slot + 20 in other slots)
    await expect(repelLabel).toContainText('Available to Buy: 29');

    // Fill inventory slots with other unique items
    const buyHPBoosterBtn = page.locator('button[onclick*="HP Booster"]').first();
    const buyBottleBtn = page.locator('button[onclick*="Healing Juice Bottle"]').first();

    await buyHPBoosterBtn.click();
    await page.waitForTimeout(300);
    await buyBottleBtn.click();
    await page.waitForTimeout(300);

    // Now inventory slots are:
    // Slot 0: Repellent (1) - 9 left in slot
    // Slot 1: HP Booster (1) - 9 left in slot
    // Slot 2: Healing Juice Bottle (1) - 9 left in slot
    // Total free slots = 0.
    // Dynamic available to buy for Repellent should be 9
    await expect(repelLabel).toContainText('Available to Buy: 9');

    // Jank Juice is not in the inventory and we have 0 free slots.
    // Dynamic available to buy for Jank Juice should be 0, button text should be "Full"
    await expect(storeP1Col).toContainText('Available to Buy: 0');
  });
});
