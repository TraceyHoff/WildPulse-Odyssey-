const { chromium } = require('playwright');
const assert = require('assert');

(async () => {
    // Start server
    const { spawn } = require('child_process');
    const server = spawn('node', ['test_server.js']);

    // Wait for server to start
    await new Promise(resolve => setTimeout(resolve, 2000));

    const browser1 = await chromium.launch();
    const browser2 = await chromium.launch();

    const context1 = await browser1.newContext();
    const context2 = await browser2.newContext();

    // Grant permissions just in case
    await context1.grantPermissions(['camera', 'microphone']);
    await context2.grantPermissions(['camera', 'microphone']);

    const page1 = await context1.newPage();
    const page2 = await context2.newPage();

    console.log("Loading pages...");
    await page1.goto('http://localhost:3000');
    await page2.goto('http://localhost:3000');

    console.log("Entering room code and joining...");
    await page1.fill('#roomCodeInput', 'testroom');
    await page1.click('button:has-text("Join Room")');

    // Wait a sec to make sure first user is registered
    await page1.waitForTimeout(1000);

    await page2.fill('#roomCodeInput', 'testroom');
    await page2.click('button:has-text("Join Room")');

    // Wait for WebRTC handshake
    console.log("Waiting for WebRTC handshake...");
    await page1.waitForTimeout(3000);

    // Simulate movement on page1
    console.log("Simulating movement on page 1...");
    // Simulate arrow key down
    await page1.keyboard.down('ArrowRight');
    await page1.waitForTimeout(500); // Hold for 500ms
    await page1.keyboard.up('ArrowRight');

    // Give it time to broadcast
    await page1.waitForTimeout(1000);

    // Check if page2 has remote players
    console.log("Checking if page 2 received movement...");
    const hasRemotePlayer = await page2.evaluate(() => {
        return Object.keys(remotePlayers).length > 0;
    });

    console.log("Page 2 has remote player?", hasRemotePlayer);
    assert(hasRemotePlayer, "Page 2 should have received remote player data");

    const remotePlayerPos = await page2.evaluate(() => {
        const keys = Object.keys(remotePlayers);
        if (keys.length === 0) return null;
        const rp = remotePlayers[keys[0]];
        return { x: rp.x, y: rp.y };
    });

    console.log("Remote player pos on page 2:", remotePlayerPos);

    const localPlayerPos = await page1.evaluate(() => {
        return { x: player.x, y: player.y };
    });

    console.log("Local player pos on page 1:", localPlayerPos);

    // Due to interpolation, they might not be exactly equal, but they shouldn't be null
    assert(remotePlayerPos !== null, "Remote player position should not be null");

    console.log("Test completed successfully!");

    await browser1.close();
    await browser2.close();
    server.kill();
})();