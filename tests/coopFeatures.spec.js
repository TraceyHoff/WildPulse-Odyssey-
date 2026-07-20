const { test, expect } = require('@playwright/test');

test.describe('Co-op Split Screen and Player 2 Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.clear();
      sessionStorage.setItem('wildpulse_skip_start_modal', 'true');
    });
    await page.goto('http://localhost:3000');
  });

  test('should generate a random Gen 1 starter creature for Player 2 on a new game', async ({ page }) => {
    // Check that Player 2's starting creature exists in local storage
    const p2Creatures = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('wildpulse_collected_creatures2')) || [];
    });
    expect(p2Creatures.length).toBe(1);

    const starter = p2Creatures[0];
    expect(starter.level).toBe(1);
    expect(starter.xp).toBe(0);
    expect(starter.id).toContain('_starter_p2');
    expect(starter.generation === 1 || !starter.generation).toBe(true);
  });

  test('should allow Player 2 to open the menu modal using the Player 2 menu button in split-screen mode', async ({ page }) => {
    // Wait for the game to load and open P1 Menu
    await page.waitForSelector('#menuBtn', { state: 'visible' });
    await page.click('#menuBtn');
    await page.waitForSelector('#menuModal', { state: 'visible' });

    // Enable co-op mode
    await page.click('#coopToggleBtn');
    const isCoopActive = await page.evaluate(() => window.coopActive);
    expect(isCoopActive).toBe(true);

    // After enabling co-op, make sure the Player 2 menu button (#menuBtn_P2) is visible
    await page.waitForSelector('#menuBtn_P2', { state: 'visible' });

    // Click Player 2's menu button
    await page.click('#menuBtn_P2');

    // Verify Player 2's menu column inside menuModal is visible
    const isP2ColumnVisible = await page.evaluate(() => {
      const p2Col = document.querySelector('#menuModal .p2-col');
      return p2Col && window.getComputedStyle(p2Col).display !== 'none';
    });
    expect(isP2ColumnVisible).toBe(true);
  });

  test('should display close button inside challengeModal in split-screen mode', async ({ page }) => {
    // Open menu to enable co-op
    await page.waitForSelector('#menuBtn', { state: 'visible' });
    await page.click('#menuBtn');
    await page.waitForSelector('#menuModal', { state: 'visible' });
    await page.click('#coopToggleBtn');

    // Trigger openChallengeModal for Player 1
    await page.evaluate(() => {
      if (window.openChallengeModal) {
        window.openChallengeModal(window.player);
      }
    });

    // Wait for challengeModal to be visible
    await page.waitForSelector('#challengeModal', { state: 'visible' });

    // Ensure closeChallengeBtn is visible and positioned
    const isCloseBtnVisible = await page.evaluate(() => {
      const btn = document.getElementById('closeChallengeBtn');
      return btn && window.getComputedStyle(btn).display !== 'none';
    });
    expect(isCloseBtnVisible).toBe(true);
  });

  test('should prevent opening multiple modals simultaneously and prevent re-opening closed modal until leaving the tile', async ({ page }) => {
    // Capture and print console logs from the page
    page.on('console', msg => {
      console.log('BROWSER LOG:', msg.text());
    });

    await page.waitForSelector('#menuBtn', { state: 'visible' });

    // 1. Move player to the store tile coordinates (10150, 10150)
    await page.evaluate(() => {
      if (window.player) {
        window.player.x = 10150;
        window.player.y = 10150;
      }
    });

    // Wait for Phaser's physics engine to register the overlap and automatically open the store modal
    await page.waitForTimeout(500);

    // Verify storeModal is now open automatically
    const isStoreOpenAtStart = await page.evaluate(() => {
      const store = document.getElementById('storeModal');
      return store && window.getComputedStyle(store).display !== 'none';
    });
    expect(isStoreOpenAtStart).toBe(true);

    // Close the store modal (simulating player closing it while still standing on the tile)
    await page.evaluate(() => {
      if (window.closeStoreModal) {
        window.closeStoreModal();
      }
    });

    // Wait for the modal fade-out transition/setTimeout (190ms) to complete (increased to 500ms for safety under CPU load)
    await page.waitForTimeout(500);

    // Verify storeModal is now closed
    const isStoreClosedAfterClosing = await page.evaluate(() => {
      const store = document.getElementById('storeModal');
      return !store || window.getComputedStyle(store).display === 'none';
    });
    expect(isStoreClosedAfterClosing).toBe(true);

    // Wait another 500ms to ensure the physics engine has processed multiple frames
    // while the player remains on the tile. The store modal should remain closed.
    await page.waitForTimeout(500);

    const isStoreStillClosedOnTile = await page.evaluate(() => {
      const store = document.getElementById('storeModal');
      return !store || window.getComputedStyle(store).display === 'none';
    });
    expect(isStoreStillClosedOnTile).toBe(true);

    // 2. Simulate leaving the tile by moving player away to (10550, 10550)
    await page.evaluate(() => {
      if (window.player) {
        window.player.x = 10550;
        window.player.y = 10550;
      }
    });

    // Wait for Phaser loop to process the new position and clear the closed flag
    await page.waitForTimeout(500);

    // Verify closed flag has reset
    const hasResetFlag = await page.evaluate(() => {
      return window.p1StoreClosedWhileOverlapping === false;
    });
    expect(hasResetFlag).toBe(true);

    // 3. Move player back onto the store tile (10150, 10150)
    await page.evaluate(() => {
      if (window.player) {
        window.player.x = 10150;
        window.player.y = 10150;
      }
    });

    // Wait for Phaser loop to detect overlap and open the store modal again
    await page.waitForTimeout(500);

    const isStoreOpenOnReentry = await page.evaluate(() => {
      const store = document.getElementById('storeModal');
      return store && window.getComputedStyle(store).display !== 'none';
    });
    expect(isStoreOpenOnReentry).toBe(true);
  });

  test('should trigger trade modal on overlap and prevent re-triggering until leaving the tile', async ({ page }) => {
    // 1. Enable co-op first so we can trade
    await page.waitForSelector('#menuBtn', { state: 'visible' });
    await page.click('#menuBtn');
    await page.waitForSelector('#menuModal', { state: 'visible' });
    await page.click('#coopToggleBtn');

    const isCoopActive = await page.evaluate(() => window.coopActive);
    expect(isCoopActive).toBe(true);

    // 2. Move Player 1 to trade tile (10050, 10150)
    await page.evaluate(() => {
      if (window.player) {
        window.player.x = 10050;
        window.player.y = 10150;
      }
    });

    // Wait for overlap detection
    await page.waitForTimeout(500);

    // Verify tradeModal is open
    const isTradeOpen = await page.evaluate(() => {
      const modal = document.getElementById('tradeModal');
      return modal && window.getComputedStyle(modal).display !== 'none';
    });
    expect(isTradeOpen).toBe(true);

    // Close trade modal
    await page.evaluate(() => {
      if (window.closeTradeModal) {
        window.closeTradeModal();
      }
    });

    await page.waitForTimeout(500);

    // Verify tradeModal is closed
    const isTradeClosed = await page.evaluate(() => {
      const modal = document.getElementById('tradeModal');
      return !modal || window.getComputedStyle(modal).display === 'none';
    });
    expect(isTradeClosed).toBe(true);

    // Ensure it doesn't reopen while standing on it
    await page.waitForTimeout(500);
    const isTradeStillClosed = await page.evaluate(() => {
      const modal = document.getElementById('tradeModal');
      return !modal || window.getComputedStyle(modal).display === 'none';
    });
    expect(isTradeStillClosed).toBe(true);

    // Leave trade tile
    await page.evaluate(() => {
      if (window.player) {
        window.player.x = 10550;
        window.player.y = 10550;
      }
    });

    await page.waitForTimeout(500);

    // Verify flags reset
    const hasResetTradeFlags = await page.evaluate(() => {
      return window.p1TradeClosedWhileOverlapping === false;
    });
    expect(hasResetTradeFlags).toBe(true);
  });

  test('should trigger PvP battle on overlap and prevent re-triggering until leaving the tile', async ({ page }) => {
    // 1. Enable co-op first
    await page.waitForSelector('#menuBtn', { state: 'visible' });
    await page.click('#menuBtn');
    await page.waitForSelector('#menuModal', { state: 'visible' });
    await page.click('#coopToggleBtn');

    // 2. Move Player 1 to pvp tile (10150, 10050)
    await page.evaluate(() => {
      if (window.player) {
        window.player.x = 10150;
        window.player.y = 10050;
      }
    });

    // Wait for overlap detection
    await page.waitForTimeout(500);

    // Verify battleModal is open (which local PvP opens)
    const isBattleOpen = await page.evaluate(() => {
      const modal = document.getElementById('battleModal');
      return modal && window.getComputedStyle(modal).display !== 'none' && window.isLocalPvp === true;
    });
    expect(isBattleOpen).toBe(true);

    // Close PvP battle (ends battle)
    await page.evaluate(() => {
      if (window.closePvpModal) {
        window.closePvpModal();
      }
      if (window.endBattle) {
        window.endBattle('run'); // end battle by running
      }
    });

    await page.waitForTimeout(500);

    // Verify battleModal/PvP state is closed/false
    const isLocalPvpActive = await page.evaluate(() => {
      return window.isLocalPvp;
    });
    expect(isLocalPvpActive).toBe(false);

    // Ensure it doesn't reopen while standing on it
    await page.waitForTimeout(500);
    const isPvpReopened = await page.evaluate(() => {
      return window.isLocalPvp;
    });
    expect(isPvpReopened).toBe(false);

    // Leave pvp tile
    await page.evaluate(() => {
      if (window.player) {
        window.player.x = 10550;
        window.player.y = 10550;
      }
    });

    await page.waitForTimeout(500);

    // Verify flags reset
    const hasResetPvpFlags = await page.evaluate(() => {
      return window.p1PvpClosedWhileOverlapping === false;
    });
    expect(hasResetPvpFlags).toBe(true);
  });

  test('should spawn both Player 1 and Player 2 on the tile directly above the hospital (10050, 9950) when starting a new game in split-screen co-op', async ({ page }) => {
    // 1. Ensure page loads fresh with clear local storage (already done in beforeEach)
    await page.waitForSelector('#menuBtn', { state: 'visible' });

    // 2. Open menu and enable co-op
    await page.click('#menuBtn');
    await page.waitForSelector('#menuModal', { state: 'visible' });
    await page.click('#coopToggleBtn');

    // 3. Verify coopActive is true
    const isCoopActive = await page.evaluate(() => window.coopActive);
    expect(isCoopActive).toBe(true);

    // 4. Retrieve positions of Player 1 and Player 2
    const p1Pos = await page.evaluate(() => {
      return window.player ? { x: window.player.x, y: window.player.y } : null;
    });
    const p2Pos = await page.evaluate(() => {
      return window.player2 ? { x: window.player2.x, y: window.player2.y } : null;
    });

    expect(p1Pos).not.toBeNull();
    expect(p2Pos).not.toBeNull();

    // 5. Assert that both players spawned on the tile directly above the hospital tile (10050, 9950)
    expect(p1Pos.x).toBe(10050);
    expect(p1Pos.y).toBe(9950);
    expect(p2Pos.x).toBe(10050);
    expect(p2Pos.y).toBe(9950);

    // 6. Assert that player coordinates are saved correctly in localStorage
    const savedX = await page.evaluate(() => localStorage.getItem('wildpulse_player_x'));
    const savedY = await page.evaluate(() => localStorage.getItem('wildpulse_player_y'));
    expect(parseFloat(savedX)).toBe(10050);
    expect(parseFloat(savedY)).toBe(9950);
  });

  test('should assert that when combat ends with a loss, showModernNotification is called instead of alert', async ({ page }) => {
    // 1. Wait for page load
    await page.waitForSelector('#menuBtn', { state: 'visible' });

    // 2. Set up mocks for alert and showModernNotification, then trigger a defeat
    const result = await page.evaluate(() => {
      let alertCalled = false;
      let alertMessage = '';
      let notificationCalled = false;
      let notificationMessage = '';

      // Override alert
      window.alert = (msg) => {
        alertCalled = true;
        alertMessage = msg;
      };

      // Spy on showModernNotification
      const origShowModernNotification = window.showModernNotification;
      window.showModernNotification = (msg, dur) => {
        notificationCalled = true;
        notificationMessage = msg;
        if (origShowModernNotification) {
          origShowModernNotification(msg, dur);
        }
      };

      // Mock required battle state variables to trigger loss flow
      window.inBattle = true;
      window.pendingBattleResult = 'loss';

      // Call the closeBattleModal function to trigger handleBattleFinish('loss')
      if (window.closeBattleModal) {
        window.closeBattleModal();
      }

      return {
        alertCalled,
        alertMessage,
        notificationCalled,
        notificationMessage
      };
    });

    // 3. Verify that alert was NOT called, and showModernNotification WAS called with correct text
    expect(result.alertCalled).toBe(false);
    expect(result.notificationCalled).toBe(true);
    expect(result.notificationMessage).toContain('All your creatures fainted');
  });

  test('should not contain Delete Progress, Exit Game, or Performance Settings in Player 2 menu modal', async ({ page }) => {
    // 1. Wait for page to load and menu button to be present
    await page.waitForSelector('#menuBtn', { state: 'visible' });

    // 2. Query elements in P2 menu column
    const elementsState = await page.evaluate(() => {
      const p2Col = document.querySelector('#menuModal .p2-col');
      if (!p2Col) return null;

      const hasDeleteBtn = !!p2Col.querySelector('#menuDeleteBtn_P2');
      const hasExitBtn = !!p2Col.querySelector('#exitGameBtn_P2');
      // Performance settings is inside a div containing text 'Performance Settings'
      const hasPerfSettings = [...p2Col.querySelectorAll('div')].some(d => d.textContent.includes('Performance Settings'));

      return {
        hasDeleteBtn,
        hasExitBtn,
        hasPerfSettings
      };
    });

    expect(elementsState).not.toBeNull();
    expect(elementsState.hasDeleteBtn).toBe(false);
    expect(elementsState.hasExitBtn).toBe(false);
    expect(elementsState.hasPerfSettings).toBe(false);
  });

  test('should clear both player 1 and player 2 data when progress is deleted', async ({ page }) => {
    // 1. Set dummy values for both players in localStorage
    await page.evaluate(() => {
      localStorage.setItem('wildpulse_collected_creatures', JSON.stringify([{ id: 'c1' }]));
      localStorage.setItem('wildpulse_collected_creatures2', JSON.stringify([{ id: 'c2' }]));
      localStorage.setItem('wildpulse_player_name', 'Alice');
      localStorage.setItem('wildpulse_player2_name', 'Bob');
      localStorage.setItem('wildpulse_player_color', '#111111');
      localStorage.setItem('wildpulse_player2_color', '#222222');
      localStorage.setItem('wildpulse_stats', JSON.stringify({ battlesWon: 5 }));
      localStorage.setItem('wildpulse_stats2', JSON.stringify({ battlesWon: 2 }));
      localStorage.setItem('wildpulse_coop_active', 'true');

      // Mock confirm to return true
      window.confirm = () => true;
    });

    // Execute deleteProgress and wait for navigation (reload)
    const navigationPromise = page.waitForNavigation();
    await page.evaluate(() => {
      window.deleteProgress();
    });
    await navigationPromise;

    // 2. Assert that all keys are deleted on reload
    const keys = await page.evaluate(() => {
      return {
        p1Name: localStorage.getItem('wildpulse_player_name'),
        p2Name: localStorage.getItem('wildpulse_player2_name'),
        p1Color: localStorage.getItem('wildpulse_player_color'),
        p2Color: localStorage.getItem('wildpulse_player2_color'),
        p1Stats: localStorage.getItem('wildpulse_stats'),
        p2Stats: localStorage.getItem('wildpulse_stats2'),
        coopActive: localStorage.getItem('wildpulse_coop_active')
      };
    });

    expect(keys.p1Name).toBeNull();
    expect(keys.p2Name).toBeNull();
    expect(keys.p1Color).toBeNull();
    expect(keys.p2Color).toBeNull();
    expect(keys.p1Stats).toBeNull();
    expect(keys.p2Stats).toBeNull();
    expect(keys.coopActive).toBeNull();
  });
});
