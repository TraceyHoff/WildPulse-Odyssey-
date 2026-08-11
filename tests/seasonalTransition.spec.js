const { test, expect } = require('@playwright/test');

test.describe('Seasonal Transition System', () => {
  test('should initialize and run the seasonal transition correctly', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Wait for game to initialize enough to have setupDynamicGrass called
    await page.waitForFunction(() => typeof window.startSeasonTransition === 'function');

    const transitionState = await page.evaluate(() => {
      // Trigger a transition from Summer to Fall
      window.startSeasonTransition('Summer', 'Fall');
      return {
        active: window.seasonTransitionActive,
        prev: window.seasonTransitionPrev,
        next: window.seasonTransitionNext,
        progress: window.seasonTransitionProgress,
        hasPrevCanvas: !!window.grassBgCanvasPrev,
        hasNextCanvas: !!window.grassBgCanvasNext,
        bladeColorsAssigned: window.grassBlades.every(b => b.colorPrev !== undefined && b.colorNext !== undefined)
      };
    });

    expect(transitionState.active).toBe(true);
    expect(transitionState.prev).toBe('Summer');
    expect(transitionState.next).toBe('Fall');
    expect(transitionState.progress).toBe(0.0);
    expect(transitionState.hasPrevCanvas).toBe(true);
    expect(transitionState.hasNextCanvas).toBe(true);
    expect(transitionState.bladeColorsAssigned).toBe(true);
  });
});
