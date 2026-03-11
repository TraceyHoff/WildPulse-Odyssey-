const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    await page.goto('file:///app/index.html');
    await page.waitForTimeout(2000);

    let checkState = await page.evaluate(() => {
        let scene = game.scene.scenes[0];

        let tx = 10150; // mapData[101][101] -> x = 101*100+50 = 10150, y = 101*100+50 = 10150
        let ty = 10150;

        player.x = tx;
        player.y = ty;

        return new Promise(resolve => {
            // Wait for player to overlap and update loop to process
            setTimeout(() => {
                let overlapping = scene.physics.overlap(player, storeGroup);
                window.closeStoreModal(); // triggers flag = true

                setTimeout(() => {
                    let flagAfterClose = window.storeModalClosedFlag;
                    setTimeout(() => {
                        let flagAfterUpdateWhileOverlapping = window.storeModalClosedFlag;

                        // Now move player OFF the tile
                        player.x = 0;
                        player.y = 0;

                        setTimeout(() => {
                            let flagAfterMovingOff = window.storeModalClosedFlag;
                            resolve({
                                overlapping,
                                flagAfterClose,
                                flagAfterUpdateWhileOverlapping,
                                flagAfterMovingOff
                            });
                        }, 100);

                    }, 100);

                }, 100);
            }, 500);
        });
    });
    console.log("Store State:", checkState);

    await browser.close();
})();
