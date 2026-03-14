const { chromium } = require('playwright');

(async () => {
    console.log("Starting browsers...");
    const browser = await chromium.launch({ headless: true });

    // Create new context with camera and microphone permissions allowed just in case WebRTC needs them
    const context = await browser.newContext({ permissions: ['camera', 'microphone'] });
    const page1 = await context.newPage();
    const page2 = await context.newPage();

    page1.on('pageerror', err => console.log('Page 1 error: ', err));
    page1.on('console', msg => console.log('Page 1 console: ', msg.text()));
    page2.on('pageerror', err => console.log('Page 2 error: ', err));
    page2.on('console', msg => console.log('Page 2 console: ', msg.text()));

    // We navigate to our localhost server (assumed port 3000)
    await page1.goto('http://localhost:3000/');
    await page2.goto('http://localhost:3000/');

    console.log("Navigated to game.");

    await page1.fill('#roomCodeInput', 'testroom');
    await page1.click('#joinBtn');

    await page2.fill('#roomCodeInput', 'testroom');
    await page2.click('#joinBtn');

    // Wait for game to load
    await page1.waitForTimeout(5000);
    await page2.waitForTimeout(5000);

    console.log("Simulating movement to generate network packets...");
    await page1.keyboard.down('ArrowRight');
    await page1.waitForTimeout(1000);
    await page1.keyboard.up('ArrowRight');

    await page2.waitForTimeout(1000); // Give time for P1 pos update

    // Check if P2 sees P1
    console.log("Checking if P2 sees P1");
    const diagnostics = await page2.evaluate(() => {
        return {
            remotePlayersExists: !!window.remotePlayers,
            playerCount: window.remotePlayers ? Object.values(window.remotePlayers).length : 0,
            hasVisibleLabel: window.remotePlayers && Object.values(window.remotePlayers).length > 0 ? (!!Object.values(window.remotePlayers)[0].label && Object.values(window.remotePlayers)[0].label.visible) : false
        };
    });

    console.log("Diagnostics:", diagnostics);

    await browser.close();
})();
