import re

def main():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    enemy_action_search = """    let atkMod = currentEnemy.battleStats ? currentEnemy.battleStats.attackMod : 1.0;
    let damage = window.calculateDamage(currentEnemy, currentPlayer, power) * damageMultiplier * atkMod;

    // Recoil logic
    let playerRecoilTriggered = currentPlayer.ability && currentPlayer.ability.type === 'damage_recoil' && (!currentPlayer.battleStats || currentPlayer.battleStats.abilityUses < 4) && Math.random() < currentPlayer.ability.chance;

    if (Math.random() < 0.10) {
        damage *= 1.5;
        logBattle("<span class=\\"critical\\">Critical Hit by enemy!</span>");
    }"""

    enemy_action_replace = """    let atkMod = currentEnemy.battleStats ? currentEnemy.battleStats.attackMod : 1.0;
    let damage = window.calculateDamage(currentEnemy, currentPlayer, power) * damageMultiplier * atkMod;

    // Recoil logic
    let playerRecoilTriggered = currentPlayer.ability && currentPlayer.ability.type === 'damage_recoil' && (!currentPlayer.battleStats || currentPlayer.battleStats.abilityUses < 4) && Math.random() < currentPlayer.ability.chance;

    if (Math.random() < 0.10) {
        damage *= 1.5;
        logBattle("<span class=\\"critical\\">Critical Hit by enemy!</span>");
    }

    if (currentPlayer.battleStats && currentPlayer.battleStats.shieldTurns > 0) {
        damage = damage * 0.5; // Absorbs 50% damage
        logBattle(`<span style="color:#a8a8a8; font-weight:bold;">${currentPlayer.nickname || currentPlayer.name}'s Shield absorbed some of the damage!</span>`);
        currentPlayer.battleStats.shieldTurns--;
    }"""

    if enemy_action_search in html:
        html = html.replace(enemy_action_search, enemy_action_replace)
        print("Patched enemy action logic.")
    else:
        print("Enemy action logic not found.")

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)

if __name__ == '__main__':
    main()
