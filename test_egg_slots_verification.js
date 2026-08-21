const { chromium } = require('playwright');
const path = require('path');

(async () => {
    const videoDir = '/home/jules/verification/videos';
    const screenshotDir = '/home/jules/verification/screenshots';

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        recordVideo: {
            dir: videoDir,
            size: { width: 1280, height: 720 }
        }
    });

    const page = await context.newPage();

    // Bypass onboarding intro
    await page.addInitScript(() => {
        localStorage.setItem('wildpulse_has_seen_intro', 'true');
        localStorage.setItem('wildpulse_player_color', '0');
    });

    await page.goto('http://localhost:3000');

    // hide loading and start modal to enable clicks
    await page.evaluate(() => {
        const ls = document.getElementById('loadingScreen');
        if (ls) ls.style.display = 'none';
        const sm = document.getElementById('startModal');
        if (sm) sm.style.display = 'none';

        window.gameStarted = true;
        window.collectedCreatures = [
            {
                id: 'egg_123',
                name: 'Mysterious Egg',
                isEgg: true,
                eggProgress: 500,
                eggHatchSteps: 1000,
                stored: false
            },
            {
                id: 'egg_456',
                name: 'Mysterious Egg',
                isEgg: true,
                eggProgress: 1000, // Ready to hatch
                eggHatchSteps: 1000,
                stored: false
            }
        ];
        // Open inventory
        window.openInventoryModal(1);
    });

    // Wait a bit to let the UI update and animation run
    await page.waitForTimeout(2000);

    // Click the first egg slot (not ready) to see progress update notification
    const slots = await page.locator('.egg-slot');
    await slots.nth(0).click({ force: true });

    // Wait for the notification
    await page.waitForTimeout(1000);

    // Save screenshot
    await page.screenshot({ path: path.join(screenshotDir, 'egg_slots.png') });

    // Click the second egg slot (ready) to initiate hatch
    await slots.nth(1).click({ force: true });

    // Wait for the hatching sequence
    await page.waitForTimeout(6000);

    await context.close();
    await browser.close();
})();
