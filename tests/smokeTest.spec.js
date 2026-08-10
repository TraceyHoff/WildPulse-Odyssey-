const { test, expect } = require('@playwright/test');

test.describe('Lightweight Cyber-Bestiary & deterministic Seeding Smoke Test', () => {
  test('should boot the game, enable co-op split-screen, open all major modals symmetrically, and verify no uncaught errors or missing DOM elements', async ({ page }) => {
    const errors = [];
    page.on('pageerror', exception => {
      const msg = exception.message || '';
      // Ignore standard headless/Tone.js audio scheduling warnings
      if (msg.includes('Start time must be strictly greater than')) {
        return;
      }
      errors.push(msg);
    });

    // 1. Navigate to the game
    await page.goto('http://localhost:3000');

    // 2. Set Level 7 (to access Breeding & Storage)
    await page.evaluate(() => {
      localStorage.setItem('wildpulse_p1_level', '7');
      localStorage.setItem('wildpulse_p2_level', '7');
    });
    await page.reload();

    // 3. Start the game / Dismiss modals
    const startBtn = page.locator('#startGameBtn');
    if (await startBtn.isVisible()) {
      await startBtn.click();
    }
    const introClose = page.locator('#introModal .close-btn');
    if (await introClose.isVisible()) {
      await introClose.click();
    }

    // Wait for the game to start
    await page.waitForFunction(() => window.gameStarted);

    // 4. Open Menu and toggle co-op split-screen
    const menuBtn = page.locator('#menuBtn');
    await menuBtn.click();
    await expect(page.locator('#menuModal')).toBeVisible();

    const coopToggle = page.locator('#coopToggleBtn');
    await coopToggle.click();
    await expect(page.locator('body')).toHaveClass(/coop-active-layout/);

    // Close Menu Modal
    await page.evaluate(() => window.closeMenuModal(1));
    await expect(page.locator('#menuModal')).not.toBeVisible();

    // 5. Open and test all major modals
    const modalsToTest = [
      {
        name: 'Help Modal',
        openFn: () => window.openHelpModal(1),
        closeFn: () => window.closeHelpModal(1),
        id: '#helpModal'
      },
      {
        name: 'Store Modal',
        openFn: () => window.openStoreModal(window.player),
        closeFn: () => window.closeStoreModal(),
        id: '#storeModal'
      },
      {
        name: 'Breeding Modal',
        openFn: () => window.openBreedingModal(1),
        closeFn: () => window.closeBreedingModal(1),
        id: '#breedingModal'
      },
      {
        name: 'Party Modal',
        openFn: () => window.openPartyModal(1),
        closeFn: () => window.closePartyModal(1),
        id: '#partyModal'
      },
      {
        name: 'PC Storage Modal',
        openFn: () => window.openStorageModal(1),
        closeFn: () => window.closeStorageModal(1),
        id: '#storageModal'
      },
      {
        name: 'Challenge/Arena Modal',
        openFn: () => window.openChallengeModal(window.player),
        closeFn: () => window.closeChallengeModal(),
        id: '#challengeModal'
      },
      {
        name: 'Dojo Modal',
        openFn: () => {
          window.dojoTier = 1;
          window.openDojoModal(window.player, 1);
        },
        closeFn: () => window.closeDojoModal(1),
        id: '#dojoModal'
      },
      {
        name: 'Player 1 Customization Modal',
        openFn: () => window.openCustomizationModal(1),
        closeFn: () => window.closeCustomizationModal(1),
        id: '#customizationModal'
      },
      {
        name: 'Journal/Bestiary Modal',
        openFn: () => window.openJournalModal(1),
        closeFn: () => window.closeJournalModal(1),
        id: '#journalModal'
      }
    ];

    for (const m of modalsToTest) {
      // Open modal
      await page.evaluate(m.openFn);
      // Wait for modal to be visible
      await expect(page.locator(m.id)).toBeVisible();
      // Close modal
      await page.evaluate(m.closeFn);
      // Wait for modal to be hidden or closed
      await expect(page.locator(m.id)).not.toBeVisible();
    }

    // 6. Symmetrically assert co-op layout features are intact
    const hasP1Bestiary = await page.locator('#bestiaryList_P1').count();
    const hasP2Bestiary = await page.locator('#bestiaryList_P2').count();
    expect(hasP1Bestiary).toBe(1);
    expect(hasP2Bestiary).toBe(1);

    // 7. Verify no uncaught errors occurred during any modal operations
    expect(errors).toEqual([]);
  });
});
