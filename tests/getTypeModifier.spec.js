const { test, expect } = require('@playwright/test');

test.describe('window.getTypeModifier', () => {
  test('returns 1 when attackType is not in typeChart', async ({ page }) => {
    await page.goto('file://' + __dirname + '/../index.html');

    const result = await page.evaluate(() => {
      return window.getTypeModifier('NonExistentType', 'Water');
    });

    expect(result).toBe(1);
  });

  test('returns 1 when defenseType is not defined for attackType', async ({ page }) => {
    await page.goto('file://' + __dirname + '/../index.html');

    const result = await page.evaluate(() => {
      return window.getTypeModifier('Fire', 'NonExistentType');
    });

    expect(result).toBe(1);
  });

  test('returns correct modifier for basic single types', async ({ page }) => {
    await page.goto('file://' + __dirname + '/../index.html');

    const result = await page.evaluate(() => {
      return {
        fireVsWater: window.getTypeModifier('Fire', 'Water'),
        waterVsFire: window.getTypeModifier('Water', 'Fire'),
        fireVsNature: window.getTypeModifier('Fire', 'Nature')
      };
    });

    expect(result.fireVsWater).toBe(0.5);
    expect(result.waterVsFire).toBe(2);
    expect(result.fireVsNature).toBe(2);
  });
});
