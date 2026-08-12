const { test, expect } = require('@playwright/test');

test.describe('Dynamic Seasonal Plant System Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to page, setup state
    await page.goto('http://localhost:3000');
    await page.evaluate(() => {
      localStorage.setItem('wildpulse_player_color', '#FFFFFF');
      localStorage.setItem('wildpulse_p1_level', '7');
    });
    await page.reload();

    // Dismiss start modal by clicking Start Game after loading screen finishes
    const startBtn = page.locator('#startGameBtn');
    await startBtn.waitFor({ state: 'visible', timeout: 30000 });
    await startBtn.click();

    // Wait for the game to fully start and initialize
    await page.waitForFunction(() => window.gameStarted);
  });

  test('should dynamically wither and fade plants to dead state in winter', async ({ page }) => {
    const winterResults = await page.evaluate(() => {
      const scene = window.game.scene.scenes[0];

      // Create a mock plant and its shadow
      const shadow = scene.add.sprite(0, 0, 'plant_cyber_fern');
      const plant = scene.add.sprite(0, 0, 'plant_cyber_fern');
      plant.plantType = 'plant_cyber_fern';
      plant.shadowSprite = shadow;

      window.currentSeason = 'Winter';

      // Early winter (e.g. day 0, hour 0)
      window.wildpulse_inGameDays = 0;
      window.dayNightTime = 0;
      window.updatePlantVisualState(plant);
      const earlyWinter = {
        plantAlpha: plant.alpha,
        plantScaleX: plant.scaleX,
        plantVisible: plant.visible,
        shadowAlpha: shadow.alpha,
        shadowScaleX: shadow.scaleX,
        shadowVisible: shadow.visible
      };

      // Mid winter (e.g. day 12, hour 0 - i.e. 40% through winter)
      window.wildpulse_inGameDays = 12;
      window.dayNightTime = 0;
      window.updatePlantVisualState(plant);
      const midWinter = {
        plantAlpha: plant.alpha,
        plantScaleX: plant.scaleX,
        plantVisible: plant.visible,
        shadowAlpha: shadow.alpha,
        shadowScaleX: shadow.scaleX,
        shadowVisible: shadow.visible
      };

      // Late winter (e.g. day 24, hour 0 - i.e. 80% through winter, should be dead/invisible)
      window.wildpulse_inGameDays = 24;
      window.dayNightTime = 0;
      window.updatePlantVisualState(plant);
      const lateWinter = {
        plantAlpha: plant.alpha,
        plantScaleX: plant.scaleX,
        plantVisible: plant.visible,
        shadowAlpha: shadow.alpha,
        shadowScaleX: shadow.scaleX,
        shadowVisible: shadow.visible
      };

      // Cleanup mock sprites
      shadow.destroy();
      plant.destroy();

      return { earlyWinter, midWinter, lateWinter };
    });

    // In early winter: alpha is around 1.0, scale is around 0.8 (full size)
    expect(winterResults.earlyWinter.plantAlpha).toBeCloseTo(1.0, 1);
    expect(winterResults.earlyWinter.plantScaleX).toBeCloseTo(0.8, 1);
    expect(winterResults.earlyWinter.plantVisible).toBe(true);
    expect(winterResults.earlyWinter.shadowAlpha).toBeCloseTo(0.2, 1);
    expect(winterResults.earlyWinter.shadowVisible).toBe(true);

    // In mid winter: plant has withered partially (alpha < 1.0, scale < 0.8)
    expect(winterResults.midWinter.plantAlpha).toBeLessThan(1.0);
    expect(winterResults.midWinter.plantScaleX).toBeLessThan(0.8);
    expect(winterResults.midWinter.shadowAlpha).toBeLessThan(0.2);

    // In late winter: plant is fully dead/invisible (alpha = 0, visible = false)
    expect(winterResults.lateWinter.plantAlpha).toBe(0);
    expect(winterResults.lateWinter.plantVisible).toBe(false);
    expect(winterResults.lateWinter.shadowVisible).toBe(false);
  });

  test('should dynamically regrow plants in spring', async ({ page }) => {
    const springResults = await page.evaluate(() => {
      const scene = window.game.scene.scenes[0];

      // Create a mock plant and its shadow
      const shadow = scene.add.sprite(0, 0, 'plant_cyber_fern');
      const plant = scene.add.sprite(0, 0, 'plant_cyber_fern');
      plant.plantType = 'plant_cyber_fern';
      plant.shadowSprite = shadow;

      window.currentSeason = 'Spring';

      // Early Spring (day 0, hour 0 - i.e., progress = 0.0)
      window.wildpulse_inGameDays = 0;
      window.dayNightTime = 0;
      window.updatePlantVisualState(plant);
      const earlySpring = {
        plantAlpha: plant.alpha,
        plantScaleX: plant.scaleX,
        plantVisible: plant.visible,
        shadowScaleX: shadow.scaleX
      };

      // Mid Spring (day 15, hour 0 - i.e., progress = 0.5)
      window.wildpulse_inGameDays = 15;
      window.dayNightTime = 0;
      window.updatePlantVisualState(plant);
      const midSpring = {
        plantAlpha: plant.alpha,
        plantScaleX: plant.scaleX,
        plantVisible: plant.visible,
        shadowScaleX: shadow.scaleX
      };

      // Late Spring (day 29, hour 23 - i.e., progress ≈ 1.0)
      window.wildpulse_inGameDays = 29;
      window.dayNightTime = 23;
      window.updatePlantVisualState(plant);
      const lateSpring = {
        plantAlpha: plant.alpha,
        plantScaleX: plant.scaleX,
        plantVisible: plant.visible,
        shadowScaleX: shadow.scaleX
      };

      // Cleanup mock sprites
      shadow.destroy();
      plant.destroy();

      return { earlySpring, midSpring, lateSpring };
    });

    // Early Spring: very small scale, starting to fade in
    expect(springResults.earlySpring.plantAlpha).toBeCloseTo(0.0, 1);
    expect(springResults.earlySpring.plantScaleX).toBeCloseTo(0.16, 1); // 0.8 * 0.2

    // Mid Spring: partially grown
    expect(springResults.midSpring.plantAlpha).toBe(1.0);
    expect(springResults.midSpring.plantScaleX).toBeCloseTo(0.48, 1); // 0.8 * (0.2 + 0.8 * 0.5)

    // Late Spring: fully grown
    expect(springResults.lateSpring.plantAlpha).toBe(1.0);
    expect(springResults.lateSpring.plantScaleX).toBeCloseTo(0.8, 1);
  });

  test('should tint plants correctly in Fall and clear tint in Summer', async ({ page }) => {
    const results = await page.evaluate(() => {
      const scene = window.game.scene.scenes[0];

      const shadow = scene.add.sprite(0, 0, 'plant_cyber_fern');
      const plant = scene.add.sprite(0, 0, 'plant_cyber_fern');
      plant.plantType = 'plant_cyber_fern';
      plant.shadowSprite = shadow;

      // Fall tint test
      window.currentSeason = 'Fall';
      window.updatePlantVisualState(plant);
      const isFallTinted = plant.isTinted;
      const fallTint = plant.tintTopLeft; // Top-left tint value

      // Summer clear tint test
      window.currentSeason = 'Summer';
      window.updatePlantVisualState(plant);
      const isSummerTinted = plant.isTinted;

      shadow.destroy();
      plant.destroy();

      return { isFallTinted, fallTint, isSummerTinted };
    });

    expect(results.isFallTinted).toBe(true);
    expect(results.fallTint).toBe(0xd2691e); // Rustic orange/amber tint
    expect(results.isSummerTinted).toBe(false);
  });
});
