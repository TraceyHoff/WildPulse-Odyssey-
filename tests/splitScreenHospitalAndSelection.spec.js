const { test, expect } = require('@playwright/test');

test.describe('Split-Screen Hospital Heal Notification and Creature Selection Overlay', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.clear();
      sessionStorage.setItem('wildpulse_skip_start_modal', 'true');
    });
    await page.goto('http://localhost:3000');
    // Wait for the game to start and players/creatures to initialize
    await page.waitForFunction(() => window.gameStarted === true);
  });

  test('hospital heal should heal Player 2 and display notification on Player 2s side (left: 75%)', async ({ page }) => {
    // 1. Enable co-op
    await page.evaluate(() => {
      const scene = window.game.scene.scenes[0];
      if (window.enableCoop) window.enableCoop(scene);
    });

    await page.waitForTimeout(500);

    // 2. Set Player 2 starting creature currentHp to 1 (it needs healing)
    await page.evaluate(() => {
      if (window.collectedCreatures2 && window.collectedCreatures2.length > 0) {
        window.collectedCreatures2[0].currentHp = 1;
        localStorage.setItem('wildpulse_collected_creatures2', JSON.stringify(window.collectedCreatures2));
      }
    });

    // 3. Teleport Player 2 to hospital tile coordinates to trigger overlap/heal
    await page.evaluate(() => {
      if (window.player2) {
        window.player2.x = 10050;
        window.player2.y = 10050;
      }
    });

    // Wait for overlap detection and healing frame
    await page.waitForTimeout(1000);

    // 4. Assert Player 2 starter creature is fully healed
    const p2Healed = await page.evaluate(() => {
      const p2Starter = window.collectedCreatures2[0];
      const maxHp = window.getEffectiveStat(p2Starter, 'health');
      return p2Starter.currentHp === maxHp;
    });
    expect(p2Healed).toBe(true);

    // 5. Assert notification is visible and positioned on Player 2's side (left: 75%)
    const notificationStyle = await page.evaluate(() => {
      const el = document.getElementById('modernNotification');
      return el ? {
        opacity: el.style.opacity,
        left: el.style.left,
        text: el.innerText
      } : null;
    });

    expect(notificationStyle).not.toBeNull();
    expect(notificationStyle.opacity).toBe('1');
    expect(notificationStyle.left).toBe('75%');
    expect(notificationStyle.text).toContain('fully healed');
  });

  test('hospital heal should heal Player 1 and display notification on Player 1s side (left: 25%)', async ({ page }) => {
    // 1. Enable co-op
    await page.evaluate(() => {
      const scene = window.game.scene.scenes[0];
      if (window.enableCoop) window.enableCoop(scene);
    });

    await page.waitForTimeout(500);

    // 2. Set Player 1 starting creature currentHp to 1 (it needs healing)
    await page.evaluate(() => {
      if (window.collectedCreatures && window.collectedCreatures.length > 0) {
        window.collectedCreatures[0].currentHp = 1;
        localStorage.setItem('wildpulse_collected_creatures', JSON.stringify(window.collectedCreatures));
      }
    });

    // 3. Teleport Player 1 to hospital tile coordinates to trigger overlap/heal
    await page.evaluate(() => {
      if (window.player) {
        window.player.x = 10050;
        window.player.y = 10050;
      }
    });

    // Wait for overlap detection and healing frame
    await page.waitForTimeout(1000);

    // 4. Assert Player 1 starter creature is fully healed
    const p1Healed = await page.evaluate(() => {
      const p1Starter = window.collectedCreatures[0];
      const maxHp = window.getEffectiveStat(p1Starter, 'health');
      return p1Starter.currentHp === maxHp;
    });
    expect(p1Healed).toBe(true);

    // 5. Assert notification is visible and positioned on Player 1's side (left: 25%)
    const notificationStyle = await page.evaluate(() => {
      const el = document.getElementById('modernNotification');
      return el ? {
        opacity: el.style.opacity,
        left: el.style.left,
        text: el.innerText
      } : null;
    });

    expect(notificationStyle).not.toBeNull();
    expect(notificationStyle.opacity).toBe('1');
    expect(notificationStyle.left).toBe('25%');
    expect(notificationStyle.text).toContain('fully healed');
  });

  test('creature selection overlay should cover only that players side in co-op', async ({ page }) => {
    // 1. Enable co-op
    await page.evaluate(() => {
      const scene = window.game.scene.scenes[0];
      if (window.enableCoop) window.enableCoop(scene);
    });

    await page.waitForTimeout(500);

    // 2. Trigger promptCreatureSelection for Player 1
    await page.evaluate(() => {
      window.promptCreatureSelection(1, "Select for P1", () => {});
    });

    await page.waitForTimeout(200);

    // Verify Player 1's selection modal dimensions and position
    const p1OverlayDimensions = await page.evaluate(() => {
      // Find the created overlay div (zIndex: 300000)
      const overlays = Array.from(document.querySelectorAll('div')).filter(d => d.style.zIndex === '300000');
      if (overlays.length === 0) return null;
      const el = overlays[0];
      return {
        width: el.style.width,
        left: el.style.left
      };
    });

    expect(p1OverlayDimensions).not.toBeNull();
    expect(p1OverlayDimensions.width).toBe('50vw');
    expect(p1OverlayDimensions.left).toBe('0px');

    // Clean up P1 modal
    await page.evaluate(() => {
      const overlays = Array.from(document.querySelectorAll('div')).filter(d => d.style.zIndex === '300000');
      overlays.forEach(o => o.parentNode.removeChild(o));
    });

    // 3. Trigger promptCreatureSelection for Player 2
    await page.evaluate(() => {
      window.promptCreatureSelection(2, "Select for P2", () => {});
    });

    await page.waitForTimeout(200);

    // Verify Player 2's selection modal dimensions and position
    const p2OverlayDimensions = await page.evaluate(() => {
      const overlays = Array.from(document.querySelectorAll('div')).filter(d => d.style.zIndex === '300000');
      if (overlays.length === 0) return null;
      const el = overlays[0];
      return {
        width: el.style.width,
        left: el.style.left
      };
    });

    expect(p2OverlayDimensions).not.toBeNull();
    expect(p2OverlayDimensions.width).toBe('50vw');
    expect(p2OverlayDimensions.left).toBe('50vw');
  });
});
