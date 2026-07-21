const { test, expect } = require('@playwright/test');

test.describe('Help Modal Close and Inventory Slots UI Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem('wildpulse_skip_start_modal', 'true');
    });
    await page.goto('http://localhost:3000');
  });

  test('should correctly show/hide inventory slots in singleplayer and co-op', async ({ page }) => {
    // Wait for game to load
    await page.waitForSelector('#menuBtn', { state: 'visible' });

    // 1. Verify Player 1 slots are visible, Player 2 slots are hidden
    const p1SlotsVisible = await page.locator('#p1InventorySlots').isVisible();
    expect(p1SlotsVisible).toBe(true);

    const p2SlotsVisible = await page.locator('#p2InventorySlots').isVisible();
    expect(p2SlotsVisible).toBe(false);

    // Verify exactly 3 slots exist inside both containers
    const p1SlotsCount = await page.locator('#p1InventorySlots .inventory-slot').count();
    expect(p1SlotsCount).toBe(3);

    const p2SlotsCount = await page.locator('#p2InventorySlots .inventory-slot').count();
    expect(p2SlotsCount).toBe(3);

    // 2. Enable co-op and verify Player 2 slots become visible
    await page.click('#menuBtn');
    await page.waitForSelector('#menuModal', { state: 'visible' });
    await page.click('#coopToggleBtn');

    // Wait for body to have class coop-active-layout
    await expect(page.locator('body')).toHaveClass(/coop-active-layout/);

    const p2SlotsVisibleAfterCoop = await page.locator('#p2InventorySlots').isVisible();
    expect(p2SlotsVisibleAfterCoop).toBe(true);

    // 3. Disable co-op and verify Player 2 slots are hidden again
    await page.click('#menuBtn');
    await page.waitForSelector('#menuModal', { state: 'visible' });
    await page.click('#coopToggleBtn');

    await expect(page.locator('body')).not.toHaveClass(/coop-active-layout/);

    const p2SlotsVisibleAfterDisable = await page.locator('#p2InventorySlots').isVisible();
    expect(p2SlotsVisibleAfterDisable).toBe(false);

    // 4. Exit game to main menu and verify both are hidden
    await page.click('#menuBtn');
    await page.waitForSelector('#menuModal', { state: 'visible' });

    // Handle confirm dialog when exiting game
    page.once('dialog', async dialog => {
      await dialog.accept();
    });
    await page.click('#exitGameBtn');

    // Verify both are hidden
    const p1SlotsAfterExit = await page.locator('#p1InventorySlots').isVisible();
    expect(p1SlotsAfterExit).toBe(false);

    const p2SlotsAfterExit = await page.locator('#p2InventorySlots').isVisible();
    expect(p2SlotsAfterExit).toBe(false);
  });

  test('should correctly close Player 2 help modal via the close button in co-op mode', async ({ page }) => {
    // Wait for game to load
    await page.waitForSelector('#menuBtn', { state: 'visible' });

    // Enable co-op
    await page.click('#menuBtn');
    await page.waitForSelector('#menuModal', { state: 'visible' });
    await page.click('#coopToggleBtn');

    // Verify co-op active
    await expect(page.locator('body')).toHaveClass(/coop-active-layout/);

    // Open help modal for Player 2
    await page.evaluate(() => {
      if (window.openHelpModal) window.openHelpModal(2);
    });

    // Verify helpModal is active with class p2-help-active
    const helpModal = page.locator('#helpModal');
    await expect(helpModal).toHaveClass(/p2-help-active/);

    // Click visible close button inside Player 2's help modal
    await page.locator('#helpModal .coop-columns .close-btn.close-help-btn').click();

    // Verify Player 2 help modal is closed (p2ActiveModal is null and class removed)
    const isP2HelpClosed = await page.evaluate(() => {
      return window.p2ActiveModal === null;
    });
    expect(isP2HelpClosed).toBe(true);
    await expect(helpModal).not.toHaveClass(/p2-help-active/);
  });

  test('isPointerOverButton should correctly identify inventory-slot as interactive', async ({ page }) => {
    await page.waitForSelector('#menuBtn', { state: 'visible' });

    const isSlotBlocked = await page.evaluate(() => {
      const slot = document.querySelector('#p1InventorySlots .inventory-slot');
      if (!slot) return null;
      const mockPointer = {
        downEvent: { target: slot },
        event: null
      };
      return window.isPointerOverButton(mockPointer);
    });

    expect(isSlotBlocked).toBe(true);
  });
});
