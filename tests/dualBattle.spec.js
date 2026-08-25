const { test, expect } = require('@playwright/test');

test.describe('Cooperative Dual Battle Event', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      if (!sessionStorage.getItem('wildpulse_started_once')) {
        localStorage.clear();
        sessionStorage.setItem('wildpulse_skip_start_modal', 'true');
        sessionStorage.setItem('wildpulse_started_once', 'true');
      }
    });
    await page.goto('http://localhost:3000');
    // Wait for the game to start and players/creatures to initialize
    await page.waitForFunction(() => window.gameStarted === true);
  });

  test('should successfully roll and trigger Dual Battle event', async ({ page }) => {
    // 1. Turn on co-op mode
    await page.evaluate(() => {
        window.coopActive = true;
    });

    // 2. Mock rolling random events to choose 'Dual Battle'
    const eventResult = await page.evaluate(() => {
        window.activeRandomEvent = 'None';
        window.rollRandomEvent();
        return window.activeRandomEvent;
    });

    // The random event pool should be able to choose 'Dual Battle' (though randomized)
    // To ensure we can test it deterministically, let's force it
    await page.evaluate(() => {
        window.activeRandomEvent = 'Dual Battle';
        window.activeRandomEventEndTime = window.totalElapsedMs + 240000;
        window.activeRandomEventStartTime = window.totalElapsedMs; // Fake recent start

        // Inject fake bubble
        const container = document.getElementById('eventBubblesContainer');
        const bubble = document.createElement('div');
        bubble.className = 'event-bubble';
        bubble.dataset.source = 'random';
        bubble.dataset.color = '#ff007f';
        container.appendChild(bubble);

        window.updateEventBadgeUI();
    });

    const badge = page.locator('#activeEventBadge');
    await expect(badge).toBeVisible();
    await expect(badge).toContainText('Dual Battle Event!');

    const pct = await page.evaluate(() => {
        const bubble = document.querySelector('.event-bubble');
        return bubble.style.background;
    });
    expect(pct).toContain('conic-gradient');
  });

  test('should successfully initialize and execute a Cooperative Dual Battle round', async ({ page }) => {
    // 1. Turn on co-op mode and ensure both players have starter creatures
    await page.evaluate(() => {
        window.coopActive = true;
        // Make sure both have healthy party creatures
        if (window.collectedCreatures.length === 0) {
            window.collectedCreatures.push({
                id: 'p1_test',
                name: 'Volt-Pike',
                level: 5,
                currentHp: 40,
                maxHp: 40,
                type: 'Electric',
                color: '#ffeb3b',
                xp: 0
            });
        } else {
            window.collectedCreatures[0].currentHp = 40;
        }

        if (window.collectedCreatures2.length === 0) {
            window.collectedCreatures2.push({
                id: 'p2_test',
                name: 'Ember-Hound',
                level: 5,
                currentHp: 45,
                maxHp: 45,
                type: 'Fire',
                color: '#ff5722',
                xp: 0
            });
        } else {
            window.collectedCreatures2[0].currentHp = 45;
        }
    });

    // 2. Trigger the Dual Battle
    await page.evaluate(() => {
        // Mock a simple wild creature sprite
        const mockSprite = {
            getData: (key) => {
                return {
                    name: 'Wild Leaf-Sprite',
                    level: 5,
                    currentHp: 30,
                    maxHp: 30,
                    type: 'Nature',
                    color: '#81c784'
                };
            }
        };
        window.startDualBattle(window.player, mockSprite);
    });

    // 3. Verify the battle is initialized as Dual Battle
    const isDual = await page.evaluate(() => window.isDualBattle);
    expect(isDual).toBe(true);

    const isBattleModalVisible = await page.locator('#battleModal').isVisible();
    expect(isBattleModalVisible).toBe(true);

    // 4. Verify BOTH player HP bars exist in the Dual Battle DOM
    const p1HpBar = page.locator('#pHPBar');
    const p2HpBar = page.locator('#pHPBar2');
    await expect(p1HpBar).toBeVisible();
    await expect(p2HpBar).toBeVisible();

    // 5. Player 1 selects attack, shifts turn to Player 2
    let turnBefore = await page.evaluate(() => window.dualBattleTurn);
    expect(turnBefore).toBe(1);

    await page.evaluate(() => {
        window.handlePlayerTurn('attack');
    });

    let turnAfter = await page.evaluate(() => window.dualBattleTurn);
    expect(turnAfter).toBe(2);

    // 6. Player 2 selects attack, executes round
    await page.evaluate(() => {
        window.handlePlayerTurn('attack');
    });

    // Wait for the dual battle turn to reset to 1 after actions complete
    await page.waitForFunction(() => window.dualBattleTurn === 1, { timeout: 15000 });

    let turnAfterRound = await page.evaluate(() => window.dualBattleTurn);
    expect(turnAfterRound).toBe(1);
  });
});
