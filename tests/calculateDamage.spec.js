const { test, expect } = require('@playwright/test');

test.describe('window.calculateDamage', () => {
  test('calculates basic physical damage correctly', async ({ page }) => {
    await page.goto('file://' + __dirname + '/../index.html');

    const result = await page.evaluate(() => {
      // Mock dependencies to isolate calculateDamage logic
      window.getEffectiveStat = (creature, stat) => {
        const stats = {
          'attack': 100,
          'defense': 50,
          'specialAttack': 10,
          'specialDefense': 100,
          'health': 100
        };
        return stats[stat];
      };

      window.getTypeModifier = () => 1;

      const attacker = { level: 10, type: 'Normal' };
      const defender = { type: 'Normal' };

      return window.calculateDamage(attacker, defender, 40);
    });

    // atk = 100, def = 50 -> atk/def = 2
    // spAtk = 10, spDef = 100 -> spAtk/spDef = 0.1
    // level = 10, power = 40
    // physDamage = ((((2 * 10 / 5 + 2) * 40 * (2)) / 50) + 2) * 1
    // = ((((4 + 2) * 40 * 2) / 50) + 2)
    // = (((6 * 80) / 50) + 2)
    // = ((480 / 50) + 2) = 9.6 + 2 = 11.6
    expect(result).toBe(11.6);
  });

  test('calculates basic special damage correctly', async ({ page }) => {
    await page.goto('file://' + __dirname + '/../index.html');

    const result = await page.evaluate(() => {
      window.getEffectiveStat = (creature, stat) => {
        const stats = {
          'attack': 10,
          'defense': 100,
          'specialAttack': 100,
          'specialDefense': 50,
          'health': 100
        };
        return stats[stat];
      };

      window.getTypeModifier = () => 1;

      const attacker = { level: 10, type: 'Normal' };
      const defender = { type: 'Normal' };

      return window.calculateDamage(attacker, defender, 40);
    });

    // Uses the max of physical and special damage
    // spAtk = 100, spDef = 50 -> 2
    // Same math as above = 11.6
    expect(result).toBe(11.6);
  });

  test('applies type modifiers properly and caps them', async ({ page }) => {
    await page.goto('file://' + __dirname + '/../index.html');

    const result = await page.evaluate(() => {
      window.getEffectiveStat = (creature, stat) => {
        const stats = {
          'attack': 100,
          'defense': 50,
          'specialAttack': 10,
          'specialDefense': 100,
          'health': 1000 // high health to prevent OHKO cap
        };
        return stats[stat];
      };

      // Return an excessive type modifier to test capping
      window.getTypeModifier = () => 5;

      const attacker = { level: 10, type: 'Normal' };
      const defender = { type: 'Normal' };

      return window.calculateDamage(attacker, defender, 40);
    });

    // Base damage is 11.6
    // typeMod is capped at 2 (Math.min(2, Math.max(0, 5)))
    // 11.6 * 2 = 23.2
    expect(result).toBe(23.2);
  });

  test('prevents OHKO from super effective attacks', async ({ page }) => {
    await page.goto('file://' + __dirname + '/../index.html');

    const result = await page.evaluate(() => {
      window.getEffectiveStat = (creature, stat) => {
        const stats = {
          'attack': 1000,
          'defense': 10,
          'specialAttack': 10,
          'specialDefense': 100,
          'health': 100 // Defender max HP
        };
        return stats[stat];
      };

      window.getTypeModifier = () => 2; // Super effective

      const attacker = { level: 100, type: 'Normal' };
      const defender = { type: 'Normal' };

      return window.calculateDamage(attacker, defender, 100);
    });

    // Damage will be massive, much larger than defender max HP (100)
    // Because typeMod > 1, it should cap at defMaxHp - 1 = 99
    expect(result).toBe(99);
  });

  test('enforces minimum 1 damage', async ({ page }) => {
    await page.goto('file://' + __dirname + '/../index.html');

    const result = await page.evaluate(() => {
      window.getEffectiveStat = (creature, stat) => {
        const stats = {
          'attack': 1,
          'defense': 1000,
          'specialAttack': 1,
          'specialDefense': 1000,
          'health': 100
        };
        return stats[stat];
      };

      window.getTypeModifier = () => 0; // Immune

      const attacker = { level: 1, type: 'Normal' };
      const defender = { type: 'Normal' };

      return window.calculateDamage(attacker, defender, 10);
    });

    // Damage calculates to 0 due to type modifier 0. Should be capped at 1.
    expect(result).toBe(1);
  });
});
