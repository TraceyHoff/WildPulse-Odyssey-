const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
    // Ensure the video directory exists
    const videoDir = path.join(__dirname, 'verification/video');
    if (!fs.existsSync(videoDir)) {
        fs.mkdirSync(videoDir, { recursive: true });
    }

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        recordVideo: {
            dir: videoDir,
            size: { width: 1280, height: 720 }
        }
    });

    const page = await context.newPage();

    try {
        await page.goto('http://localhost:3000');

        // Wait for start modal to be visible
        await page.waitForSelector('#startModal', { state: 'visible', timeout: 5000 });

        // Let it play for a bit to show the video looping
        await page.waitForTimeout(2000);

        // Verify start modal is visible
        const startModalVisible = await page.isVisible('#startModal');
        console.log('Start Modal Visible:', startModalVisible);

        // Take a screenshot of the start modal
        await page.screenshot({ path: path.join(__dirname, 'verification/start_modal.png') });

        // Click Start Game
        await page.click('#startGameBtn');

        // Wait for modal to disappear and loading screen to appear then disappear
        await page.waitForSelector('#startModal', { state: 'hidden', timeout: 5000 });
        await page.waitForTimeout(1000); // Wait for loading screen to pass

        // Give the game a few seconds to run its update loop (to see shadows)
        await page.waitForTimeout(3000);

        // Take a screenshot of the game
        await page.screenshot({ path: path.join(__dirname, 'verification/game_view.png') });

        console.log('Verification script completed successfully.');
    } catch (error) {
        console.error('Verification script failed:', error);
    } finally {
        await context.close();
        await browser.close();
    }
})();