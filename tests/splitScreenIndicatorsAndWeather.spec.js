const { test, expect } = require('@playwright/test');

test.describe('Split-Screen Indicators and Weather Delay', () => {
  test.beforeEach(async ({ page }) => {
    page.on('console', msg => {
      console.log('BROWSER LOG:', msg.text());
    });
    await page.addInitScript(() => {
      localStorage.clear();
      sessionStorage.setItem('wildpulse_skip_start_modal', 'true');
    });
    await page.goto('http://localhost:3000');
    // Wait for the game/Phaser to load
    await page.waitForFunction(() => typeof window.coopActive !== 'undefined');
  });

  test('should display status indicators correctly above players heads in split-screen co-op mode', async ({ page }) => {
    // 1. Enable co-op
    await page.waitForSelector('#menuBtn', { state: 'visible' });
    await page.click('#menuBtn');
    await page.waitForSelector('#menuModal', { state: 'visible' });
    await page.click('#coopToggleBtn');

    // Confirm co-op active
    const isCoopActive = await page.evaluate(() => window.coopActive);
    expect(isCoopActive).toBe(true);

    // 2. Test Player 1 is in a modal
    await page.evaluate(() => {
      window.p1ActiveModal = 'menuModal';
      window.p2ActiveModal = null;
    });
    await page.waitForTimeout(100);

    const p1ModalIndicator = await page.evaluate(() => {
      if (!window.p1StatusIndicator) return null;
      return {
        text: window.p1StatusIndicator.text,
        color: window.p1StatusIndicator.style.color,
        visible: window.p1StatusIndicator.visible
      };
    });
    expect(p1ModalIndicator).not.toBeNull();
    expect(p1ModalIndicator.text).toBe('?');
    expect(p1ModalIndicator.color.toLowerCase()).toContain('#33ff33');

    // 3. Test Player 1 in battle (and Player 2 is free)
    await page.evaluate(() => {
      window.p1ActiveModal = null;
      window.inBattle = true;
      window.activeBattlePlayer = 1;
      window.p2ActiveModal = null;
    });
    await page.waitForTimeout(100);

    const p1BattleIndicator = await page.evaluate(() => {
      if (!window.p1StatusIndicator) return null;
      return {
        text: window.p1StatusIndicator.text,
        color: window.p1StatusIndicator.style.color,
        visible: window.p1StatusIndicator.visible
      };
    });
    expect(p1BattleIndicator).not.toBeNull();
    expect(p1BattleIndicator.text).toBe('!');
    expect(p1BattleIndicator.color.toLowerCase()).toContain('#ff3333');

    // 4. If Player 2 is ALSO in a battle, Player 1's exclamation mark should disappear
    await page.evaluate(() => {
      // Local PvP means both are in battle
      window.isLocalPvp = true;
    });
    await page.waitForTimeout(100);

    const p1IndicatorInLocalPvp = await page.evaluate(() => {
      return window.p1StatusIndicator ? { text: window.p1StatusIndicator.text } : null;
    });
    expect(p1IndicatorInLocalPvp).toBeNull();

    // 5. Test inactive co-op cleans up indicators
    await page.evaluate(() => {
      window.isLocalPvp = false;
      window.p1ActiveModal = 'menuModal'; // Should trigger question mark indicator
    });
    await page.waitForTimeout(100);

    const beforeDisable = await page.evaluate(() => {
      return {
        coopActive: window.coopActive,
        p1IndicatorExists: !!window.p1StatusIndicator,
        p1IndicatorText: window.p1StatusIndicator ? window.p1StatusIndicator.text : null,
        p1IndicatorVisible: window.p1StatusIndicator ? window.p1StatusIndicator.visible : null,
        p2IndicatorExists: !!window.p2StatusIndicator
      };
    });
    console.log('Before disable:', beforeDisable);

    // Disable co-op
    await page.evaluate(() => {
      if (window.disableCoop && window.game && window.game.scene.scenes[0]) {
        window.disableCoop(window.game.scene.scenes[0]);
      }
    });
    await page.waitForTimeout(200);

    const afterDisable = await page.evaluate(() => {
      return {
        coopActive: window.coopActive,
        p1IndicatorExists: !!window.p1StatusIndicator,
        p1IndicatorText: window.p1StatusIndicator ? window.p1StatusIndicator.text : null,
        p1IndicatorVisible: window.p1StatusIndicator ? window.p1StatusIndicator.visible : null,
        p2IndicatorExists: !!window.p2StatusIndicator
      };
    });
    console.log('After disable:', afterDisable);

    const indicatorsAreCleanedUp = await page.evaluate(() => {
      return !window.p1StatusIndicator && !window.p2StatusIndicator;
    });
    expect(indicatorsAreCleanedUp).toBe(true);
  });

  test('should force clear skies weather for the first 4 minutes of game age', async ({ page }) => {
    // 1. Set room age/totalElapsedMs to 2 minutes (120,000ms), which is under the 4-minute delay
    await page.evaluate(() => {
      window.totalElapsedMs = 120000;
      // Clear last update time so weather updates next frame
      window.lastWeatherCalcUpdate = 0;
    });
    await page.waitForTimeout(1100);

    const weatherStateAt2Min = await page.evaluate(() => {
      return {
        pattern: window.weatherPattern,
        intensity: window.weatherIntensity,
        cloudCoverage: window.cloudCoverage
      };
    });

    expect(weatherStateAt2Min.pattern).toBe('none');
    expect(weatherStateAt2Min.intensity).toBe(0);
    expect(weatherStateAt2Min.cloudCoverage).toBe('clear');

    // 2. Set room age/totalElapsedMs to 11 minutes (660,000ms), which is well past the 4-minute delay and into the weather window
    await page.evaluate(() => {
      window.totalElapsedMs = 660000;
      window.lastWeatherCalcUpdate = 0;
    });
    await page.waitForTimeout(1100);

    const weatherStateAt11Min = await page.evaluate(() => {
      return {
        pattern: window.weatherPattern,
        intensity: window.weatherIntensity,
        cloudCoverage: window.cloudCoverage
      };
    });

    console.log('Weather state at 11 min:', weatherStateAt11Min);
    expect(weatherStateAt11Min).toBeDefined();
  });
});
