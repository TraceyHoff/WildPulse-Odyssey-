# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/onboardingAndSellPrice.spec.js >> Introductory Onboarding and Dynamic Sell Price Tests >> should trigger high tech introductory modals and customization onboarding flow on new game start
- Location: tests/onboardingAndSellPrice.spec.js:14:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.waitForSelector: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('#menuBtn') to be visible
    - locator resolved to visible <button id="menuBtn">Menu</button>

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
  - generic: Hospital
  - button "Menu" [ref=e12]
  - generic: Character 1 updated!
```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   |
  3   | test.describe('Introductory Onboarding and Dynamic Sell Price Tests', () => {
  4   |   test.beforeEach(async ({ page }) => {
  5   |     // Clear localStorage to ensure a clean new game state
  6   |     await page.addInitScript(() => {
  7   |       localStorage.clear();
  8   |       // Force test onboarding mode
  9   |       window.__test_onboarding = true;
  10  |     });
  11  |     await page.goto('http://localhost:3000');
  12  |   });
  13  |
  14  |   test('should trigger high tech introductory modals and customization onboarding flow on new game start', async ({ page }) => {
  15  |     // Click Start Game on a fresh state
  16  |     await page.click('#startGameBtn');
  17  |
  18  |     // Verify introductory modal is visible
  19  |     await page.waitForSelector('#introModal', { state: 'visible' });
  20  |
  21  |     // Slide 1 title should be visible
  22  |     const titleEl = page.locator('#introModalTitle');
  23  |     await expect(titleEl).toHaveText('[ SYSTEM INITIALIZATION ]');
  24  |
  25  |     // Verify slide 1 content is shown and slide 2 is hidden
  26  |     await expect(page.locator('#introModalSlide1')).toBeVisible();
  27  |     await expect(page.locator('#introModalSlide2')).toBeHidden();
  28  |
  29  |     // Click Next to advance to slide 2
  30  |     await page.click('#introNextBtn');
  31  |
  32  |     // Verify slide 2 title and content are shown, slide 1 is hidden
  33  |     await expect(titleEl).toHaveText('[ INPUT MATRIX ]');
  34  |     await expect(page.locator('#introModalSlide1')).toBeHidden();
  35  |     await expect(page.locator('#introModalSlide2')).toBeVisible();
  36  |
  37  |     // Click Configure Avatar / Next on slide 2
  38  |     await page.click('#introNextBtn');
  39  |
  40  |     // Intro modal should close
  41  |     await page.waitForSelector('#introModal', { state: 'hidden' });
  42  |
  43  |     // Customization modal should open in onboarding state
  44  |     await page.waitForSelector('#customizationModal', { state: 'visible' });
  45  |
  46  |     // Verify "Save & Start Game" text on save button
  47  |     const saveBtn = page.locator('#saveCustomizationBtn');
  48  |     await expect(saveBtn).toHaveText('Save & Start Game');
  49  |
  50  |     // Fill player name and save to start game
  51  |     await page.fill('#playerNameInput', 'CyberOnboard');
  52  |     await page.click('#saveCustomizationBtn');
  53  |
  54  |     // Customization modal should close and start game session
  55  |     await page.waitForSelector('#customizationModal', { state: 'hidden' });
  56  |
  57  |     // Verify game starts and menu button becomes visible
> 58  |     await page.waitForSelector('#menuBtn', { state: 'visible' });
      |                ^ Error: page.waitForSelector: Test timeout of 30000ms exceeded.
  59  |
  60  |     // Verify character name saved successfully
  61  |     const savedName = await page.evaluate(() => localStorage.getItem('wildpulse_player_name'));
  62  |     expect(savedName).toBe('CyberOnboard');
  63  |   });
  64  |
  65  |   test('should calculate dynamic creature selling price based on stats, nature, and mood', async ({ page }) => {
  66  |     // Skip intro modal for this unit-like check by seeding player color
  67  |     await page.addInitScript(() => {
  68  |       localStorage.setItem('wildpulse_player_color', '#FFFFFF');
  69  |     });
  70  |     await page.goto('http://localhost:3000');
  71  |     await page.click('#startGameBtn');
  72  |     await page.waitForSelector('#menuBtn', { state: 'visible' });
  73  |
  74  |     // Evaluate dynamic sell price for different configurations
  75  |     const sellPriceLow = await page.evaluate(() => {
  76  |       const mockCreatureLow = {
  77  |         level: 1,
  78  |         stats: { health: 30, attack: 30, defense: 30, speed: 30, specialAttack: 30, specialDefense: 30 },
  79  |         nature: { name: "Clumsy Mind", tier: 3, increase: null, decrease: "speed" }, // Debuff-only
  80  |         mood: { name: "Lethargic", tier: 3, increase: null, decrease: "speed" }      // Debuff-only
  81  |       };
  82  |       return window.calculateCreatureSellPrice(mockCreatureLow);
  83  |     });
  84  |
  85  |     const sellPriceHigh = await page.evaluate(() => {
  86  |       const mockCreatureHigh = {
  87  |         level: 1,
  88  |         stats: { health: 100, attack: 100, defense: 100, speed: 100, specialAttack: 100, specialDefense: 100 },
  89  |         nature: { name: "Mighty Form", tier: 3, increase: "attack", decrease: null }, // Buff-only
  90  |         mood: { name: "Joyful", tier: 3, increase: "health", decrease: null }         // Buff-only
  91  |       };
  92  |       return window.calculateCreatureSellPrice(mockCreatureHigh);
  93  |     });
  94  |
  95  |     // High stats, buff-only, tier 3 should be strictly more valuable than low stats, debuff-only, tier 3
  96  |     console.log(`Low-tier creature sell price: ${sellPriceLow}`);
  97  |     console.log(`High-tier creature sell price: ${sellPriceHigh}`);
  98  |
  99  |     expect(sellPriceHigh).toBeGreaterThan(sellPriceLow);
  100 |   });
  101 | });
  102 |
```