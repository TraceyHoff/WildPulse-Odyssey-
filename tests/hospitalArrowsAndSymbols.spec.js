const { test, expect } = require('@playwright/test');

test.describe('Hospital Directional Arrows and Creature Type Symbols', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem('wildpulse_skip_start_modal', 'true');
    });
    await page.goto('http://localhost:3000');
    // Wait for the game to start and players/creatures to initialize
    await page.waitForFunction(() => window.gameStarted === true);
  });

  test('hospital arrows exist and are displayed for Player 1', async ({ page }) => {
    const p1ArrowExists = await page.locator('#p1HospitalArrow').count();
    expect(p1ArrowExists).toBe(1);

    const isVisible = await page.locator('#p1HospitalArrow').isVisible();
    expect(isVisible).toBe(true);

    const arrowPosition = await page.evaluate(() => {
      const el = document.getElementById('p1HospitalArrow');
      return el ? el.style.left : '';
    });
    expect(arrowPosition).toBe('50%'); // Default center in singleplayer
  });

  test('hospital arrow updates rotation dynamically as player moves', async ({ page }) => {
    // Force player to be at a specific position relative to hospital (10050, 10050)
    // Let's teleport the player to (10150, 10050) - directly to the east of hospital
    await page.evaluate(() => {
      if (window.player) {
        window.player.x = 10150;
        window.player.y = 10050;
      }
    });

    // Wait for one update frame
    await page.waitForTimeout(200);

    // If player is at (10150, 10050) and hospital is at (10050, 10050)
    // dx = -100, dy = 0. Angle in rad = Math.atan2(0, -100) = Math.PI (180 degrees)
    let rotation = await page.evaluate(() => {
      const el = document.getElementById('p1HospitalArrow');
      const svg = el ? el.querySelector('svg') : null;
      return svg ? svg.style.transform : '';
    });
    expect(rotation).toContain('rotate(180deg)');

    // Now teleport player to (10050, 10150) - directly to the south of hospital
    // dx = 0, dy = -100. Angle in rad = Math.atan2(-100, 0) = -Math.PI/2 (-90 degrees)
    await page.evaluate(() => {
      if (window.player) {
        window.player.x = 10050;
        window.player.y = 10150;
      }
    });

    await page.waitForTimeout(200);

    rotation = await page.evaluate(() => {
      const el = document.getElementById('p1HospitalArrow');
      const svg = el ? el.querySelector('svg') : null;
      return svg ? svg.style.transform : '';
    });
    expect(rotation).toContain('rotate(-90deg)');
  });

  test('hospital arrows are correctly structured and positioned in co-op split screen', async ({ page }) => {
    // Enable co-op
    await page.evaluate(() => {
      const scene = window.game.scene.scenes[0];
      if (window.enableCoop) window.enableCoop(scene);
    });

    await page.waitForTimeout(500);

    const p1ArrowVisible = await page.locator('#p1HospitalArrow').isVisible();
    const p2ArrowVisible = await page.locator('#p2HospitalArrow').isVisible();
    expect(p1ArrowVisible).toBe(true);
    expect(p2ArrowVisible).toBe(true);

    const positions = await page.evaluate(() => {
      const p1 = document.getElementById('p1HospitalArrow');
      const p2 = document.getElementById('p2HospitalArrow');
      return {
        p1Left: p1 ? p1.style.left : '',
        p2Left: p2 ? p2.style.left : ''
      };
    });

    expect(positions.p1Left).toBe('25%');
    expect(positions.p2Left).toBe('75%');
  });

  test('creature element type symbols are rendered above creatures', async ({ page }) => {
    // Wait until creatures are spawned
    await page.waitForFunction(() => window.creaturesGroup && window.creaturesGroup.getChildren().length > 0);

    const symbolsData = await page.evaluate(() => {
      if (!window.creaturesGroup) return [];
      const children = window.creaturesGroup.getChildren();
      return children.map(c => {
        const type = c.getData('creatureData').type;
        const symbolText = c.getData('symbolText');
        return {
          type,
          hasSymbol: !!symbolText,
          text: symbolText ? symbolText.text : '',
          xDiff: symbolText ? (symbolText.x - c.x) : 999,
          yDiff: symbolText ? (symbolText.y - c.y) : 999
        };
      });
    });

    expect(symbolsData.length).toBeGreaterThan(0);

    const emojiMap = {
      "Fire": "🔥",
      "Water": "💧",
      "Nature": "🍃",
      "Electric": "⚡",
      "Ice": "❄️",
      "Earth": "🪨",
      "Wind": "💨",
      "Light": "☀️",
      "Dark": "🌙",
      "Cosmic": "🪐"
    };

    for (const item of symbolsData) {
      expect(item.hasSymbol).toBe(true);
      expect(item.text).toBe(emojiMap[item.type]);
      expect(item.xDiff).toBeCloseTo(0);
      expect(item.yDiff).toBeCloseTo(-24);
    }
  });
});
