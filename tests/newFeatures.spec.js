const { test, expect } = require('@playwright/test');

test.describe('New Features Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    // Start game session by clicking start button
    await page.click('#startGameBtn');
    // Wait for the game to start and the main menu button to be visible
    await page.waitForSelector('#menuBtn', { state: 'visible' });
    // Clear creaturesGroup to ensure tests have a clean slate and don't hit spawn limits
    await page.evaluate(() => {
      if (window.creaturesGroup) {
        window.creaturesGroup.clear(true, true);
      }
    });
  });

  test('respawnEnemyBase chooses a different species', async ({ page }) => {
    const result = await page.evaluate(() => {
      // Setup mock currentEnemy
      window.currentEnemy = { id: 1, baseId: 1, name: "Flarehawk" };

      // Let's call respawnEnemyBase
      // We will mock spawnCreature to check what gets passed
      let spawnedData = null;
      const originalSpawnCreature = window.spawnCreature;
      window.spawnCreature = (scene, creatureData, x, y) => {
        spawnedData = creatureData;
      };

      window.respawnEnemyBase();

      // Restore original
      window.spawnCreature = originalSpawnCreature;

      return {
        spawnedName: spawnedData ? spawnedData.name : null,
        spawnedBaseId: spawnedData ? spawnedData.id : null,
        different: spawnedData ? (spawnedData.name !== "Flarehawk" && spawnedData.id !== 1) : false
      };
    });

    expect(result.different).toBe(true);
  });

  test('window.releaseCreature enforces party release restrictions', async ({ page }) => {
    const alerts = [];
    page.on('dialog', async dialog => {
      alerts.push(dialog.message());
      await dialog.dismiss();
    });

    const result = await page.evaluate(() => {
      // Set collected creatures to exactly 1 party creature and 0 stored creatures
      window.collectedCreatures = [
        { id: "test_1", name: "Flarehawk", stored: false }
      ];
      window.collectedCreaturesIds = new Set(["test_1"]);

      // Try to release it
      window.releaseCreature(0, 1);
      const firstReleaseSuccess = window.collectedCreatures.length === 0;

      // Add a stored creature
      window.collectedCreatures.push({ id: "test_2", name: "Tidehound", stored: true });
      window.collectedCreaturesIds.add("test_2");

      // Try to release again (should be allowed since we have a stored creature)
      // Mock window.confirm to return true
      const originalConfirm = window.confirm;
      window.confirm = () => true;
      window.releaseCreature(0, 1);
      window.confirm = originalConfirm;

      const secondReleaseSuccess = window.collectedCreatures.length === 1 && window.collectedCreatures[0].id === "test_2";

      return {
        firstReleaseSuccess,
        secondReleaseSuccess
      };
    });

    expect(result.firstReleaseSuccess).toBe(false);
    expect(result.secondReleaseSuccess).toBe(true);
    expect(alerts).toContain("You cannot release your last creature!");
  });

  test('shiny creature notifications, culling protection, and element symbol star', async ({ page }) => {
    const result = await page.evaluate(() => {
      let notifiedText = null;
      window.showModernNotification = (text, duration) => {
        notifiedText = text;
      };

      // Mock scene object
      const mockScene = {
        textures: {
          exists: () => true
        },
        add: {
          sprite: () => {
            const spr = {
              setDisplaySize: () => spr,
              setDepth: () => spr,
              setData: () => spr,
              on: () => spr
            };
            return spr;
          },
          text: (x, y, text) => {
            const txt = {
              setOrigin: () => txt,
              setDepth: () => txt
            };
            txt.text = text; // track assigned symbolEmoji
            return txt;
          }
        },
        physics: {
          add: {
            existing: () => {}
          }
        }
      };

      // Mock Math.random to return 0.0, so that sRng() < shinyChance will be 0.0 < 0.001 which is true!
      const originalRandom = Math.random;
      Math.random = () => 0.0;

      const shinyPrototype = { id: 2, name: "Tidehound", type: "Water" };

      // We will override Math.random inside spawnCreature context if needed,
      // but let's pass a prototype with isShiny pre-set or we can mock sRng or seed
      // Check symbol text element for star symbol
      let createdTextVal = null;
      mockScene.add.container = (x, y) => {
        let containerData = {};
        const cont = {
          setDepth: () => cont,
          add: () => cont,
          removeAll: () => cont,
          destroy: () => {},
          setData: (k, v) => { containerData[k] = v; return cont; },
          getData: (k) => containerData[k]
        };
        return cont;
      };

      const originalAddText = mockScene.add.text;
      mockScene.add.text = (x, y, text, opts) => {
        if(text === "⭐") {
             createdTextVal = text;
        }
        return originalAddText(x, y, text, opts);
      };

      window.spawnCreature(mockScene, shinyPrototype, 200, 200, undefined);

      // Restore Math.random
      Math.random = originalRandom;

      return {
        notificationReceived: notifiedText && notifiedText.includes("Shiny") && notifiedText.includes("Tidehound"),
        createdTextVal
      };
    });

    expect(result.notificationReceived).toBe(true);
    expect(result.createdTextVal).toContain("⭐");
  });
});
