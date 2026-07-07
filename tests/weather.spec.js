const { test, expect } = require('@playwright/test');

test.describe('Weather and Particles', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    // Bypass the start modal to reach the game
    await page.evaluate(() => {
      sessionStorage.setItem('wildpulse_skip_start_modal', 'true');
    });
    await page.reload();
    // Wait for Phaser to initialize and emitters to be created
    await page.waitForFunction(() => window.leafRedEmitter !== undefined);
  });

  test('starts with clear skies', async ({ page }) => {
    const cloudCoverage = await page.evaluate(() => window.cloudCoverage);
    expect(cloudCoverage).toBe('clear');
  });

  test('particle emitters follow wind vector exactly', async ({ page }) => {
    const targetVx = 123.45;
    const targetVy = 67.89;

    await page.evaluate(({ vx, vy }) => {
      const originalUpdateDynamicGrass = window.updateDynamicGrass;
      window.updateDynamicGrass = function(scene, timeNow, wvx, wvy) {
          window._lastCapturedWindVx = wvx;
          window._lastCapturedWindVy = wvy;
          return originalUpdateDynamicGrass.apply(this, arguments);
      };

      const angle = Math.atan2(vy, vx);
      const speed = Math.hypot(vx, vy);
      window.windAngle = angle;
      window.targetWindAngle = angle;
      window.windSpeed = speed;
      window.targetWindSpeed = speed;
    }, { vx: targetVx, vy: targetVy });

    // Wait for the update loop to apply speeds
    await page.waitForTimeout(1000);

    const data = await page.evaluate(() => {
      const getVal = (prop) => {
          if (prop === undefined || prop === null) return null;
          if (typeof prop === 'number') return prop;
          if (typeof prop === 'object' && prop.hasOwnProperty('propertyValue')) return prop.propertyValue;
          return null;
      };

      const getSpeed = (emitter) => {
        if (!emitter) return null;
        return {
            vx: getVal(emitter.speedX),
            vy: getVal(emitter.speedY)
        };
      };

      return {
        capturedVx: window._lastCapturedWindVx,
        capturedVy: window._lastCapturedWindVy,
        leafRed: getSpeed(window.leafRedEmitter),
        rain: getSpeed(window.rainEmitter),
        snow: getSpeed(window.snowflakeEmitter)
      };
    });

    console.log('Emitter Speeds:', JSON.stringify(data, null, 2));

    if (data.leafRed && data.capturedVx !== undefined) {
        expect(data.leafRed.vx).toBeCloseTo(data.capturedVx);
        expect(data.leafRed.vy).toBeCloseTo(data.capturedVy);
    }

    if (data.rain && data.capturedVx !== undefined) {
        expect(data.rain.vx).toBeCloseTo(data.capturedVx);
        expect(data.rain.vy).toBeCloseTo(500 + data.capturedVy);
    }

    if (data.snow && data.capturedVx !== undefined) {
        expect(data.snow.vx).toBeCloseTo(data.capturedVx);
        expect(data.snow.vy).toBeCloseTo(60 + data.capturedVy);
    }
  });
});
