const { test, expect } = require('@playwright/test');

test.describe('ExPALL and Split-Screen Divider', () => {
  test('players start the game with two healing juice bottles', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const p1Inv = await page.evaluate(() => {
      // Clear localStorage so we get fresh defaults
      localStorage.clear();
      // Reload or trigger default check
      return window.p1Inventory;
    });

    expect(p1Inv).toBeDefined();
    const item = p1Inv.find(i => i.name === "Healing Juice Bottle");
    expect(item).toBeDefined();
    expect(item.quantity).toBe(2);
  });

  test('ExPALL item is registered and active', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const result = await page.evaluate(() => {
      // ExPALL should be present in store replenishment stock defaults
      return {
        defaultStockHasExPall: window.p1StoreStock && window.p1StoreStock["ExPALL"] === 15,
        p1ExPallTimeExists: typeof window.p1ExPallTime === 'number'
      };
    });

    expect(result.defaultStockHasExPall).toBe(true);
    expect(result.p1ExPallTimeExists).toBe(true);
  });

  test('Co-op split line exists and displays correctly in split screen co-op mode', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Initially hidden
    const lineVisibleInitial = await page.locator('#coopSplitLine').isVisible();
    expect(lineVisibleInitial).toBe(false);

    // Enable co-op via window.enableCoop and verify visibility
    const lineVisibleAfterCoop = await page.evaluate(() => {
      window.generatePlayerTexture = () => {};
      if (window.enableCoop) {
        // Mock a scene
        const mockSprite = () => ({
          setTint: () => {},
          setDepth: () => {},
          setPosition: () => {},
          setAlpha: () => {},
          setBlendMode: () => {},
          originalColor: 0,
          body: {
            setCollideWorldBounds: () => {}
          }
        });
        const mockScene = {
          add: {
            sprite: mockSprite,
            text: () => {
              const obj = {};
              obj.setOrigin = () => obj;
              obj.setDepth = () => obj;
              return obj;
            }
          },
          physics: {
            add: {
              existing: () => {},
              collider: () => ({}),
              overlap: () => ({})
            }
          },
          cameras: {
            main: {
              setViewport: () => ({
                setSize: () => {}
              })
            },
            add: () => ({
              startFollow: () => {},
              setBounds: () => {}
            })
          }
        };
        window.enableCoop(mockScene);
      }
      const el = document.getElementById('coopSplitLine');
      return el && el.style.display === 'block';
    });

    expect(lineVisibleAfterCoop).toBe(true);
  });
});
