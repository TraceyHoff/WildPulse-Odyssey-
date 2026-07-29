# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/getTypeModifier.spec.js >> window.getTypeModifier >> returns correct modifier for basic single types
- Location: tests/getTypeModifier.spec.js:24:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "http://localhost:3000/", waiting until "load"

```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  |
  3  | test.describe('window.getTypeModifier', () => {
  4  |   test('returns 1 when attackType is not in typeChart', async ({ page }) => {
  5  |     await page.goto('http://localhost:3000');
  6  |
  7  |     const result = await page.evaluate(() => {
  8  |       return window.getTypeModifier('NonExistentType', 'Water');
  9  |     });
  10 |
  11 |     expect(result).toBe(1);
  12 |   });
  13 |
  14 |   test('returns 1 when defenseType is not defined for attackType', async ({ page }) => {
  15 |     await page.goto('http://localhost:3000');
  16 |
  17 |     const result = await page.evaluate(() => {
  18 |       return window.getTypeModifier('Fire', 'NonExistentType');
  19 |     });
  20 |
  21 |     expect(result).toBe(1);
  22 |   });
  23 |
  24 |   test('returns correct modifier for basic single types', async ({ page }) => {
> 25 |     await page.goto('http://localhost:3000');
     |                ^ Error: page.goto: Test timeout of 30000ms exceeded.
  26 |
  27 |     const result = await page.evaluate(() => {
  28 |       return {
  29 |         fireVsWater: window.getTypeModifier('Fire', 'Water'),
  30 |         waterVsFire: window.getTypeModifier('Water', 'Fire'),
  31 |         fireVsNature: window.getTypeModifier('Fire', 'Nature')
  32 |       };
  33 |     });
  34 |
  35 |     expect(result.fireVsWater).toBe(0.5);
  36 |     expect(result.waterVsFire).toBe(2);
  37 |     expect(result.fireVsNature).toBe(2);
  38 |   });
  39 | });
  40 |
```