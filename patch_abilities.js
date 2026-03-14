const fs = require('fs');

let code = fs.readFileSync('index.html', 'utf8');

// Update init spots
code = code.replace(/currentEnemy\.battleStats = \{ attackMod: 1\.0, accuracyMod: 1\.0 \};/g, 'currentEnemy.battleStats = { attackMod: 1.0, accuracyMod: 1.0, abilityUses: 0 };');
code = code.replace(/currentPlayer\.battleStats = \{ attackMod: 1\.0, accuracyMod: 1\.0 \};/g, 'currentPlayer.battleStats = { attackMod: 1.0, accuracyMod: 1.0, abilityUses: 0 };');

// doPlayerAction
code = code.replace(/let abilityTriggered = currentPlayer\.ability && Math\.random\(\) < currentPlayer\.ability\.chance;/g, 'let abilityTriggered = currentPlayer.ability && (!currentPlayer.battleStats || currentPlayer.battleStats.abilityUses < 4) && Math.random() < currentPlayer.ability.chance;\n        if (abilityTriggered && currentPlayer.battleStats) currentPlayer.battleStats.abilityUses++;');

code = code.replace(/let enemyRecoilTriggered = currentEnemy\.ability && currentEnemy\.ability\.type === 'damage_recoil' && Math\.random\(\) < currentEnemy\.ability\.chance;/g, 'let enemyRecoilTriggered = currentEnemy.ability && currentEnemy.ability.type === \'damage_recoil\' && (!currentEnemy.battleStats || currentEnemy.battleStats.abilityUses < 4) && Math.random() < currentEnemy.ability.chance;');

code = code.replace(/if \(currentEnemy\.currentHp > 0 && enemyRecoilTriggered\) \{/g, 'if (currentEnemy.currentHp > 0 && enemyRecoilTriggered) {\n             if (currentEnemy.battleStats) currentEnemy.battleStats.abilityUses++;');

// doEnemyAction
code = code.replace(/let abilityTriggered = currentEnemy\.ability && Math\.random\(\) < currentEnemy\.ability\.chance;/g, 'let abilityTriggered = currentEnemy.ability && (!currentEnemy.battleStats || currentEnemy.battleStats.abilityUses < 4) && Math.random() < currentEnemy.ability.chance;\n    if (abilityTriggered && currentEnemy.battleStats) currentEnemy.battleStats.abilityUses++;');

code = code.replace(/let playerRecoilTriggered = currentPlayer\.ability && currentPlayer\.ability\.type === 'damage_recoil' && Math\.random\(\) < currentPlayer\.ability\.chance;/g, 'let playerRecoilTriggered = currentPlayer.ability && currentPlayer.ability.type === \'damage_recoil\' && (!currentPlayer.battleStats || currentPlayer.battleStats.abilityUses < 4) && Math.random() < currentPlayer.ability.chance;');

code = code.replace(/if \(currentPlayer\.currentHp > 0 && playerRecoilTriggered\) \{/g, 'if (currentPlayer.currentHp > 0 && playerRecoilTriggered) {\n         if (currentPlayer.battleStats) currentPlayer.battleStats.abilityUses++;');

fs.writeFileSync('index.html', code, 'utf8');
