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
Error: page.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('#saveCustomizationBtn')

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e5]:
    - heading "Customize Character" [level=2] [ref=e6]
    - generic [ref=e7]:
      - generic [ref=e8]: "Character Name:"
      - textbox [active] [ref=e9]: CyberOnboard
    - generic [ref=e10]:
      - generic [ref=e11]: "Character Color:"
      - generic [ref=e12]: "#a2d5b7"
    - generic [ref=e14]:
      - generic [ref=e15]: "Aura Color:"
      - generic [ref=e16]: "#c2c88e"
    - generic [ref=e18]:
      - generic [ref=e19]: "Body Shape:"
      - combobox [ref=e20] [cursor=pointer]:
        - option "Square" [selected]
        - option "Triangle (Locked - Tier 3)" [disabled]
        - option "Horizontal Diamond (Locked - Tier 5)" [disabled]
        - option "Vertical Diamond (Locked - Tier 7)" [disabled]
        - option "Rectangle (Locked - Tier 9)" [disabled]
        - option "Octagon (Locked - Tier 11)" [disabled]
        - option "Hexagon (Locked - Tier 13)" [disabled]
        - option "Star (Locked - Tier 15)" [disabled]
        - option "Circle (Locked - Tier 17)" [disabled]
        - option "Heart (Locked - Tier 19)" [disabled]
        - option "Crescent (Locked - Tier 21)" [disabled]
        - option "Pentagon (Locked - Tier 23)" [disabled]
    - generic [ref=e21]:
      - generic [ref=e22]: "Skin Pattern:"
      - combobox [ref=e23] [cursor=pointer]:
        - option "None"
        - option "Dots"
        - option "Stripes"
        - option "Checkerboard" [selected]
        - 'option "Camo (Locked: Locked)" [disabled]'
        - 'option "Stars (Locked: Locked)" [disabled]'
        - 'option "Hearts (Locked: Locked)" [disabled]'
        - 'option "Waves (Locked: Locked)" [disabled]'
        - 'option "Bricks (Locked: Locked)" [disabled]'
        - 'option "Honeycomb (Locked: Locked)" [disabled]'
        - 'option "Leopard (Locked: Locked)" [disabled]'
        - 'option "Zebra (Locked: Locked)" [disabled]'
        - 'option "Tiger (Locked: Locked)" [disabled]'
        - 'option "Circuit (Locked: Locked)" [disabled]'
        - 'option "Scales (Locked: Locked)" [disabled]'
        - 'option "Flame (Locked: Locked)" [disabled]'
        - 'option "Galaxy (Locked: Locked)" [disabled]'
        - 'option "Lightning (Locked: Locked)" [disabled]'
        - 'option "Spirit (Locked: Locked)" [disabled]'
        - 'option "Crystal (Locked: Locked)" [disabled]'
        - 'option "Dragon (Locked: Locked)" [disabled]'
        - 'option "Panda (Locked: Locked)" [disabled]'
        - 'option "Skull (Locked: Locked)" [disabled]'
        - 'option "Cross (Locked: Locked)" [disabled]'
        - 'option "Moon (Locked: Locked)" [disabled]'
    - generic [ref=e24]:
      - generic [ref=e25]: "Pattern Color:"
      - generic [ref=e26]: "#36f496"
    - generic [ref=e28]: Live Preview
    - button "Save & Start Game" [ref=e32] [cursor=pointer]
    - button "Skip & Start" [ref=e33] [cursor=pointer]
  - generic [ref=e34]:
    - generic [ref=e35]:
      - generic [ref=e36]: P1 CYBER-INPUT
      - generic [ref=e37] [cursor=pointer]: X
    - textbox [ref=e39]: CyberOnboard
    - generic [ref=e40]:
      - generic [ref=e41]:
        - button "1" [ref=e42] [cursor=pointer]
        - button "2" [ref=e43] [cursor=pointer]
        - button "3" [ref=e44] [cursor=pointer]
        - button "4" [ref=e45] [cursor=pointer]
        - button "5" [ref=e46] [cursor=pointer]
        - button "6" [ref=e47] [cursor=pointer]
        - button "7" [ref=e48] [cursor=pointer]
        - button "8" [ref=e49] [cursor=pointer]
        - button "9" [ref=e50] [cursor=pointer]
        - button "0" [ref=e51] [cursor=pointer]
      - generic [ref=e52]:
        - button "Q" [ref=e53] [cursor=pointer]
        - button "W" [ref=e54] [cursor=pointer]
        - button "E" [ref=e55] [cursor=pointer]
        - button "R" [ref=e56] [cursor=pointer]
        - button "T" [ref=e57] [cursor=pointer]
        - button "Y" [ref=e58] [cursor=pointer]
        - button "U" [ref=e59] [cursor=pointer]
        - button "I" [ref=e60] [cursor=pointer]
        - button "O" [ref=e61] [cursor=pointer]
        - button "P" [ref=e62] [cursor=pointer]
      - generic [ref=e63]:
        - button "A" [ref=e64] [cursor=pointer]
        - button "S" [ref=e65] [cursor=pointer]
        - button "D" [ref=e66] [cursor=pointer]
        - button "F" [ref=e67] [cursor=pointer]
        - button "G" [ref=e68] [cursor=pointer]
        - button "H" [ref=e69] [cursor=pointer]
        - button "J" [ref=e70] [cursor=pointer]
        - button "K" [ref=e71] [cursor=pointer]
        - button "L" [ref=e72] [cursor=pointer]
      - generic [ref=e73]:
        - button "Shift" [ref=e74] [cursor=pointer]
        - button "Z" [ref=e75] [cursor=pointer]
        - button "X" [ref=e76] [cursor=pointer]
        - button "C" [ref=e77] [cursor=pointer]
        - button "V" [ref=e78] [cursor=pointer]
        - button "B" [ref=e79] [cursor=pointer]
        - button "N" [ref=e80] [cursor=pointer]
        - button "M" [ref=e81] [cursor=pointer]
        - button "Back" [ref=e82] [cursor=pointer]
      - generic [ref=e83]:
        - button "Clear" [ref=e84] [cursor=pointer]
        - button "Space" [ref=e85] [cursor=pointer]
        - button "Done" [ref=e86] [cursor=pointer]
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
> 52  |     await page.click('#saveCustomizationBtn');
      |                ^ Error: page.click: Test timeout of 30000ms exceeded.
  53  |
  54  |     // Customization modal should close and start game session
  55  |     await page.waitForSelector('#customizationModal', { state: 'hidden' });
  56  |
  57  |     // Verify game starts and menu button becomes visible
  58  |     await page.waitForSelector('#menuBtn', { state: 'visible' });
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