# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/odysseyFeatures.spec.js >> Odyssey New Features Tests >> breeding center strictly enforces level 5 requirement
- Location: tests/odysseyFeatures.spec.js:32:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "Both parent creatures must be at least level 5 to breed."
Received: "Player must be at least Level 7 to breed creatures."
```

# Page snapshot

```yaml
- generic [active]:
  - generic [ref=e3]:
    - heading "WildPulse Odyssey" [level=1] [ref=e4]
    - button "Single Player" [ref=e5] [cursor=pointer]
    - button "Split Screen" [ref=e6] [cursor=pointer]
    - button "Customize Character" [ref=e7] [cursor=pointer]
  - generic [ref=e8]:
    - button "Close Breeding Center" [ref=e9] [cursor=pointer]: X
    - generic [ref=e11]:
      - heading "Player 1 Breeding" [level=2] [ref=e12]
      - generic [ref=e13]:
        - generic [ref=e14]: "Parent 1:"
        - combobox [ref=e15]:
          - option "Phoenix (♀, Lvl 4, Gen 1)" [selected]
          - option "Titan (♂, Lvl 4, Gen 1)"
      - generic [ref=e16]:
        - generic [ref=e17]: "Parent 2:"
        - combobox [ref=e18]:
          - option "Phoenix (♀, Lvl 4, Gen 1)"
          - option "Titan (♂, Lvl 4, Gen 1)" [selected]
      - button "Breed!" [ref=e19] [cursor=pointer]
      - paragraph [ref=e20]: Player must be at least Level 7 to breed creatures.
    - button "Close" [ref=e21] [cursor=pointer]
```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   |
  3   | test.describe('Odyssey New Features Tests', () => {
  4   |   test.beforeEach(async ({ page }) => {
  5   |     await page.goto('http://localhost:3000');
  6   |   });
  7   |
  8   |   test('friend level stat bonus displayed in pink next to base stats', async ({ page }) => {
  9   |     // Inject a creature with friend level bonus stats
  10  |     const statsShown = await page.evaluate(() => {
  11  |       window.collectedCreatures = [{
  12  |         id: "test_creature_1",
  13  |         name: "Phoenix",
  14  |         type: "Fire",
  15  |         level: 10,
  16  |         generation: 1,
  17  |         xp: 0,
  18  |         friendLevel: 2,
  19  |         friendXp: 10,
  20  |         stats: { health: 100, attack: 100, defense: 100, speed: 100, specialAttack: 100, specialDefense: 100 },
  21  |         friendBonusStats: { health: 2, attack: 2, defense: 0, speed: 0, specialAttack: 0, specialDefense: 0 },
  22  |         description: "A fiery bird."
  23  |       }];
  24  |       window.renderPartyList();
  25  |       const div = document.getElementById('partyList');
  26  |       return div ? div.innerHTML : '';
  27  |     });
  28  |
  29  |     expect(statsShown).toContain('(+2)');
  30  |   });
  31  |
  32  |   test('breeding center strictly enforces level 5 requirement', async ({ page }) => {
  33  |     // Try to breed underleveled creatures
  34  |     const breedResult = await page.evaluate(() => {
  35  |       window.collectedCreatures = [
  36  |         {
  37  |           id: "parent1",
  38  |           name: "Phoenix",
  39  |           type: "Fire",
  40  |           level: 4,
  41  |           generation: 1,
  42  |           stats: { health: 50, attack: 50, defense: 50, speed: 50, specialAttack: 50, specialDefense: 50 },
  43  |           description: "Parent 1"
  44  |         },
  45  |         {
  46  |           id: "parent2",
  47  |           name: "Titan",
  48  |           type: "Earth",
  49  |           level: 4,
  50  |           generation: 1,
  51  |           stats: { health: 50, attack: 50, defense: 50, speed: 50, specialAttack: 50, specialDefense: 50 },
  52  |           description: "Parent 2"
  53  |         }
  54  |       ];
  55  |       // Open modal to populate parent selects
  56  |       window.openBreedingModal(1);
  57  |       // Select parent2 for the second select to avoid breeding with itself
  58  |       document.getElementById('parent2Select').value = "parent2";
  59  |       // Try to breed
  60  |       window.doBreed(1);
  61  |       return document.getElementById('breedResult').innerText;
  62  |     });
  63  |
> 64  |     expect(breedResult).toBe('Both parent creatures must be at least level 5 to breed.');
      |                         ^ Error: expect(received).toBe(expected) // Object.is equality
  65  |   });
  66  |
  67  |   test('storage box caps at 75 creatures', async ({ page }) => {
  68  |     const storeLimitResult = await page.evaluate(() => {
  69  |       const list = [];
  70  |       // 1 active creature
  71  |       list.push({
  72  |         id: "active_1",
  73  |         name: "Phoenix",
  74  |         type: "Fire",
  75  |         level: 1,
  76  |         generation: 1,
  77  |         stats: { health: 50, attack: 50, defense: 50, speed: 50, specialAttack: 50, specialDefense: 50 },
  78  |         description: "Active"
  79  |       });
  80  |       // 75 stored creatures
  81  |       for (let i = 0; i < 75; i++) {
  82  |         list.push({
  83  |           id: "stored_" + i,
  84  |           name: "Minion",
  85  |           type: "Wind",
  86  |           level: 1,
  87  |           generation: 1,
  88  |           stored: true,
  89  |           stats: { health: 50, attack: 50, defense: 50, speed: 50, specialAttack: 50, specialDefense: 50 },
  90  |           description: "Stored"
  91  |         });
  92  |       }
  93  |       // Also add one more active to try to store
  94  |       list.push({
  95  |         id: "active_2",
  96  |         name: "Phoenix 2",
  97  |         type: "Fire",
  98  |         level: 1,
  99  |         generation: 1,
  100 |         stats: { health: 50, attack: 50, defense: 50, speed: 50, specialAttack: 50, specialDefense: 50 },
  101 |         description: "Active 2"
  102 |       });
  103 |
  104 |       window.collectedCreatures = list;
  105 |
  106 |       let msg = '';
  107 |       window.showModernNotification = (m) => { msg = m; };
  108 |       window.storeCreature(window.collectedCreatures.length - 1, 1);
  109 |       return msg;
  110 |     });
  111 |
  112 |     expect(storeLimitResult).toContain('Storage is full!');
  113 |   });
  114 |
  115 |   test('allows selling creatures for coins at the shop', async ({ page }) => {
  116 |     const coinsAfterSale = await page.evaluate(() => {
  117 |       // 2 creatures (cannot sell last creature, so need at least 2)
  118 |       window.collectedCreatures = [
  119 |         {
  120 |           id: "c1",
  121 |           name: "Phoenix",
  122 |           type: "Fire",
  123 |           level: 5,
  124 |           generation: 1,
  125 |           stats: { health: 50, attack: 50, defense: 50, speed: 50, specialAttack: 50, specialDefense: 50 },
  126 |           description: "To be sold"
  127 |         },
  128 |         {
  129 |           id: "c2",
  130 |           name: "Titan",
  131 |           type: "Earth",
  132 |           level: 10,
  133 |           generation: 1,
  134 |           stats: { health: 50, attack: 50, defense: 50, speed: 50, specialAttack: 50, specialDefense: 50 },
  135 |           description: "To keep"
  136 |         }
  137 |       ];
  138 |       window.collectedCreaturesIds = new Set(["c1", "c2"]);
  139 |       window.gameStats = { coins: 100 };
  140 |
  141 |       // Update store UI to build the select dropdown
  142 |       window.updateStoreUI();
  143 |
  144 |       // Set the select value to index 0 (which is c1)
  145 |       const select = document.getElementById('sellCreatureSelect_P1');
  146 |       select.value = "0";
  147 |
  148 |       // Mock confirm to return true
  149 |       window.confirm = () => true;
  150 |
  151 |       // Sell it
  152 |       window.sellCreature(1);
  153 |
  154 |       return {
  155 |         coins: window.gameStats.coins,
  156 |         count: window.collectedCreatures.length
  157 |       };
  158 |     });
  159 |
  160 |     // Level 5 creature sell price is 141 based on effective stats (totalStats * 0.2 + 50).
  161 |     // 100 starting coins + 141 sell price = 241.
  162 |     expect(coinsAfterSale.coins).toBe(241);
  163 |     expect(coinsAfterSale.count).toBe(1);
  164 |   });
```