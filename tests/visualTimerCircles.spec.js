const { test, expect } = require('@playwright/test');

test.describe('Active Visual Timer Circles', () => {
  test.beforeEach(async ({ page }) => {
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
    await page.goto('http://localhost:3000');
  });

  test('should display active timer circles with correct emojis and text on the screen', async ({ page }) => {
    // Start game session by clicking start button
    await page.click('#startGameBtn');
    await page.waitForSelector('#menuBtn', { state: 'visible' });

    // Activate some buff timers for Player 1 via page.evaluate
    await page.evaluate(() => {
        window.p1RepellentTime = 45000; // 45 seconds remaining
        window.p1PedometerTime = 15000; // 15 seconds remaining
        window.updateVisualTimerCircles();
    });

    // Verify the container #p1Timers is visible
    const p1Container = page.locator('#p1Timers');
    await expect(p1Container).toBeVisible();

    // Verify the circular timer elements
    const circles = p1Container.locator('.timer-circle-wrapper');
    await expect(circles).toHaveCount(2);

    // Verify Repellent element
    const repellent = p1Container.locator('.timer-circle-wrapper[data-item="Repellent"]');
    await expect(repellent).toBeVisible();
    await expect(repellent.locator('.timer-circle-emoji')).toHaveText('🧴');
    await expect(repellent.locator('.timer-circle-text')).toHaveText('45s');

    // Verify Pedometer element
    const pedometer = p1Container.locator('.timer-circle-wrapper[data-item="Pedometer"]');
    await expect(pedometer).toBeVisible();
    await expect(pedometer.locator('.timer-circle-emoji')).toHaveText('👣');
    await expect(pedometer.locator('.timer-circle-text')).toHaveText('15s');

    // Verify circular strokes have stroke-dashoffset matching the fractions
    const repelStroke = repellent.locator('.timer-circle-stroke');
    const pedometerStroke = pedometer.locator('.timer-circle-stroke');

    const repelOffsetStr = await repelStroke.getAttribute('stroke-dashoffset');
    const pedometerOffsetStr = await pedometerStroke.getAttribute('stroke-dashoffset');

    const repelOffset = parseFloat(repelOffsetStr);
    const pedometerOffset = parseFloat(pedometerOffsetStr);

    console.log('REPELLENT OFFSET:', repelOffset);
    console.log('PEDOMETER OFFSET:', pedometerOffset);

    expect(repelOffset).toBeGreaterThan(0);
    expect(pedometerOffset).toBeGreaterThan(0);
    // Since Pedometer (15/60 = 0.25 remaining) is more drained than Repellent (45/60 = 0.75 remaining),
    // its stroke-dashoffset should be larger (less filled circle)
    expect(pedometerOffset).toBeGreaterThan(repelOffset);
  });

  test('should support split screen co-op symmetrically and isolate P1/P2 timer viewports', async ({ page }) => {
    // Start game session by clicking split screen button
    await page.click('#startSplitScreenBtn');
    await page.waitForSelector('#menuBtn', { state: 'visible' });

    // Enable co-op session and activate timers for both players
    await page.evaluate(() => {
        window.p1ExPallTime = 120000; // 120s remaining of 180s baseline
        window.p2JankJuiceTime = 30000; // 30s remaining of 60s baseline
        window.updateVisualTimerCircles();
    });

    // Verify Player 1 timers container is visible
    const p1Container = page.locator('#p1Timers');
    await expect(p1Container).toBeVisible();

    // Verify Player 1's active timer circle (ExPALL)
    const p1Circles = p1Container.locator('.timer-circle-wrapper');
    await expect(p1Circles).toHaveCount(1);
    const expall = p1Container.locator('.timer-circle-wrapper[data-item="ExPALL"]');
    await expect(expall).toBeVisible();
    await expect(expall.locator('.timer-circle-emoji')).toHaveText('✨');
    await expect(expall.locator('.timer-circle-text')).toHaveText('120s');

    // Verify Player 2 timers container is visible
    const p2Container = page.locator('#p2Timers');
    await expect(p2Container).toBeVisible();

    // Verify Player 2's active timer circle (Jank Juice)
    const p2Circles = p2Container.locator('.timer-circle-wrapper');
    await expect(p2Circles).toHaveCount(1);
    const jank = p2Container.locator('.timer-circle-wrapper[data-item="Jank Juice"]');
    await expect(jank).toBeVisible();
    await expect(jank.locator('.timer-circle-emoji')).toHaveText('🧃');
    await expect(jank.locator('.timer-circle-text')).toHaveText('30s');

    // Verify CSS/Position isolation
    const p1Bbox = await p1Container.boundingBox();
    const p2Bbox = await p2Container.boundingBox();

    expect(p1Bbox).not.toBeNull();
    expect(p2Bbox).not.toBeNull();

    // Player 1 should be on left (x < viewportWidth / 2)
    // Player 2 should be on right (x >= viewportWidth / 2)
    const viewportSize = page.viewportSize();
    expect(viewportSize).not.toBeNull();
    const halfWidth = viewportSize.width / 2;

    console.log('P1 Container Box:', p1Bbox);
    console.log('P2 Container Box:', p2Bbox);
    console.log('Half Width:', halfWidth);

    expect(p1Bbox.x).toBeLessThan(halfWidth);
    expect(p2Bbox.x).toBeGreaterThanOrEqual(halfWidth);
  });
});
