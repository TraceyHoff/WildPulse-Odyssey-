const { test, expect } = require('@playwright/test');

test.describe('Home Storage Inventory System', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.evaluate(() => {
      localStorage.clear();
      localStorage.setItem('wildpulse_p1_coins', '1000');
      // Give them items to test storing
      window.p1Inventory = [
          { name: 'HP Booster', quantity: 2 },
          { name: 'Attack Booster', quantity: 1 }
      ];
      localStorage.setItem('wildpulse_p1_inventory', JSON.stringify(window.p1Inventory));
    });

    // Press Enter to bypass intro
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1000); // Intro fade out
  });

  test('should show chest button inside home and manage universal storage', async ({ page }) => {
    await page.evaluate(() => {
        window.playerVx = 0;
        window.playerVy = 0;
        window.p1x = 57900;
        window.p1y = 57900;
        // Mock home boundaries to ensure isPlayerInsideHome passes
        window.isPlayerInsideHome = (playerNum) => true;
        window.p1HomeCenter = { x: 57900, y: 57900 };
        // Set the inventory again explicitly before modal open
        window.p1Inventory = [
          { name: 'HP Booster', quantity: 2 },
          { name: 'Attack Booster', quantity: 1 }
        ];
    });
    // Wait for game loop to settle
    await page.waitForTimeout(1000);

    // Open inventory wheel directly using display flex since some modals ignore logic if UI isn't ready
    await page.evaluate(() => {
        document.getElementById('inventoryWheelModal').style.display = 'flex';
        window.updateInventoryWheelUI(1);
    });
    await page.waitForSelector('#inventoryWheelModal', { state: 'visible' });

    // Verify Chest button is visible and Close button is hidden
    const p1Col = page.locator('#inventoryWheelModal .p1-col');
    await expect(p1Col.locator('[data-option="chest"]')).toBeVisible();
    await expect(p1Col.locator('[data-option="close"]')).toBeHidden();

    // Click chest button
    await page.evaluate(() => window.useInventoryWheelOption(1, 'chest'));

    // Ensure chest modal opens
    await page.waitForSelector('#storageChestModal', { state: 'visible' });

    // Verify inventory items are loaded in the chest modal
    const p1ChestInvContainer = page.locator('#p1ChestInvContainer');
    await expect(p1ChestInvContainer.locator('text=HP Booster')).toBeVisible();

    // Deposit an item
    await page.evaluate(() => window.depositItemIntoChest(1, 0));
    await page.waitForTimeout(100);

    // Verify item is now in chest slots
    const p1ChestSlotsContainer = page.locator('#p1ChestSlotsContainer');
    await expect(p1ChestSlotsContainer.locator('text=HP Booster')).toBeVisible();

    // Verify the universal storage is updated
    const savedStorage = await page.evaluate(() => JSON.parse(localStorage.getItem('wildpulse_p1_home_storage')));
    expect(savedStorage.length).toBe(1);
    expect(savedStorage[0].name).toBe('HP Booster');
    expect(savedStorage[0].quantity).toBe(1);

    // Withdraw the item
    await page.evaluate(() => window.withdrawItemFromChest(1, 0));
    await page.waitForTimeout(100);

    const savedStorageAfterWithdraw = await page.evaluate(() => JSON.parse(localStorage.getItem('wildpulse_p1_home_storage')));
    expect(savedStorageAfterWithdraw.length).toBe(0);
  });
});
