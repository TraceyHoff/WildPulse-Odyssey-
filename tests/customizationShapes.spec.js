const { test, expect } = require('@playwright/test');

test.describe('Character Body Shapes Customization & Locking', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem('wildpulse_skip_start_modal', 'true');
    });
    await page.goto('http://localhost:3000');
  });

  test('should default to Square shape and show other shapes locked at Tier 1', async ({ page }) => {
    // Wait for game menu
    await page.waitForSelector('#menuBtn', { state: 'visible' });
    await page.click('#menuBtn');

    // Wait for customization modal
    await page.waitForSelector('#menuCustomizeBtn', { state: 'visible' });
    await page.click('#menuCustomizeBtn');
    await page.waitForSelector('#customizationModal', { state: 'visible' });

    // Verify Shape select contains Square as default and Triangle, Star are disabled (locked)
    const optionsInfo = await page.evaluate(() => {
      const select = document.getElementById('playerShapeSelect');
      const opts = Array.from(select.options);
      return opts.map(o => ({
        value: o.value,
        text: o.text,
        disabled: o.disabled
      }));
    });

    // Check Square option
    const squareOpt = optionsInfo.find(o => o.value === 'Square');
    expect(squareOpt).toBeDefined();
    expect(squareOpt.disabled).toBe(false);

    // Check Triangle option (requires Tier 3, so should be locked and disabled at Tier 1)
    const triangleOpt = optionsInfo.find(o => o.value === 'Triangle');
    expect(triangleOpt).toBeDefined();
    expect(triangleOpt.disabled).toBe(true);
    expect(triangleOpt.text).toContain('(Locked - Tier 3)');

    // Check Star option (requires Tier 15, so should be locked and disabled)
    const starOpt = optionsInfo.find(o => o.value === 'Star');
    expect(starOpt).toBeDefined();
    expect(starOpt.disabled).toBe(true);
    expect(starOpt.text).toContain('(Locked - Tier 15)');
  });

  test('should unlock shapes when challenge tier increases', async ({ page }) => {
    // Set challenge tier to 10 in localStorage before page interaction
    await page.evaluate(() => {
      localStorage.setItem('wildpulse_challenge_tier', '10');
      // Force reload or update active challenge tier variable
      window.challengeTier = 10;
    });

    // Wait for menu
    await page.waitForSelector('#menuBtn', { state: 'visible' });
    await page.click('#menuBtn');

    // Open customization modal
    await page.waitForSelector('#menuCustomizeBtn', { state: 'visible' });
    await page.click('#menuCustomizeBtn');
    await page.waitForSelector('#customizationModal', { state: 'visible' });

    // Verify Shape select contains unlocked options up to Tier 9
    const optionsInfo = await page.evaluate(() => {
      const select = document.getElementById('playerShapeSelect');
      const opts = Array.from(select.options);
      return opts.map(o => ({
        value: o.value,
        text: o.text,
        disabled: o.disabled
      }));
    });

    // Triangle (Tier 3) should now be unlocked!
    const triangleOpt = optionsInfo.find(o => o.value === 'Triangle');
    expect(triangleOpt.disabled).toBe(false);
    expect(triangleOpt.text).toBe('Triangle');

    // Rectangle (Tier 9) should also be unlocked!
    const rectOpt = optionsInfo.find(o => o.value === 'Rectangle');
    expect(rectOpt.disabled).toBe(false);
    expect(rectOpt.text).toBe('Rectangle');

    // Star (Tier 15) should still be locked!
    const starOpt = optionsInfo.find(o => o.value === 'Star');
    expect(starOpt.disabled).toBe(true);
    expect(starOpt.text).toContain('(Locked - Tier 15)');

    // Select and Save Rectangle
    await page.selectOption('#playerShapeSelect', 'Rectangle');
    await page.click('#saveCustomizationBtn');

    // Wait for customization modal to close
    await page.waitForSelector('#customizationModal', { state: 'hidden' });

    // Check localStorage persistence
    const savedShape = await page.evaluate(() => localStorage.getItem('wildpulse_player_shape'));
    expect(savedShape).toBe('Rectangle');
  });
});
