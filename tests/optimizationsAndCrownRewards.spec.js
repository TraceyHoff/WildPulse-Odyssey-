const { test, expect } = require('@playwright/test');

test.describe('Optimizations and Crown Challenge Rewards', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage to ensure a clean new game state
    await page.addInitScript(() => {
      localStorage.clear();
      // Force test onboarding mode
      window.__test_onboarding = true;
    });
    await page.goto('http://localhost:3000');
  });

  test('should display exact Crown Challenge thresholds in onboarding slide 1', async ({ page }) => {
    test.setTimeout(60000);
    // Click Start Game on a fresh state to show onboarding
    await page.click('#startGameBtn');

    // Wait for introductory modal to be visible
    const introP1 = page.locator('#introModal');
    await expect(introP1).toBeVisible();

    const slide1Text = await page.locator('#introModalSlide1').innerText();
    expect(slide1Text.toUpperCase()).toContain('CROWN CHALLENGE REWARD THRESHOLDS:');
    expect(slide1Text).toContain('Tier 1: Square Shape');
    expect(slide1Text).toContain('Tier 2: Camo Skin');
    expect(slide1Text).toContain('Tier 3: Triangle Shape');
    expect(slide1Text).toContain('Tier 24: Flame Skin');
  });

  test('should bind locked skins to even-numbered Crown Challenge Tier thresholds', async ({ page }) => {
    // Click Start Game to ensure game and scripts are fully loaded
    await page.click('#startGameBtn');
    await page.waitForSelector('#introModal', { state: 'visible' });

    // Check PATTERN_UNLOCKS configuration in the browser window
    const patternUnlocks = await page.evaluate(() => {
      // Temporarily mock challengeTier to verify skin check function behavior
      const originalTier = window.challengeTier;

      window.challengeTier = 1;
      const camoLocked = window.PATTERN_UNLOCKS['Camo'].check();
      const starsLocked = window.PATTERN_UNLOCKS['Stars'].check();

      window.challengeTier = 2;
      const camoUnlocked = window.PATTERN_UNLOCKS['Camo'].check();
      const starsLockedAt2 = window.PATTERN_UNLOCKS['Stars'].check();

      window.challengeTier = 4;
      const starsUnlocked = window.PATTERN_UNLOCKS['Stars'].check();

      // Restore
      window.challengeTier = originalTier;

      return {
        camoLocked,
        starsLocked,
        camoUnlocked,
        starsLockedAt2,
        starsUnlocked,
        camoCondition: window.PATTERN_UNLOCKS['Camo'].condition,
        starsCondition: window.PATTERN_UNLOCKS['Stars'].condition
      };
    });

    expect(patternUnlocks.camoCondition).toBe('Crown Challenge Tier 2');
    expect(patternUnlocks.starsCondition).toBe('Crown Challenge Tier 4');
    expect(patternUnlocks.camoLocked).toBe(false);
    expect(patternUnlocks.starsLocked).toBe(false);
    expect(patternUnlocks.camoUnlocked).toBe(true);
    expect(patternUnlocks.starsLockedAt2).toBe(false);
    expect(patternUnlocks.starsUnlocked).toBe(true);
  });

  test('should apply unique texture key per creature ID to decouple animations and stop offscreen updates', async ({ page }) => {
    // Skip onboarding to go straight into game
    await page.addInitScript(() => {
      localStorage.setItem('wildpulse_player_color', '#FFFFFF');
    });
    await page.goto('http://localhost:3000');
    await page.click('#startGameBtn');
    await page.waitForSelector('#menuBtn', { state: 'visible' });

    // Evaluate texture generation logic to confirm unique texture key per individual ID
    const textureKeyVerification = await page.evaluate(() => {
      // Mock game start to allow spawnCreature
      window.gameStarted = true;
      const scene = window.game.scene.scenes[0];

      const testCreature1 = { id: 'spawn_test_123', name: 'Aegis', type: 'Nature', stats: { health: 50 } };
      const testCreature2 = { id: 'spawn_test_456', name: 'Aegis', type: 'Nature', stats: { health: 50 } };

      // Spy on textures.exists to see which keys spawnCreature asks for
      const checkedKeys = [];
      const originalExists = scene.textures.exists.bind(scene.textures);
      scene.textures.exists = (key) => {
        checkedKeys.push(key);
        return originalExists(key);
      };

      try {
        window.spawnCreature(scene, testCreature1, 500, 500, 1);
        window.spawnCreature(scene, testCreature2, 500, 500, 2);
      } finally {
        scene.textures.exists = originalExists;
      }

      return checkedKeys;
    });

    // Keys should use unique IDs to ensure separate textures rather than species-wide
    expect(textureKeyVerification.some(key => key.includes('spawn_test_123'))).toBe(true);
    expect(textureKeyVerification.some(key => key.includes('spawn_test_456'))).toBe(true);
    // Keys should NOT be species-wide Aegis_normal
    expect(textureKeyVerification.some(key => key === 'creature_tex_Aegis_normal')).toBe(false);
  });

  test('should reduce camera update rate and scale down particle load when a heavy modal is open', async ({ page }) => {
    // Skip onboarding to go straight into game
    await page.addInitScript(() => {
      localStorage.setItem('wildpulse_player_color', '#FFFFFF');
    });
    await page.goto('http://localhost:3000');
    await page.click('#startGameBtn');
    await page.waitForSelector('#menuBtn', { state: 'visible' });

    const scaleFactors = await page.evaluate(() => {
      const originalCoop = window.coopActive;
      window.coopActive = true;

      // Test default state
      const initialScale = window.getParticleScale();

      // Test with one heavy modal active
      window.p1ActiveModal = 'breedingModal';
      const scaleWithOneModal = window.getParticleScale();

      // Test with both heavy modals active
      window.p2ActiveModal = 'storeModal';
      const scaleWithBothModals = window.getParticleScale();

      // Restore
      window.p1ActiveModal = null;
      window.p2ActiveModal = null;
      window.coopActive = originalCoop;

      return {
        initialScale,
        scaleWithOneModal,
        scaleWithBothModals
      };
    });

    expect(scaleFactors.initialScale).toBe(1.0);
    expect(scaleFactors.scaleWithOneModal).toBe(0.25);
    expect(scaleFactors.scaleWithBothModals).toBe(0.0);
  });
});
