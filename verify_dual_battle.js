const { chromium } = require('playwright');

async function run() {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        recordVideo: {
            dir: '/home/jules/verification/videos'
        },
        viewport: { width: 1280, height: 720 }
    });

    // Set up start screen bypass
    await context.addInitScript(() => {
        sessionStorage.setItem('wildpulse_skip_start_modal', 'true');
        sessionStorage.setItem('wildpulse_started_once', 'true');
    });

    const page = await context.newPage();

    console.log("Navigating to local server...");
    await page.goto('http://localhost:3000');
    await page.waitForFunction(() => window.gameStarted === true, { timeout: 15000 });

    console.log("Setting up co-op mode and starter creatures...");
    await page.evaluate(() => {
        window.coopActive = true;

        // Ensure both players have active creatures
        if (window.collectedCreatures.length === 0) {
            window.collectedCreatures.push({
                id: 'p1_test',
                name: 'Volt-Pike',
                level: 5,
                currentHp: 40,
                maxHp: 40,
                type: 'Electric',
                color: '#ffeb3b',
                xp: 0
            });
        } else {
            window.collectedCreatures[0].currentHp = 40;
        }

        if (window.collectedCreatures2.length === 0) {
            window.collectedCreatures2.push({
                id: 'p2_test',
                name: 'Ember-Hound',
                level: 5,
                currentHp: 45,
                maxHp: 45,
                type: 'Fire',
                color: '#ff5722',
                xp: 0
            });
        } else {
            window.collectedCreatures2[0].currentHp = 45;
        }
    });

    console.log("Triggering Cooperative Dual Battle...");
    await page.evaluate(() => {
        const mockSprite = {
            getData: (key) => {
                return {
                    name: 'Wild Leaf-Sprite',
                    level: 5,
                    currentHp: 30,
                    maxHp: 30,
                    type: 'Nature',
                    color: '#81c784'
                };
            }
        };
        window.startDualBattle(window.player, mockSprite);
    });

    await page.waitForTimeout(1000);

    console.log("Taking screenshot of the Dual Battle screen...");
    await page.screenshot({ path: '/home/jules/verification/screenshots/dual_battle.png' });

    console.log("Selecting Player 1 Attack action...");
    await page.evaluate(() => {
        window.handlePlayerTurn('attack');
    });
    await page.waitForTimeout(1000);

    console.log("Selecting Player 2 Attack action to execute round...");
    await page.evaluate(() => {
        window.handlePlayerTurn('attack');
    });

    console.log("Waiting for round to execute completely...");
    await page.waitForTimeout(6000);

    await page.screenshot({ path: '/home/jules/verification/screenshots/dual_battle_after_round.png' });

    console.log("Closing context and browser...");
    await context.close();
    await browser.close();
    console.log("Verification run complete!");
}

run().catch(err => {
    console.error("Error running verification:", err);
    process.exit(1);
});
