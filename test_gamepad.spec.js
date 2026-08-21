const { test, expect } = require('@playwright/test');

test('Left Bumper hold does not crash the game', async ({ page }) => {
    // Navigate to the game
    await page.goto('http://localhost:3000');

    // Bypass intro and start game
    await page.addInitScript(() => {
        localStorage.setItem('wildpulse_has_seen_intro', 'true');
        localStorage.setItem('wildpulse_player_color', '#FFFFFF');
    });

    await page.click('#startGameBtn');

    // Wait for the game to initialize
    await page.waitForFunction(() => window.gameStarted === true, { timeout: 10000 });

    // Mock gamepad connection
    await page.evaluate(() => {
        window.p1PadReference = {
            buttons: [
                { pressed: false }, // 0: A
                { pressed: false }, // 1: B
                { pressed: false }, // 2: X
                { pressed: false }, // 3: Y
                { pressed: true }   // 4: Left Bumper (simulated hold)
            ]
        };
    });

    // Run the game loop once explicitly to trigger the function
    await page.evaluate(() => {
        try {
            window.getActiveContainerForPlayer(1);
            window.testResult = 'success';
        } catch (e) {
            window.testResult = 'error: ' + e.message;
        }
    });

    const result = await page.evaluate(() => window.testResult);
    expect(result).toBe('success');
});
