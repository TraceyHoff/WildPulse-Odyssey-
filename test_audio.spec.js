const { test, expect } = require('@playwright/test');

test.use({
    video: 'on',
});

test('Verify ambient audio initializes', async ({ page, context }) => {
    test.setTimeout(60000);
    await page.goto('http://localhost:3000');

    // Bypass onboarding
    await page.evaluate(() => {
        localStorage.setItem('wildpulse_player_color', '#FFFFFF');
        localStorage.setItem('wildpulse_p1_level', '7');
        localStorage.setItem('wildpulse_p2_level', '7');
    });

    await page.click('#startGameBtn');
    await page.waitForTimeout(1000);

    // Evaluate WildPulseMusic
    const synthExists = await page.evaluate(() => {
        if (!window.WildPulseMusic) return false;
        // Start it to be sure
        window.WildPulseMusic.start();
        return !!window.WildPulseMusic.synths.woodpecker && !!window.WildPulseMusic.synths.nightjar && !!window.WildPulseMusic.synths.windChimes;
    });

    expect(synthExists).toBeTruthy();

    await page.waitForTimeout(5000);

    // Save screenshot
    await page.screenshot({ path: '/home/jules/verification/screenshots/audio_test.png', animations: 'disabled' });

    // Close context to save video
    await context.close();

    const pageObj = await page.video().path();
    const fs = require('fs');
    fs.copyFileSync(pageObj, '/home/jules/verification/videos/audio_test.webm');
});
