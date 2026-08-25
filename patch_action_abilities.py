import re

def main():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Need to handle charge_attack, shield, status_inflict inside the ability logic of Player

    player_ability_search = """            } else if (currentPlayer.ability.type === 'heal') {
                let healAmt = currentPlayer.maxHp * currentPlayer.ability.value;
                currentPlayer.currentHp = Math.min(currentPlayer.maxHp, currentPlayer.currentHp + healAmt);
                window.showFloatingText('playerCombatant', '+' + healAmt.toFixed(1), '#4caf50');
                logBattle(`<span class="heal">Restored ${healAmt.toFixed(1)} HP!</span>`);
            }
        }"""

    player_ability_replace = """            } else if (currentPlayer.ability.type === 'heal') {
                let healAmt = currentPlayer.maxHp * currentPlayer.ability.value;
                currentPlayer.currentHp = Math.min(currentPlayer.maxHp, currentPlayer.currentHp + healAmt);
                window.showFloatingText('playerCombatant', '+' + healAmt.toFixed(1), '#4caf50');
                logBattle(`<span class="heal">Restored ${healAmt.toFixed(1)} HP!</span>`);
            } else if (currentPlayer.ability.type === 'shield') {
                if (!currentPlayer.battleStats) currentPlayer.battleStats = { attackMod: 1.0, accuracyMod: 1.0, abilityUses: 0, shieldTurns: 0 };
                currentPlayer.battleStats.shieldTurns = currentPlayer.ability.turns;
            } else if (currentPlayer.ability.type === 'status_inflict') {
                applyStatusEffect(currentEnemy, currentPlayer.ability.value);
            } else if (currentPlayer.ability.type === 'charge_attack') {
                if (!currentPlayer.battleStats) currentPlayer.battleStats = { attackMod: 1.0, accuracyMod: 1.0, abilityUses: 0 };
                currentPlayer.battleStats.isCharging = true;
                currentPlayer.battleStats.chargeMultiplier = currentPlayer.ability.value;
            }
        }"""

    if player_ability_search in html:
        html = html.replace(player_ability_search, player_ability_replace)
        print("Patched player abilities.")
    else:
        print("Player abilities logic not found.")


    player_sec_ability_search = """            } else if (currentPlayer.secondaryAbility.type === 'heal') {
                let healAmt = currentPlayer.maxHp * currentPlayer.secondaryAbility.value;
                currentPlayer.currentHp = Math.min(currentPlayer.maxHp, currentPlayer.currentHp + healAmt);
                window.showFloatingText('playerCombatant', '+' + healAmt.toFixed(1), '#4caf50');
                logBattle(`<span class="heal">Restored ${healAmt.toFixed(1)} HP!</span>`);
            }
        }"""

    player_sec_ability_replace = """            } else if (currentPlayer.secondaryAbility.type === 'heal') {
                let healAmt = currentPlayer.maxHp * currentPlayer.secondaryAbility.value;
                currentPlayer.currentHp = Math.min(currentPlayer.maxHp, currentPlayer.currentHp + healAmt);
                window.showFloatingText('playerCombatant', '+' + healAmt.toFixed(1), '#4caf50');
                logBattle(`<span class="heal">Restored ${healAmt.toFixed(1)} HP!</span>`);
            } else if (currentPlayer.secondaryAbility.type === 'shield') {
                if (!currentPlayer.battleStats) currentPlayer.battleStats = { attackMod: 1.0, accuracyMod: 1.0, abilityUses: 0, shieldTurns: 0 };
                currentPlayer.battleStats.shieldTurns = currentPlayer.secondaryAbility.turns;
            } else if (currentPlayer.secondaryAbility.type === 'status_inflict') {
                applyStatusEffect(currentEnemy, currentPlayer.secondaryAbility.value);
            }
        }"""

    if player_sec_ability_search in html:
        html = html.replace(player_sec_ability_search, player_sec_ability_replace)
        print("Patched player sec abilities.")
    else:
        print("Player sec abilities logic not found.")


    enemy_ability_search = """        } else if (currentEnemy.ability.type === 'heal') {
            let healAmt = currentEnemy.maxHp * currentEnemy.ability.value;
            currentEnemy.currentHp = Math.min(currentEnemy.maxHp, currentEnemy.currentHp + healAmt);
            window.showFloatingText('enemyCombatant', '+' + healAmt.toFixed(1), '#4caf50');
            logBattle(`<span class="heal">Restored ${healAmt.toFixed(1)} HP!</span>`);
        }
    }"""

    enemy_ability_replace = """        } else if (currentEnemy.ability.type === 'heal') {
            let healAmt = currentEnemy.maxHp * currentEnemy.ability.value;
            currentEnemy.currentHp = Math.min(currentEnemy.maxHp, currentEnemy.currentHp + healAmt);
            window.showFloatingText('enemyCombatant', '+' + healAmt.toFixed(1), '#4caf50');
            logBattle(`<span class="heal">Restored ${healAmt.toFixed(1)} HP!</span>`);
        } else if (currentEnemy.ability.type === 'shield') {
            if (!currentEnemy.battleStats) currentEnemy.battleStats = { attackMod: 1.0, accuracyMod: 1.0, abilityUses: 0, shieldTurns: 0 };
            currentEnemy.battleStats.shieldTurns = currentEnemy.ability.turns;
        } else if (currentEnemy.ability.type === 'status_inflict') {
            applyStatusEffect(currentPlayer, currentEnemy.ability.value);
        } else if (currentEnemy.ability.type === 'charge_attack') {
            if (!currentEnemy.battleStats) currentEnemy.battleStats = { attackMod: 1.0, accuracyMod: 1.0, abilityUses: 0 };
            currentEnemy.battleStats.isCharging = true;
            currentEnemy.battleStats.chargeMultiplier = currentEnemy.ability.value;
        }
    }"""

    if enemy_ability_search in html:
        html = html.replace(enemy_ability_search, enemy_ability_replace)
        print("Patched enemy abilities.")
    else:
        print("Enemy abilities logic not found.")

    enemy_sec_ability_search = """        } else if (currentEnemy.secondaryAbility.type === 'heal') {
            let healAmt = currentEnemy.maxHp * currentEnemy.secondaryAbility.value;
            currentEnemy.currentHp = Math.min(currentEnemy.maxHp, currentEnemy.currentHp + healAmt);
            window.showFloatingText('enemyCombatant', '+' + healAmt.toFixed(1), '#4caf50');
            logBattle(`<span class="heal">Restored ${healAmt.toFixed(1)} HP!</span>`);
        }
    }"""

    enemy_sec_ability_replace = """        } else if (currentEnemy.secondaryAbility.type === 'heal') {
            let healAmt = currentEnemy.maxHp * currentEnemy.secondaryAbility.value;
            currentEnemy.currentHp = Math.min(currentEnemy.maxHp, currentEnemy.currentHp + healAmt);
            window.showFloatingText('enemyCombatant', '+' + healAmt.toFixed(1), '#4caf50');
            logBattle(`<span class="heal">Restored ${healAmt.toFixed(1)} HP!</span>`);
        } else if (currentEnemy.secondaryAbility.type === 'shield') {
            if (!currentEnemy.battleStats) currentEnemy.battleStats = { attackMod: 1.0, accuracyMod: 1.0, abilityUses: 0, shieldTurns: 0 };
            currentEnemy.battleStats.shieldTurns = currentEnemy.secondaryAbility.turns;
        } else if (currentEnemy.secondaryAbility.type === 'status_inflict') {
            applyStatusEffect(currentPlayer, currentEnemy.secondaryAbility.value);
        }
    }"""

    if enemy_sec_ability_search in html:
        html = html.replace(enemy_sec_ability_search, enemy_sec_ability_replace)
        print("Patched enemy sec abilities.")
    else:
        print("Enemy sec abilities logic not found.")

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)

if __name__ == '__main__':
    main()
