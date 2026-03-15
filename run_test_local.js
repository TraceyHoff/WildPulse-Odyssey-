const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    page.on('pageerror', err => console.log('Page error:', err));
    page.on('console', msg => console.log('Console:', msg.text()));

    await page.goto('http://localhost:3000');

    // Click join room to bypass lobby
    await page.click('#joinBtn');

    // Wait for canvas to load
    await page.waitForTimeout(3000);

    // Take screenshot to analyze
    await page.screenshot({ path: 'screenshot_test.png' });

    await browser.close();
})();
