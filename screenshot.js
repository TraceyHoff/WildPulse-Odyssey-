const { chromium } = require('playwright');
(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('http://localhost:3001/test_conic.html');
    await page.screenshot({path: 'test_conic.png'});
    await browser.close();
})();
