const { chromium } = require('playwright');
const path = require('path');

(async () => {
    // Start local server because socket.io script is throwing errors and causing navigation?
    const { spawn } = require('child_process');
    const server = spawn('node', ['server.js']);

    // Wait for server to start
    await new Promise(r => setTimeout(r, 2000));

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        recordVideo: { dir: '/home/jules/verification/video' },
        viewport: { width: 1280, height: 720 }
    });
    const page = await context.newPage();

    // Listen to console to debug
    page.on('console', msg => console.log('BROWSER:', msg.text()));

    await page.goto('http://localhost:3000');
    await page.waitForTimeout(2000);

    await page.evaluate(() => document.getElementById('startGameBtn').click());
    await page.waitForTimeout(2000);

    // Evaluate in browser to set cloudCoverage to cloudy and move to water
    await page.evaluate(() => {
        window.cloudCoverage = 'cloudy';

        // Let's get player from scene
        let scene = window.game ? window.game.scene.scenes[0] : null;
        if (!scene) return;
        let player = scene.children.list.find(c => c.type === 'Rectangle' && c.body);
        if(!player) return;

        // Find water
        let foundWater = false;
        for (let r = 0; r < 200; r++) {
            if(!window.mapData || !window.mapData[r]) continue;
            for (let c = 0; c < 200; c++) {
                if (window.mapData[r][c] === 'obs') {
                    player.x = c * 100 + 50;
                    player.y = r * 100 - 50; // just above water
                    foundWater = true;
                    break;
                }
            }
            if (foundWater) break;
        }
    });

    // Wait a bit and press arrow keys
    await page.waitForTimeout(1000);

    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(1000);
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(1000);

    await page.screenshot({ path: '/home/jules/verification/verification.png' });

    await context.close();
    await browser.close();
    server.kill();
})();
