# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/helpModalAndInventorySlots.spec.js >> Help Modal Close and Inventory Slots UI Tests >> should correctly show/hide inventory slots in singleplayer and co-op
- Location: tests/helpModalAndInventorySlots.spec.js:11:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

# Page snapshot

```yaml
- generic [active]:
  - generic: Hospital
  - button "Menu" [ref=e3]
```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   |
  3   | test.describe('Help Modal Close and Inventory Slots UI Tests', () => {
  4   |   test.beforeEach(async ({ page }) => {
  5   |     await page.addInitScript(() => {
  6   |       sessionStorage.setItem('wildpulse_skip_start_modal', 'true');
  7   |     });
  8   |     await page.goto('http://localhost:3000');
  9   |   });
  10  |
  11  |   test('should correctly show/hide inventory slots in singleplayer and co-op', async ({ page }) => {
  12  |     // Wait for game to load
  13  |     await page.waitForSelector('#menuBtn', { state: 'visible' });
  14  |
  15  |     // 1. Verify Player 1 slots are visible, Player 2 slots are hidden
  16  |     const p1SlotsVisible = await page.locator('#p1InventorySlots').isVisible();
> 17  |     expect(p1SlotsVisible).toBe(true);
      |                            ^ Error: expect(received).toBe(expected) // Object.is equality
  18  |
  19  |     const p2SlotsVisible = await page.locator('#p2InventorySlots').isVisible();
  20  |     expect(p2SlotsVisible).toBe(false);
  21  |
  22  |     // Verify exactly 3 slots exist inside both containers
  23  |     const p1SlotsCount = await page.locator('#p1InventorySlots .inventory-slot').count();
  24  |     expect(p1SlotsCount).toBe(3);
  25  |
  26  |     const p2SlotsCount = await page.locator('#p2InventorySlots .inventory-slot').count();
  27  |     expect(p2SlotsCount).toBe(3);
  28  |
  29  |     // 2. Enable co-op and verify Player 2 slots become visible
  30  |     await page.click('#menuBtn');
  31  |     await page.waitForSelector('#menuModal', { state: 'visible' });
  32  |     await page.click('#coopToggleBtn');
  33  |
  34  |     // Wait for body to have class coop-active-layout
  35  |     await expect(page.locator('body')).toHaveClass(/coop-active-layout/);
  36  |
  37  |     const p2SlotsVisibleAfterCoop = await page.locator('#p2InventorySlots').isVisible();
  38  |     expect(p2SlotsVisibleAfterCoop).toBe(true);
  39  |
  40  |     // 3. Disable co-op and verify Player 2 slots are hidden again
  41  |     await page.click('#menuBtn');
  42  |     await page.waitForSelector('#menuModal', { state: 'visible' });
  43  |     await page.click('#coopToggleBtn');
  44  |
  45  |     await expect(page.locator('body')).not.toHaveClass(/coop-active-layout/);
  46  |
  47  |     const p2SlotsVisibleAfterDisable = await page.locator('#p2InventorySlots').isVisible();
  48  |     expect(p2SlotsVisibleAfterDisable).toBe(false);
  49  |
  50  |     // 4. Exit game to main menu and verify both are hidden
  51  |     await page.click('#menuBtn');
  52  |     await page.waitForSelector('#menuModal', { state: 'visible' });
  53  |
  54  |     // Handle confirm dialog when exiting game
  55  |     page.once('dialog', async dialog => {
  56  |       await dialog.accept();
  57  |     });
  58  |     await page.click('#exitGameBtn');
  59  |
  60  |     // Verify both are hidden
  61  |     const p1SlotsAfterExit = await page.locator('#p1InventorySlots').isVisible();
  62  |     expect(p1SlotsAfterExit).toBe(false);
  63  |
  64  |     const p2SlotsAfterExit = await page.locator('#p2InventorySlots').isVisible();
  65  |     expect(p2SlotsAfterExit).toBe(false);
  66  |   });
  67  |
  68  |   test('should correctly close Player 2 help modal via the close button in co-op mode', async ({ page }) => {
  69  |     // Wait for game to load
  70  |     await page.waitForSelector('#menuBtn', { state: 'visible' });
  71  |
  72  |     // Enable co-op
  73  |     await page.click('#menuBtn');
  74  |     await page.waitForSelector('#menuModal', { state: 'visible' });
  75  |     await page.click('#coopToggleBtn');
  76  |
  77  |     // Verify co-op active
  78  |     await expect(page.locator('body')).toHaveClass(/coop-active-layout/);
  79  |
  80  |     // Open help modal for Player 2
  81  |     await page.evaluate(() => {
  82  |       if (window.openHelpModal) window.openHelpModal(2);
  83  |     });
  84  |
  85  |     // Verify helpModal is active with class p2-help-active
  86  |     const helpModal = page.locator('#helpModal');
  87  |     await expect(helpModal).toHaveClass(/p2-help-active/);
  88  |
  89  |     // Click visible close button inside Player 2's help modal
  90  |     await page.locator('#helpModal .coop-columns .close-btn.close-help-btn').click();
  91  |
  92  |     // Verify Player 2 help modal is closed (p2ActiveModal is null and class removed)
  93  |     const isP2HelpClosed = await page.evaluate(() => {
  94  |       return window.p2ActiveModal === null;
  95  |     });
  96  |     expect(isP2HelpClosed).toBe(true);
  97  |     await expect(helpModal).not.toHaveClass(/p2-help-active/);
  98  |   });
  99  |
  100 |   test('isPointerOverButton should correctly identify inventory-slot as interactive', async ({ page }) => {
  101 |     await page.waitForSelector('#menuBtn', { state: 'visible' });
  102 |
  103 |     const isSlotBlocked = await page.evaluate(() => {
  104 |       const slot = document.querySelector('#p1InventorySlots .inventory-slot');
  105 |       if (!slot) return null;
  106 |       const mockPointer = {
  107 |         downEvent: { target: slot },
  108 |         event: null
  109 |       };
  110 |       return window.isPointerOverButton(mockPointer);
  111 |     });
  112 |
  113 |     expect(isSlotBlocked).toBe(true);
  114 |   });
  115 | });
  116 |
```