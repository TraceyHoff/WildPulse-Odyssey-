import re

def main():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # In window.doPlayerAction, need to handle the new abilities logic
    # Also in window.doEnemyAction

    # Let's use string replacements
    action_search = """        let atkMod = currentPlayer.battleStats ? currentPlayer.battleStats.attackMod : 1.0;
        let damage = window.calculateDamage(currentPlayer, currentEnemy, power) * damageMultiplier * atkMod;

        // Recoil logic is now decoupled
        let enemyRecoilTriggered = currentEnemy.ability && currentEnemy.ability.type === 'damage_recoil' && (!currentEnemy.battleStats || currentEnemy.battleStats.abilityUses < 4) && Math.random() < currentEnemy.ability.chance;

        if (Math.random() < 0.10) {
            damage *= 1.5;
            logBattle("<span class=\\"critical\\">Critical Hit!</span>");
        }"""

    action_replace = """        let atkMod = currentPlayer.battleStats ? currentPlayer.battleStats.attackMod : 1.0;
        let damage = window.calculateDamage(currentPlayer, currentEnemy, power) * damageMultiplier * atkMod;

        // Recoil logic is now decoupled
        let enemyRecoilTriggered = currentEnemy.ability && currentEnemy.ability.type === 'damage_recoil' && (!currentEnemy.battleStats || currentEnemy.battleStats.abilityUses < 4) && Math.random() < currentEnemy.ability.chance;

        if (Math.random() < 0.10) {
            damage *= 1.5;
            logBattle("<span class=\\"critical\\">Critical Hit!</span>");
        }

        if (currentEnemy.battleStats && currentEnemy.battleStats.shieldTurns > 0) {
            damage = damage * 0.5; // Absorbs 50% damage
            logBattle(`<span style="color:#a8a8a8; font-weight:bold;">${currentEnemy.name}'s Shield absorbed some of the damage!</span>`);
            currentEnemy.battleStats.shieldTurns--;
        }"""

    if action_search in html:
        html = html.replace(action_search, action_replace)
        print("Patched player action logic.")
    else:
        print("Player action logic not found.")

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)

if __name__ == '__main__':
    main()
