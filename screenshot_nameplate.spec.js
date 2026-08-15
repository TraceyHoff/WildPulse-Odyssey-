const { test, expect } = require('@playwright/test');

test('screenshot nameplate', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.evaluate(() => {
        localStorage.setItem('wildpulse_player_color', '#FFFFFF');
    });
    await page.reload();

    await page.waitForSelector('#startGameBtn', { state: 'visible', timeout: 30000 });
    await page.click('#startGameBtn');

    // Give it a moment to boot and render nameplate
    await page.waitForTimeout(3000);

    await page.screenshot({ path: '/app/verification/screenshots/verification_nameplate2.png' });
});
