const { test, expect } = require('@playwright/test');

test.describe('New Player Stats and Home Relocation/Removal System', () => {
  test.beforeEach(async ({ page }) => {
    // Listen to console logs
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));

    // Navigate to establishing origin and setting default localStorage
    await page.goto('http://localhost:3000');
    await page.evaluate(() => {
      localStorage.clear();
      // Set levels so they can place home and breed
      localStorage.setItem('wildpulse_p1_level', '12');
      localStorage.setItem('wildpulse_p2_level', '12');
    });
    await page.reload();

    // Dismiss start modal by clicking Single Player
    const startBtn = page.locator('#startGameBtn');
    if (await startBtn.isVisible()) {
      await startBtn.click();
    }
    // Dismiss onboarding intro modal if visible
    const introClose = page.locator('#introModal .close-btn');
    if (await introClose.isVisible()) {
      await introClose.click();
    }

    // Wait for the game to fully start and initialize
    await page.waitForFunction(() => window.gameStarted);
  });

  test('should display P1 and P2 stats symmetrically in stats tabs', async ({ page }) => {
    // Open action wheel, then party
    await page.keyboard.press('q');
    await page.click('[data-option="party"]', { force: true });

    // Directly call the tab switch function for Player 1 and Player 2 to ensure state updates
    await page.evaluate(() => {
      window.switchPartyTab('stats', 1);
      window.switchPartyTab('stats', 2);
    });

    // Verify stats content has "Player 1" and shows default stats
    const p1StatsContent = page.locator('#statsTabContent_P1');
    await expect(p1StatsContent).toContainText('Game Stats (Player 1)');
    await expect(p1StatsContent).toContainText('Distance Traveled:');

    // Symmetrically check Player 2 stats content
    const p2StatsContent = page.locator('#statsTabContent_P2');
    await expect(p2StatsContent).toContainText('Game Stats (Player 2)');
  });

  test('should allow navigating modal tabs using gamepad D-pad Left and Right', async ({ page }) => {
    // Open action wheel, then party
    await page.keyboard.press('q');
    await page.click('[data-option="party"]', { force: true });

    // Verify initially the Party tab content is visible and Stats tab is hidden
    const p1PartyContent = page.locator('#partyTabContent_P1');
    const p1StatsContent = page.locator('#statsTabContent_P1');
    await expect(p1PartyContent).toBeVisible();
    await expect(p1StatsContent).toBeHidden();

    // Simulate Gamepad D-pad Right (button 15) to navigate to Stats tab
    await page.evaluate(() => {
      const mockPad = {
        buttons: Array(16).fill(null).map((_, i) => ({ pressed: i === 15 })),
        axes: [0, 0, 0, 0]
      };
      if (window.processGamepadInputForPlayer) {
        window.processGamepadInputForPlayer(1, mockPad);
      }
    });

    // Stats tab should now be visible and Party tab hidden
    await expect(p1StatsContent).toBeVisible();
    await expect(p1PartyContent).toBeHidden();

    // Simulate Gamepad D-pad Left (button 14) to navigate back to Party tab
    await page.evaluate(() => {
      const mockPad = {
        buttons: Array(16).fill(null).map((_, i) => ({ pressed: i === 14 })),
        axes: [0, 0, 0, 0]
      };
      if (window.processGamepadInputForPlayer) {
        window.processGamepadInputForPlayer(1, mockPad);
      }
    });

    // Party tab should be visible again
    await expect(p1PartyContent).toBeVisible();
    await expect(p1StatsContent).toBeHidden();
  });

  test('should warning player on placing a second home and remove existing', async ({ page }) => {
    // Set an initial placed home in localStorage dynamically without reload
    await page.evaluate(() => {
      localStorage.setItem('wildpulse_p1_home_x', '1500');
      localStorage.setItem('wildpulse_p1_home_y', '1500');
    });

    // Trigger tryPlaceHome for P1 to place a new one at a different spot
    await page.evaluate(() => {
      if (window.tryPlaceHome) {
        window.tryPlaceHome(1, 2000, 2000);
      }
    });

    // Verify that the custom warning modal pops up
    const confirmModal = page.locator('#customConfirmModal_p1');
    await expect(confirmModal).toBeVisible();
    await expect(confirmModal).toContainText('Confirm Relocation');
    await expect(confirmModal).toContainText('You already have a home placed');

    // Click Yes to relocate
    await page.click('#customConfirmYesBtn_p1', { force: true });

    // Check if new home coordinates are saved
    const newX = await page.evaluate(() => localStorage.getItem('wildpulse_p1_home_x'));
    expect(newX).toBe('2050'); // Snapped (2000 / 100) * 100 + 50
  });

  test('should allow removing a placed home sprite and clearing localStorage', async ({ page }) => {
    // Set a placed home dynamically without reload
    await page.evaluate(() => {
      localStorage.setItem('wildpulse_p1_home_x', '1500');
      localStorage.setItem('wildpulse_p1_home_y', '1500');
    });

    // Verify it exists in localStorage
    let homeX = await page.evaluate(() => localStorage.getItem('wildpulse_p1_home_x'));
    expect(homeX).toBe('1500');

    // Execute the remove_home Action Wheel option
    await page.evaluate(() => {
      if (window.useActionWheelOption) {
        window.useActionWheelOption(1, 'remove_home');
      }
    });

    // Warning confirmation modal should show
    const confirmModal = page.locator('#customConfirmModal_p1');
    await expect(confirmModal).toBeVisible();
    await expect(confirmModal).toContainText('Remove Home');

    // Click Yes to remove
    await page.click('#customConfirmYesBtn_p1', { force: true });

    // Verify localStorage has been cleared
    const clearedX = await page.evaluate(() => localStorage.getItem('wildpulse_p1_home_x'));
    expect(clearedX).toBeNull();
  });
});
