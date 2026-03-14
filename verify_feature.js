const { chromium } = require('playwright');
(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({ recordVideo: { dir: 'video/' } });
    const page = await context.newPage();

    await page.route('**/socket.io.js', route => {
        route.fulfill({
            status: 200,
            contentType: 'application/javascript',
            body: 'window.io = function() { return { on: function(){}, emit: function(){} }; };'
        });
    });

    await page.goto('file://' + __dirname + '/index.html');

    // Attempt to bypass lobby if visible
    await page.evaluate(() => {
        const modal = document.getElementById('lobbyModal');
        if (modal) modal.style.display = 'none';
        window.startGame && window.startGame();
    });

    await page.waitForTimeout(5000);

    // Try to move player to water tiles if they exist near spawn, or somewhere
    await page.evaluate(() => {
        if(window.playerSprite) {
            window.playerSprite.x = 10150;
            window.playerSprite.y = 10150;
        }
    });

    await page.waitForTimeout(2000);

    await page.screenshot({ path: '/home/jules/verification/verification.png' });
    await browser.close();
})();
