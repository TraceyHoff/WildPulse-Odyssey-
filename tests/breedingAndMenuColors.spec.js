const { test, expect } = require('@playwright/test');

test.describe('Breeding Notification and Colorful Player 2 Menu Buttons', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.clear();
      sessionStorage.setItem('wildpulse_skip_start_modal', 'true');
    });
    await page.goto('http://localhost:3000');
  });

  test('should style Player 2 menu buttons identically and colorfully like Player 1 menu buttons', async ({ page }) => {
    // Wait for the game/menu to load
    await page.waitForSelector('#menuBtn', { state: 'visible' });
    await page.click('#menuBtn');
    await page.waitForSelector('#menuModal', { state: 'visible' });

    // Enable co-op mode to render Player 2 menu column
    await page.click('#coopToggleBtn');
    const isCoopActive = await page.evaluate(() => window.coopActive);
    expect(isCoopActive).toBe(true);

    // Verify colorful menu buttons styling matching Player 1's
    const buttonPairs = [
      { p1Id: 'menuPartyBtn', p2Id: 'menuPartyBtn_P2' },
      { p1Id: 'menuStorageBtn', p2Id: 'menuStorageBtn_P2' },
      { p1Id: 'breedBtn', p2Id: 'breedBtn_P2' },
      { p1Id: 'menuJournalBtn', p2Id: 'menuJournalBtn_P2' },
      { p1Id: 'menuCustomizeBtn', p2Id: 'menuCustomizeBtn_P2' },
      { p1Id: 'menuHelpBtn', p2Id: 'menuHelpBtn_P2' }
    ];

    for (const pair of buttonPairs) {
      const styles = await page.evaluate((p) => {
        const btn1 = document.getElementById(p.p1Id);
        const btn2 = document.getElementById(p.p2Id);
        if (!btn1 || !btn2) return null;
        const style1 = window.getComputedStyle(btn1);
        const style2 = window.getComputedStyle(btn2);
        return {
          bg1: style1.backgroundImage,
          bg2: style2.backgroundImage,
          border1: style1.borderColor,
          border2: style2.borderColor
        };
      }, pair);

      expect(styles).not.toBeNull();
      expect(styles.bg2).toBe(styles.bg1);
      expect(styles.border2).toBe(styles.border1);
    }
  });

  test('should trigger modern screen-top notification upon successful breeding session', async ({ page }) => {
    await page.waitForSelector('#menuBtn', { state: 'visible' });

    // Set up mock compatible parent creatures in collectedCreatures for Player 1
    await page.evaluate(() => {
      window.collectedCreatures = [
        {
          id: 'mock_parent1',
          name: 'Phoenix',
          generation: 1,
          type: 'Fire',
          features: ['wings'],
          bodySize: 'medium',
          bodyType: 'lanky',
          uniqueFeature: 'horns',
          eyes: 'angry',
          skinType: 'plumage',
          skinFurType: 'plumage',
          pattern: 'none',
          wings: 'none',
          clawHorn: 'none',
          teeth: 'none',
          limbs: 'legs',
          tail: 'fire_tail',
          eyesColor: 'red',
          skinFurColor: 'orange',
          wingsColor: 'none',
          clawHornColor: 'none',
          tailColor: 'orange',
          uniqueFeatureColor: 'none',
          stats: { health: 100, attack: 10, defense: 10, speed: 10, specialAttack: 10, specialDefense: 10 },
          isShiny: false
        },
        {
          id: 'mock_parent2',
          name: 'Embershell',
          generation: 1,
          type: 'Fire',
          features: ['tail'],
          bodySize: 'medium',
          bodyType: 'lanky',
          uniqueFeature: 'horns',
          eyes: 'angry',
          skinType: 'scales',
          skinFurType: 'scales',
          pattern: 'none',
          wings: 'none',
          clawHorn: 'none',
          teeth: 'none',
          limbs: 'legs',
          tail: 'fire_tail',
          eyesColor: 'red',
          skinFurColor: 'orange',
          wingsColor: 'none',
          clawHornColor: 'none',
          tailColor: 'orange',
          uniqueFeatureColor: 'none',
          stats: { health: 100, attack: 10, defense: 10, speed: 10, specialAttack: 10, specialDefense: 10 },
          isShiny: false
        }
      ];

      // Spy on showModernNotification
      window.notificationSpy = { called: false, text: '' };
      window.showModernNotification = (text, duration) => {
        window.notificationSpy.called = true;
        window.notificationSpy.text = text;
      };

      // Open Breeding Modal for Player 1
      window.openBreedingModal(1);
    });

    // Make sure elements exist and select the parents
    await page.selectOption('#parent1Select', 'mock_parent1');
    await page.selectOption('#parent2Select', 'mock_parent2');

    // Click breed button or call doBreed
    await page.evaluate(() => {
      window.doBreed(1);
    });

    // Verify that the notification was called correctly celebrating the achievement
    const spyResult = await page.evaluate(() => window.notificationSpy);
    expect(spyResult.called).toBe(true);
    expect(spyResult.text).toContain('successfully bred');
    expect(spyResult.text).toContain('Gen 2');
  });
});
