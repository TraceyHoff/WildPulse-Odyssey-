const { chromium } = require('playwright');
(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // Add console listener
    page.on('console', msg => console.log('BROWSER:', msg.text()));

    await page.goto('file://' + __dirname + '/index.html');
    await page.waitForTimeout(1000);

    // Evaluate in browser
    const res = await page.evaluate(async () => {
        return new Promise(resolve => {
            // Wait for game start
            document.getElementById('startGameBtn').click();
            setTimeout(() => {
                let scene = window.game.scene.scenes[0];
                let group = scene.obstaclesGroup;

                let firstObs = group.getChildren()[0];
                console.log("Obs body properties:");
                console.log("x, y:", firstObs.body.x, firstObs.body.y);
                console.log("width, height:", firstObs.body.width, firstObs.body.height);
                console.log("center x, y:", firstObs.body.center.x, firstObs.body.center.y);

                resolve({
                    x: firstObs.body.x,
                    y: firstObs.body.y,
                    width: firstObs.body.width,
                    height: firstObs.body.height
                });
            }, 1000);
        });
    });
    console.log(res);
    await browser.close();
})();
