const { chromium } = require('playwright');
(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // Evaluate pure JS inside browser that just simulates what the game logic would do for clouds
    await page.goto('file://' + __dirname + '/index.html');

    // Add console listener
    page.on('console', msg => console.log('BROWSER:', msg.text()));

    // Wait a bit
    await page.waitForTimeout(2000);

    await browser.close();
})();
