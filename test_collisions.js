const { chromium } = require('playwright');
(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // Add console listener
    page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));

    await page.goto('file://' + __dirname + '/index.html');
    await page.waitForTimeout(2000);

    // Evaluate in browser
    const res = await page.evaluate(async () => {
        return new Promise(resolve => {
            // Wait for game start
            document.getElementById('startGameBtn').click();
            setTimeout(() => {
                let scene = window.game.scene.scenes[0];
                let player = scene.player;

                let foundWater = false;
                for (let r = 0; r < 200; r++) {
                    for (let c = 0; c < 200; c++) {
                        if (window.mapData[r] && window.mapData[r][c] === 'obs') {
                            player.x = c * 100 + 50;
                            player.y = r * 100 - 50; // just above water

                            foundWater = true;
                            break;
                        }
                    }
                    if (foundWater) break;
                }

                // Set fixed time to avoid timeout
                scene.physics.world.time = 0;
                player.body.setVelocity(0, 500);

                setTimeout(() => {
                    resolve({
                        movedY: player.y
                    });
                }, 1000);
            }, 1000);
        });
    });
    console.log(res);
    await browser.close();
})();
