const { test, expect } = require('@playwright/test');

test.describe('Home Interior Entering System', () => {
  test.beforeEach(async ({ page }) => {
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

    // First navigate to the page to establish origin, then set localStorage items, then reload
    await page.goto('http://localhost:3000');
    await page.evaluate(() => {
      localStorage.setItem('wildpulse_p1_home_x', '4500');
      localStorage.setItem('wildpulse_p1_home_y', '4500');
      localStorage.setItem('wildpulse_p2_home_x', '4700');
      localStorage.setItem('wildpulse_p2_home_y', '4700');
      localStorage.setItem('wildpulse_p1_level', '10');
      localStorage.setItem('wildpulse_p2_level', '10');
    });
    await page.reload();

    // Dismiss start modal by clicking Single Player
    const startBtn = page.locator('#startGameBtn');
    if (await startBtn.isVisible()) {
      await startBtn.click();
    }
    // Dismiss onboarding intro modal if visible
    const introClose = page.locator('#introModal .close-btn');
    if (await introClose.isVisible()) {
      await introClose.click();
    }
  });

  test('should register home interior textures on startup', async ({ page }) => {
    const texturesExist = await page.evaluate(() => {
      const scene = window.game.scene.scenes[0];
      return {
        wall: scene.textures.exists('home_wall_tile'),
        floor: scene.textures.exists('home_floor_tile')
      };
    });

    expect(texturesExist.wall).toBe(true);
    expect(texturesExist.floor).toBe(true);
  });

  test('should enter home for Player 1', async ({ page }) => {
    // 1. Move player to overlap home tile and verify teleportation to home center
    const enterResult = await page.evaluate(() => {
      const scene = window.game.scene.scenes[0];
      const pSprite = window.player;

      // Simulate player walking onto home: teleport directly onto it
      // Home is at 4500, 4500
      pSprite.setPosition(4500, 4500);

      // Trigger overlap directly for synchronous precision in tests
      const homeTile = window.homesGroup.getChildren().find(h => h.playerNum === 1);
      window.handleHomeOverlap(1, pSprite, homeTile);

      return {
        playerX: window.player.x,
        playerY: window.player.y,
        preHomeX: window.p1PreHomePos.x,
        preHomeY: window.p1PreHomePos.y
      };
    });

    // Player should be inside the P1 Room Center (col 582, row 582) -> X = 58250, Y = 58250
    expect(enterResult.playerX).toBe(58250);
    expect(enterResult.playerY).toBe(58250);
    expect(enterResult.preHomeX).toBe(4500);
    expect(enterResult.preHomeY).toBe(4500);
  });

  test('should enter home for Player 2', async ({ page }) => {
    // Setup Player 2 (Local Coop split screen)
    await page.evaluate(() => {
      const scene = window.game.scene.scenes[0];
      window.enableCoop(scene);
    });

    // 1. Teleport Player 2 to their home and enter
    const enterResult = await page.evaluate(() => {
      const scene = window.game.scene.scenes[0];
      const pSprite = window.player2;

      pSprite.setPosition(4700, 4700);

      const homeTile = window.homesGroup.getChildren().find(h => h.playerNum === 2);
      window.handleHomeOverlap(2, pSprite, homeTile);

      return {
        playerX: window.player2.x,
        playerY: window.player2.y,
        preHomeX: window.p2PreHomePos.x,
        preHomeY: window.p2PreHomePos.y
      };
    });

    // Player 2 should be inside the P2 Room Center (col 592, row 542) -> X = 59250, Y = 54250
    expect(enterResult.playerX).toBe(59250);
    expect(enterResult.playerY).toBe(54250);
    expect(enterResult.preHomeX).toBe(4700);
    expect(enterResult.preHomeY).toBe(4700);
  });
});
