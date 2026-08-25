import re

def main():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # The issue: If the ability is charge_attack and it triggers THIS turn, we set isCharging = true,
    # but damageMultiplier is checked before the ability logic. Wait, no, damageMultiplier is initialized,
    # but the charge logic says "if isCharging, release it".
    # Since damageMultiplier logic is BEFORE the ability execution block, if isCharging is already true, it will release.
    # Then the ability logic might trigger and set isCharging = true again, which is correct for next turn!
    # BUT, if it sets isCharging = true, it shouldn't attack this turn.

    player_skip_search = """        let atkMod = currentPlayer.battleStats ? currentPlayer.battleStats.attackMod : 1.0;
        let damage = window.calculateDamage(currentPlayer, currentEnemy, power) * damageMultiplier * atkMod;"""

    player_skip_replace = """        if (currentPlayer.battleStats && currentPlayer.battleStats.isCharging && damageMultiplier === 1) {
            logBattle(`<span style="color:#ff5722;">${currentPlayer.nickname || currentPlayer.name} is gathering energy and skipped its attack!</span>`);
            if (callback) setTimeout(callback, 200);
            return;
        }

        let atkMod = currentPlayer.battleStats ? currentPlayer.battleStats.attackMod : 1.0;
        let damage = window.calculateDamage(currentPlayer, currentEnemy, power) * damageMultiplier * atkMod;"""

    if player_skip_search in html:
        html = html.replace(player_skip_search, player_skip_replace)
        print("Patched player skip logic.")

    enemy_skip_search = """    let atkMod = currentEnemy.battleStats ? currentEnemy.battleStats.attackMod : 1.0;
    let damage = window.calculateDamage(currentEnemy, currentPlayer, power) * damageMultiplier * atkMod;"""

    enemy_skip_replace = """    if (currentEnemy.battleStats && currentEnemy.battleStats.isCharging && damageMultiplier === 1) {
        logBattle(`<span style="color:#ff5722;">Wild ${currentEnemy.name} is gathering energy and skipped its attack!</span>`);
        if (callback) setTimeout(callback, 200);
        return;
    }

    let atkMod = currentEnemy.battleStats ? currentEnemy.battleStats.attackMod : 1.0;
    let damage = window.calculateDamage(currentEnemy, currentPlayer, power) * damageMultiplier * atkMod;"""

    if enemy_skip_search in html:
        html = html.replace(enemy_skip_search, enemy_skip_replace)
        print("Patched enemy skip logic.")

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)

if __name__ == '__main__':
    main()
