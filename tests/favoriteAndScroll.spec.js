const { test, expect } = require('@playwright/test');

test.describe('Favorite and Gamepad Scrolling Systems', () => {
  test.beforeEach(async ({ page }) => {
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

    await page.addInitScript(() => {
      sessionStorage.setItem('wildpulse_skip_start_modal', 'true');
    });

    await page.goto('http://localhost:3000');
    // Start game and wait
    const startBtn = page.locator('#startGameBtn');
    if (await startBtn.isVisible()) {
        await startBtn.click();
    }
    await page.waitForFunction(() => typeof window.player !== 'undefined' && window.player && window.player.body);
  });

  test('should allow toggling favorite on creatures and restrict to max 3', async ({ page }) => {
    // 1. Set up collected creatures
    await page.evaluate(() => {
        window.collectedCreatures = [
            { id: "test_c1", name: "Phoenix", level: 5, currentHp: 50, stats: { health: 100 }, generation: 1, type: "Fire", description: "Vivid fire creature" },
            { id: "test_c2", name: "Aquaweaver", level: 5, currentHp: 50, stats: { health: 100 }, generation: 1, type: "Water", description: "Water weaver" },
            { id: "test_c3", name: "Bloomweaver", level: 5, currentHp: 50, stats: { health: 100 }, generation: 1, type: "Grass", description: "Grass weaver" },
            { id: "test_c4", name: "Meteorhorn", level: 5, currentHp: 50, stats: { health: 100 }, generation: 1, type: "Earth", description: "Earth horn" }
        ];
        localStorage.setItem('wildpulse_collected_creatures', JSON.stringify(window.collectedCreatures));
        if (window.renderPartyList) window.renderPartyList();
    });

    // Open Party Modal
    await page.evaluate(() => {
        if (window.openPartyModal) window.openPartyModal();
    });

    const partyModal = page.locator('#partyModal');
    await expect(partyModal).toBeVisible();

    // Verify initial states of heart buttons (should be white hearts)
    const favoriteButtons = page.locator('#partyList .party-card .favorite-btn');
    await expect(favoriteButtons.nth(0)).toHaveText('🤍');

    // Toggle favorite on first creature
    await favoriteButtons.nth(0).click();
    await expect(favoriteButtons.nth(0)).toHaveText('❤️');

    // Toggle favorite off first creature
    await favoriteButtons.nth(0).click();
    await expect(favoriteButtons.nth(0)).toHaveText('🤍');

    // Toggle favorite on first 3 creatures
    await favoriteButtons.nth(0).click();
    await favoriteButtons.nth(1).click();
    await favoriteButtons.nth(2).click();

    await expect(favoriteButtons.nth(0)).toHaveText('❤️');
    await expect(favoriteButtons.nth(1)).toHaveText('❤️');
    await expect(favoriteButtons.nth(2)).toHaveText('❤️');

    // Try to favorite 4th creature
    await favoriteButtons.nth(3).click();
    // Should still be white heart because max limit is 3
    await expect(favoriteButtons.nth(3)).toHaveText('🤍');

    // Verify notification text
    const notificationText = await page.locator('#modernNotification').innerText();
    expect(notificationText).toContain('You can only have up to 3 favorited creatures');
  });

  test('favorited creatures should gain half XP when not in battle', async ({ page }) => {
    // 1. Set up collected creatures, one favorited
    await page.evaluate(() => {
        window.collectedCreatures = [
            { id: "test_c1", name: "Phoenix", level: 5, currentHp: 50, xp: 10, stats: { health: 100 }, generation: 1, type: "Fire", description: "Fire" },
            { id: "test_c2", name: "Aquaweaver", level: 5, currentHp: 50, xp: 10, stats: { health: 100 }, generation: 1, type: "Water", description: "Water", favorited: true }
        ];
        localStorage.setItem('wildpulse_collected_creatures', JSON.stringify(window.collectedCreatures));
        if (window.renderPartyList) window.renderPartyList();
    });

    // 2. Simulate winning a battle
    await page.evaluate(() => {
        // Mock current player and current enemy
        window.currentPlayer = { id: "test_c1", currentHp: 50 };
        window.currentEnemy = { id: "enemy_1", level: 5, name: "Meteorhorn" };
        window.activeBattlePlayer = 1;
        window.inBattle = true;

        // Trigger win
        if (window.endBattle) {
            window.endBattle('win');
        }
    });

    // Wait for the endBattle timeout (1500ms in codebase) to complete and distribute XP
    await page.waitForTimeout(2000);

    // 3. Verify XP gains
    const creatures = await page.evaluate(() => {
        return window.collectedCreatures;
    });

    const activeCombatant = creatures.find(c => c.id === 'test_c1');
    const favoritedIdle = creatures.find(c => c.id === 'test_c2');

    // xpGained = Math.floor(currentEnemy.level * 25) = 5 * 25 = 125
    // activeCombatant should gain 125 XP (initial 10 + 125 = 135)
    // favoritedIdle should gain half XP (Math.floor(125 / 2) = 62 XP) (initial 10 + 62 = 72 XP)
    expect(activeCombatant.xp).toBeGreaterThan(10);
    expect(favoritedIdle.xp).toBe(72);
  });

  test('right stick vertical analog input should scroll description in party modal', async ({ page }) => {
    // 1. Set up a creature with a very long description to ensure scrollability
    await page.evaluate(() => {
        window.collectedCreatures = [
            { id: "test_c1", name: "Phoenix", level: 5, currentHp: 50, stats: { health: 100 }, generation: 1, type: "Fire", description: "This is a very long description. Phoenix is a legendary bird of fire that rises from its ashes. It has glowing golden feathers, beautiful blazing wings, a long trailing tail of sparks, and powerful flaming talons. It is incredibly swift and powerful, filling the room with intense heat and majestic light." }
        ];
        localStorage.setItem('wildpulse_collected_creatures', JSON.stringify(window.collectedCreatures));
        if (window.renderPartyList) window.renderPartyList();
    });

    // Open Party Modal
    await page.evaluate(() => {
        if (window.openPartyModal) window.openPartyModal();
    });

    const partyModal = page.locator('#partyModal');
    await expect(partyModal).toBeVisible();

    // 2. Focus on the party card or any navigable element inside it
    await page.evaluate(() => {
        const card = document.querySelector('.party-card');
        if (card) {
            card.focus();
            // Mock gamepad-focused class
            card.classList.add('gamepad-focused-p1');
        }
    });

    // Get initial scrollTop of description text
    const initialScrollTop = await page.evaluate(() => {
        const descText = document.querySelector('.creature-desc-text');
        return descText ? descText.scrollTop : null;
    });
    expect(initialScrollTop).toBe(0);

    // 3. Simulate processGamepadInputForPlayer with right stick vertical axis movement
    await page.evaluate(() => {
        const mockPad = {
            rightStick: { y: 1.0 },
            buttons: Array(16).fill({ pressed: false })
        };
        if (window.processGamepadInputForPlayer) {
            window.processGamepadInputForPlayer(1, mockPad);
        }
    });

    // Get new scrollTop of description text after right stick input simulation
    const updatedScrollTop = await page.evaluate(() => {
        const descText = document.querySelector('.creature-desc-text');
        return descText ? descText.scrollTop : null;
    });

    // ScrollTop should increase
    expect(updatedScrollTop).toBeGreaterThan(0);
  });
});
