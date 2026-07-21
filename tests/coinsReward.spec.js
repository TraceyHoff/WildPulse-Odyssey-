const { test, expect } = require('@playwright/test');

test.describe('Coins Reward System', () => {
  test.beforeEach(async ({ page }) => {
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
    await page.goto('http://localhost:3000');
  });

  test('should default player 1 and player 2 coins to 0', async ({ page }) => {
    const defaultCoins = await page.evaluate(() => {
      return {
        p1Coins: window.gameStats.coins,
        p2Coins: window.gameStats2.coins
      };
    });
    expect(defaultCoins.p1Coins).toBe(0);
    expect(defaultCoins.p2Coins).toBe(0);
  });

  test('should correctly display coins inside the menu modal', async ({ page }) => {
    // Open menu modal
    await page.evaluate(() => {
      window.openMenuModal(1);
    });

    const p1CoinsText = await page.locator('#p1CoinsCount').innerText();
    const p2CoinsText = await page.locator('#p2CoinsCount').innerText();

    expect(p1CoinsText).toBe('0');
    expect(p2CoinsText).toBe('0');
  });

  test('should award coins on wild creature win and scale/cap correctly', async ({ page }) => {
    const results = await page.evaluate(async () => {
      try {
        // Mock currentPlayer and currentEnemy for battle ending logic
        window.currentPlayer = { id: 'p1_1', currentHp: 50, stats: { health: 100 } };
        // Ensure there is at least one creature in collectedCreatures for activeCreature mock
        window.collectedCreatures = [{ id: 'p1_1', currentHp: 50, stats: { health: 100 } }];
        window.collectedCreatures2 = [{ id: 'p2_1', currentHp: 50, stats: { health: 100 } }];

        // Let's test a Level 1 wild creature win for P1
        window.activeBattlePlayer = 1;
        window.currentEnemy = { id: 'e1', level: 1, currentHp: 0, stats: { health: 100 } };
        window.isPvpBattle = false;
        window.isLocalPvp = false;

        window.endBattle('win');
        await new Promise(resolve => setTimeout(resolve, 1600));
        const coinsLvl1 = window.gameStats.coins; // 20 + 2*1 = 22

        // Let's test a Level 50 wild creature win for P1
        window.currentEnemy = { id: 'e2', level: 50, currentHp: 0, stats: { health: 100 } };
        window.endBattle('win');
        await new Promise(resolve => setTimeout(resolve, 1600));
        const coinsLvl50 = window.gameStats.coins - coinsLvl1; // 20 + 2*50 = 120

        // Let's test a Level 150 wild creature win for P1 (should cap at 260)
        window.currentEnemy = { id: 'e3', level: 150, currentHp: 0, stats: { health: 100 } };
        window.endBattle('win');
        await new Promise(resolve => setTimeout(resolve, 1600));
        const coinsLvl150 = window.gameStats.coins - coinsLvl1 - coinsLvl50; // min(260, 20 + 2*150 = 320) = 260

        // Let's test wild creature win for Player 2
        window.activeBattlePlayer = 2;
        window.currentEnemy = { id: 'e4', level: 10, currentHp: 0, stats: { health: 100 } };
        window.endBattle('win');
        await new Promise(resolve => setTimeout(resolve, 1600));
        const p2CoinsLvl10 = window.gameStats2.coins; // 20 + 2*10 = 40

        return {
          coinsLvl1,
          coinsLvl50,
          coinsLvl150,
          p2CoinsLvl10,
          p1CoinsTotal: window.gameStats.coins,
          p2CoinsTotal: window.gameStats2.coins
        };
      } catch (e) {
        console.error('ERROR IN EVALUATE:', e.message, e.stack);
        throw e;
      }
    });

    expect(results.coinsLvl1).toBe(22);
    expect(results.coinsLvl50).toBe(120);
    expect(results.coinsLvl150).toBe(260);
    expect(results.p2CoinsLvl10).toBe(40);
    expect(results.p1CoinsTotal).toBe(22 + 120 + 260);
    expect(results.p2CoinsTotal).toBe(40);

    // Verify UI displays have been updated
    const p1CoinsText = await page.locator('#p1CoinsCount').innerText();
    const p2CoinsText = await page.locator('#p2CoinsCount').innerText();
    expect(parseInt(p1CoinsText, 10)).toBe(22 + 120 + 260);
    expect(parseInt(p2CoinsText, 10)).toBe(40);
  });

  test('should award 80 coins to Player 1 on online PvP battle win', async ({ page }) => {
    const p1Coins = await page.evaluate(async () => {
      try {
        window.gameStats.coins = 0;
        window.isPvpBattle = true;
        window.currentPlayer = { id: 'p1_1', currentHp: 50, stats: { health: 100 } };
        window.currentEnemy = { id: 'e1', level: 10, currentHp: 0, stats: { health: 100 } };
        window.collectedCreatures = [{ id: 'p1_1', currentHp: 50, stats: { health: 100 } }];
        window.endBattle('win');
        await new Promise(resolve => setTimeout(resolve, 1600));
        return window.gameStats.coins;
      } catch (e) {
        console.error('ERROR IN EVALUATE:', e.message);
        throw e;
      }
    });
    expect(p1Coins).toBe(80);
  });

  test('should award 80 coins correctly in local PvP battles', async ({ page }) => {
    const results = await page.evaluate(async () => {
      try {
        window.gameStats.coins = 0;
        window.gameStats2.coins = 0;
        window.collectedCreatures = [{ id: 'p1_1', currentHp: 50, stats: { health: 100 } }];
        window.collectedCreatures2 = [{ id: 'p2_1', currentHp: 50, stats: { health: 100 } }];

        // Player 1 wins
        window.isLocalPvp = true;
        window.currentPlayer = { id: 'p1_1', currentHp: 50, stats: { health: 100 } };
        window.currentEnemy = { id: 'e1', level: 10, currentHp: 0, stats: { health: 100 } };
        window.endBattle('win');
        await new Promise(resolve => setTimeout(resolve, 1600));
        const firstWinCoinsP1 = window.gameStats.coins;
        const firstWinCoinsP2 = window.gameStats2.coins;

        // Player 2 wins (loss for battle actor Player 1)
        window.isLocalPvp = true;
        window.currentPlayer = { id: 'p1_1', currentHp: 0, stats: { health: 100 } };
        window.currentEnemy = { id: 'e1', level: 10, currentHp: 50, stats: { health: 100 } };
        window.endBattle('loss');
        await new Promise(resolve => setTimeout(resolve, 1600));
        const secondWinCoinsP1 = window.gameStats.coins;
        const secondWinCoinsP2 = window.gameStats2.coins;

        return {
          firstWinCoinsP1,
          firstWinCoinsP2,
          secondWinCoinsP1,
          secondWinCoinsP2
        };
      } catch (e) {
        console.error('ERROR IN EVALUATE:', e.message);
        throw e;
      }
    });

    expect(results.firstWinCoinsP1).toBe(80);
    expect(results.firstWinCoinsP2).toBe(0);
    expect(results.secondWinCoinsP1).toBe(80);
    expect(results.secondWinCoinsP2).toBe(80);
  });
});
