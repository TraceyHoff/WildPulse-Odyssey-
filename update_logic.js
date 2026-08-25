const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const applyAbilityLogicSearch = `            if (currentPlayer.ability.type === 'damage' || currentPlayer.ability.type === 'direct_damage') {
                damageMultiplier = 1.0 + currentPlayer.ability.value;
            } else if (currentPlayer.ability.type === 'raise_stat') {
                if (!currentPlayer.battleStats) currentPlayer.battleStats = { attackMod: 1.0, accuracyMod: 1.0, abilityUses: 0 };
                currentPlayer.battleStats.attackMod += currentPlayer.ability.value;
            } else if (currentPlayer.ability.type === 'raise_accuracy') {
                if (!currentPlayer.battleStats) currentPlayer.battleStats = { attackMod: 1.0, accuracyMod: 1.0, abilityUses: 0 };
                currentPlayer.battleStats.accuracyMod += currentPlayer.ability.value;
            } else if (currentPlayer.ability.type === 'lower_enemy_accuracy') {
                if (!currentEnemy.battleStats) currentEnemy.battleStats = { attackMod: 1.0, accuracyMod: 1.0, abilityUses: 0 };
                currentEnemy.battleStats.accuracyMod = Math.max(0.1, currentEnemy.battleStats.accuracyMod - currentPlayer.ability.value);
            } else if (currentPlayer.ability.type === 'heal') {
                let healAmt = currentPlayer.maxHp * currentPlayer.ability.value;
                currentPlayer.currentHp = Math.min(currentPlayer.maxHp, currentPlayer.currentHp + healAmt);
                window.showFloatingText('playerCombatant', '+' + healAmt.toFixed(1), '#4caf50');
                logBattle(\`<span class="heal">Restored \${healAmt.toFixed(1)} HP!</span>\`);
            }`;

// Wait, I should use python diff patch to be safer.
