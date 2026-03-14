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

    await page.evaluate(() => {
        const modal = document.getElementById('lobbyModal');
        if (modal) modal.style.display = 'none';
        window.startGame && window.startGame();
    });

    await page.waitForTimeout(3000);

    await page.evaluate(() => {
        // Find a water tile by searching mapData
        for (let y = 0; y < window.WORLD_SIZE; y++) {
            for (let x = 0; x < window.WORLD_SIZE; x++) {
                if (window.mapData[y] && window.mapData[y][x] === 'obs') {
                    if (window.playerSprite) {
                        window.playerSprite.x = x * window.TILE_SIZE;
                        window.playerSprite.y = y * window.TILE_SIZE;
                        return;
                    }
                }
            }
        }
    });

    await page.waitForTimeout(3000);

    await page.screenshot({ path: '/home/jules/verification/verification2.png' });
    await browser.close();
})();
