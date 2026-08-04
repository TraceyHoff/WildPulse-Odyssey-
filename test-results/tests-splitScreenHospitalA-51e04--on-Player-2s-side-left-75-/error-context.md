# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/splitScreenHospitalAndSelection.spec.js >> Split-Screen Hospital Heal Notification and Creature Selection Overlay >> hospital heal should heal Player 2 and display notification on Player 2s side (left: 75%)
- Location: tests/splitScreenHospitalAndSelection.spec.js:14:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e4]:
    - 'generic "Healing Juice Bottle: Click to use" [ref=e6]':
      - text: 🧪
      - generic [ref=e7]: "2"
    - 'generic "Creature License: Click to use" [ref=e9]':
      - text: 🎫
      - generic [ref=e10]: "1"
  - generic [ref=e12]:
    - 'generic "Healing Juice Bottle: Click to use" [ref=e14]':
      - text: 🧪
      - generic [ref=e15]: "2"
    - 'generic "Creature License: Click to use" [ref=e17]':
      - text: 🎫
      - generic [ref=e18]: "1"
  - generic:
    - img
    - generic: Hospital
  - generic:
    - img
    - generic: Hospital
  - button "Menu" [ref=e20]
  - button "Menu" [ref=e21] [cursor=pointer]
  - generic: Press A, Click, or Tap to interact with HOSPITAL
  - generic: Press A, Click, or Tap to interact with HOSPITAL
```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   |
  3   | test.describe('Split-Screen Hospital Heal Notification and Creature Selection Overlay', () => {
  4   |   test.beforeEach(async ({ page }) => {
  5   |     await page.addInitScript(() => {
  6   |       localStorage.clear();
  7   |       sessionStorage.setItem('wildpulse_skip_start_modal', 'true');
  8   |     });
  9   |     await page.goto('http://localhost:3000');
  10  |     // Wait for the game to start and players/creatures to initialize
  11  |     await page.waitForFunction(() => window.gameStarted === true);
  12  |   });
  13  |
  14  |   test('hospital heal should heal Player 2 and display notification on Player 2s side (left: 75%)', async ({ page }) => {
  15  |     // 1. Enable co-op
  16  |     await page.evaluate(() => {
  17  |       const scene = window.game.scene.scenes[0];
  18  |       if (window.enableCoop) window.enableCoop(scene);
  19  |     });
  20  |
  21  |     await page.waitForTimeout(500);
  22  |
  23  |     // 2. Set Player 2 starting creature currentHp to 1 (it needs healing)
  24  |     await page.evaluate(() => {
  25  |       if (window.collectedCreatures2 && window.collectedCreatures2.length > 0) {
  26  |         window.collectedCreatures2[0].currentHp = 1;
  27  |         localStorage.setItem('wildpulse_collected_creatures2', JSON.stringify(window.collectedCreatures2));
  28  |       }
  29  |     });
  30  |
  31  |     // 3. Teleport Player 2 to hospital tile coordinates to trigger overlap/heal
  32  |     await page.evaluate(() => {
  33  |       if (window.player2) {
  34  |         window.player2.x = 10050;
  35  |         window.player2.y = 10050;
  36  |       }
  37  |     });
  38  |
  39  |     // Wait for overlap detection and healing frame
  40  |     await page.waitForTimeout(1000);
  41  |
  42  |     // 4. Assert Player 2 starter creature is fully healed
  43  |     const p2Healed = await page.evaluate(() => {
  44  |       const p2Starter = window.collectedCreatures2[0];
  45  |       const maxHp = window.getEffectiveStat(p2Starter, 'health');
  46  |       return p2Starter.currentHp === maxHp;
  47  |     });
> 48  |     expect(p2Healed).toBe(true);
      |                      ^ Error: expect(received).toBe(expected) // Object.is equality
  49  |
  50  |     // 5. Assert notification is visible and positioned on Player 2's side (left: 75%)
  51  |     const notificationStyle = await page.evaluate(() => {
  52  |       const el = document.getElementById('modernNotification');
  53  |       return el ? {
  54  |         opacity: el.style.opacity,
  55  |         left: el.style.left,
  56  |         text: el.innerText
  57  |       } : null;
  58  |     });
  59  |
  60  |     expect(notificationStyle).not.toBeNull();
  61  |     expect(notificationStyle.opacity).toBe('1');
  62  |     expect(notificationStyle.left).toBe('75%');
  63  |     expect(notificationStyle.text).toContain('fully healed');
  64  |   });
  65  |
  66  |   test('hospital heal should heal Player 1 and display notification on Player 1s side (left: 25%)', async ({ page }) => {
  67  |     // 1. Enable co-op
  68  |     await page.evaluate(() => {
  69  |       const scene = window.game.scene.scenes[0];
  70  |       if (window.enableCoop) window.enableCoop(scene);
  71  |     });
  72  |
  73  |     await page.waitForTimeout(500);
  74  |
  75  |     // 2. Set Player 1 starting creature currentHp to 1 (it needs healing)
  76  |     await page.evaluate(() => {
  77  |       if (window.collectedCreatures && window.collectedCreatures.length > 0) {
  78  |         window.collectedCreatures[0].currentHp = 1;
  79  |         localStorage.setItem('wildpulse_collected_creatures', JSON.stringify(window.collectedCreatures));
  80  |       }
  81  |     });
  82  |
  83  |     // 3. Teleport Player 1 to hospital tile coordinates to trigger overlap/heal
  84  |     await page.evaluate(() => {
  85  |       if (window.player) {
  86  |         window.player.x = 10050;
  87  |         window.player.y = 10050;
  88  |       }
  89  |     });
  90  |
  91  |     // Wait for overlap detection and healing frame
  92  |     await page.waitForTimeout(1000);
  93  |
  94  |     // 4. Assert Player 1 starter creature is fully healed
  95  |     const p1Healed = await page.evaluate(() => {
  96  |       const p1Starter = window.collectedCreatures[0];
  97  |       const maxHp = window.getEffectiveStat(p1Starter, 'health');
  98  |       return p1Starter.currentHp === maxHp;
  99  |     });
  100 |     expect(p1Healed).toBe(true);
  101 |
  102 |     // 5. Assert notification is visible and positioned on Player 1's side (left: 25%)
  103 |     const notificationStyle = await page.evaluate(() => {
  104 |       const el = document.getElementById('modernNotification');
  105 |       return el ? {
  106 |         opacity: el.style.opacity,
  107 |         left: el.style.left,
  108 |         text: el.innerText
  109 |       } : null;
  110 |     });
  111 |
  112 |     expect(notificationStyle).not.toBeNull();
  113 |     expect(notificationStyle.opacity).toBe('1');
  114 |     expect(notificationStyle.left).toBe('25%');
  115 |     expect(notificationStyle.text).toContain('fully healed');
  116 |   });
  117 |
  118 |   test('creature selection overlay should cover only that players side in co-op', async ({ page }) => {
  119 |     // 1. Enable co-op
  120 |     await page.evaluate(() => {
  121 |       const scene = window.game.scene.scenes[0];
  122 |       if (window.enableCoop) window.enableCoop(scene);
  123 |     });
  124 |
  125 |     await page.waitForTimeout(500);
  126 |
  127 |     // 2. Trigger promptCreatureSelection for Player 1
  128 |     await page.evaluate(() => {
  129 |       window.promptCreatureSelection(1, "Select for P1", () => {});
  130 |     });
  131 |
  132 |     await page.waitForTimeout(200);
  133 |
  134 |     // Verify Player 1's selection modal dimensions and position
  135 |     const p1OverlayDimensions = await page.evaluate(() => {
  136 |       // Find the created overlay div (zIndex: 300000)
  137 |       const overlays = Array.from(document.querySelectorAll('div')).filter(d => d.style.zIndex === '300000');
  138 |       if (overlays.length === 0) return null;
  139 |       const el = overlays[0];
  140 |       return {
  141 |         width: el.style.width,
  142 |         left: el.style.left
  143 |       };
  144 |     });
  145 |
  146 |     expect(p1OverlayDimensions).not.toBeNull();
  147 |     expect(p1OverlayDimensions.width).toBe('50vw');
  148 |     expect(p1OverlayDimensions.left).toBe('0px');
```