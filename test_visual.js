const { chromium } = require('playwright');
(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
    page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));
    await page.goto('http://localhost:8000/index.html');
    await page.waitForTimeout(2000);
    await page.evaluate(() => {
        // Start game
        document.body.click();
        if (window.startGame) window.startGame();
    });
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'screenshot1.png' });
    await browser.close();
})();
