const { test, expect } = require('@playwright/test');

test.describe('Home Customization & Plant Life System Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to page, setup state
    await page.goto('http://localhost:3000');
    await page.evaluate(() => {
      localStorage.setItem('wildpulse_p1_home_x', '4500');
      localStorage.setItem('wildpulse_p1_home_y', '4500');
      localStorage.setItem('wildpulse_p1_level', '10');

      // Give Player 1 some mini tiles
      localStorage.setItem('wildpulse_p1_inventory', JSON.stringify([
        { name: "Storage Chest", quantity: 2, type: "MiniTile" }
      ]));
    });
    await page.reload();

    // Dismiss start modal by clicking Single Player after loading screen finishes
    const startBtn = page.locator('#startGameBtn');
    await startBtn.waitFor({ state: 'visible', timeout: 30000 });
    await startBtn.click();

    // Dismiss onboarding intro modal if visible
    const introClose = page.locator('#introModal .close-btn');
    if (await introClose.isVisible()) {
      await introClose.click();
    }

    // Wait for the game to fully start and initialize
    await page.waitForFunction(() => window.gameStarted);
  });

  test('should pre-generate custom floor, wall, and plant textures', async ({ page }) => {
    const texturesExist = await page.evaluate(() => {
      const scene = window.game.scene.scenes[0];
      return {
        floorRetro: scene.textures.exists('floor_retro_wood'),
        floorObsidian: scene.textures.exists('floor_obsidian_tech'),
        wallLog: scene.textures.exists('wall_wooden_log'),
        wallMatrix: scene.textures.exists('wall_hollow_matrix'),
        plantFern: scene.textures.exists('plant_cyber_fern'),
        plantRose: scene.textures.exists('plant_crystal_rose')
      };
    });

    expect(texturesExist.floorRetro).toBe(true);
    expect(texturesExist.floorObsidian).toBe(true);
    expect(texturesExist.wallLog).toBe(true);
    expect(texturesExist.wallMatrix).toBe(true);
    expect(texturesExist.plantFern).toBe(true);
    expect(texturesExist.plantRose).toBe(true);
  });

  test('should display "Design" option on Action Wheel inside home and toggle Home Designer Modal', async ({ page }) => {
    // 1. Move Player 1 inside their home
    await page.evaluate(() => {
      const pSprite = window.player;
      pSprite.setPosition(58250, 58250); // Inside P1 room
    });

    // 2. Open Action Wheel
    await page.evaluate(() => {
      window.openActionWheel(1);
    });

    // 3. Verify Design Option text is "🎨 DESIGN" (case insensitive / text-transform: uppercase)
    const designText = await page.locator('#actionWheelHome_p1').innerText();
    expect(designText.toUpperCase()).toBe('🎨 DESIGN');

    // 4. Click Design Option
    await page.locator('#actionWheelHome_p1').click();

    // 5. Modal #homeCustomizationModal should be visible
    const modalVisible = await page.locator('#homeCustomizationModal').isVisible();
    expect(modalVisible).toBe(true);
  });

  test('should change styles and instantly trigger rebuild and ambient light overlays', async ({ page }) => {
    // Move inside
    await page.evaluate(() => {
      window.player.setPosition(58250, 58250);
      window.openHomeCustomizationModal(1);
    });

    // Select different wall, floor, and lighting styles
    await page.locator('#homeWallStyleSelect_p1').selectOption('wooden_log');
    await page.locator('#homeFloorStyleSelect_p1').selectOption('retro_wood');
    await page.locator('#homeLightStyleSelect_p1').selectOption('pink');

    // Trigger onHomeStyleChange
    await page.evaluate(() => {
      window.onHomeStyleChange(1);
    });

    // Verify localStorage has saved the choices
    const savedWall = await page.evaluate(() => localStorage.getItem('wildpulse_p1_home_wall_style'));
    const savedFloor = await page.evaluate(() => localStorage.getItem('wildpulse_p1_home_floor_style'));
    const savedLight = await page.evaluate(() => localStorage.getItem('wildpulse_p1_home_light_style'));

    expect(savedWall).toBe('wooden_log');
    expect(savedFloor).toBe('retro_wood');
    expect(savedLight).toBe('pink');

    // Verify Ambient Light Overlay is created
    const overlayExists = await page.evaluate(() => !!window.p1AmbientOverlay);
    expect(overlayExists).toBe(true);
  });

  test('should enable placing mini-tiles inside home on floor tiles but block invalid placements', async ({ page }) => {
    // Walk inside
    await page.evaluate(() => {
      window.player.setPosition(58250, 58250);
    });

    // Mock mini tile placement mode for "Storage Chest"
    await page.evaluate(() => {
      window.p1MiniTilePlacementMode = "Storage Chest";
      window.p1MiniTileSlotIndex = 0;
    });

    // 1. Try placing inside room boundaries on floor (e.g. 582, 582 -> X: 58250, Y: 58250)
    const validPlacement = await page.evaluate(() => {
      window.tryPlaceMiniTile(1, 58250, 58250);
      return JSON.parse(localStorage.getItem('wildpulse_p1_mini_tiles')) || [];
    });

    expect(validPlacement.length).toBe(1);
    expect(validPlacement[0].type).toBe('storage_chest');

    // 2. Try placing outside room boundaries while player is inside (e.g. at 50000, 50000)
    await page.evaluate(() => {
      window.p1MiniTilePlacementMode = "Storage Chest";
      window.p1MiniTileSlotIndex = 0;
      window.tryPlaceMiniTile(1, 50000, 50000);
    });

    // Mini tiles count should still be 1 (because outside is blocked)
    const secondPlacement = await page.evaluate(() => {
      return (JSON.parse(localStorage.getItem('wildpulse_p1_mini_tiles')) || []).length;
    });
    expect(secondPlacement).toBe(1);
  });

  test('should pre-generate new dynamic plant textures and update visual state based on season and day/night time', async ({ page }) => {
    // 1. Verify that the new dynamic plant textures have been pre-generated successfully in Phaser
    const dynamicTexturesExist = await page.evaluate(() => {
      const scene = window.game.scene.scenes[0];
      return {
        bluebellBud: scene.textures.exists('plant_vernal_bluebell_bud'),
        bluebellBloom: scene.textures.exists('plant_vernal_bluebell_bloom'),
        sunflowerBud: scene.textures.exists('plant_solstice_sunflower_bud'),
        sunflowerBloom: scene.textures.exists('plant_solstice_sunflower_bloom'),
        lunaLotusClosed: scene.textures.exists('plant_luna_lotus_closed'),
        lunaLotusBloom: scene.textures.exists('plant_luna_lotus_bloom'),
        nightPhloxClosed: scene.textures.exists('plant_night_phlox_closed'),
        nightPhloxBloom: scene.textures.exists('plant_night_phlox_bloom')
      };
    });

    expect(dynamicTexturesExist.bluebellBud).toBe(true);
    expect(dynamicTexturesExist.bluebellBloom).toBe(true);
    expect(dynamicTexturesExist.sunflowerBud).toBe(true);
    expect(dynamicTexturesExist.sunflowerBloom).toBe(true);
    expect(dynamicTexturesExist.lunaLotusClosed).toBe(true);
    expect(dynamicTexturesExist.lunaLotusBloom).toBe(true);
    expect(dynamicTexturesExist.nightPhloxClosed).toBe(true);
    expect(dynamicTexturesExist.nightPhloxBloom).toBe(true);

    // 2. Verify window.updatePlantVisualState logic for seasonal and night-blooming plants
    const testVisualUpdates = await page.evaluate(() => {
      const scene = window.game.scene.scenes[0];
      const results = {};

      // Mock plant sprite with a linked shadow
      const mockShadow = scene.add.sprite(0, 0, 'plant_vernal_bluebell');
      const mockPlant = scene.add.sprite(0, 0, 'plant_vernal_bluebell');
      mockPlant.plantType = 'plant_vernal_bluebell';
      mockPlant.shadowSprite = mockShadow;

      // Spring season check
      window.currentSeason = 'Spring';
      window.updatePlantVisualState(mockPlant);
      results.bluebellInSpring = {
        plantKey: mockPlant.texture.key,
        shadowKey: mockShadow.texture.key
      };

      // Summer season check
      window.currentSeason = 'Summer';
      window.updatePlantVisualState(mockPlant);
      results.bluebellInSummer = {
        plantKey: mockPlant.texture.key,
        shadowKey: mockShadow.texture.key
      };

      // Mock a night-blooming plant
      const mockLotusShadow = scene.add.sprite(0, 0, 'plant_luna_lotus');
      const mockLotus = scene.add.sprite(0, 0, 'plant_luna_lotus');
      mockLotus.plantType = 'plant_luna_lotus';
      mockLotus.shadowSprite = mockLotusShadow;

      // Day time check
      window.dayNightTime = 12.0; // Noon
      window.updatePlantVisualState(mockLotus);
      results.lunaLotusInDay = {
        plantKey: mockLotus.texture.key,
        shadowKey: mockLotusShadow.texture.key
      };

      // Night time check
      window.dayNightTime = 23.0; // Night
      window.updatePlantVisualState(mockLotus);
      results.lunaLotusAtNight = {
        plantKey: mockLotus.texture.key,
        shadowKey: mockLotusShadow.texture.key
      };

      // Cleanup mock sprites
      mockShadow.destroy();
      mockPlant.destroy();
      mockLotusShadow.destroy();
      mockLotus.destroy();

      return results;
    });

    expect(testVisualUpdates.bluebellInSpring.plantKey).toBe('plant_vernal_bluebell_bloom');
    expect(testVisualUpdates.bluebellInSpring.shadowKey).toBe('plant_vernal_bluebell_bloom');

    expect(testVisualUpdates.bluebellInSummer.plantKey).toBe('plant_vernal_bluebell_bud');
    expect(testVisualUpdates.bluebellInSummer.shadowKey).toBe('plant_vernal_bluebell_bud');

    expect(testVisualUpdates.lunaLotusInDay.plantKey).toBe('plant_luna_lotus_closed');
    expect(testVisualUpdates.lunaLotusInDay.shadowKey).toBe('plant_luna_lotus_closed');

    expect(testVisualUpdates.lunaLotusAtNight.plantKey).toBe('plant_luna_lotus_bloom');
    expect(testVisualUpdates.lunaLotusAtNight.shadowKey).toBe('plant_luna_lotus_bloom');
  });
});
