# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/odysseyFeatures.spec.js >> Odyssey New Features Tests >> friend level stat bonus displayed in pink next to base stats
- Location: tests/odysseyFeatures.spec.js:8:3

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected substring: "(+2)"
Received string:    "<h3 style=\"color: rgb(224, 224, 255); margin-top: 0px;\">Active Party (1/6)</h3><div tabindex=\"0\" class=\"party-card\" style=\"background-image: linear-gradient(90deg, rgba(255, 69, 0, 0.85), rgba(255, 69, 0, 0.85)); background-color: transparent;\">
            <div>
                <h3 style=\"font-size: 1.2em; border-bottom: 1px solid #87CEEB; padding-bottom: 5px; margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap;\">
                    <span style=\"display: flex; align-items: center; gap: 5px;\">·························
                        <input class=\"creature-name\" aria-label=\"Creature Name\" value=\"Phoenix\" maxlength=\"20\">
                        <button class=\"save-name-btn\" onclick=\"window.saveName(this, 0, 1)\">Save</button>
                        <span style=\"color: #00e5ff; font-weight: bold; font-size: 1.1em; margin-left: 5px;\" title=\"Male\">♂</span>
                    </span>
                    <span style=\"display: flex; align-items: center; gap: 10px;\">
                        <button class=\"favorite-btn\" onclick=\"window.toggleFavorite(0, 1)\" title=\"Favorite\" style=\"background: none; border: none; cursor: pointer; font-size: 1.2em; outline: none; padding: 0; line-height: 1; transition: transform 0.1s;\" onmouseover=\"this.style.transform='scale(1.2)'\" onmouseout=\"this.style.transform='scale(1.0)'\">🤍</button>
                        <span class=\"type-badge\" data-tooltip=\"Strengths (2x): Nature, Ice &lt;br&gt; Weaknesses (2x from): Water, Earth\">Fire</span>
                    </span>
                </h3>
                <p><strong>Level <span style=\"color:#2196F3\">10</span></strong> (Gen 1) | <span style=\"color:#2196F3\">XP: 0 / 10000</span> | <span style=\"color:#ff4081; font-weight: bold;\">Friend Lvl 2</span> <span style=\"font-size: 0.9em; color: #ff80ab;\">(XP: 10/100)</span></p>
                <div style=\"margin-top: -5px; margin-bottom: 10px; font-size: 0.9em; display: flex; align-items: center; gap: 8px;\">
                    <span style=\"font-weight: bold; color: #ff4081;\">Happiness:</span>
                    <div style=\"flex-grow: 1; height: 10px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.2); border-radius: 5px; overflow: hidden; max-width: 120px;\">
                        <div style=\"height: 100%; width: 50%; background: linear-gradient(90deg, #ffeb3b, #ffd54f); box-shadow: 0 0 8px rgba(255, 235, 59, 0.5);\"></div>
                    </div>
                    <span style=\"color: #ff80ab; font-weight: bold;\">50/100</span>
                </div>
                <div class=\"creature-description\" style=\"display: flex; gap: 15px; align-items: center; margin-bottom: 10px;\">
                    <div class=\"creature-sprite-container\" style=\"flex-shrink: 0; width: 80px; height: 80px;\"><canvas width=\"80\" height=\"80\" style=\"display: block; border-radius: 8px; box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 10px; border: 1px solid rgba(255, 255, 255, 0.1); cursor: pointer;\"></canvas></div>
                </div>
                <div style=\"display:flex; gap:10px; flex-wrap:wrap; margin-bottom: 10px;\">
                    <p>Ability: None</p>
                </div>·················
            </div>
            <div class=\"party-controls\">
                <button class=\"move-up-btn\" onclick=\"window.moveUp(0, 1)\" aria-label=\"Move Up\">▲</button>
                <button class=\"move-down-btn\" onclick=\"window.moveDown(0, 1)\" aria-label=\"Move Down\">▼</button>
                <button class=\"store-btn\" onclick=\"window.storeCreature(0, 1)\" style=\"background-color: #2196F3; color: white;\">Store</button>
                <button class=\"release-btn\" onclick=\"window.releaseCreature(0, 1)\" style=\"background-color: #f44336; color: white;\">Release</button>
            </div>
        </div>"
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - heading "WildPulse Odyssey" [level=1] [ref=e4]
  - button "Single Player" [ref=e5] [cursor=pointer]
  - button "Split Screen" [ref=e6] [cursor=pointer]
  - button "Customize Character" [ref=e7] [cursor=pointer]
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
> 29  |     expect(statsShown).toContain('(+2)');
      |                        ^ Error: expect(received).toContain(expected) // indexOf
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
  64  |     expect(breedResult).toBe('Both parent creatures must be at least level 5 to breed.');
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
```