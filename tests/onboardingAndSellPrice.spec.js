const { test, expect } = require('@playwright/test');

test.describe('Introductory Onboarding and Dynamic Sell Price Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage to ensure a clean new game state
    await page.addInitScript(() => {
      localStorage.clear();
      // Force test onboarding mode
      window.__test_onboarding = true;
    });
    await page.goto('http://localhost:3000');
  });

  test('should trigger high tech introductory modals and customization onboarding flow on new game start', async ({ page }) => {
    test.setTimeout(60000);
    // Click Start Game on a fresh state
    await page.click('#startGameBtn');

    // Verify introductory modal is visible
    await page.waitForSelector('#introModal', { state: 'visible' });

    // Slide 1 title should be visible
    const titleEl = page.locator('#introModalTitle');
    await expect(titleEl).toHaveText('[ SYSTEM INITIALIZATION ]');

    // Verify slide 1 content is shown and slide 2 is hidden
    await expect(page.locator('#introModalSlide1')).toBeVisible();
    await expect(page.locator('#introModalSlide2')).toBeHidden();

    // Click Next to advance to slide 2
    await page.click('#introNextBtn');

    // Verify slide 2 title and content are shown, slide 1 is hidden
    await expect(titleEl).toHaveText('[ INPUT MATRIX ]');
    await expect(page.locator('#introModalSlide1')).toBeHidden();
    await expect(page.locator('#introModalSlide2')).toBeVisible();

    // Click Next to advance to slide 3 (Item Carousel)
    await page.click('#introNextBtn');

    // Verify slide 3 title and content are shown, slide 2 is hidden
    await expect(titleEl).toHaveText('[ ITEM DATABASE ]');
    await expect(page.locator('#introModalSlide2')).toBeHidden();
    await expect(page.locator('#introModalSlide3')).toBeVisible();

    // Verify item count / name are correct
    const carouselCount = page.locator('#introItemCarouselCount');
    await expect(carouselCount).toHaveText('ITEM 1 / 27');
    const carouselName = page.locator('#introItemCarouselName');
    await expect(carouselName).toHaveText('Repellent');

    // Click Next Item to cycle
    await page.click('#introItemNextBtn', { force: true });
    await expect(carouselCount).toHaveText('ITEM 2 / 27');
    await expect(carouselName).toHaveText('HP Booster');

    // Click Prev Item to cycle back
    await page.click('#introItemPrevBtn', { force: true });
    await expect(carouselCount).toHaveText('ITEM 1 / 27');
    await expect(carouselName).toHaveText('Repellent');

    // Click Configure Avatar on slide 3
    await page.click('#introNextBtn');

    // Intro modal should close
    await page.waitForSelector('#introModal', { state: 'hidden' });

    // Customization modal should open in onboarding state
    await page.waitForSelector('#customizationModal', { state: 'visible' });

    // Verify "Save & Start Game" text on save button
    const saveBtn = page.locator('#saveCustomizationBtn');
    await expect(saveBtn).toHaveText('Save & Start Game');

    // Fill player name and save to start game
    await page.fill('#playerNameInput', 'CyberOnboard');
    await page.click('#saveCustomizationBtn');

    // Customization modal should close and start game session
    await page.waitForSelector('#customizationModal', { state: 'hidden' });

    // Verify game starts and menu button becomes visible
    await page.waitForSelector('#menuBtn', { state: 'visible' });

    // Verify character name saved successfully
    const savedName = await page.evaluate(() => localStorage.getItem('wildpulse_player_name'));
    expect(savedName).toBe('CyberOnboard');
  });

  test('should calculate dynamic creature selling price based on stats, nature, and mood', async ({ page }) => {
    // Skip intro modal for this unit-like check by seeding player color
    await page.addInitScript(() => {
      localStorage.setItem('wildpulse_player_color', '#FFFFFF');
    });
    await page.goto('http://localhost:3000');
    await page.click('#startGameBtn');
    await page.waitForSelector('#menuBtn', { state: 'visible' });

    // Evaluate dynamic sell price for different configurations
    const sellPriceLow = await page.evaluate(() => {
      const mockCreatureLow = {
        level: 1,
        stats: { health: 30, attack: 30, defense: 30, speed: 30, specialAttack: 30, specialDefense: 30 },
        nature: { name: "Clumsy Mind", tier: 3, increase: null, decrease: "speed" }, // Debuff-only
        mood: { name: "Lethargic", tier: 3, increase: null, decrease: "speed" }      // Debuff-only
      };
      return window.calculateCreatureSellPrice(mockCreatureLow);
    });

    const sellPriceHigh = await page.evaluate(() => {
      const mockCreatureHigh = {
        level: 1,
        stats: { health: 100, attack: 100, defense: 100, speed: 100, specialAttack: 100, specialDefense: 100 },
        nature: { name: "Mighty Form", tier: 3, increase: "attack", decrease: null }, // Buff-only
        mood: { name: "Joyful", tier: 3, increase: "health", decrease: null }         // Buff-only
      };
      return window.calculateCreatureSellPrice(mockCreatureHigh);
    });

    // High stats, buff-only, tier 3 should be strictly more valuable than low stats, debuff-only, tier 3
    console.log(`Low-tier creature sell price: ${sellPriceLow}`);
    console.log(`High-tier creature sell price: ${sellPriceHigh}`);

    expect(sellPriceHigh).toBeGreaterThan(sellPriceLow);
  });
});
