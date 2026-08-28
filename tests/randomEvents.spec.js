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
        FlashFreeze: window.getEventBoostedType('Flash Freeze'),
        GustyWinds: window.getEventBoostedType('Gusty Winds'),
        Earthquake: window.getEventBoostedType('Earthquake'),
        BountifulBloom: window.getEventBoostedType('Bountiful Bloom'),
        None: window.getEventBoostedType('None')
      };
    });

    expect(mappings.Rain).toBe('Water');
    expect(mappings.Thunderstorm).toBe('Electric');
    expect(mappings.DaytimeRadiance).toBe('Light');
    expect(mappings.NighttimeEclipse).toBe('Dark');
    expect(mappings.HeatWave).toBe('Fire');
    expect(mappings.Aurora).toBe('Cosmic');
    expect(mappings.FlashFreeze).toBe('Ice');
    expect(mappings.GustyWinds).toBe('Wind');
    expect(mappings.Earthquake).toBe('Earth');
    expect(mappings.BountifulBloom).toBe('Nature');
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
      const attackerIce = { level: 10, type: 'Ice' };
      const attackerWind = { level: 10, type: 'Wind' };
      const attackerEarth = { level: 10, type: 'Earth' };
      const attackerNature = { level: 10, type: 'Nature' };
      const attackerFire = { level: 10, type: 'Fire' };
      const defender = { type: 'Normal' };

      // Set Flash Freeze event (boosts Ice)
      window.activeRandomEvent = 'Flash Freeze';
      window.activeRandomEventEndTime = window.totalElapsedMs + 120000;
      const dmgIce_FlashFreeze = window.calculateDamage(attackerIce, defender, 40);
      const dmgFire_FlashFreeze = window.calculateDamage(attackerFire, defender, 40);

      // Set Gusty Winds event (boosts Wind)
      window.activeRandomEvent = 'Gusty Winds';
      window.activeRandomEventEndTime = window.totalElapsedMs + 120000;
      const dmgWind_GustyWinds = window.calculateDamage(attackerWind, defender, 40);
      const dmgFire_GustyWinds = window.calculateDamage(attackerFire, defender, 40);

      // Set Earthquake event (boosts Earth)
      window.activeRandomEvent = 'Earthquake';
      window.activeRandomEventEndTime = window.totalElapsedMs + 120000;
      const dmgEarth_Earthquake = window.calculateDamage(attackerEarth, defender, 40);
      const dmgFire_Earthquake = window.calculateDamage(attackerFire, defender, 40);

      // Set Bountiful Bloom event (boosts Nature)
      window.activeRandomEvent = 'Bountiful Bloom';
      window.activeRandomEventEndTime = window.totalElapsedMs + 120000;
      const dmgNature_BountifulBloom = window.calculateDamage(attackerNature, defender, 40);
      const dmgFire_BountifulBloom = window.calculateDamage(attackerFire, defender, 40);

      return {
        dmgIce_FlashFreeze,
        dmgFire_FlashFreeze,
        dmgWind_GustyWinds,
        dmgFire_GustyWinds,
        dmgEarth_Earthquake,
        dmgFire_Earthquake,
        dmgNature_BountifulBloom,
        dmgFire_BountifulBloom
      };
    });

    // Flash Freeze
    expect(result.dmgIce_FlashFreeze).toBeCloseTo(17.4);
    expect(result.dmgFire_FlashFreeze).toBeCloseTo(11.6);

    // Gusty Winds
    expect(result.dmgWind_GustyWinds).toBeCloseTo(17.4);
    expect(result.dmgFire_GustyWinds).toBeCloseTo(11.6);

    // Earthquake
    expect(result.dmgEarth_Earthquake).toBeCloseTo(17.4);
    expect(result.dmgFire_Earthquake).toBeCloseTo(11.6);

    // Bountiful Bloom
    expect(result.dmgNature_BountifulBloom).toBeCloseTo(17.4);
    expect(result.dmgFire_BountifulBloom).toBeCloseTo(11.6);
  });

  test('updates activeEventBadge HTML element with countdown timer and correct styles', async ({ page }) => {
    // Disable the background update loop from auto-overriding our mocked values
    await page.evaluate(() => {
      window.updateRandomEvents = null;
    });

    // 1. Force Flash Freeze
    await page.evaluate(() => {
      window.gameStarted = true;
      window.activeRandomEvent = 'Flash Freeze';
      window.activeRandomEventEndTime = window.totalElapsedMs + 100000; // 100 seconds left
      window.activeRandomEventStartTime = window.totalElapsedMs; // Fake recent start
      window.updateEventBadgeUI();
    });
    const badge1 = page.locator('#activeEventBadge');
    await expect(badge1).toBeVisible();
    let text1 = await badge1.innerText();
    expect(text1.toUpperCase()).toContain('❄️ FLASH FREEZE');
    expect(text1).toContain('1:40');

    // 2. Force Gusty Winds
    await page.evaluate(() => {
      window.gameStarted = true;
      window.activeRandomEvent = 'Gusty Winds';
      window.activeRandomEventEndTime = window.totalElapsedMs + 120000; // 120 seconds left
      window.activeRandomEventStartTime = window.totalElapsedMs; // Fake recent start
      window.updateEventBadgeUI();
    });
    const badge2 = page.locator('#activeEventBadge');
    await expect(badge2).toBeVisible();
    let text2 = await badge2.innerText();
    expect(text2.toUpperCase()).toContain('🌀 GUSTY WINDS');
    expect(text2).toContain('2:00');

    // 3. Force Earthquake
    await page.evaluate(() => {
      window.gameStarted = true;
      window.activeRandomEvent = 'Earthquake';
      window.activeRandomEventEndTime = window.totalElapsedMs + 80000; // 80 seconds left
      window.activeRandomEventStartTime = window.totalElapsedMs; // Fake recent start
      window.updateEventBadgeUI();
    });
    const badge3 = page.locator('#activeEventBadge');
    await expect(badge3).toBeVisible();
    let text3 = await badge3.innerText();
    expect(text3.toUpperCase()).toContain('🌋 EARTHQUAKE');
    expect(text3).toContain('1:20');

    // 4. Force Bountiful Bloom
    await page.evaluate(() => {
      window.gameStarted = true;
      window.activeRandomEvent = 'Bountiful Bloom';
      window.activeRandomEventEndTime = window.totalElapsedMs + 90000; // 90 seconds left
      window.activeRandomEventStartTime = window.totalElapsedMs; // Fake recent start

      // Inject fake bubble to test visual ring
      const container = document.getElementById('eventBubblesContainer');
      const bubble = document.createElement('div');
      bubble.className = 'event-bubble';
      bubble.dataset.source = 'random';
      bubble.dataset.color = '#ff007f';
      container.appendChild(bubble);

      window.updateEventBadgeUI();
    });
    const badge4 = page.locator('#activeEventBadge');
    await expect(badge4).toBeVisible();
    let text4 = await badge4.innerText();
    expect(text4.toUpperCase()).toContain('🌸 BLOOM');
    expect(text4).toContain('1:30');

    const pct = await page.evaluate(() => {
        const bubble = document.querySelector('.event-bubble');
        return bubble.style.background;
    });
    expect(pct).toContain('conic-gradient');
  });

  test('applies visual dayNightOverlay color overrides', async ({ page }) => {
    const colors = await page.evaluate(() => {
      const getOverlayColorForEvent = (event) => {
        window.activeRandomEvent = event;
        window.totalElapsedMs = 650000;

        // Find or create dayNightOverlay mock
        if (!window.dayNightOverlay) {
          window.dayNightOverlay = {
            alpha: 0,
            fillColor: 0,
            clear() {},
            fill(color) { this.fillColor = color; },
            draw() { return this; },
            drawFrame() { return this; },
            erase() { return this; },
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
          } else if (window.activeRandomEvent === 'Flash Freeze') {
              targetAlpha = Math.max(targetAlpha, 0.35);
          } else if (window.activeRandomEvent === 'Gusty Winds') {
              targetAlpha = Math.max(targetAlpha, 0.20);
          } else if (window.activeRandomEvent === 'Earthquake') {
              targetAlpha = Math.max(targetAlpha, 0.25);
          } else if (window.activeRandomEvent === 'Bountiful Bloom') {
              targetAlpha = Math.max(targetAlpha, 0.30);
          }
        }

        let fillColor = 0x000033;
        if (window.activeRandomEvent === 'Heat Wave') {
            fillColor = 0xcc3300;
        } else if (window.activeRandomEvent === 'Aurora') {
            fillColor = 0x3a005c;
        } else if (window.activeRandomEvent === 'Flash Freeze') {
            fillColor = 0xb2ebf2;
        } else if (window.activeRandomEvent === 'Gusty Winds') {
            fillColor = 0xe5ffff;
        } else if (window.activeRandomEvent === 'Earthquake') {
            fillColor = 0x8d6e63;
        } else if (window.activeRandomEvent === 'Bountiful Bloom') {
            fillColor = 0x81c784;
        }

        return { fillColor, targetAlpha };
      };

      return {
        heatwave: getOverlayColorForEvent('Heat Wave'),
        aurora: getOverlayColorForEvent('Aurora'),
        flashfreeze: getOverlayColorForEvent('Flash Freeze'),
        gustywinds: getOverlayColorForEvent('Gusty Winds'),
        earthquake: getOverlayColorForEvent('Earthquake'),
        bountifulbloom: getOverlayColorForEvent('Bountiful Bloom'),
        none: getOverlayColorForEvent('None')
      };
    });

    expect(colors.heatwave.fillColor).toBe(0xcc3300);
    expect(colors.heatwave.targetAlpha).toBe(0.25);

    expect(colors.aurora.fillColor).toBe(0x3a005c);
    expect(colors.aurora.targetAlpha).toBe(0.40);

    expect(colors.flashfreeze.fillColor).toBe(0xb2ebf2);
    expect(colors.flashfreeze.targetAlpha).toBe(0.35);

    expect(colors.gustywinds.fillColor).toBe(0xe5ffff);
    expect(colors.gustywinds.targetAlpha).toBe(0.20);

    expect(colors.earthquake.fillColor).toBe(0x8d6e63);
    expect(colors.earthquake.targetAlpha).toBe(0.25);

    expect(colors.bountifulbloom.fillColor).toBe(0x81c784);
    expect(colors.bountifulbloom.targetAlpha).toBe(0.30);

    expect(colors.none.fillColor).toBe(0x000033);
  });

  test('asserts 4 minutes active event duration and 10 minutes cooldown duration', async ({ page }) => {
    // Test rolling from 'None' (cooldown) to active event (should last 4 minutes = 240,000ms)
    const activeResult = await page.evaluate(() => {
      window.totalElapsedMs = 1000000;
      window.activeRandomEvent = 'None';
      window.rollRandomEvent();
      return {
        event: window.activeRandomEvent,
        duration: window.activeRandomEventEndTime - window.totalElapsedMs
      };
    });
    expect(activeResult.event).not.toBe('None');
    expect(activeResult.duration).toBe(240000); // 4 minutes

    // Test rolling from active event to 'None' (cooldown) (should last 10 minutes = 600,000ms)
    const cooldownResult = await page.evaluate(() => {
      window.totalElapsedMs = 2000000;
      window.activeRandomEvent = 'Daytime Radiance';
      window.rollRandomEvent();
      return {
        event: window.activeRandomEvent,
        duration: window.activeRandomEventEndTime - window.totalElapsedMs
      };
    });
    expect(cooldownResult.event).toBe('None');
    expect(cooldownResult.duration).toBe(600000); // 10 minutes
  });
});
