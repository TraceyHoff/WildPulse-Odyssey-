# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/coopFeatures.spec.js >> Co-op Split Screen and Player 2 Features >> should trigger PvP battle on overlap and prevent re-triggering until leaving the tile
- Location: tests/coopFeatures.spec.js:233:3

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
  - generic: Press A, Click, or Tap to interact with PVP
```

# Test source

```ts
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
  240 |     // 2. Move Player 1 to pvp tile (10350, 10050)
  241 |     await page.evaluate(() => {
  242 |       if (window.player) {
  243 |         window.player.x = 10350;
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
> 256 |     expect(isBattleOpen).toBe(true);
      |                          ^ Error: expect(received).toBe(expected) // Object.is equality
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
  291 |     await page.waitForTimeout(500);
  292 |
  293 |     // Verify flags reset
  294 |     const hasResetPvpFlags = await page.evaluate(() => {
  295 |       return window.p1PvpClosedWhileOverlapping === false;
  296 |     });
  297 |     expect(hasResetPvpFlags).toBe(true);
  298 |   });
  299 |
  300 |   test('should spawn both Player 1 and Player 2 on the tile directly above the hospital (10050, 9950) when starting a new game in split-screen co-op', async ({ page }) => {
  301 |     // 1. Ensure page loads fresh with clear local storage (already done in beforeEach)
  302 |     await page.waitForSelector('#menuBtn', { state: 'visible' });
  303 |
  304 |     // 2. Open menu and enable co-op
  305 |     await page.click('#menuBtn');
  306 |     await page.waitForSelector('#menuModal', { state: 'visible' });
  307 |     await page.click('#coopToggleBtn');
  308 |
  309 |     // 3. Verify coopActive is true
  310 |     const isCoopActive = await page.evaluate(() => window.coopActive);
  311 |     expect(isCoopActive).toBe(true);
  312 |
  313 |     // 4. Retrieve positions of Player 1 and Player 2
  314 |     const p1Pos = await page.evaluate(() => {
  315 |       return window.player ? { x: window.player.x, y: window.player.y } : null;
  316 |     });
  317 |     const p2Pos = await page.evaluate(() => {
  318 |       return window.player2 ? { x: window.player2.x, y: window.player2.y } : null;
  319 |     });
  320 |
  321 |     expect(p1Pos).not.toBeNull();
  322 |     expect(p2Pos).not.toBeNull();
  323 |
  324 |     // 5. Assert that both players spawned on the tile directly above the hospital tile (10050, 9950)
  325 |     expect(p1Pos.x).toBe(10050);
  326 |     expect(p1Pos.y).toBe(9950);
  327 |     expect(p2Pos.x).toBe(10050);
  328 |     expect(p2Pos.y).toBe(9950);
  329 |
  330 |     // 6. Assert that player coordinates are saved correctly in localStorage
  331 |     const savedX = await page.evaluate(() => localStorage.getItem('wildpulse_player_x'));
  332 |     const savedY = await page.evaluate(() => localStorage.getItem('wildpulse_player_y'));
  333 |     expect(parseFloat(savedX)).toBe(10050);
  334 |     expect(parseFloat(savedY)).toBe(9950);
  335 |   });
  336 |
  337 |   test('should assert that when combat ends with a loss, showModernNotification is called instead of alert', async ({ page }) => {
  338 |     // 1. Wait for page load
  339 |     await page.waitForSelector('#menuBtn', { state: 'visible' });
  340 |
  341 |     // 2. Set up mocks for alert and showModernNotification, then trigger a defeat
  342 |     const result = await page.evaluate(() => {
  343 |       let alertCalled = false;
  344 |       let alertMessage = '';
  345 |       let notificationCalled = false;
  346 |       let notificationMessage = '';
  347 |
  348 |       // Override alert
  349 |       window.alert = (msg) => {
  350 |         alertCalled = true;
  351 |         alertMessage = msg;
  352 |       };
  353 |
  354 |       // Spy on showModernNotification
  355 |       const origShowModernNotification = window.showModernNotification;
  356 |       window.showModernNotification = (msg, dur) => {
```