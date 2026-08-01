# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/expallAndDivider.spec.js >> ExPALL and Split-Screen Divider >> ExPALL item is registered and active
- Location: tests/expallAndDivider.spec.js:20:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - heading "WildPulse Odyssey" [level=1] [ref=e4]
  - button "Single Player" [ref=e5] [cursor=pointer]
  - button "Split Screen" [ref=e6] [cursor=pointer]
  - button "Customize Character" [ref=e7] [cursor=pointer]
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  |
  3  | test.describe('ExPALL and Split-Screen Divider', () => {
  4  |   test('players start the game with two healing juice bottles', async ({ page }) => {
  5  |     await page.goto('http://localhost:3000');
  6  |
  7  |     const p1Inv = await page.evaluate(() => {
  8  |       // Clear localStorage so we get fresh defaults
  9  |       localStorage.clear();
  10 |       // Reload or trigger default check
  11 |       return window.p1Inventory;
  12 |     });
  13 |
  14 |     expect(p1Inv).toBeDefined();
  15 |     const item = p1Inv.find(i => i.name === "Healing Juice Bottle");
  16 |     expect(item).toBeDefined();
  17 |     expect(item.quantity).toBe(2);
  18 |   });
  19 |
  20 |   test('ExPALL item is registered and active', async ({ page }) => {
  21 |     await page.goto('http://localhost:3000');
  22 |
  23 |     const result = await page.evaluate(() => {
  24 |       // ExPALL should be present in store replenishment stock defaults
  25 |       return {
  26 |         defaultStockHasExPall: window.p1StoreStock && window.p1StoreStock["ExPALL"] === 5,
  27 |         p1ExPallTimeExists: typeof window.p1ExPallTime === 'number'
  28 |       };
  29 |     });
  30 |
> 31 |     expect(result.defaultStockHasExPall).toBe(true);
     |                                          ^ Error: expect(received).toBe(expected) // Object.is equality
  32 |     expect(result.p1ExPallTimeExists).toBe(true);
  33 |   });
  34 |
  35 |   test('Co-op split line exists and displays correctly in split screen co-op mode', async ({ page }) => {
  36 |     await page.goto('http://localhost:3000');
  37 |
  38 |     // Initially hidden
  39 |     const lineVisibleInitial = await page.locator('#coopSplitLine').isVisible();
  40 |     expect(lineVisibleInitial).toBe(false);
  41 |
  42 |     // Enable co-op via window.enableCoop and verify visibility
  43 |     const lineVisibleAfterCoop = await page.evaluate(() => {
  44 |       window.generatePlayerTexture = () => {};
  45 |       if (window.enableCoop) {
  46 |         // Mock a scene
  47 |         const mockSprite = () => ({
  48 |           setTint: () => {},
  49 |           setDepth: () => {},
  50 |           setPosition: () => {},
  51 |           setAlpha: () => {},
  52 |           setBlendMode: () => {},
  53 |           originalColor: 0,
  54 |           body: {
  55 |             setCollideWorldBounds: () => {}
  56 |           }
  57 |         });
  58 |         const mockScene = {
  59 |           add: {
  60 |             sprite: mockSprite,
  61 |             text: () => {
  62 |               const obj = {};
  63 |               obj.setOrigin = () => obj;
  64 |               obj.setDepth = () => obj;
  65 |               return obj;
  66 |             }
  67 |           },
  68 |           physics: {
  69 |             add: {
  70 |               existing: () => {},
  71 |               collider: () => ({}),
  72 |               overlap: () => ({})
  73 |             }
  74 |           },
  75 |           cameras: {
  76 |             main: {
  77 |               setViewport: () => ({
  78 |                 setSize: () => {}
  79 |               })
  80 |             },
  81 |             add: () => ({
  82 |               startFollow: () => {},
  83 |               setBounds: () => {}
  84 |             })
  85 |           }
  86 |         };
  87 |         window.enableCoop(mockScene);
  88 |       }
  89 |       const el = document.getElementById('coopSplitLine');
  90 |       return el && el.style.display === 'block';
  91 |     });
  92 |
  93 |     expect(lineVisibleAfterCoop).toBe(true);
  94 |   });
  95 | });
  96 |
```