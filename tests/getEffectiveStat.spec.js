const { test, expect } = require('@playwright/test');

test.describe('window.getEffectiveStat', () => {
  test('handles creature with missing nature', async ({ page }) => {
    // Navigate to the index page where getEffectiveStat is defined
    await page.goto('http://localhost:3000');

    // Call the function with a mock creature that lacks a 'nature' field
    const result = await page.evaluate(() => {
      try {
        const mockCreature = {
          stats: {
            attack: 50
          },
          level: 1
          // 'nature' and 'mood' and 'bonusStats' are missing
        };

        const effectiveStat = window.getEffectiveStat(mockCreature, 'attack');
        return { success: true, effectiveStat };
      } catch (e) {
        return { success: false, error: e.message };
      }
    });

    // Check that it successfully returns a number
    expect(result.success).toBe(true);
    // Base attack is 50, lvl is 1.
    // getRawScaledStat: val = 50 + (50 * 0 * 0.15) = 50. bonus = 0. Returns 50.
    // getEffectiveStat: scales base by 1 (no nature, no mood). Returns 50.
    expect(result.effectiveStat).toBe(50);
  });

  test('scales stats correctly at higher levels (15% per level)', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const result = await page.evaluate(() => {
      const mockCreature = {
        stats: { attack: 100, health: 100 },
        level: 2
      };
      return {
        attack: window.getEffectiveStat(mockCreature, 'attack'),
        health: window.getEffectiveStat(mockCreature, 'health')
      };
    });

    // Attack: 100 + (100 * (2-1) * 0.15) = 115
    expect(result.attack).toBe(115);
    // Health: (100 * 0.4) + (100 * 2 * 0.15) = 40 + 30 = 70
    expect(result.health).toBe(70);
  });
});
