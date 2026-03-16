const { test, expect } = require('@playwright/test');

test.describe('window.getEffectiveStat', () => {
  test('handles creature with missing nature', async ({ page }) => {
    // Navigate to the index page where getEffectiveStat is defined
    await page.goto('file://' + __dirname + '/../index.html');

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
    // getRawScaledStat: val = 50 + (50 * 0 * 0.05) = 50. bonus = 0. Returns 50.
    // getEffectiveStat: scales base by 1 (no nature, no mood). Returns 50.
    expect(result.effectiveStat).toBe(50);
  });
});
