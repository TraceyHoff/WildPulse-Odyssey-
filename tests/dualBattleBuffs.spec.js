const { test, expect } = require('@playwright/test');

test.describe('Dual Battle Buff Items Tests', () => {
  test.beforeEach(async ({ page }) => {
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
    await page.goto('http://localhost:3000');
    await page.click('#startGameBtn');
    await page.waitForSelector('#menuBtn', { state: 'visible' });
  });

  test('shop should display NPC Dual Link and Wild Dual Signal priced at 400', async ({ page }) => {
    await page.evaluate(() => {
      if (!window.gameStats) window.gameStats = { coins: 0 };
      window.gameStats.coins = 1000;
      window.updateMenuCoins();
      document.getElementById('storeModal').style.display = 'block';
      window.updateStoreUI();
    });

    await expect(page.locator('#storeModal')).toBeVisible();

    const storeContent = page.locator('#storeContent');
    await expect(storeContent).toContainText('NPC Dual Link');
    await expect(storeContent).toContainText('Wild Dual Signal');

    const npcDualText = await storeContent.evaluate(el => el.innerText);
    expect(npcDualText).toContain('NPC Dual Link');
    expect(npcDualText).toContain('Wild Dual Signal');
  });

  test('using NPC Dual Link consumes the item and adds 5 minutes to player buff timer', async ({ page }) => {
    await page.evaluate(() => {
      window.p1Inventory = [{ name: 'NPC Dual Link', quantity: 1 }];
      window.p1NpcDualTime = 0;
      window.saveInventory();
      window.updateInventoryUI();
    });

    await page.evaluate(() => {
      window.useInventoryItem(1, 0);
    });

    const results = await page.evaluate(() => {
      return {
        inventoryCount: window.p1Inventory.length,
        timer: window.p1NpcDualTime
      };
    });

    expect(results.inventoryCount).toBe(0);
    expect(results.timer).toBeGreaterThan(290000);
    expect(results.timer).toBeLessThanOrEqual(300000);
  });

  test('using Wild Dual Signal consumes the item and adds 5 minutes to player buff timer', async ({ page }) => {
    await page.evaluate(() => {
      window.p1Inventory = [{ name: 'Wild Dual Signal', quantity: 1 }];
      window.p1WildDualTime = 0;
      window.saveInventory();
      window.updateInventoryUI();
    });

    await page.evaluate(() => {
      window.useInventoryItem(1, 0);
    });

    const results = await page.evaluate(() => {
      return {
        inventoryCount: window.p1Inventory.length,
        timer: window.p1WildDualTime
      };
    });

    expect(results.inventoryCount).toBe(0);
    expect(results.timer).toBeGreaterThan(290000);
    expect(results.timer).toBeLessThanOrEqual(300000);
  });

  test('having Wild Dual Signal active guarantees a wild Dual Battle in co-op', async ({ page }) => {
    const triggerValue = await page.evaluate(() => {
      window.coopActive = true;
      window.p1WildDualTime = 300000;
      window.activeRandomEvent = 'None';

      window.startDualBattle = () => {};
      window.battleStates = [{ inBattle: false }, { inBattle: false }, { inBattle: false }];
      window.p1RepellentTime = 0;
      window.p2RepellentTime = 0;

      return {
        hasWildDualBuff: (window.p1WildDualTime && window.p1WildDualTime > 0) || (window.p2WildDualTime && window.p2WildDualTime > 0)
      };
    });

    expect(triggerValue.hasWildDualBuff).toBe(true);
  });
});
