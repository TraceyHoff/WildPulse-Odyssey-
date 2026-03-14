const fs = require('fs');

let code = fs.readFileSync('index.html', 'utf8');

// 1. Remove window.currentBattleParty array uses
code = code.replace(/window\.currentBattleParty = collectedCreatures\.filter\(c => !c\.stored && c\.currentHp > 0\);/g, '');
code = code.replace(/if \(window\.currentBattleParty\.length === 0\) \{/g, 'if (!collectedCreatures.some(c => !c.stored && c.currentHp > 0)) {');

code = code.replace(/currentPlayer = JSON\.parse\(JSON\.stringify\(window\.currentBattleParty\.shift\(\)\)\);/g, `let firstHealthy = collectedCreatures.find(c => !c.stored && c.currentHp > 0);
    currentPlayer = JSON.parse(JSON.stringify(firstHealthy));`);

code = code.replace(/window\.currentBattleParty = \[\];/g, '');

// In window.handleFaint:
code = code.replace(/if \(window\.currentBattleParty\.length > 0\) \{/g, 'let next = collectedCreatures.find(c => !c.stored && c.currentHp > 0 && c.id !== currentPlayer.id);\n        if (next) {');
code = code.replace(/let next = window\.currentBattleParty\.shift\(\);/g, '');


fs.writeFileSync('index.html', code, 'utf8');
