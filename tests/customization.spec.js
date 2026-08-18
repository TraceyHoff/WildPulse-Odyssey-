const { test, expect } = require('@playwright/test');

test.describe('In-game Character Customization', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    // Dismiss start modal by clicking Single Player
    const startBtn = page.locator('#startGameBtn');
    if (await startBtn.isVisible()) {
      await startBtn.click();
    }
  });

  test('should open customization from in-game menu and customize character', async ({ page }) => {
    // Wait for the game and menu button to load
    await page.waitForSelector('#menuBtn', { state: 'visible' });

    // Ensure the menu button exists and click it
    await page.click('#menuBtn');

    // Wait for the menu modal to be visible
    await page.waitForSelector('#menuModal', { state: 'visible' });

    // Click the "Customize Character" button in the menu modal
    await page.click('#menuCustomizeBtn');

    // Wait for the customization modal to be visible and the menu modal to be hidden
    await page.waitForSelector('#customizationModal', { state: 'visible' });
    await page.waitForSelector('#menuModal', { state: 'hidden' });

    const menuModalVisible = await page.evaluate(() => {
      const el = document.getElementById('menuModal');
      return el && el.style.display !== 'none';
    });
    expect(menuModalVisible).toBe(false);

    // Change character name in input and save
    await page.fill('#playerNameInput', 'HeroP1');
    await page.click('#saveCustomizationBtn');

    // Wait for modal to be hidden
    await page.waitForSelector('#customizationModal', { state: 'hidden' });

    // Verify it saved in localStorage
    const savedName = await page.evaluate(() => localStorage.getItem('wildpulse_player_name'));
    expect(savedName).toBe('HeroP1');
  });

  test('should support customizing Player 2 in Co-op mode', async ({ page }) => {
    // Enable Co-op mode
    await page.waitForSelector('#menuBtn', { state: 'visible' });
    await page.click('#menuBtn');
    await page.waitForSelector('#menuModal', { state: 'visible' });

    // Trigger Co-op toggle
    await page.click('#coopToggleBtn');

    // Wait for Co-op active flag to be true
    const isCoopActive = await page.evaluate(() => window.coopActive);
    expect(isCoopActive).toBe(true);

    // Open menu again to access customization
    await page.click('#menuBtn');
    await page.waitForSelector('#menuModal', { state: 'visible' });
    await page.click('#menuCustomizeBtn');

    // Wait for customization modal
    await page.waitForSelector('#customizationModal', { state: 'visible' });

    // Verify Player 1 and Player 2 select buttons are visible
    const isSelectorVisible = await page.evaluate(() => {
      const el = document.getElementById('customPlayerSelection');
      return el && el.style.display === 'flex';
    });
    expect(isSelectorVisible).toBe(true);

    // Click Player 2 select button
    await page.click('#customSelectP2');

    // Change Player 2 name in input and save
    await page.fill('#playerNameInput', 'HeroP2');
    await page.click('#saveCustomizationBtn');

    // Wait for modal to close
    await page.waitForSelector('#customizationModal', { state: 'hidden' });

    // Verify Player 2 name saved in localStorage
    const savedNameP2 = await page.evaluate(() => localStorage.getItem('wildpulse_player2_name'));
    expect(savedNameP2).toBe('HeroP2');
  });
});
