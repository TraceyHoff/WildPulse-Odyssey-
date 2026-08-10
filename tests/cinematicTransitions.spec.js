const { test, expect } = require('@playwright/test');

test.describe('Cyberpunk Cinematic Transitions & Battle Effects', () => {
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

  test('should render cyber transition overlay elements in DOM and trigger active animation state on battle', async ({ page }) => {
    // 1. Check if the cyber transition overlay is present in the DOM
    const overlay = page.locator('#cyberTransitionOverlay');
    await expect(overlay).toBeAttached();

    // Ensure it is initially hidden
    const isInitiallyVisible = await overlay.isVisible();
    expect(isInitiallyVisible).toBe(false);

    // 2. Turn on co-op mode and set up starter creatures
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
        }
    });

    // 3. Initiate NPC Trainer Dual Battle which triggers the transition overlay
    await page.evaluate(() => {
        window.startNpcDualBattle(window.player, 'npc_trainer_5', 'Morpheus');
    });

    // 4. Verify that the overlay becomes visible during transition and has the correct text
    const overlayText = page.locator('#cyberGlitchText');
    await expect(overlayText).toHaveText(/(DOJO LEADER CONFLICT|TRAINER FIELD DUEL)/);

    // 5. Verify that the battle modal successfully fades in and is displayed
    const battleModal = page.locator('#battleModal');
    await expect(battleModal).toBeVisible();
  });

  test('should trigger intense color shake and visual flash on critical hits', async ({ page }) => {
    // 1. Open the battle modal directly
    await page.evaluate(() => {
        document.getElementById('battleModal').style.display = 'block';
    });

    // 2. Mock logBattle with a "Critical Hit" message
    await page.evaluate(() => {
        window.logBattle('Volt-Pike scored a Critical Hit!');
    });

    // 3. Check if the battle-critical-shake class was applied
    const hasClass = await page.evaluate(() => {
        const modal = document.getElementById('battleModal');
        return modal.classList.contains('battle-critical-shake');
    });
    expect(hasClass).toBe(true);

    // 4. After 500ms, check if class was removed
    await page.waitForTimeout(500);
    const hasClassAfter = await page.evaluate(() => {
        const modal = document.getElementById('battleModal');
        return modal.classList.contains('battle-critical-shake');
    });
    expect(hasClassAfter).toBe(false);
  });
});
