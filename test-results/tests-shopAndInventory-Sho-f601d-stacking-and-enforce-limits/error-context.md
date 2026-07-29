# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/shopAndInventory.spec.js >> Shop and Inventory Systems >> should buy items, display them, handle stacking, and enforce limits
- Location: tests/shopAndInventory.spec.js:15:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.waitForTimeout: Test timeout of 30000ms exceeded.
```

# Page snapshot

```yaml
- generic [active]:
  - button "Menu" [ref=e3] [cursor=pointer]
  - generic: 🛒 Bought Healing Juice Bottle! Sent directly to your inventory.
  - generic [ref=e4]:
    - button "Close Store" [ref=e5] [cursor=pointer]: X
    - generic [ref=e7]:
      - heading "Player 1 Store" [level=2] [ref=e8]
      - generic [ref=e9]:
        - generic [ref=e10]: "🪙 Coins: 210"
        - generic [ref=e11]:
          - generic [ref=e12]:
            - generic [ref=e13]: 🧴
            - generic [ref=e14]:
              - generic [ref=e15]: Repellent
              - generic [ref=e16]: Stops wild creature attacks for 60 seconds.
              - generic [ref=e17]: "Available to Buy: 8 | Stock: 3"
            - generic [ref=e18]:
              - generic [ref=e19]: 🪙 50
              - button "Buy" [ref=e20] [cursor=pointer]
          - generic [ref=e21]:
            - generic [ref=e22]: 💚
            - generic [ref=e23]:
              - generic [ref=e24]: HP Booster
              - generic [ref=e25]: Permanently raises creature's HP by 10.
              - generic [ref=e26]: "Available to Buy: 9 | Stock: 4"
            - generic [ref=e27]:
              - generic [ref=e28]: 🪙 150
              - button "Buy" [ref=e29] [cursor=pointer]
          - generic [ref=e30]:
            - generic [ref=e31]: ⚔️
            - generic [ref=e32]:
              - generic [ref=e33]: Attack Booster
              - generic [ref=e34]: Permanently raises creature's Attack by 5.
              - generic [ref=e35]: "Available to Buy: 0 | Stock: 5"
            - generic [ref=e36]:
              - generic [ref=e37]: 🪙 120
              - button "Full" [ref=e38]
          - generic [ref=e39]:
            - generic [ref=e40]: 🛡️
            - generic [ref=e41]:
              - generic [ref=e42]: Defense Booster
              - generic [ref=e43]: Permanently raises creature's Defense by 5.
              - generic [ref=e44]: "Available to Buy: 0 | Stock: 5"
            - generic [ref=e45]:
              - generic [ref=e46]: 🪙 120
              - button "Full" [ref=e47]
          - generic [ref=e48]:
            - generic [ref=e49]: ⚡
            - generic [ref=e50]:
              - generic [ref=e51]: Speed Booster
              - generic [ref=e52]: Permanently raises creature's Speed by 5.
              - generic [ref=e53]: "Available to Buy: 0 | Stock: 5"
            - generic [ref=e54]:
              - generic [ref=e55]: 🪙 120
              - button "Full" [ref=e56]
          - generic [ref=e57]:
            - generic [ref=e58]: 🔮
            - generic [ref=e59]:
              - generic [ref=e60]: Sp. Atk Booster
              - generic [ref=e61]: Permanently raises creature's Sp. Atk by 5.
              - generic [ref=e62]: "Available to Buy: 0 | Stock: 5"
            - generic [ref=e63]:
              - generic [ref=e64]: 🪙 120
              - button "Full" [ref=e65]
          - generic [ref=e66]:
            - generic [ref=e67]: 🧿
            - generic [ref=e68]:
              - generic [ref=e69]: Sp. Def Booster
              - generic [ref=e70]: Permanently raises creature's Sp. Def by 5.
              - generic [ref=e71]: "Available to Buy: 0 | Stock: 5"
            - generic [ref=e72]:
              - generic [ref=e73]: 🪙 120
              - button "Full" [ref=e74]
          - generic [ref=e75]:
            - generic [ref=e76]: 🧃
            - generic [ref=e77]:
              - generic [ref=e78]: Jank Juice
              - generic [ref=e79]: Greatly increases wild shiny spawn rate for 60s.
              - generic [ref=e80]: "Available to Buy: 0 | Stock: 5"
            - generic [ref=e81]:
              - generic [ref=e82]: 🪙 100
              - button "Full" [ref=e83]
          - generic [ref=e84]:
            - generic [ref=e85]: 🧪
            - generic [ref=e86]:
              - generic [ref=e87]: Healing Juice Bottle
              - generic [ref=e88]: Heals one creature or revives with 50% HP.
              - generic [ref=e89]: "Available to Buy: 9 | Stock: 4"
            - generic [ref=e90]:
              - generic [ref=e91]: 🪙 40
              - button "Buy" [ref=e92] [cursor=pointer]
          - generic [ref=e93]:
            - generic [ref=e94]: 🏺
            - generic [ref=e95]:
              - generic [ref=e96]: Healing Juice Jug
              - generic [ref=e97]: Fully heals and revives all active party creatures.
              - generic [ref=e98]: "Available to Buy: 0 | Stock: 5"
            - generic [ref=e99]:
              - generic [ref=e100]: 🪙 120
              - button "Full" [ref=e101]
          - generic [ref=e102]:
            - generic [ref=e103]: ✨
            - generic [ref=e104]:
              - generic [ref=e105]: ExPALL
              - generic [ref=e106]: Allows whole party to receive battle experience for 180s.
              - generic [ref=e107]: "Available to Buy: 0 | Stock: 5"
            - generic [ref=e108]:
              - generic [ref=e109]: 🪙 250
              - button "Full" [ref=e110]
          - generic [ref=e111]:
            - generic [ref=e112]: 🎫
            - generic [ref=e113]:
              - generic [ref=e114]: Creature License
              - generic [ref=e115]: Boosts wild capture success rate. Consumed only on success.
              - generic [ref=e116]: "Available to Buy: 0 | Stock: 5"
            - generic [ref=e117]:
              - generic [ref=e118]: 🪙 175
              - button "Full" [ref=e119]
        - generic [ref=e120]:
          - heading "Sell Creatures" [level=3] [ref=e121]
          - generic [ref=e122]:
            - combobox [ref=e123]:
              - option "Chargecrest (Lvl 1, Party) - 🪙145" [selected]
            - button "Sell" [ref=e124] [cursor=pointer]
    - button "Close" [ref=e125] [cursor=pointer]
```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   |
  3   | test.describe('Shop and Inventory Systems', () => {
  4   |   test.beforeEach(async ({ page }) => {
  5   |     page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  6   |     page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  7   |     // Navigate to local port 3000
  8   |     await page.goto('http://localhost:3000');
  9   |     // Start game session by clicking start button
  10  |     await page.click('#startGameBtn');
  11  |     // Wait for the game to start and the main menu button to be visible
  12  |     await page.waitForSelector('#menuBtn', { state: 'visible' });
  13  |   });
  14  |
  15  |   test('should buy items, display them, handle stacking, and enforce limits', async ({ page }) => {
  16  |     // 1. Grant initial coins and clear inventory for testing
  17  |     await page.evaluate(() => {
  18  |         if (!window.gameStats) window.gameStats = { coins: 0 };
  19  |         window.gameStats.coins = 500;
  20  |         window.updateMenuCoins();
  21  |         // Clear inventory to start fresh
  22  |         window.p1Inventory = [];
  23  |         window.saveInventory();
  24  |
  25  |         // Reset stock to default (5) to ensure test isolated environment
  26  |         window.p1StoreStock = {
  27  |             "Repellent": 5,
  28  |             "HP Booster": 5,
  29  |             "Attack Booster": 5,
  30  |             "Defense Booster": 5,
  31  |             "Speed Booster": 5,
  32  |             "Sp. Atk Booster": 5,
  33  |             "Sp. Def Booster": 5,
  34  |             "Jank Juice": 5,
  35  |             "Healing Juice Bottle": 5,
  36  |             "Healing Juice Jug": 5
  37  |         };
  38  |         localStorage.setItem('wildpulse_store_stock_p1', JSON.stringify(window.p1StoreStock));
  39  |
  40  |         window.updateInventoryUI();
  41  |     });
  42  |
  43  |     // 2. Open store manually and update UI directly
  44  |     await page.evaluate(() => {
  45  |         document.getElementById('storeModal').style.display = 'block';
  46  |         window.updateStoreUI();
  47  |     });
  48  |
  49  |     // Wait for store content to be visible
  50  |     await expect(page.locator('#storeModal')).toBeVisible();
  51  |
  52  |     // Verify all 10 items are listed in the shop
  53  |     const items = ["Repellent", "HP Booster", "Attack Booster", "Defense Booster", "Speed Booster", "Sp. Atk Booster", "Sp. Def Booster", "Jank Juice", "Healing Juice Bottle", "Healing Juice Jug"];
  54  |     for (const item of items) {
  55  |         await expect(page.locator(`#storeContent`)).toContainText(item);
  56  |     }
  57  |
  58  |     // Buy 1 Repellent
  59  |     const buyRepellentBtn = page.locator('button[onclick*="Repellent"]').first();
  60  |     await buyRepellentBtn.click();
  61  |
  62  |     // Verify repellent was added to inventory
  63  |     await page.waitForTimeout(500);
  64  |     const p1Slots = page.locator('#p1InventorySlots .inventory-slot');
  65  |     await expect(p1Slots.first()).toContainText('🧴');
  66  |     await expect(p1Slots.first()).toContainText('1');
  67  |
  68  |     // Buy another Repellent to test stacking (stack size 2)
  69  |     await buyRepellentBtn.click();
  70  |     await page.waitForTimeout(500);
  71  |     await expect(p1Slots.first()).toContainText('2');
  72  |
  73  |     // Buy other items to fill up remaining 2 slots
  74  |     const buyHPBoosterBtn = page.locator('button[onclick*="HP Booster"]').first();
  75  |     const buyBottleBtn = page.locator('button[onclick*="Healing Juice Bottle"]').first();
  76  |
  77  |     await buyHPBoosterBtn.click();
  78  |     await page.waitForTimeout(300);
  79  |     await buyBottleBtn.click();
> 80  |     await page.waitForTimeout(300);
      |                ^ Error: page.waitForTimeout: Test timeout of 30000ms exceeded.
  81  |
  82  |     // Verify all 3 slots are full
  83  |     await expect(p1Slots.nth(0)).toContainText('🧴');
  84  |     await expect(p1Slots.nth(1)).toContainText('💚');
  85  |     await expect(p1Slots.nth(2)).toContainText('🧪');
  86  |
  87  |     // Try to buy a 4th unique item type (Jank Juice) and expect warning/rejection
  88  |     const buyJankJuiceBtn = page.locator('button[onclick*="Jank Juice"]').first();
  89  |     await buyJankJuiceBtn.click();
  90  |     await page.waitForTimeout(300);
  91  |
  92  |     // Verify slots are still the same and did not include Jank Juice
  93  |     await expect(p1Slots.nth(0)).toContainText('🧴');
  94  |     await expect(p1Slots.nth(1)).toContainText('💚');
  95  |     await expect(p1Slots.nth(2)).toContainText('🧪');
  96  |   });
  97  |
  98  |   test('should use items and apply their effects correctly', async ({ page }) => {
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
```