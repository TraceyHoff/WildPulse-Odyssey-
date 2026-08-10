const { test, expect } = require('@playwright/test');

test.describe('Cooperative NPC Trainer Dual Battle', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      if (!sessionStorage.getItem('wildpulse_started_once')) {
        localStorage.clear();
        sessionStorage.setItem('wildpulse_skip_start_modal', 'true');
        sessionStorage.setItem('wildpulse_started_once', 'true');
      }
    });
    await page.goto('http://localhost:3000');
    // Wait for the game to start and players/creatures to initialize
    await page.waitForFunction(() => window.gameStarted === true);
  });

  test('should successfully trigger NPC Trainer Dual Battle and award co-op defeat credit to both players', async ({ page }) => {
    // 1. Turn on co-op mode and ensure both players have starter creatures
    await page.evaluate(() => {
        window.coopActive = true;
        // Make sure both have healthy party creatures
        if (window.collectedCreatures.length === 0) {
            window.collectedCreatures.push({
                id: 'p1_test',
                name: 'Volt-Pike',
                level: 5,
                currentHp: 40,
                maxHp: 40,
                type: 'Electric',
                color: '#ffeb3b',
                xp: 0
            });
        } else {
            window.collectedCreatures[0].currentHp = 40;
        }

        if (window.collectedCreatures2.length === 0) {
            window.collectedCreatures2.push({
                id: 'p2_test',
                name: 'Ember-Hound',
                level: 5,
                currentHp: 45,
                maxHp: 45,
                type: 'Fire',
                color: '#ff5722',
                xp: 0
            });
        } else {
            window.collectedCreatures2[0].currentHp = 45;
        }
    });

    // 2. Trigger the NPC Trainer Dual Battle
    await page.evaluate(() => {
        window.startNpcDualBattle(window.player, 'npc_trainer_5', 'Morpheus');
    });

    // 3. Verify the battle is initialized as Dual Battle and NPC Battle
    const battleState = await page.evaluate(() => {
        return {
            isDual: window.isDualBattle,
            isNpc: window.isNpcBattle,
            trainerId: window.activeNpcTrainerId
        };
    });

    expect(battleState.isDual).toBe(true);
    expect(battleState.isNpc).toBe(true);
    expect(battleState.trainerId).toBe('npc_trainer_5');

    // 4. Force win by reducing enemies' HP to 0 and executing the check
    await page.evaluate(() => {
        window.currentEnemy.currentHp = 0;
        window.currentEnemy2.currentHp = 0;
        window.checkDualBattleFaintsOrEnd();
    });

    // 5. Verify local storage and trainer data reflects defeat for both players
    const trainerDefeatedStatus = await page.evaluate(() => {
        const trainerId = 'npc_trainer_5';
        const data = window.getNpcTrainerData(trainerId);
        return {
            p1Defeated: data.p1 && data.p1.defeated,
            p2Defeated: data.p2 && data.p2.defeated,
            overallDefeated: data.defeated
        };
    });

    expect(trainerDefeatedStatus.p1Defeated).toBe(true);
    expect(trainerDefeatedStatus.p2Defeated).toBe(true);
    expect(trainerDefeatedStatus.overallDefeated).toBe(true);
  });
});
