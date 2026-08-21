const { test, expect } = require('@playwright/test');

test('Verify loading screen title', async ({ page }) => {
    // Navigate to the game page
    await page.goto('http://localhost:3000/index.html');

    // Check the loading screen title
    const loadingTitle = await page.locator('.loading-title');
    await expect(loadingTitle).toHaveText('WildPulse Odyssey');

    // Take a screenshot
    await page.screenshot({ path: '/home/jules/verification/screenshots/loading_screen.png' });
});