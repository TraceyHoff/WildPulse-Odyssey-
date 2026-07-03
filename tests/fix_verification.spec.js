const { test, expect } = require('@playwright/test');

test.describe('Fixes Verification', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    // Start game
    await page.click('#startGameBtn');
  });

  test('social elements are hidden on exitGame', async ({ page }) => {
    // Open social sidebar to ensure it's open
    await page.evaluate(() => {
        window.openSocialSidebar();
    });
    await expect(page.locator('#socialSidebar')).toHaveClass(/open/);

    // Mock confirm to return true
    await page.evaluate(() => {
      window.confirm = () => true;
    });

    // Call exitGame
    await page.evaluate(() => {
      window.exitGame();
    });

    // Check if social elements are hidden/closed
    const socialToggleBtn = page.locator('#socialToggleBtn');
    await expect(socialToggleBtn).toBeHidden();

    const socialSidebar = page.locator('#socialSidebar');
    await expect(socialSidebar).not.toHaveClass(/open/);
  });

  test('currentPlayer is synchronized and swap modal works', async ({ page }) => {
    await page.evaluate(() => {
      // Setup fake party
      const fakeCreature1 = { id: 'c1', name: 'Creature 1', currentHp: 50, maxHp: 100, stored: false, stats: { health: 100 } };
      const fakeCreature2 = { id: 'c2', name: 'Creature 2', currentHp: 50, maxHp: 100, stored: false, stats: { health: 100 } };
      window.collectedCreatures = [fakeCreature1, fakeCreature2];
      window.playerParty = window.collectedCreatures;

      // Simulate battle start for c1
      window.inBattle = true;
      window.currentPlayer = JSON.parse(JSON.stringify(fakeCreature1));
      window.currentPlayer.maxHp = 100;
    });

    // Check if currentPlayer is available globally (it should be since it's var)
    const isGlobal = await page.evaluate(() => {
      return window.currentPlayer !== undefined;
    });
    expect(isGlobal).toBe(true);

    // Open swap modal
    await page.evaluate(() => {
      window.openBattleSwapModal();
    });

    // Check if swap modal is visible and contains the other creature
    const swapModal = page.locator('#battleSwapModal');
    await expect(swapModal).toBeVisible();

    const swapItems = page.locator('.swap-item');
    await expect(swapItems).toHaveCount(1);
    await expect(swapItems).toContainText('Creature 2');
  });
});
