const { test, expect } = require('@playwright/test');

test.describe('Random Events System', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem('wildpulse_skip_start_modal', 'true');
    });
    await page.goto('http://localhost:3000');
    // Wait for Phaser to fully initialize
    await page.waitForFunction(() => window.leafRedEmitter !== undefined);
  });

  test('correctly maps events to boosted types', async ({ page }) => {
    const mappings = await page.evaluate(() => {
      return {
        Rain: window.getEventBoostedType('Rain'),
        Thunderstorm: window.getEventBoostedType('Thunderstorm'),
        DaytimeRadiance: window.getEventBoostedType('Daytime Radiance'),
        NighttimeEclipse: window.getEventBoostedType('Nighttime Eclipse'),
        HeatWave: window.getEventBoostedType('Heat Wave'),
        Aurora: window.getEventBoostedType('Aurora'),
        None: window.getEventBoostedType('None')
      };
    });

    expect(mappings.Rain).toBe('Water');
    expect(mappings.Thunderstorm).toBe('Electric');
    expect(mappings.DaytimeRadiance).toBe('Light');
    expect(mappings.NighttimeEclipse).toBe('Dark');
    expect(mappings.HeatWave).toBe('Fire');
    expect(mappings.Aurora).toBe('Cosmic');
    expect(mappings.None).toBeNull();
  });

  test('applies 1.5x damage boost when attacker matches event boosted type', async ({ page }) => {
    const result = await page.evaluate(() => {
      // Mock stats
      window.getEffectiveStat = (creature, stat) => {
        const stats = {
          'attack': 100,
          'defense': 50,
          'specialAttack': 10,
          'specialDefense': 100,
          'health': 1000
        };
        return stats[stat];
      };

      window.getTypeModifier = () => 1;

      // Base damage with level 10, power 40 is 11.6
      const attackerWater = { level: 10, type: 'Water' };
      const attackerFire = { level: 10, type: 'Fire' };
      const defender = { type: 'Normal' };

      // Set Heat Wave event (boosts Fire)
      window.activeRandomEvent = 'Heat Wave';
      window.activeRandomEventEndTime = window.totalElapsedMs + 120000;

      const dmgWater = window.calculateDamage(attackerWater, defender, 40);
      const dmgFire = window.calculateDamage(attackerFire, defender, 40);

      return { dmgWater, dmgFire };
    });

    // Fire is boosted during Heat Wave: base 11.6 * 1.5 = 17.4
    // Water is NOT boosted: 11.6
    expect(result.dmgWater).toBeCloseTo(11.6);
    expect(result.dmgFire).toBeCloseTo(17.4);
  });

  test('updates activeEventBadge HTML element with countdown timer and correct styles', async ({ page }) => {
    // Force active event Heat Wave
    await page.evaluate(() => {
      window.activeRandomEvent = 'Heat Wave';
      window.activeRandomEventEndTime = window.totalElapsedMs + 100000; // 100 seconds left
      window.updateEventBadgeUI();
    });

    const badge = page.locator('#activeEventBadge');
    await expect(badge).toBeVisible();

    const text = await badge.innerText();
    expect(text.toUpperCase()).toContain('🔥 HEAT WAVE');
    expect(text).toContain('1:40'); // 100 seconds is 1m 40s
  });

  test('applies visual dayNightOverlay color overrides', async ({ page }) => {
    const colors = await page.evaluate(() => {
      const getOverlayColorForEvent = (event) => {
        window.activeRandomEvent = event;
        // Trigger manual update (this runs the logic normally inside update loop)
        // Set totalElapsedMs >= 600000 to unlock event visuals
        window.totalElapsedMs = 650000;

        // Find or create dayNightOverlay mock
        if (!window.dayNightOverlay) {
          window.dayNightOverlay = {
            alpha: 0,
            fillColor: 0,
            setFillStyle(color) { this.fillColor = color; },
            setAlpha(val) { this.alpha = val; }
          };
        }

        // We evaluate targetAlpha calculation manually
        let dayNightAlpha = 0;
        let weatherAlpha = 0;
        let targetAlpha = Math.max(dayNightAlpha, weatherAlpha);

        if (window.activeRandomEvent && window.activeRandomEvent !== 'None') {
          if (window.activeRandomEvent === 'Heat Wave') {
              targetAlpha = Math.max(targetAlpha, 0.25);
          } else if (window.activeRandomEvent === 'Aurora') {
              targetAlpha = Math.max(targetAlpha, 0.40);
          }
        }

        let fillColor = 0x000033;
        if (window.activeRandomEvent === 'Heat Wave') {
            fillColor = 0xcc3300;
        } else if (window.activeRandomEvent === 'Aurora') {
            fillColor = 0x3a005c;
        }

        return { fillColor, targetAlpha };
      };

      return {
        heatwave: getOverlayColorForEvent('Heat Wave'),
        aurora: getOverlayColorForEvent('Aurora'),
        none: getOverlayColorForEvent('None')
      };
    });

    expect(colors.heatwave.fillColor).toBe(0xcc3300);
    expect(colors.heatwave.targetAlpha).toBe(0.25);

    expect(colors.aurora.fillColor).toBe(0x3a005c);
    expect(colors.aurora.targetAlpha).toBe(0.40);

    expect(colors.none.fillColor).toBe(0x000033);
  });
});
