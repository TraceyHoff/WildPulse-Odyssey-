const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');

    // Wait for the game to load
    await page.waitForTimeout(5000); // 5 seconds to generate the world

    console.log("Checking UI for defend button...");
    const defendBtn = await page.$('.btn-defend');
    if (defendBtn) {
        console.error("Defend button still exists!");
        process.exit(1);
    } else {
        console.log("Defend button successfully removed.");
    }

    // Attempt to evaluate player position
    const playerPos = await page.evaluate(() => {
        return { x: player.x, y: player.y };
    });
    console.log(`Player spawned at ${playerPos.x}, ${playerPos.y}`);

    const onGrass = await page.evaluate((pos) => {
        let col = Math.floor(pos.x / 100);
        let row = Math.floor(pos.y / 100);
        return mapData[row] && mapData[row][col] === 'grass';
    }, playerPos);

    if (onGrass) {
        console.log("Player spawned on grass correctly.");
    } else {
        console.error("Player spawned on water!");
        process.exit(1);
    }

    // Evaluate some stats
    const dmgCalc = await page.evaluate(() => {
        let dummyAtk = { stats: { attack: 100 }, level: 50, type: 'Fire' };
        let dummyDef = { stats: { defense: 50 }, level: 50, type: 'Nature' };
        return window.calculateDamage(dummyAtk, dummyDef, 50);
    });
    console.log("Calculated damage (Fire vs Nature, 100 ATK vs 50 DEF): " + dmgCalc);

    await browser.close();
    console.log("Tests passed!");
})();
