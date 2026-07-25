const { test, expect } = require('@playwright/test');

test.describe('Odyssey New Features Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('friend level stat bonus displayed in pink next to base stats', async ({ page }) => {
    // Inject a creature with friend level bonus stats
    const statsShown = await page.evaluate(() => {
      window.collectedCreatures = [{
        id: "test_creature_1",
        name: "Phoenix",
        type: "Fire",
        level: 10,
        generation: 1,
        xp: 0,
        friendLevel: 2,
        friendXp: 10,
        stats: { health: 100, attack: 100, defense: 100, speed: 100, specialAttack: 100, specialDefense: 100 },
        friendBonusStats: { health: 2, attack: 2, defense: 0, speed: 0, specialAttack: 0, specialDefense: 0 },
        description: "A fiery bird."
      }];
      window.renderPartyList();
      const div = document.getElementById('partyList');
      return div ? div.innerHTML : '';
    });

    expect(statsShown).toContain('(+2)');
  });

  test('breeding center strictly enforces level 5 requirement', async ({ page }) => {
    // Try to breed underleveled creatures
    const breedResult = await page.evaluate(() => {
      window.collectedCreatures = [
        {
          id: "parent1",
          name: "Phoenix",
          type: "Fire",
          level: 4,
          generation: 1,
          stats: { health: 50, attack: 50, defense: 50, speed: 50, specialAttack: 50, specialDefense: 50 },
          description: "Parent 1"
        },
        {
          id: "parent2",
          name: "Titan",
          type: "Earth",
          level: 4,
          generation: 1,
          stats: { health: 50, attack: 50, defense: 50, speed: 50, specialAttack: 50, specialDefense: 50 },
          description: "Parent 2"
        }
      ];
      // Open modal to populate parent selects
      window.openBreedingModal(1);
      // Select parent2 for the second select to avoid breeding with itself
      document.getElementById('parent2Select').value = "parent2";
      // Try to breed
      window.doBreed(1);
      return document.getElementById('breedResult').innerText;
    });

    expect(breedResult).toBe('Both parent creatures must be at least level 5 to breed.');
  });

  test('storage box caps at 75 creatures', async ({ page }) => {
    const storeLimitResult = await page.evaluate(() => {
      const list = [];
      // 1 active creature
      list.push({
        id: "active_1",
        name: "Phoenix",
        type: "Fire",
        level: 1,
        generation: 1,
        stats: { health: 50, attack: 50, defense: 50, speed: 50, specialAttack: 50, specialDefense: 50 },
        description: "Active"
      });
      // 75 stored creatures
      for (let i = 0; i < 75; i++) {
        list.push({
          id: "stored_" + i,
          name: "Minion",
          type: "Wind",
          level: 1,
          generation: 1,
          stored: true,
          stats: { health: 50, attack: 50, defense: 50, speed: 50, specialAttack: 50, specialDefense: 50 },
          description: "Stored"
        });
      }
      // Also add one more active to try to store
      list.push({
        id: "active_2",
        name: "Phoenix 2",
        type: "Fire",
        level: 1,
        generation: 1,
        stats: { health: 50, attack: 50, defense: 50, speed: 50, specialAttack: 50, specialDefense: 50 },
        description: "Active 2"
      });

      window.collectedCreatures = list;

      let msg = '';
      window.showModernNotification = (m) => { msg = m; };
      window.storeCreature(window.collectedCreatures.length - 1, 1);
      return msg;
    });

    expect(storeLimitResult).toContain('Storage is full!');
  });

  test('allows selling creatures for coins at the shop', async ({ page }) => {
    const coinsAfterSale = await page.evaluate(() => {
      // 2 creatures (cannot sell last creature, so need at least 2)
      window.collectedCreatures = [
        {
          id: "c1",
          name: "Phoenix",
          type: "Fire",
          level: 5,
          generation: 1,
          stats: { health: 50, attack: 50, defense: 50, speed: 50, specialAttack: 50, specialDefense: 50 },
          description: "To be sold"
        },
        {
          id: "c2",
          name: "Titan",
          type: "Earth",
          level: 10,
          generation: 1,
          stats: { health: 50, attack: 50, defense: 50, speed: 50, specialAttack: 50, specialDefense: 50 },
          description: "To keep"
        }
      ];
      window.collectedCreaturesIds = new Set(["c1", "c2"]);
      window.gameStats = { coins: 100 };

      // Update store UI to build the select dropdown
      window.updateStoreUI();

      // Set the select value to index 0 (which is c1)
      const select = document.getElementById('sellCreatureSelect_P1');
      select.value = "0";

      // Mock confirm to return true
      window.confirm = () => true;

      // Sell it
      window.sellCreature(1);

      return {
        coins: window.gameStats.coins,
        count: window.collectedCreatures.length
      };
    });

    // Level 5 creature sell price is Math.floor(50 + 10 * 5) = 100.
    // 100 starting coins + 100 sell price = 200.
    expect(coinsAfterSale.coins).toBe(200);
    expect(coinsAfterSale.count).toBe(1);
  });
});
