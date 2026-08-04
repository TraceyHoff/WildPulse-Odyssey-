# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/coopFeatures.spec.js >> Co-op Split Screen and Player 2 Features >> should prevent opening multiple modals simultaneously and prevent re-opening closed modal until leaving the tile
- Location: tests/coopFeatures.spec.js:76:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

# Page snapshot

```yaml
- generic [active]:
  - generic [ref=e3]:
    - 'generic "Healing Juice Bottle: Click to use" [ref=e5]':
      - text: 🧪
      - generic [ref=e6]: "2"
    - 'generic "Creature License: Click to use" [ref=e8]':
      - text: 🎫
      - generic [ref=e9]: "1"
  - generic:
    - img
    - generic: Hospital
  - button "Menu" [ref=e11]
  - generic: Press A, Click, or Tap to interact with STORE
```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   |
  3   | test.describe('Co-op Split Screen and Player 2 Features', () => {
  4   |   test.beforeEach(async ({ page }) => {
  5   |     await page.addInitScript(() => {
  6   |       localStorage.clear();
  7   |       sessionStorage.setItem('wildpulse_skip_start_modal', 'true');
  8   |     });
  9   |     await page.goto('http://localhost:3000');
  10  |   });
  11  |
  12  |   test('should generate a random Gen 1 starter creature for Player 2 on a new game', async ({ page }) => {
  13  |     // Check that Player 2's starting creature exists in local storage
  14  |     const p2Creatures = await page.evaluate(() => {
  15  |       return JSON.parse(localStorage.getItem('wildpulse_collected_creatures2')) || [];
  16  |     });
  17  |     expect(p2Creatures.length).toBe(1);
  18  |
  19  |     const starter = p2Creatures[0];
  20  |     expect(starter.level).toBe(1);
  21  |     expect(starter.xp).toBe(0);
  22  |     expect(starter.id).toContain('_starter_p2');
  23  |     expect(starter.generation === 1 || !starter.generation).toBe(true);
  24  |   });
  25  |
  26  |   test('should allow Player 2 to open the menu modal using the Player 2 menu button in split-screen mode', async ({ page }) => {
  27  |     // Wait for the game to load and open P1 Menu
  28  |     await page.waitForSelector('#menuBtn', { state: 'visible' });
  29  |     await page.click('#menuBtn');
  30  |     await page.waitForSelector('#menuModal', { state: 'visible' });
  31  |
  32  |     // Enable co-op mode
  33  |     await page.click('#coopToggleBtn');
  34  |     const isCoopActive = await page.evaluate(() => window.coopActive);
  35  |     expect(isCoopActive).toBe(true);
  36  |
  37  |     // After enabling co-op, make sure the Player 2 menu button (#menuBtn_P2) is visible
  38  |     await page.waitForSelector('#menuBtn_P2', { state: 'visible' });
  39  |
  40  |     // Click Player 2's menu button
  41  |     await page.click('#menuBtn_P2');
  42  |
  43  |     // Verify Player 2's menu column inside menuModal is visible
  44  |     const isP2ColumnVisible = await page.evaluate(() => {
  45  |       const p2Col = document.querySelector('#menuModal .p2-col');
  46  |       return p2Col && window.getComputedStyle(p2Col).display !== 'none';
  47  |     });
  48  |     expect(isP2ColumnVisible).toBe(true);
  49  |   });
  50  |
  51  |   test('should display close button inside challengeModal in split-screen mode', async ({ page }) => {
  52  |     // Open menu to enable co-op
  53  |     await page.waitForSelector('#menuBtn', { state: 'visible' });
  54  |     await page.click('#menuBtn');
  55  |     await page.waitForSelector('#menuModal', { state: 'visible' });
  56  |     await page.click('#coopToggleBtn');
  57  |
  58  |     // Trigger openChallengeModal for Player 1
  59  |     await page.evaluate(() => {
  60  |       if (window.openChallengeModal) {
  61  |         window.openChallengeModal(window.player);
  62  |       }
  63  |     });
  64  |
  65  |     // Wait for challengeModal to be visible
  66  |     await page.waitForSelector('#challengeModal', { state: 'visible' });
  67  |
  68  |     // Ensure closeChallengeBtn is visible and positioned
  69  |     const isCloseBtnVisible = await page.evaluate(() => {
  70  |       const btn = document.getElementById('closeChallengeBtn');
  71  |       return btn && window.getComputedStyle(btn).display !== 'none';
  72  |     });
  73  |     expect(isCloseBtnVisible).toBe(true);
  74  |   });
  75  |
  76  |   test('should prevent opening multiple modals simultaneously and prevent re-opening closed modal until leaving the tile', async ({ page }) => {
  77  |     // Capture and print console logs from the page
  78  |     page.on('console', msg => {
  79  |       console.log('BROWSER LOG:', msg.text());
  80  |     });
  81  |
  82  |     await page.waitForSelector('#menuBtn', { state: 'visible' });
  83  |
  84  |     // 1. Move player to the store tile coordinates (10350, 10350)
  85  |     await page.evaluate(() => {
  86  |       if (window.player) {
  87  |         window.player.x = 10350;
  88  |         window.player.y = 10350;
  89  |       }
  90  |     });
  91  |
  92  |     // Wait for Phaser's physics engine to register the overlap and automatically open the store modal
  93  |     await page.waitForTimeout(500);
  94  |
  95  |     // Verify storeModal is now open automatically
  96  |     const isStoreOpenAtStart = await page.evaluate(() => {
  97  |       const store = document.getElementById('storeModal');
  98  |       return store && window.getComputedStyle(store).display !== 'none';
  99  |     });
> 100 |     expect(isStoreOpenAtStart).toBe(true);
      |                                ^ Error: expect(received).toBe(expected) // Object.is equality
  101 |
  102 |     // Close the store modal (simulating player closing it while still standing on the tile)
  103 |     await page.evaluate(() => {
  104 |       if (window.closeStoreModal) {
  105 |         window.closeStoreModal();
  106 |       }
  107 |     });
  108 |
  109 |     // Wait for the modal fade-out transition/setTimeout (190ms) to complete (increased to 500ms for safety under CPU load)
  110 |     await page.waitForTimeout(500);
  111 |
  112 |     // Verify storeModal is now closed
  113 |     const isStoreClosedAfterClosing = await page.evaluate(() => {
  114 |       const store = document.getElementById('storeModal');
  115 |       return !store || window.getComputedStyle(store).display === 'none';
  116 |     });
  117 |     expect(isStoreClosedAfterClosing).toBe(true);
  118 |
  119 |     // Wait another 500ms to ensure the physics engine has processed multiple frames
  120 |     // while the player remains on the tile. The store modal should remain closed.
  121 |     await page.waitForTimeout(500);
  122 |
  123 |     const isStoreStillClosedOnTile = await page.evaluate(() => {
  124 |       const store = document.getElementById('storeModal');
  125 |       return !store || window.getComputedStyle(store).display === 'none';
  126 |     });
  127 |     expect(isStoreStillClosedOnTile).toBe(true);
  128 |
  129 |     // 2. Simulate leaving the tile by moving player away to (10550, 10550)
  130 |     await page.evaluate(() => {
  131 |       if (window.player) {
  132 |         window.player.x = 10550;
  133 |         window.player.y = 10550;
  134 |       }
  135 |     });
  136 |
  137 |     // Wait for Phaser loop to process the new position and clear the closed flag
  138 |     await page.waitForTimeout(500);
  139 |
  140 |     // Verify closed flag has reset
  141 |     const hasResetFlag = await page.evaluate(() => {
  142 |       return window.p1StoreClosedWhileOverlapping === false;
  143 |     });
  144 |     expect(hasResetFlag).toBe(true);
  145 |
  146 |     // 3. Move player back onto the store tile (10350, 10350)
  147 |     await page.evaluate(() => {
  148 |       if (window.player) {
  149 |         window.player.x = 10350;
  150 |         window.player.y = 10350;
  151 |       }
  152 |     });
  153 |
  154 |     // Wait for Phaser loop to detect overlap and open the store modal again
  155 |     await page.waitForTimeout(500);
  156 |
  157 |     const isStoreOpenOnReentry = await page.evaluate(() => {
  158 |       const store = document.getElementById('storeModal');
  159 |       return store && window.getComputedStyle(store).display !== 'none';
  160 |     });
  161 |     expect(isStoreOpenOnReentry).toBe(true);
  162 |   });
  163 |
  164 |   test('should trigger trade modal on overlap and prevent re-triggering until leaving the tile', async ({ page }) => {
  165 |     // 1. Enable co-op first so we can trade
  166 |     await page.waitForSelector('#menuBtn', { state: 'visible' });
  167 |     await page.click('#menuBtn');
  168 |     await page.waitForSelector('#menuModal', { state: 'visible' });
  169 |     await page.click('#coopToggleBtn');
  170 |
  171 |     const isCoopActive = await page.evaluate(() => window.coopActive);
  172 |     expect(isCoopActive).toBe(true);
  173 |
  174 |     // 2. Move Player 1 to trade tile (10050, 10350)
  175 |     await page.evaluate(() => {
  176 |       if (window.player) {
  177 |         window.player.x = 10050;
  178 |         window.player.y = 10350;
  179 |       }
  180 |     });
  181 |
  182 |     // Wait for overlap detection
  183 |     await page.waitForTimeout(500);
  184 |
  185 |     // Verify tradeModal is open
  186 |     const isTradeOpen = await page.evaluate(() => {
  187 |       const modal = document.getElementById('tradeModal');
  188 |       return modal && window.getComputedStyle(modal).display !== 'none';
  189 |     });
  190 |     expect(isTradeOpen).toBe(true);
  191 |
  192 |     // Close trade modal
  193 |     await page.evaluate(() => {
  194 |       if (window.closeTradeModal) {
  195 |         window.closeTradeModal();
  196 |       }
  197 |     });
  198 |
  199 |     await page.waitForTimeout(500);
  200 |
```