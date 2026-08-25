import re

def main():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Modify damageMultiplier to account for charge release
    charge_player_search = """        let power = 40;
        let damageMultiplier = 1;"""

    charge_player_replace = """        let power = 40;
        let damageMultiplier = 1;
        if (currentPlayer.battleStats && currentPlayer.battleStats.isCharging) {
            damageMultiplier = 1.0 + currentPlayer.battleStats.chargeMultiplier;
            currentPlayer.battleStats.isCharging = false;
            logBattle(`<span style="color:#ff5722; font-weight:bold;">${currentPlayer.nickname || currentPlayer.name} released its stored energy!</span>`);
            window.triggerAbilityVisualEffect(true, { color: '#ff5722' });
        }"""

    if charge_player_search in html:
        html = html.replace(charge_player_search, charge_player_replace)
        print("Patched player charge release.")

    charge_enemy_search = """    let power = 40;
    let damageMultiplier = 1;"""

    charge_enemy_replace = """    let power = 40;
    let damageMultiplier = 1;
    if (currentEnemy.battleStats && currentEnemy.battleStats.isCharging) {
        damageMultiplier = 1.0 + currentEnemy.battleStats.chargeMultiplier;
        currentEnemy.battleStats.isCharging = false;
        logBattle(`<span style="color:#ff5722; font-weight:bold;">Wild ${currentEnemy.name} released its stored energy!</span>`);
        window.triggerAbilityVisualEffect(false, { color: '#ff5722' });
    }"""

    if charge_enemy_search in html:
        html = html.replace(charge_enemy_search, charge_enemy_replace)
        print("Patched enemy charge release.")

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)

if __name__ == '__main__':
    main()
