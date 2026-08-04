# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/coopFeatures.spec.js >> Co-op Split Screen and Player 2 Features >> should clear both player 1 and player 2 data when progress is deleted
- Location: tests/coopFeatures.spec.js:414:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.waitForNavigation: Test timeout of 30000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
============================================================
```

# Page snapshot

```yaml
- generic:
  - button "Menu" [ref=e3] [cursor=pointer]
  - generic [ref=e5]:
    - heading "ERASE DATA?" [level=3] [ref=e6]
    - paragraph [ref=e7]: Are you sure? This will erase your singleplayer save data.
    - generic [ref=e8]:
      - button "YES" [active] [ref=e9] [cursor=pointer]
      - button "CANCEL" [ref=e10] [cursor=pointer]
```

# Test source

```ts
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
  357 |         notificationCalled = true;
  358 |         notificationMessage = msg;
  359 |         if (origShowModernNotification) {
  360 |           origShowModernNotification(msg, dur);
  361 |         }
  362 |       };
  363 |
  364 |       // Mock required battle state variables to trigger loss flow
  365 |       window.inBattle = true;
  366 |       window.pendingBattleResult = 'loss';
  367 |
  368 |       // Call the closeBattleModal function to trigger handleBattleFinish('loss')
  369 |       if (window.closeBattleModal) {
  370 |         window.closeBattleModal();
  371 |       }
  372 |
  373 |       return {
  374 |         alertCalled,
  375 |         alertMessage,
  376 |         notificationCalled,
  377 |         notificationMessage
  378 |       };
  379 |     });
  380 |
  381 |     // 3. Verify that alert was NOT called, and showModernNotification WAS called with correct text
  382 |     expect(result.alertCalled).toBe(false);
  383 |     expect(result.notificationCalled).toBe(true);
  384 |     expect(result.notificationMessage).toContain('All your creatures fainted');
  385 |   });
  386 |
  387 |   test('should not contain Delete Progress, Exit Game, or Performance Settings in Player 2 menu modal', async ({ page }) => {
  388 |     // 1. Wait for page to load and menu button to be present
  389 |     await page.waitForSelector('#menuBtn', { state: 'visible' });
  390 |
  391 |     // 2. Query elements in P2 menu column
  392 |     const elementsState = await page.evaluate(() => {
  393 |       const p2Col = document.querySelector('#menuModal .p2-col');
  394 |       if (!p2Col) return null;
  395 |
  396 |       const hasDeleteBtn = !!p2Col.querySelector('#menuDeleteBtn_P2');
  397 |       const hasExitBtn = !!p2Col.querySelector('#exitGameBtn_P2');
  398 |       // Performance settings is inside a div containing text 'Performance Settings'
  399 |       const hasPerfSettings = [...p2Col.querySelectorAll('div')].some(d => d.textContent.includes('Performance Settings'));
  400 |
  401 |       return {
  402 |         hasDeleteBtn,
  403 |         hasExitBtn,
  404 |         hasPerfSettings
  405 |       };
  406 |     });
  407 |
  408 |     expect(elementsState).not.toBeNull();
  409 |     expect(elementsState.hasDeleteBtn).toBe(false);
  410 |     expect(elementsState.hasExitBtn).toBe(false);
  411 |     expect(elementsState.hasPerfSettings).toBe(false);
  412 |   });
  413 |
  414 |   test('should clear both player 1 and player 2 data when progress is deleted', async ({ page }) => {
  415 |     // 1. Set dummy values for both players in localStorage
  416 |     await page.evaluate(() => {
  417 |       localStorage.setItem('wildpulse_collected_creatures', JSON.stringify([{ id: 'c1' }]));
  418 |       localStorage.setItem('wildpulse_collected_creatures2', JSON.stringify([{ id: 'c2' }]));
  419 |       localStorage.setItem('wildpulse_player_name', 'Alice');
  420 |       localStorage.setItem('wildpulse_player2_name', 'Bob');
  421 |       localStorage.setItem('wildpulse_player_color', '#111111');
  422 |       localStorage.setItem('wildpulse_player2_color', '#222222');
  423 |       localStorage.setItem('wildpulse_stats', JSON.stringify({ battlesWon: 5 }));
  424 |       localStorage.setItem('wildpulse_stats2', JSON.stringify({ battlesWon: 2 }));
  425 |       localStorage.setItem('wildpulse_coop_active', 'true');
  426 |
  427 |       // Mock confirm to return true
  428 |       window.confirm = () => true;
  429 |     });
  430 |
  431 |     // Execute deleteProgress and wait for navigation (reload)
> 432 |     const navigationPromise = page.waitForNavigation();
      |                                    ^ Error: page.waitForNavigation: Test timeout of 30000ms exceeded.
  433 |     await page.evaluate(() => {
  434 |       window.deleteProgress();
  435 |     });
  436 |     await navigationPromise;
  437 |
  438 |     // 2. Assert that all keys are deleted on reload
  439 |     const keys = await page.evaluate(() => {
  440 |       return {
  441 |         p1Name: localStorage.getItem('wildpulse_player_name'),
  442 |         p2Name: localStorage.getItem('wildpulse_player2_name'),
  443 |         p1Color: localStorage.getItem('wildpulse_player_color'),
  444 |         p2Color: localStorage.getItem('wildpulse_player2_color'),
  445 |         p1Stats: localStorage.getItem('wildpulse_stats'),
  446 |         p2Stats: localStorage.getItem('wildpulse_stats2'),
  447 |         coopActive: localStorage.getItem('wildpulse_coop_active')
  448 |       };
  449 |     });
  450 |
  451 |     expect(keys.p1Name).toBeNull();
  452 |     expect(keys.p2Name).toBeNull();
  453 |     expect(keys.p1Color).not.toBe('#111111');
  454 |     expect(keys.p2Color).not.toBe('#222222');
  455 |     expect(keys.p1Stats).toBeNull();
  456 |     expect(keys.p2Stats).toBeNull();
  457 |     expect(keys.coopActive).toBeNull();
  458 |   });
  459 | });
  460 |
```