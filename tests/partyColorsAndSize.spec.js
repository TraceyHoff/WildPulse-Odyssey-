const { test, expect } = require('@playwright/test');

test.describe('Party Modal Text Color & Creature World Scaling Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem('wildpulse_skip_start_modal', 'true');
    });
    await page.goto('http://localhost:3000');
  });

  test('should apply dark-text class and dark styles to Light and Electric creatures in the party modal', async ({ page }) => {
    // Wait for the game to load
    await page.waitForSelector('#menuBtn', { state: 'visible' });

    // Mock collected creatures in the party with Light, Electric, and Fire types
    await page.evaluate(() => {
      window.collectedCreatures = [
        {
          id: 'creature_1_light',
          name: 'Luxhound',
          nickname: 'Luxy',
          type: 'Light',
          level: 5,
          generation: 1,
          xp: 10,
          description: 'A radiant hound.',
          stored: false,
          stats: { health: 10, attack: 10, defense: 10, speed: 10, specialAttack: 10, specialDefense: 10 }
        },
        {
          id: 'creature_2_electric',
          name: 'Voltcat',
          nickname: 'Sparky',
          type: 'Electric',
          level: 5,
          generation: 1,
          xp: 20,
          description: 'A sparkly cat.',
          stored: false,
          stats: { health: 10, attack: 10, defense: 10, speed: 10, specialAttack: 10, specialDefense: 10 }
        },
        {
          id: 'creature_3_fire',
          name: 'Emberfox',
          nickname: 'Foxy',
          type: 'Fire',
          level: 5,
          generation: 1,
          xp: 30,
          description: 'A warm fox.',
          stored: false,
          stats: { health: 10, attack: 10, defense: 10, speed: 10, specialAttack: 10, specialDefense: 10 }
        }
      ];
      window.renderPartyList();
    });

    // Open the Menu modal
    await page.click('#menuBtn');
    await page.waitForSelector('#menuModal', { state: 'visible' });

    // Open the Party modal
    await page.click('#menuPartyBtn');
    await page.waitForSelector('#partyModal', { state: 'visible' });

    // Check that cards have correct classes
    const classes = await page.evaluate(() => {
      const cards = document.querySelectorAll('#partyList .party-card');
      return Array.from(cards).map(card => {
        const input = card.querySelector('.creature-name');
        return {
          name: input ? input.value : '',
          text: card.innerText,
          className: card.className
        };
      });
    });

    expect(classes.length).toBe(3);

    // Luxhound (Light type) should have dark-text class
    const luxhoundCard = classes.find(c => c.name === 'Luxy' || c.name === 'Luxhound');
    expect(luxhoundCard).toBeDefined();
    expect(luxhoundCard.className).toContain('dark-text');

    // Voltcat (Electric type) should have dark-text class
    const voltcatCard = classes.find(c => c.name === 'Sparky' || c.name === 'Voltcat');
    expect(voltcatCard).toBeDefined();
    expect(voltcatCard.className).toContain('dark-text');

    // Emberfox (Fire type) should NOT have dark-text class
    const emberfoxCard = classes.find(c => c.name === 'Foxy' || c.name === 'Emberfox');
    expect(emberfoxCard).toBeDefined();
    expect(emberfoxCard.className).not.toContain('dark-text');
  });

  test('should scale wild creatures to the same size as the player character (48x48)', async ({ page }) => {
    // Wait for the game to load
    await page.waitForSelector('#menuBtn', { state: 'visible' });

    // Verify wild creatures spawned have display size 48x48
    const sizes = await page.evaluate(() => {
      if (!window.creaturesGroup) return [];
      return window.creaturesGroup.getChildren().map(sprite => ({
        width: sprite.displayWidth,
        height: sprite.displayHeight
      }));
    });

    // Check that at least some creatures are spawned and their display dimensions are exactly 48x48
    if (sizes.length > 0) {
      for (const size of sizes) {
        expect(size.width).toBe(48);
        expect(size.height).toBe(48);
      }
    } else {
      // Force spawn a creature to test
      const size = await page.evaluate(() => {
        const scene = window.game.scene.scenes[0];
        const dummyCreature = {
          id: 'test_creature',
          name: 'TestCreature',
          type: 'Nature',
          level: 1,
          stats: { health: 10, attack: 10, defense: 10, speed: 10, specialAttack: 10, specialDefense: 10 }
        };
        window.spawnCreature(scene, dummyCreature, 100, 100);
        const child = window.creaturesGroup.getChildren().find(c => c.getData('creatureData').id === 'test_creature');
        return child ? { width: child.displayWidth, height: child.displayHeight } : null;
      });
      expect(size).not.toBeNull();
      expect(size.width).toBe(48);
      expect(size.height).toBe(48);
    }
  });
});
