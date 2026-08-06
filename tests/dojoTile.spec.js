const { test, expect } = require('@playwright/test');

test.describe('Dojo Tile and Dojo Leader Battle System', () => {
  test.beforeEach(async ({ page }) => {
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
    await page.goto('http://localhost:3000');

    // Dismiss start modal by clicking Single Player
    const startBtn = page.locator('#startGameBtn');
    if (await startBtn.isVisible()) {
      await startBtn.click();
    }
    // Dismiss onboarding intro modal if visible
    const introClose = page.locator('#introModal .close-btn');
    if (await introClose.isVisible()) {
      await introClose.click();
    }
  });

  test('should initially keep Dojo Tile locked in the store when not all trainers are defeated', async ({ page }) => {
    // Check if Dojo Tile is in the store when no trainers have been defeated
    await page.evaluate(() => {
      window.openStoreModal(1);
    });

    const isDojoTileVisible = await page.evaluate(() => {
      const storeItems = Array.from(document.querySelectorAll('#storeModal .p1-col .store-item-name'))
        .map(el => el.innerText.trim());
      return storeItems.includes('Dojo Tile');
    });

    expect(isDojoTileVisible).toBe(false);
  });

  test('should unlock Dojo Tile in the store when all 24 trainers have been defeated', async ({ page }) => {
    // Mock NPC trainers as defeated
    await page.evaluate(() => {
      const allData = {};
      for (let i = 1; i <= 24; i++) {
        const trainerId = 'npc_trainer_' + i;
        allData[trainerId] = {
          name: "Trainer_" + i,
          p1: { defeated: true, weekBattles: { 0: 1 }, lastBattleTimeMs: 12345 },
          p2: { defeated: true, weekBattles: {}, lastBattleTimeMs: 0 }
        };
      }
      localStorage.setItem('wildpulse_npc_trainer_data', JSON.stringify(allData));
    });

    // Reload page to reflect updated localStorage
    await page.reload();

    // Dismiss start modal after reload
    const startBtn = page.locator('#startGameBtn');
    if (await startBtn.isVisible()) {
      await startBtn.click();
    }
    const introClose = page.locator('#introModal .close-btn');
    if (await introClose.isVisible()) {
      await introClose.click();
    }

    // Verify hasDefeatedAllTrainers is true
    const hasDefeatedAll = await page.evaluate(() => {
      return window.hasDefeatedAllTrainers(1);
    });
    expect(hasDefeatedAll).toBe(true);

    // Open store modal
    await page.evaluate(() => {
      window.openStoreModal(1);
    });

    const isDojoTileVisible = await page.evaluate(() => {
      const storeItems = Array.from(document.querySelectorAll('#storeModal .p1-col div'))
        .map(el => el.innerText.trim());
      return storeItems.some(text => text.includes('Dojo Tile'));
    });

    expect(isDojoTileVisible).toBe(true);
  });

  test('should display proper itemIcons for Dojo Tile', async ({ page }) => {
    const itemIconsSupport = await page.evaluate(() => {
      // Create a temporary mock div to see if display works
      window.p1Inventory = [{ name: 'Dojo Tile', quantity: 1 }];
      window.updateInventoryUI();
      const slots = document.querySelectorAll('#p1InventorySlots .inventory-slot');
      return Array.from(slots).map(el => el.innerText.trim());
    });
    expect(itemIconsSupport.some(text => text.includes('⛩️'))).toBe(true);
  });

  test('should open dojo modal and start dojo battle with elite boss multiplier', async ({ page }) => {
    // Setup party for player
    await page.evaluate(() => {
      window.collectedCreatures = [
        { id: 'c1', name: 'Sparo', level: 10, currentHp: 100, stats: { health: 100, attack: 10, defense: 10, speed: 10, specialAttack: 10, specialDefense: 10 } }
      ];
      window.p1Level = 5;
    });

    // Open Dojo modal
    await page.evaluate(() => {
      window.openDojoModal(null, 1);
    });

    // Verify Dojo Modal elements
    const isDojoModalVisible = await page.locator('#dojoModal').isVisible();
    expect(isDojoModalVisible).toBe(true);

    const titleText = await page.locator('#dojoModal h2').innerText();
    expect(titleText).toBe('Dojo Leader');

    const initialTier = await page.locator('#dojoTierText').innerText();
    expect(initialTier).toBe('1');

    // Click "CHALLENGE LEADER" to start Dojo Battle
    await page.click('#startDojoBtn');

    const battleStatus = await page.evaluate(() => {
      return {
        inBattle: window.inBattle,
        inDojoBattle: window.inDojoBattle,
        enemyName: window.currentEnemy.name,
        enemyLevel: window.currentEnemy.level,
        enemyStats: { ...window.currentEnemy.stats }
      };
    });

    expect(battleStatus.inBattle).toBe(true);
    expect(battleStatus.inDojoBattle).toBe(true);
    // Dojo Level should be 20 + dojoTier * 5 = 20 + 5 = 25
    expect(battleStatus.enemyLevel).toBe(25);
  });

  test('should award coins and increment dojoTier upon Dojo victory', async ({ page }) => {
    const battleResult = await page.evaluate(async () => {
      window.gameStats = { coins: 0, battlesWon: 0, battlesLost: 0 };
      window.collectedCreatures = [
        { id: 'c1', name: 'Sparo', level: 10, currentHp: 100, stats: { health: 100, attack: 10, defense: 10, speed: 10, specialAttack: 10, specialDefense: 10 } }
      ];
      window.dojoTier = 1;
      window.inBattle = true;
      window.inDojoBattle = true;
      window.currentEnemy = { id: 'dojo_enemy', name: 'Sparo', level: 25, currentHp: 0, stats: { health: 100 } };

      // Simulate synchronous closing of battle modal
      window.pendingBattleResult = 'win';
      window.closeBattleModal();

      return {
        inDojoBattle: window.inDojoBattle,
        coinsAwarded: window.gameStats.coins,
        dojoTier: window.dojoTier
      };
    });

    // In Battle end, wasInDojo clears inDojoBattle flag
    expect(battleResult.inDojoBattle).toBe(false);
    // Coins awarded should be (200 + dojoTier * 20) * multiplier = (200 + 40) = 240
    expect(battleResult.coinsAwarded).toBe(240);
    expect(battleResult.dojoTier).toBe(2);
  });

  test('should block openDojoModal and startDojoBattle if not all trainers are defeated and not in automation', async ({ page }) => {
    // Setup party for player
    await page.evaluate(() => {
      window.collectedCreatures = [
        { id: 'c1', name: 'Sparo', level: 10, currentHp: 100, stats: { health: 100, attack: 10, defense: 10, speed: 10, specialAttack: 10, specialDefense: 10 } }
      ];
      window.p1Level = 5;
    });

    const blockResult = await page.evaluate(() => {
      // Temporarily override navigator.webdriver accessor for this test block
      Object.defineProperty(navigator, 'webdriver', {
        get: () => false,
        configurable: true
      });

      // Clear any trainer defeat data to ensure they are NOT all defeated
      localStorage.removeItem('wildpulse_npc_trainer_data');

      // Attempt to open Dojo Modal for player 1
      window.openDojoModal(null, 1);

      // Return whether the modal is visible and check block state
      return {
        displayStyle: document.getElementById('dojoModal').style.display,
        inBattle: window.inBattle,
        inDojoBattle: window.inDojoBattle
      };
    });

    // The modal should remain hidden (not display 'flex' or 'block')
    expect(blockResult.displayStyle).not.toBe('flex');
    expect(blockResult.displayStyle).not.toBe('block');
    expect(blockResult.inBattle).not.toBe(true);
    expect(blockResult.inDojoBattle).not.toBe(true);
  });
});
