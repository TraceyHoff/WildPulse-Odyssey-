const { test, expect } = require('@playwright/test');

test.describe('Hidden Grove Portal World Integration Tests', () => {
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

  test('should register custom otherworld grass and unique flora textures', async ({ page }) => {
    const textureCheck = await page.evaluate(() => {
      const scene = window.game.scene.scenes[0];
      const hasGrass = scene.textures.exists('floor_matrix');
      const hasFlora1 = scene.textures.exists('plant_astral_bloom');
      const hasFlora2 = scene.textures.exists('plant_void_tendril');
      const hasFlora3 = scene.textures.exists('plant_nebula_fern');
      const hasFlora4 = scene.textures.exists('plant_aurora_spore');
      return { hasGrass, hasFlora1, hasFlora2, hasFlora3, hasFlora4 };
    });

    expect(textureCheck.hasGrass).toBe(true);
    expect(textureCheck.hasFlora1).toBe(true);
    expect(textureCheck.hasFlora2).toBe(true);
    expect(textureCheck.hasFlora3).toBe(true);
    expect(textureCheck.hasFlora4).toBe(true);
  });

  test('should apply a much higher shiny rate of 30% inside the Hidden Grove Portal World', async ({ page }) => {
    const ratesCheck = await page.evaluate(() => {
      const scene = window.game.scene.scenes[0];
      const testCreature = window.baseCreatures[0];

      // Clear any existing creatures to ensure hasShinyOnMap is false
      if (window.creaturesGroup) {
        window.creaturesGroup.clear(true, true);
      }

      // Spawn outside coordinates (e.g. 500, 500)
      // We will temporarily override Math.random to measure probabilities deterministically or inspect calculations.
      const originalMulberry = window.mulberry32;
      let mockValue = 0.25; // 25% roll (which is < 30% but > 15% and > 0.1%)
      window.mulberry32 = () => () => mockValue;

      // Spawn outside Rift (should NOT be shiny at 0.25 roll because base chance is 0.1% or 15% with Jank Juice)
      const testOutside = window.spawnCreature(scene, testCreature, 500, 500, 9999);
      // Spawn inside Rift (coordinates e.g. 42050, 42050) (should BE shiny at 0.25 roll because base chance is 30%)
      const testInside = window.spawnCreature(scene, testCreature, 42050, 42050, 8888);

      // Restore
      window.mulberry32 = originalMulberry;

      // Filter children to find our spawned creatures
      const children = window.creaturesGroup.getChildren();
      const outsideObj = children.find(c => {
        const d = c.getData('creatureData');
        return d && d.id && d.id.includes("9999");
      });
      const insideObj = children.find(c => {
        const d = c.getData('creatureData');
        return d && d.id && d.id.includes("8888");
      });

      return {
        outsideShiny: outsideObj ? outsideObj.getData('creatureData').isShiny : null,
        insideShiny: insideObj ? insideObj.getData('creatureData').isShiny : null
      };
    });

    // Outside Rift with 0.25 roll should NOT be shiny
    expect(ratesCheck.outsideShiny).toBe(false);
    // Inside Rift with 0.25 roll should BE shiny (since shinyChance is 0.30)
    expect(ratesCheck.insideShiny).toBe(true);
  });
});
