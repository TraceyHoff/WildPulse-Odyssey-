const { test, expect } = require('@playwright/test');
const fs = require('fs');

test('Gamepad 2D spatial navigation', async ({ page }) => {
    // Increase timeout
    test.setTimeout(60000);

    await page.goto('http://localhost:3000');

    // Bypass intro and start game
    await page.evaluate(() => {
        localStorage.setItem('wildpulse_has_seen_intro', 'true');
        localStorage.setItem('wildpulse_player_color', '#FFFFFF');
    });

    await page.click('#startGameBtn');

    await page.waitForFunction(() => window.gameStarted === true, { timeout: 10000 });

    // Ensure we are not in any modal or combat
    await page.waitForTimeout(500);

    // Add a custom modal with a 3x3 grid
    await page.evaluate(() => {
        const modal = document.createElement('div');
        modal.id = 'customGridModal';
        modal.style.position = 'fixed';
        modal.style.top = '100px';
        modal.style.left = '100px';
        modal.style.width = '400px';
        modal.style.height = '400px';
        modal.style.backgroundColor = 'white';
        modal.style.zIndex = '10000';
        modal.style.display = 'flex';
        modal.style.flexWrap = 'wrap';

        for (let i = 1; i <= 9; i++) {
            const btn = document.createElement('button');
            btn.id = `btn${i}`;
            btn.textContent = `Button ${i}`;
            btn.style.width = '100px';
            btn.style.height = '100px';
            btn.style.margin = '10px';
            modal.appendChild(btn);
        }

        document.body.appendChild(modal);

        // Override getActiveContainerForPlayer to return our modal
        window.originalGetActiveContainerForPlayer = window.getActiveContainerForPlayer;
        window.getActiveContainerForPlayer = () => document.getElementById('customGridModal');
    });

    await page.screenshot({ path: '/home/jules/verification/screenshots/gamepad-start.png' });


    // Mock gamepad input to press 'right'
    await page.evaluate(() => {
        const pad = {
            buttons: [
                { pressed: false }, // A
                { pressed: false }, // B
                { pressed: false }, // X
                { pressed: false }, // Y
                { pressed: false }, // LB
                { pressed: false }, // RB
                { pressed: false }, // LT
                { pressed: false }, // RT
                { pressed: false }, // View
                { pressed: false }, // Menu (Start)
                { pressed: false }, // LStick
                { pressed: false }, // RStick
                { pressed: false }, // Dpad Up
                { pressed: false }, // Dpad Down
                { pressed: false }, // Dpad Left
                { pressed: true }   // Dpad Right
            ]
        };

        // First call sets up 'prev' state
        const padClear = { buttons: Array(16).fill({ pressed: false }) };
        window.processGamepadInputForPlayer(1, padClear);

        // Focus first element to start
        const btn1 = document.getElementById('btn1');
        btn1.classList.add('gamepad-focused-p1');

        // Trigger 'right'
        window.processGamepadInputForPlayer(1, pad);
    });

    await page.waitForTimeout(100); // Wait for the transition

    // Check if btn2 is now focused (instead of jumping somewhere else linearly)
    const isBtn2Focused = await page.evaluate(() => {
        return document.getElementById('btn2').classList.contains('gamepad-focused-p1');
    });

    expect(isBtn2Focused).toBe(true);

    await page.screenshot({ path: '/home/jules/verification/screenshots/gamepad-right.png' });


    // Mock gamepad input to press 'down'
    await page.evaluate(() => {
        const pad = {
            buttons: [
                { pressed: false }, // A
                { pressed: false }, // B
                { pressed: false }, // X
                { pressed: false }, // Y
                { pressed: false }, // LB
                { pressed: false }, // RB
                { pressed: false }, // LT
                { pressed: false }, // RT
                { pressed: false }, // View
                { pressed: false }, // Menu (Start)
                { pressed: false }, // LStick
                { pressed: false }, // RStick
                { pressed: false }, // Dpad Up
                { pressed: true },  // Dpad Down
                { pressed: false }, // Dpad Left
                { pressed: false }  // Dpad Right
            ]
        };

        const padClear = { buttons: Array(16).fill({ pressed: false }) };
        window.processGamepadInputForPlayer(1, padClear);

        // Trigger 'down'
        window.processGamepadInputForPlayer(1, pad);
    });

    await page.waitForTimeout(100);

    // Check if btn5 is now focused (directly below btn2 in a 3x3 grid)
    const isBtn5Focused = await page.evaluate(() => {
        return document.getElementById('btn5').classList.contains('gamepad-focused-p1');
    });

    expect(isBtn5Focused).toBe(true);

    await page.screenshot({ path: '/home/jules/verification/screenshots/gamepad-down.png' });

    // Cleanup
    await page.evaluate(() => {
        window.getActiveContainerForPlayer = window.originalGetActiveContainerForPlayer;
        document.getElementById('customGridModal').remove();
    });
});
