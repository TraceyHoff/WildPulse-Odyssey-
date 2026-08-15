const { test, expect } = require('@playwright/test');

test.describe('Debug', () => {
  test('debug optionsInfo', async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem('wildpulse_skip_start_modal', 'true');
    });
    await page.goto('http://localhost:3000');
    await page.waitForSelector('#startGameBtn', { state: 'visible', timeout: 30000 });
    await page.click('#startGameBtn', { force: true });
    await page.waitForSelector('#menuBtn', { state: 'visible' });
    await page.click('#menuBtn', { force: true });
    await page.waitForSelector('#menuCustomizeBtn', { state: 'visible' });
    await page.click('#menuCustomizeBtn', { force: true });
    await page.waitForSelector('#customizationModal', { state: 'visible' });

    // Evaluate if the button exists and click it directly via JS to avoid force issues
    await page.evaluate(() => {
        const btn = document.getElementById('playerShapeSelect');
        if (btn) btn.click();
    });

    await page.waitForSelector('#optionSelectModal_p1', { state: 'visible' });

    const optionsInfo = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('#optionSelectModal_p1 .creature-select-btn'));
      return btns.map(b => ({
        text: b.innerText,
        disabled: b.style.cursor === 'not-allowed'
      }));
    });
    console.log(optionsInfo);
  });
});
