const { test, expect } = require('@playwright/test');

test.describe('Creature License and ExPALL updates', () => {
  test.beforeEach(async ({ page }) => {
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
    await page.goto('http://localhost:3000');
    await page.click('#startGameBtn');
    await page.waitForSelector('#menuBtn', { state: 'visible' });
  });

  test('starting inventory should contain 1 Creature License', async ({ page }) => {
    const inv = await page.evaluate(() => {
      return {
        p1: window.p1Inventory,
        p2: window.p2Inventory
      };
    });

    expect(inv.p1).toBeDefined();
    expect(inv.p2).toBeDefined();

    const p1License = inv.p1.find(i => i.name === 'Creature License');
    const p2License = inv.p2.find(i => i.name === 'Creature License');

    expect(p1License).toBeDefined();
    expect(p1License.quantity).toBe(1);

    expect(p2License).toBeDefined();
    expect(p2License.quantity).toBe(1);
  });

  test('shop should display updated ExPALL price (250) and new Creature License (175)', async ({ page }) => {
    await page.evaluate(() => {
      if (!window.gameStats) window.gameStats = { coins: 0 };
      window.gameStats.coins = 500;
      window.updateMenuCoins();
      document.getElementById('storeModal').style.display = 'block';
      window.updateStoreUI();
    });

    await expect(page.locator('#storeModal')).toBeVisible();

    const storeContent = page.locator('#storeContent');
    await expect(storeContent).toContainText('ExPALL');
    await expect(storeContent).toContainText('250');
    await expect(storeContent).toContainText('Creature License');
    await expect(storeContent).toContainText('175');
  });

  test('Creature License cannot be used directly like healing juice', async ({ page }) => {
    // We will place Creature License in slot 0 of Player 1's inventory
    await page.evaluate(() => {
      window.p1Inventory = [{ name: 'Creature License', quantity: 1 }];
      window.saveInventory();
      window.updateInventoryUI();
    });

    // Try to use it
    await page.evaluate(() => {
      window.useInventoryItem(1, 0);
    });

    // Verify it is not consumed (still exists in inventory)
    const invCount = await page.evaluate(() => {
      return window.p1Inventory.length;
    });
    expect(invCount).toBe(1);

    const licenseQty = await page.evaluate(() => {
      const item = window.p1Inventory[0];
      return item ? item.quantity : 0;
    });
    expect(licenseQty).toBe(1);
  });

  test('Creature License boosts capture rate and is consumed only on successful catch', async ({ page }) => {
    // Setup player with 1 Creature License
    await page.evaluate(() => {
      window.p1Inventory = [{ name: 'Creature License', quantity: 1 }];
      window.saveInventory();
      window.updateInventoryUI();

      // Setup a mock battle state
      window.inBattle = true;
      window.activeBattlePlayer = 1;
      window.currentEnemy = {
        name: 'Phoenix',
        currentHp: 100, // At full health, catch chance is very low (around 15%)
        maxHp: 100
      };
      window.currentPlayer = {
        name: 'Firestarter',
        currentHp: 100,
        maxHp: 100,
        stats: { attack: 50, defense: 50, speed: 50, specialAttack: 50, specialDefense: 50, health: 100 },
        level: 5
      };
      // Keep a battle log array or container
      window.battleLog = [];
    });

    // Scenario A: Catch Fails
    // Force Math.random() to return 0.99 (fails catching since 99 > 15)
    await page.evaluate(() => {
      const origRandom = Math.random;
      Math.random = () => 0.99; // very high value to trigger catch failure
      window.doPlayerAction('catch', () => {});
      Math.random = origRandom; // Restore immediately since doPlayerAction evaluates catch synchronously
    });

    // Verify Creature License is NOT consumed on catch failure
    let inv = await page.evaluate(() => window.p1Inventory);
    let license = inv.find(i => i.name === 'Creature License');
    expect(license).toBeDefined();
    expect(license.quantity).toBe(1);

    // Scenario B: Catch Succeeds
    // Force Math.random() to return 0.0 (guarantees catch success)
    await page.evaluate(() => {
      const origRandom = Math.random;
      Math.random = () => 0.0; // guarantees catch success
      window.doPlayerAction('catch', () => {});
      Math.random = origRandom; // Restore immediately
    });

    // Verify Creature License IS consumed on catch success
    inv = await page.evaluate(() => window.p1Inventory);
    license = inv.find(i => i.name === 'Creature License');
    expect(license).toBeUndefined(); // Spliced from inventory because quantity became 0
  });
});
