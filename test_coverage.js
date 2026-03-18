const { chromium } = require('playwright');
(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // Add console listener
    page.on('console', msg => console.log('BROWSER:', msg.text()));

    await page.goto('file://' + __dirname + '/index.html');
    await page.waitForTimeout(2000);

    // Evaluate in browser
    const res = await page.evaluate(async () => {
        return new Promise(resolve => {
            document.getElementById('startGameBtn').click();
            setTimeout(() => {
                let scene = window.game.scene.scenes[0];
                let clouds = window.cloudGroup.getChildren();

                // Set cloudy coverage
                window.cloudCoverage = 'cloudy';

                let minScale = 999;
                let maxScale = 0;

                for (let i = 0; i < 100; i++) {
                    scene.update(); // run update manually
                }

                for(let cloud of clouds) {
                    minScale = Math.min(minScale, cloud.scaleX, cloud.scaleY);
                    maxScale = Math.max(maxScale, cloud.scaleX, cloud.scaleY);
                }

                resolve({
                    numClouds: clouds.length,
                    minScale: minScale,
                    maxScale: maxScale,
                    firstCloudScale: {x: clouds[0].scaleX, y: clouds[0].scaleY}
                });
            }, 1000);
        });
    });
    console.log(res);
    await browser.close();
})();
