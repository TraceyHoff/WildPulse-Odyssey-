const { test, expect } = require('@playwright/test');

test.describe('Co-op Split Screen and Player 2 Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    // Clear local storage to simulate a brand-new game session
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.setItem('wildpulse_skip_start_modal', 'true');
    });
    await page.reload();
  });

  test('should generate a random Gen 1 starter creature for Player 2 on a new game', async ({ page }) => {
    // Check that Player 2's starting creature exists in local storage
    const p2Creatures = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('wildpulse_collected_creatures2')) || [];
    });
    expect(p2Creatures.length).toBe(1);

    const starter = p2Creatures[0];
    expect(starter.level).toBe(1);
    expect(starter.xp).toBe(0);
    expect(starter.id).toContain('_starter_p2');
    expect(starter.generation === 1 || !starter.generation).toBe(true);
  });

  test('should allow Player 2 to open the menu modal using the Player 2 menu button in split-screen mode', async ({ page }) => {
    // Wait for the game to load and open P1 Menu
    await page.waitForSelector('#menuBtn', { state: 'visible' });
    await page.click('#menuBtn');
    await page.waitForSelector('#menuModal', { state: 'visible' });

    // Enable co-op mode
    await page.click('#coopToggleBtn');
    const isCoopActive = await page.evaluate(() => window.coopActive);
    expect(isCoopActive).toBe(true);

    // After enabling co-op, make sure the Player 2 menu button (#menuBtn_P2) is visible
    await page.waitForSelector('#menuBtn_P2', { state: 'visible' });

    // Click Player 2's menu button
    await page.click('#menuBtn_P2');

    // Verify Player 2's menu column inside menuModal is visible
    const isP2ColumnVisible = await page.evaluate(() => {
      const p2Col = document.querySelector('#menuModal .p2-col');
      return p2Col && window.getComputedStyle(p2Col).display !== 'none';
    });
    expect(isP2ColumnVisible).toBe(true);
  });

  test('should display close button inside challengeModal in split-screen mode', async ({ page }) => {
    // Open menu to enable co-op
    await page.waitForSelector('#menuBtn', { state: 'visible' });
    await page.click('#menuBtn');
    await page.waitForSelector('#menuModal', { state: 'visible' });
    await page.click('#coopToggleBtn');

    // Trigger openChallengeModal for Player 1
    await page.evaluate(() => {
      if (window.openChallengeModal) {
        window.openChallengeModal(window.player);
      }
    });

    // Wait for challengeModal to be visible
    await page.waitForSelector('#challengeModal', { state: 'visible' });

    // Ensure closeChallengeBtn is visible and positioned
    const isCloseBtnVisible = await page.evaluate(() => {
      const btn = document.getElementById('closeChallengeBtn');
      return btn && window.getComputedStyle(btn).display !== 'none';
    });
    expect(isCloseBtnVisible).toBe(true);
  });
});
