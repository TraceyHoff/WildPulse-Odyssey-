const { test, expect } = require('@playwright/test');

test.describe('Simultaneous Battle Highlights & Turn-based Actions', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      if (!sessionStorage.getItem('wildpulse_started_once')) {
        localStorage.clear();
        sessionStorage.setItem('wildpulse_skip_start_modal', 'true');
        sessionStorage.setItem('wildpulse_started_once', 'true');
      }
    });
    await page.goto('http://localhost:3000');
    await page.waitForFunction(() => window.gameStarted === true);
  });

  test('should allow both players to navigate simultaneously and have separate outlines, while strictly enforcing turn limits', async ({ page }) => {
    // 1. Initialize co-op mode with healthy creatures
    await page.evaluate(() => {
      window.coopActive = true;
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

    // 2. Trigger Cooperative Dual Battle
    await page.evaluate(() => {
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

    // 3. Verify both players have battleModal as their active container
    const activeP1ContainerId = await page.evaluate(() => window.getActiveContainerForPlayer(1)?.id);
    const activeP2ContainerId = await page.evaluate(() => window.getActiveContainerForPlayer(2)?.id);
    expect(activeP1ContainerId).toBe('battleModal');
    expect(activeP2ContainerId).toBe('battleModal');

    // 4. Highlight different buttons simultaneously
    await page.evaluate(() => {
      const attackBtn = document.querySelector('#battleModal .btn-attack');
      const swapBtn = document.querySelector('#battleModal .btn-swap');

      // Simulate player 1 focusing on Attack and player 2 focusing on Swap
      attackBtn.classList.add('gamepad-focused-p1');
      swapBtn.classList.add('gamepad-focused-p2');
    });

    // Verify both outlines are active simultaneously
    const hasP1Highlight = await page.locator('#battleModal .btn-attack').evaluate(el => el.classList.contains('gamepad-focused-p1'));
    const hasP2Highlight = await page.locator('#battleModal .btn-swap').evaluate(el => el.classList.contains('gamepad-focused-p2'));
    expect(hasP1Highlight).toBe(true);
    expect(hasP2Highlight).toBe(true);

    // 5. Verify turn-based action blocking (P1 turn, so P2 should be blocked)
    const turnBefore = await page.evaluate(() => window.dualBattleTurn);
    expect(turnBefore).toBe(1);

    // Get viewport details from the page
    const viewport = await page.viewportSize();
    const width = viewport ? viewport.width : 1280;
    const height = viewport ? viewport.height : 720;

    // Attempt Player 2 click via synthetic mouse click at the right half of the screen (coop P2 clientX >= half-width)
    await page.mouse.click(width - 100, height / 2);

    // Verify turn did not change
    const turnAfterBlockedP2 = await page.evaluate(() => window.dualBattleTurn);
    expect(turnAfterBlockedP2).toBe(1);

    // Now, Player 1 performs their turn action
    await page.evaluate(() => {
      window.handlePlayerTurn('attack');
    });

    // Verify turn shifts to Player 2
    const turnAfterP1 = await page.evaluate(() => window.dualBattleTurn);
    expect(turnAfterP1).toBe(2);

    // 6. Attempt Player 1 action during Player 2's turn, which should be blocked
    await page.evaluate(() => {
      // Simulate P1 trying to click 'attack'
      window.isExecutingGamepadClick = 1;
      const attackBtn = document.querySelector('#battleModal .btn-attack');
      attackBtn.click();
      window.isExecutingGamepadClick = null;
    });

    // Verify turn did not change and is still Player 2's turn
    const turnAfterBlockedP1 = await page.evaluate(() => window.dualBattleTurn);
    expect(turnAfterBlockedP1).toBe(2);
  });
});
