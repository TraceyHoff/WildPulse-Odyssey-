# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/coopFeatures.spec.js >> Co-op Split Screen and Player 2 Features >> should trigger trade modal on overlap and prevent re-triggering until leaving the tile
- Location: tests/coopFeatures.spec.js:164:3

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
  - generic: Hospital
  - generic: Hospital
  - button "Menu" [ref=e20]
  - button "Menu" [ref=e21] [cursor=pointer]
  - generic: Co-op split screen enabled!
```

# Test source

```ts
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
  100 |     expect(isStoreOpenAtStart).toBe(true);
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
  146 |     // 3. Move player back onto the store tile (10150, 10150)
  147 |     await page.evaluate(() => {
  148 |       if (window.player) {
  149 |         window.player.x = 10150;
  150 |         window.player.y = 10150;
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
  174 |     // 2. Move Player 1 to trade tile (10050, 10150)
  175 |     await page.evaluate(() => {
  176 |       if (window.player) {
  177 |         window.player.x = 10050;
  178 |         window.player.y = 10150;
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
> 190 |     expect(isTradeOpen).toBe(true);
      |                         ^ Error: expect(received).toBe(expected) // Object.is equality
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
  201 |     // Verify tradeModal is closed
  202 |     const isTradeClosed = await page.evaluate(() => {
  203 |       const modal = document.getElementById('tradeModal');
  204 |       return !modal || window.getComputedStyle(modal).display === 'none';
  205 |     });
  206 |     expect(isTradeClosed).toBe(true);
  207 |
  208 |     // Ensure it doesn't reopen while standing on it
  209 |     await page.waitForTimeout(500);
  210 |     const isTradeStillClosed = await page.evaluate(() => {
  211 |       const modal = document.getElementById('tradeModal');
  212 |       return !modal || window.getComputedStyle(modal).display === 'none';
  213 |     });
  214 |     expect(isTradeStillClosed).toBe(true);
  215 |
  216 |     // Leave trade tile
  217 |     await page.evaluate(() => {
  218 |       if (window.player) {
  219 |         window.player.x = 10550;
  220 |         window.player.y = 10550;
  221 |       }
  222 |     });
  223 |
  224 |     await page.waitForTimeout(500);
  225 |
  226 |     // Verify flags reset
  227 |     const hasResetTradeFlags = await page.evaluate(() => {
  228 |       return window.p1TradeClosedWhileOverlapping === false;
  229 |     });
  230 |     expect(hasResetTradeFlags).toBe(true);
  231 |   });
  232 |
  233 |   test('should trigger PvP battle on overlap and prevent re-triggering until leaving the tile', async ({ page }) => {
  234 |     // 1. Enable co-op first
  235 |     await page.waitForSelector('#menuBtn', { state: 'visible' });
  236 |     await page.click('#menuBtn');
  237 |     await page.waitForSelector('#menuModal', { state: 'visible' });
  238 |     await page.click('#coopToggleBtn');
  239 |
  240 |     // 2. Move Player 1 to pvp tile (10150, 10050)
  241 |     await page.evaluate(() => {
  242 |       if (window.player) {
  243 |         window.player.x = 10150;
  244 |         window.player.y = 10050;
  245 |       }
  246 |     });
  247 |
  248 |     // Wait for overlap detection
  249 |     await page.waitForTimeout(500);
  250 |
  251 |     // Verify battleModal is open (which local PvP opens)
  252 |     const isBattleOpen = await page.evaluate(() => {
  253 |       const modal = document.getElementById('battleModal');
  254 |       return modal && window.getComputedStyle(modal).display !== 'none' && window.isLocalPvp === true;
  255 |     });
  256 |     expect(isBattleOpen).toBe(true);
  257 |
  258 |     // Close PvP battle (ends battle)
  259 |     await page.evaluate(() => {
  260 |       if (window.closePvpModal) {
  261 |         window.closePvpModal();
  262 |       }
  263 |       if (window.endBattle) {
  264 |         window.endBattle('run'); // end battle by running
  265 |       }
  266 |     });
  267 |
  268 |     await page.waitForTimeout(500);
  269 |
  270 |     // Verify battleModal/PvP state is closed/false
  271 |     const isLocalPvpActive = await page.evaluate(() => {
  272 |       return window.isLocalPvp;
  273 |     });
  274 |     expect(isLocalPvpActive).toBe(false);
  275 |
  276 |     // Ensure it doesn't reopen while standing on it
  277 |     await page.waitForTimeout(500);
  278 |     const isPvpReopened = await page.evaluate(() => {
  279 |       return window.isLocalPvp;
  280 |     });
  281 |     expect(isPvpReopened).toBe(false);
  282 |
  283 |     // Leave pvp tile
  284 |     await page.evaluate(() => {
  285 |       if (window.player) {
  286 |         window.player.x = 10550;
  287 |         window.player.y = 10550;
  288 |       }
  289 |     });
  290 |
```