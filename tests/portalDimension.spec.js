const { test, expect } = require('@playwright/test');

test.describe('Portal Dimension & Void Rift E2E Integration Tests', () => {
  test.beforeEach(async ({ page }) => {
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('PAGE ERROR LOG:', msg.text());
      }
    });
    page.on('pageerror', err => console.log('PAGE UNCAUGHT EXCEPTION:', err.message));

    // Seed player preferences to bypass initial character customization screen
    await page.addInitScript(() => {
      localStorage.setItem('wildpulse_player_color', '#FFFFFF');
      localStorage.setItem('wildpulse_player_pattern', 'None');
    });

    await page.goto('http://localhost:3000');

    // Click Single Player once start screen is fully loaded
    const startBtn = page.locator('#startGameBtn');
    await expect(startBtn).toBeVisible({ timeout: 15000 });
    await startBtn.click();

    // Settle Phaser game startup
    await page.waitForFunction(() => window.gameStarted === true, null, { timeout: 15000 });
  });

  test('should successfully render portals and teleport players to the Void Rift and back', async ({ page }) => {
    // 1. Force the portal system to be active (bypassing specific season/weather check for integration testing)
    await page.evaluate(() => {
      window.forcePortalActive = true;
    });

    // 2. Fetch the procedurally generated portal coordinates from the active room seed
    const portalCoords = await page.evaluate(() => window.portalCoords);
    expect(portalCoords).toBeDefined();
    expect(portalCoords.length).toBeGreaterThan(0);

    const firstPortal = portalCoords[0];
    console.log(`First procedural portal is at Row: ${firstPortal.r}, Col: ${firstPortal.c}`);

    // Convert row/col to physical pixel coordinates: posX = c * 100 + 50, posY = r * 100 + 50
    const portalX = firstPortal.c * 100 + 50;
    const portalY = firstPortal.r * 100 + 50;

    // 3. Teleport player directly onto the portal location
    await page.evaluate(({ px, py }) => {
      window.pointerTarget = null;
      if (window.player.body) {
        window.player.body.setVelocity(0, 0);
      }
      window.player.setPosition(px, py);
      if (window.player.body) {
        window.player.body.updateFromGameObject();
      }
    }, { px: portalX, py: portalY });

    // Wait a brief moment to allow overlap detection to execute
    await page.waitForTimeout(300);

    // Stop any ongoing movement/velocity inside the Void Rift
    await page.evaluate(() => {
      window.pointerTarget = null;
      if (window.player.body) {
        window.player.body.setVelocity(0, 0);
      }
    });

    // 4. Verify that Player 1 has been transported inside the 40x40 Void Rift centered around (420, 420)
    const afterPortalPos = await page.evaluate(() => {
      return { x: window.player.x, y: window.player.y };
    });

    // The center inside the Void Rift is at Row 420, Col 420 -> X=42050, Y=42050
    expect(afterPortalPos.x).toBe(420 * 100 + 50);
    expect(afterPortalPos.y).toBe(420 * 100 + 50);

    // 5. Now teleport the player directly onto the Return Portal inside the Void Rift at Row 420, Col 420
    const returnPortalX = 420 * 100 + 50;
    const returnPortalY = 420 * 100 + 50;

    // Set lastPortalOverlapTime to 0 to bypass reentry throttling cooldown and move player slightly to force overlap re-evaluation
    await page.evaluate(() => {
      window.player.lastPortalOverlapTime = 0;
      window.player.x += 1;
      if (window.player.body) {
        window.player.body.updateFromGameObject();
      }
    });

    // Wait a brief moment for return overlap detection to trigger
    await page.waitForTimeout(300);

    // 6. Verify that the player returned safely to their original pre-portal coordinates
    const finalPos = await page.evaluate(() => {
      return { x: window.player.x, y: window.player.y };
    });

    expect(finalPos.x).toBe(portalX);
    expect(finalPos.y).toBe(portalY);
  });
});
