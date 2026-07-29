# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/shopAndInventory.spec.js >> Shop and Inventory Systems >> should display dynamic available to buy quantity and each player coins
- Location: tests/shopAndInventory.spec.js:142:3

# Error details

```
Error: page.waitForTimeout: Target page, context or browser has been closed
```

# Test source

```ts
  99  |     // Prepare items directly in Player 1 inventory for testing
  100 |     await page.evaluate(() => {
  101 |         if (!window.gameStats) window.gameStats = { coins: 0 };
  102 |         window.gameStats.coins = 500;
  103 |         window.p1Inventory = [
  104 |             { name: "Repellent", quantity: 1 },
  105 |             { name: "Jank Juice", quantity: 1 },
  106 |             { name: "HP Booster", quantity: 1 }
  107 |         ];
  108 |         window.saveInventory();
  109 |         window.updateInventoryUI();
  110 |     });
  111 |
  112 |     const html = await page.locator('#p1InventorySlots').innerHTML();
  113 |     console.log('p1InventorySlots INNER HTML:', html);
  114 |
  115 |     const p1Slots = page.locator('#p1InventorySlots .inventory-slot');
  116 |     const buffsIndicator = page.locator('#p1ActiveBuffs');
  117 |
  118 |     // Use items directly in page evaluate to test effect application
  119 |     await page.evaluate(() => {
  120 |         window.useInventoryItem(1, 0); // Use Repellent
  121 |     });
  122 |     await page.waitForTimeout(1000);
  123 |
  124 |     const buffsText = await page.locator('#p1ActiveBuffs').innerText();
  125 |     console.log('p1ActiveBuffs CURRENT TEXT:', buffsText);
  126 |
  127 |     // Verify repellent buff is active
  128 |     await expect(buffsIndicator).toContainText('Repel');
  129 |     // Verify repellent was consumed (remaining items shifted left, so Jank Juice is at slot 0)
  130 |     await expect(p1Slots.nth(0)).toContainText('🧃');
  131 |
  132 |     await page.evaluate(() => {
  133 |         window.useInventoryItem(1, 0); // Use Jank Juice
  134 |     });
  135 |     await page.waitForTimeout(500);
  136 |
  137 |     // Verify both Repellent and Jank Juice buffs are active
  138 |     await expect(buffsIndicator).toContainText('Repel');
  139 |     await expect(buffsIndicator).toContainText('Shiny');
  140 |   });
  141 |
  142 |   test('should display dynamic available to buy quantity and each player coins', async ({ page }) => {
  143 |     // Grant coins and prepare empty inventory
  144 |     await page.evaluate(() => {
  145 |         if (!window.gameStats) window.gameStats = { coins: 0 };
  146 |         window.gameStats.coins = 350;
  147 |         window.updateMenuCoins();
  148 |         window.p1Inventory = [];
  149 |         window.saveInventory();
  150 |
  151 |         // Reset stock to default (5) to ensure test isolated environment
  152 |         window.p1StoreStock = {
  153 |             "Repellent": 5,
  154 |             "HP Booster": 5,
  155 |             "Attack Booster": 5,
  156 |             "Defense Booster": 5,
  157 |             "Speed Booster": 5,
  158 |             "Sp. Atk Booster": 5,
  159 |             "Sp. Def Booster": 5,
  160 |             "Jank Juice": 5,
  161 |             "Healing Juice Bottle": 5,
  162 |             "Healing Juice Jug": 5
  163 |         };
  164 |         localStorage.setItem('wildpulse_store_stock_p1', JSON.stringify(window.p1StoreStock));
  165 |
  166 |         window.updateInventoryUI();
  167 |     });
  168 |
  169 |     // Open store modal (which now automatically calls updateStoreUI)
  170 |     await page.evaluate(() => {
  171 |         if (window.openStoreModal) window.openStoreModal();
  172 |     });
  173 |
  174 |     await expect(page.locator('#storeModal')).toBeVisible();
  175 |
  176 |     // Verify Player 1 Coins are displayed as 350
  177 |     const storeP1Col = page.locator('#storeContent');
  178 |     await expect(storeP1Col).toContainText('Coins: 350');
  179 |
  180 |     // Since inventory is empty, dynamic available to buy for each item is 30 (10 per slot * 3 slots)
  181 |     const repelLabel = storeP1Col.locator('.available-qty-label').first();
  182 |     await expect(repelLabel).toContainText('Available to Buy: 30');
  183 |
  184 |     // Buy 1 Repellent
  185 |     const buyRepellentBtn = page.locator('button[onclick*="Repellent"]').first();
  186 |     await buyRepellentBtn.click();
  187 |     await page.waitForTimeout(500);
  188 |
  189 |     // Dynamic available to buy for Repellent should now be 29 (since 1 is in slot, leaving 9 in that slot + 20 in other slots)
  190 |     await expect(repelLabel).toContainText('Available to Buy: 29');
  191 |
  192 |     // Fill inventory slots with other unique items
  193 |     const buyHPBoosterBtn = page.locator('button[onclick*="HP Booster"]').first();
  194 |     const buyBottleBtn = page.locator('button[onclick*="Healing Juice Bottle"]').first();
  195 |
  196 |     await buyHPBoosterBtn.click();
  197 |     await page.waitForTimeout(300);
  198 |     await buyBottleBtn.click();
> 199 |     await page.waitForTimeout(300);
      |                ^ Error: page.waitForTimeout: Target page, context or browser has been closed
  200 |
  201 |     // Now inventory slots are:
  202 |     // Slot 0: Repellent (1) - 9 left in slot
  203 |     // Slot 1: HP Booster (1) - 9 left in slot
  204 |     // Slot 2: Healing Juice Bottle (1) - 9 left in slot
  205 |     // Total free slots = 0.
  206 |     // Dynamic available to buy for Repellent should be 9
  207 |     await expect(repelLabel).toContainText('Available to Buy: 9');
  208 |
  209 |     // Jank Juice is not in the inventory and we have 0 free slots.
  210 |     // Dynamic available to buy for Jank Juice should be 0, button text should be "Full"
  211 |     await expect(storeP1Col).toContainText('Available to Buy: 0');
  212 |   });
  213 | });
  214 |
```