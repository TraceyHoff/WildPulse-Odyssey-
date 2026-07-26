const { test, expect } = require('@playwright/test');

test.describe('Friend System', () => {
  test('initializes and scales friend level stats correctly', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const result = await page.evaluate(() => {
      try {
        const mockCreature = {
          stats: { attack: 50 },
          level: 1,
          friendLevel: 1,
          friendXp: 0,
          friendBonusStats: { health: 0, attack: 0, defense: 0, speed: 0, specialAttack: 0, specialDefense: 0 }
        };

        // Confirm getRawScaledStat adds friendBonusStats
        let baseStat = window.getRawScaledStat(mockCreature, 'attack');

        // Increase friend level
        window.increaseFriendLevel(mockCreature);
        let friendLevelAfterIncrease = mockCreature.friendLevel;
        let upgradedStat = window.getRawScaledStat(mockCreature, 'attack');

        // Decrease friend level back
        window.decreaseFriendLevel(mockCreature);
        let friendLevelAfterDecrease = mockCreature.friendLevel;
        let downgradedStat = window.getRawScaledStat(mockCreature, 'attack');

        return {
          success: true,
          baseStat,
          friendLevelAfterIncrease,
          upgradedStat,
          downgradedStat,
          friendLevelAfterDecrease
        };
      } catch (e) {
        return { success: false, error: e.message };
      }
    });

    expect(result.success).toBe(true);
    expect(result.friendLevelAfterIncrease).toBe(2);
    expect(result.upgradedStat).toBeGreaterThanOrEqual(result.baseStat);
    expect(result.friendLevelAfterDecrease).toBe(1);
    expect(result.downgradedStat).toBe(result.baseStat);
  });

  test('updateFriendExperience adds XP in party and degrades in storage', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const result = await page.evaluate(() => {
      try {
        window.__test_friend_rate = true;
        window.gameStarted = true;
        window.coopActive = false;

        const creatureInParty = {
          id: 'test_party_c',
          name: 'Phoenix',
          stats: { health: 100, attack: 50, defense: 50, speed: 50, specialAttack: 50, specialDefense: 50 },
          level: 1,
          stored: false,
          friendLevel: 1,
          friendXp: 0,
          friendBonusStats: { health: 0, attack: 0, defense: 0, speed: 0, specialAttack: 0, specialDefense: 0 }
        };

        const creatureInStorage = {
          id: 'test_stored_c',
          name: 'Dragon',
          stats: { health: 100, attack: 50, defense: 50, speed: 50, specialAttack: 50, specialDefense: 50 },
          level: 1,
          stored: true,
          friendLevel: 2,
          friendXp: 5,
          friendBonusStats: { health: 2, attack: 2, defense: 0, speed: 0, specialAttack: 0, specialDefense: 0 }
        };

        window.collectedCreatures = [creatureInParty, creatureInStorage];

        // 1. Simulate 50 seconds elapsed inside updateFriendExperience
        // (dt = 50,000 ms -> should add 50 XP to party creature, and lose 50 XP from stored creature)
        window.updateFriendExperience(50000);

        const stateAfter50s = {
          partyXp: creatureInParty.friendXp,
          partyLevel: creatureInParty.friendLevel,
          storedXp: creatureInStorage.friendXp,
          storedLevel: creatureInStorage.friendLevel
        };

        // 2. Simulate another 60 seconds elapsed (stored creature's XP goes below 0, should level down!)
        // (dt = 60,000 ms -> total elapsed stored loss: -50 - 60 = -110 XP. Since initial XP was 5 and level was 2,
        //  it should degrade to level 1 and have some leftover XP)
        window.updateFriendExperience(60000);

        const stateAfter110s = {
          partyXp: creatureInParty.friendXp,
          partyLevel: creatureInParty.friendLevel,
          storedXp: creatureInStorage.friendXp,
          storedLevel: creatureInStorage.friendLevel,
          storedAttackBonus: creatureInStorage.friendBonusStats.attack
        };

        return {
          success: true,
          stateAfter50s,
          stateAfter110s
        };
      } catch (e) {
        return { success: false, error: e.message };
      }
    });

    expect(result.success).toBe(true);
    // After 50s:
    // Party XP: 0 + 50 = 50. Level: 1.
    expect(result.stateAfter50s.partyXp).toBe(50);
    expect(result.stateAfter50s.partyLevel).toBe(1);
    // Stored XP: 5 - 50 = -45. Stored Level: 2 -> levels down to 1.
    // Stored XP becomes -45 + 100 = 55.
    expect(result.stateAfter50s.storedLevel).toBe(1);
    expect(result.stateAfter50s.storedXp).toBe(55);

    // After another 60s:
    // Party XP: 50 + 60 = 110 -> Levels up to 2. Leftover: 110 - 100 = 10 XP.
    expect(result.stateAfter110s.partyLevel).toBe(2);
    expect(result.stateAfter110s.partyXp).toBe(10);
    // Stored XP: 55 - 60 = -5. Since level is already 1, it cannot degrade further.
    // So it should clamp to 0.
    expect(result.stateAfter110s.storedLevel).toBe(1);
    expect(result.stateAfter110s.storedXp).toBe(0);
    // When stored leveled down to 1, its bonus stats should have been decremented to 0
    expect(result.stateAfter110s.storedAttackBonus).toBe(0);
  });
});
