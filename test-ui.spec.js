const { test, expect } = require('@playwright/test');

test('Teleport home uses correct icon and UI caching works', async ({ page }) => {
  // Mock initialization vars to skip intros
  await page.addInitScript(() => {
    localStorage.setItem('wildpulse_has_seen_intro', 'true');
    localStorage.setItem('wildpulse_player_color', '#ff00ff');
    window.__test_onboarding = false;
    window.gameStarted = true;
  });

  await page.goto('http://127.0.0.1:3000');

  // Wait for game to initialize
  await page.waitForTimeout(1000);

  // Expose test functions
  await page.evaluate(() => {
    if (window.game && window.game.scene.scenes[0]) {
      window.gameStarted = true;
      window.playerParty = [{id: 1, name: "TestCreature", level: 5, type: "Normal", hp: 10, maxHp: 10}];
      window.collectedCreatures = [{id: 2, name: "StorageCreature", level: 5, type: "Water"}];
    }
  });

  // Call handleHomeTeleporterOverlap directly to test if window.getPortalIconHTML crash is gone
  await page.evaluate(() => {
      window.player = { lastHomeTeleportTime: 0, setPosition: () => {}, body: { reset: () => {}, updateFromGameObject: () => {} }};
      window.p1Level = 15;
      const tile = { y: 15000 };
      window.handleHomeTeleporterOverlap(1, tile);
  });

  // Check if modern notification appeared with the portal SVG
  const notificationVisible = await page.evaluate(() => {
      const el = document.getElementById('modernNotification');
      return el && el.style.opacity === '1' && el.innerHTML.includes('<svg');
  });
  expect(notificationVisible).toBeTruthy();

  // Test UI Caching
  // Open party modal
  await page.evaluate(() => {
      window.p1ActiveModal = 'partyModal';
      document.getElementById('partyModal').style.display = 'block';
      window.renderPartyList(); // 1st render
  });

  // Try to render again (should be blocked by cache)
  await page.evaluate(() => {
      const el = document.getElementById('partyList');
      if(el) {
          el.innerHTML = '<div id="test-cache-marker">Cached!</div>';
      } else {
          // Add it to modal if list not found for some reason
          const modal = document.getElementById('partyModal');
          const marker = document.createElement('div');
          marker.id = "test-cache-marker";
          marker.innerText = "Cached!";
          modal.appendChild(marker);
      }
      window.renderPartyList(); // 2nd render
  });

  // The marker should still be there because the state string didn't change
  const isCached = await page.evaluate(() => {
      return document.getElementById('test-cache-marker') !== null;
  });
  expect(isCached).toBeTruthy();
});
