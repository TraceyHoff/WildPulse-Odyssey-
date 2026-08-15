const { test, expect } = require('@playwright/test');

test.describe('Character Body Shapes Customization & Locking', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem('wildpulse_skip_start_modal', 'true');
    });
    await page.goto('http://localhost:3000');
  });

  test('should default to Square shape and show other shapes locked at Tier 1', async ({ page }) => {
    // Handle start modal
    await page.waitForSelector('#startGameBtn', { state: 'visible', timeout: 30000 });
    await page.click('#startGameBtn', { force: true });

    // Wait for game menu
    await page.waitForSelector('#menuBtn', { state: 'visible' });
    await page.click('#menuBtn', { force: true });

    // Wait for customization modal
    await page.waitForSelector('#menuCustomizeBtn', { state: 'visible' });
    await page.click('#menuCustomizeBtn', { force: true });
    await page.waitForSelector('#customizationModal', { state: 'visible' });

    // Click the shape button to open the popup
    await page.evaluate(() => {
        const btn = document.getElementById('playerShapeSelect');
        if (btn) btn.click();
    });
    await page.waitForSelector('#optionSelectModal_p1', { state: 'visible' });

    // Verify Shape options
    const optionsInfo = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('#optionSelectModal_p1 .creature-select-btn'));
      return btns.map(b => ({
        text: b.innerText,
        disabled: b.style.cursor === 'not-allowed'
      }));
    });

    // Close the modal
    await page.evaluate(() => {
       const overlay = document.getElementById('optionSelectModal_p1');
       if(overlay) document.body.removeChild(overlay);
    });

    // Check Square option
    const squareOpt = optionsInfo.find(o => o.text && o.text.toUpperCase().includes('SQUARE'));
    expect(squareOpt).toBeDefined();
    expect(squareOpt.disabled).toBe(false);

    // Check Triangle option (requires Tier 3, so should be locked and disabled at Tier 1)
    const triangleOpt = optionsInfo.find(o => o.text && o.text.toUpperCase().includes('TRIANGLE'));
    expect(triangleOpt).toBeDefined();
    expect(triangleOpt.disabled).toBe(true);
    expect(triangleOpt.text).toContain('TIER 3');

    // Check Star option (requires Tier 15, so should be locked and disabled)
    const starOpt = optionsInfo.find(o => o.text && o.text.toUpperCase().includes('STAR'));
    expect(starOpt).toBeDefined();
    expect(starOpt.disabled).toBe(true);
    expect(starOpt.text).toContain('TIER 15');
  });

  test('should unlock shapes when challenge tier increases', async ({ page }) => {
    // Set challenge tier to 10 in localStorage before page interaction
    await page.evaluate(() => {
      localStorage.setItem('wildpulse_challenge_tier', '10');
      // Force reload or update active challenge tier variable
      window.challengeTier = 10;
    });

    // Handle start modal
    await page.waitForSelector('#startGameBtn', { state: 'visible', timeout: 30000 });
    await page.click('#startGameBtn', { force: true });

    // Wait for menu
    await page.waitForSelector('#menuBtn', { state: 'visible' });
    await page.click('#menuBtn', { force: true });

    // Open customization modal
    await page.waitForSelector('#menuCustomizeBtn', { state: 'visible' });
    await page.click('#menuCustomizeBtn', { force: true });
    await page.waitForSelector('#customizationModal', { state: 'visible' });

    // Click the shape button to open the popup
    await page.evaluate(() => {
        const btn = document.getElementById('playerShapeSelect');
        if (btn) btn.click();
    });
    await page.waitForSelector('#optionSelectModal_p1', { state: 'visible' });

    // Verify Shape options
    const optionsInfo = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('#optionSelectModal_p1 .creature-select-btn'));
      return btns.map(b => ({
        text: b.innerText,
        disabled: b.style.cursor === 'not-allowed'
      }));
    });

    // Triangle (Tier 3) should now be unlocked!
    const triangleOpt = optionsInfo.find(o => o.text && o.text.trim().toUpperCase() === 'TRIANGLE');
    expect(triangleOpt.disabled).toBe(false);
    expect(triangleOpt.text.trim().toUpperCase()).toBe('TRIANGLE');

    // Rectangle (Tier 9) should also be unlocked!
    const rectOpt = optionsInfo.find(o => o.text && o.text.trim().toUpperCase() === 'RECTANGLE');
    expect(rectOpt.disabled).toBe(false);
    expect(rectOpt.text.trim().toUpperCase()).toBe('RECTANGLE');

    // Star (Tier 15) should still be locked!
    const starOpt = optionsInfo.find(o => o.text && o.text.toUpperCase().includes('STAR'));
    expect(starOpt.disabled).toBe(true);
    expect(starOpt.text).toContain('TIER 15');

    // Select and Save Rectangle
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('#optionSelectModal_p1 .creature-select-btn'));
      const rectBtn = btns.find(b => b.innerText && b.innerText.trim().toUpperCase() === 'RECTANGLE');
      if (rectBtn) rectBtn.click();
    });

    await page.click('#saveCustomizationBtn', { force: true });

    // Wait for customization modal to close
    await page.waitForSelector('#customizationModal', { state: 'hidden' });

    // Check localStorage persistence
    const savedShape = await page.evaluate(() => localStorage.getItem('wildpulse_player_shape'));
    expect(savedShape).toBe('Rectangle');
  });
});
