const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Add currentBattleParty initialization to collectCreature
html = html.replace(
    "currentPlayer = JSON.parse(JSON.stringify(collectedCreatures[0]));",
    "window.currentBattleParty = collectedCreatures.filter(c => !c.stored);\n    currentPlayer = JSON.parse(JSON.stringify(window.currentBattleParty.shift()));"
);

// 2. Change processStatuses to handle faint
let oldProcessStatuses = `function processStatuses(creature) {
    if (!creature.status) return true;
    let color = creature === currentPlayer ? "#2196F3" : "#f44336";

    if (creature.status === 'Poison') {
        let dmg = creature.maxHp * 0.10;
        creature.currentHp -= dmg;
        logBattle(\`<span style="color:\${color}">\${creature.nickname || creature.name}</span> is hurt by Poison for <span class="damage">\${dmg.toFixed(1)} damage</span>!\`);
    } else if (creature.status === 'Burn') {
        let dmg = creature.maxHp * 0.05;
        creature.currentHp -= dmg;
        logBattle(\`<span style="color:\${color}">\${creature.nickname || creature.name}</span> is hurt by Burn for <span class="damage">\${dmg.toFixed(1)} damage</span>!\`);
    } else if (creature.status === 'Sleep') {
        if (Math.random() < 0.40) {
            creature.status = null;
            logBattle(\`<span style="color:\${color}">\${creature.nickname || creature.name}</span> woke up!\`);
            return true;
        } else {
            logBattle(\`<span style="color:\${color}">\${creature.nickname || creature.name}</span> is fast asleep...\`);
            return false;
        }
    }

    return true;
}`;

let newProcessStatuses = `function processStatuses(creature) {
    if (!creature.status) return true;
    let color = creature === currentPlayer ? "#2196F3" : "#f44336";

    if (creature.status === 'Poison') {
        let dmg = creature.maxHp * 0.10;
        creature.currentHp -= dmg;
        logBattle(\`<span style="color:\${color}">\${creature.nickname || creature.name}</span> is hurt by Poison for <span class="damage">\${dmg.toFixed(1)} damage</span>!\`);
    } else if (creature.status === 'Burn') {
        let dmg = creature.maxHp * 0.05;
        creature.currentHp -= dmg;
        logBattle(\`<span style="color:\${color}">\${creature.nickname || creature.name}</span> is hurt by Burn for <span class="damage">\${dmg.toFixed(1)} damage</span>!\`);
    } else if (creature.status === 'Sleep') {
        if (Math.random() < 0.40) {
            creature.status = null;
            logBattle(\`<span style="color:\${color}">\${creature.nickname || creature.name}</span> woke up!\`);
            return true;
        } else {
            logBattle(\`<span style="color:\${color}">\${creature.nickname || creature.name}</span> is fast asleep...\`);
            return false;
        }
    }

    if (creature.currentHp <= 0) {
        logBattle(\`<span style="color:#9e9e9e">\${creature === currentEnemy ? 'The wild ' : ''}</span><span style="color:\${color}">\${creature.nickname || creature.name}</span><span style="color:#9e9e9e"> fainted!</span>\`);
        return false;
    }

    return true;
}`;
html = html.replace(oldProcessStatuses, newProcessStatuses);

// 3. Add handleFaint function before doPlayerAction
const handleFaintStr = `
window.currentBattleParty = [];

window.handleFaint = function(target) {
    if (target === currentEnemy) {
        endBattle('win');
        return true;
    } else {
        if (window.currentBattleParty.length > 0) {
            let next = window.currentBattleParty.shift();
            currentPlayer = JSON.parse(JSON.stringify(next));
            currentPlayer.maxHp = window.getEffectiveStat(currentPlayer, 'health');
            currentPlayer.currentHp = currentPlayer.maxHp;
            currentPlayer.isDefending = false;
            logBattle(\`Go, <span style="color:#2196F3">\${currentPlayer.nickname || currentPlayer.name}</span>!\`);
            updateBattleUI();
            return false; // Battle continues
        } else {
            endBattle('loss');
            return true; // Battle ends
        }
    }
};
`;
html = html.replace('window.doPlayerAction = function(action, callback) {', handleFaintStr + '\nwindow.doPlayerAction = function(action, callback) {');


// 4. Update doPlayerAction - replace endBattle
let doPlayerOld = `
    if (currentEnemy.currentHp <= 0) {
        logBattle(\`<span style="color:#9e9e9e">The wild </span><span style="color:#f44336">\${currentEnemy.name}</span><span style="color:#9e9e9e"> fainted!</span>\`);
        endBattle('win');
        return;
    }`;
let doPlayerNew = `
    if (currentEnemy.currentHp <= 0) {
        logBattle(\`<span style="color:#9e9e9e">The wild </span><span style="color:#f44336">\${currentEnemy.name}</span><span style="color:#9e9e9e"> fainted!</span>\`);
        if (window.handleFaint(currentEnemy)) return;
    }`;
html = html.replace(doPlayerOld, doPlayerNew);

// 5. Update doEnemyAction - replace endBattle
let doEnemyOld = `
        if (currentPlayer.currentHp <= 0) {
            logBattle(\`<span style="color:#2196F3">\${currentPlayer.nickname || currentPlayer.name}</span><span style="color:#9e9e9e"> fainted!</span>\`);
            endBattle('loss');
        } else if (currentEnemy.currentHp <= 0) {
            logBattle(\`<span style="color:#9e9e9e">The wild </span><span style="color:#f44336">\${currentEnemy.name}</span><span style="color:#9e9e9e"> fainted!</span>\`);
            endBattle('win');
        } else {
            if (callback) setTimeout(callback, 1000);
        }`;
let doEnemyNew = `
        if (currentPlayer.currentHp <= 0) {
            if (!window.handleFaint(currentPlayer)) {
                if (callback) setTimeout(callback, 1000);
            }
        } else if (currentEnemy.currentHp <= 0) {
            window.handleFaint(currentEnemy);
        } else {
            if (callback) setTimeout(callback, 1000);
        }`;
html = html.replace(doEnemyOld, doEnemyNew);

let doEnemyEndOld = `
    if (currentPlayer.currentHp <= 0) {
        logBattle(\`<span style="color:#2196F3">\${currentPlayer.nickname || currentPlayer.name}</span><span style="color:#9e9e9e"> fainted!</span>\`);
        endBattle('loss');
        return;
    }`;
let doEnemyEndNew = `
    if (currentPlayer.currentHp <= 0) {
        logBattle(\`<span style="color:#2196F3">\${currentPlayer.nickname || currentPlayer.name}</span><span style="color:#9e9e9e"> fainted!</span>\`);
        if (window.handleFaint(currentPlayer)) return;
    }`;
html = html.replace(doEnemyEndOld, doEnemyEndNew);

// 6. Handle processStatuses in doPlayerAction
let processStatusesHandleOld1 = `
    let canMove = processStatuses(currentPlayer);
    if (!canMove) {
        updateBattleUI();
        if (callback) setTimeout(callback, 1000);
        return;
    }`;
let processStatusesHandleNew1 = `
    let canMove = processStatuses(currentPlayer);
    if (currentPlayer.currentHp <= 0) {
        updateBattleUI();
        if (window.handleFaint(currentPlayer)) return;
    } else if (!canMove) {
        updateBattleUI();
        if (callback) setTimeout(callback, 1000);
        return;
    }`;
html = html.replace(processStatusesHandleOld1, processStatusesHandleNew1);

// 7. Handle processStatuses in doEnemyAction
let processStatusesHandleOld2 = `
    let canMove = processStatuses(currentEnemy);
    if (!canMove) {
        updateBattleUI();
        if (currentPlayer.currentHp <= 0) {
            logBattle(\`<span style="color:#2196F3">\${currentPlayer.nickname || currentPlayer.name}</span><span style="color:#9e9e9e"> fainted!</span>\`);
            endBattle('loss');
        } else if (currentEnemy.currentHp <= 0) {
            logBattle(\`<span style="color:#9e9e9e">The wild </span><span style="color:#f44336">\${currentEnemy.name}</span><span style="color:#9e9e9e"> fainted!</span>\`);
            endBattle('win');
        } else {
            if (callback) setTimeout(callback, 1000);
        }
        return;
    }`;
let processStatusesHandleNew2 = `
    let canMove = processStatuses(currentEnemy);
    if (currentEnemy.currentHp <= 0) {
        updateBattleUI();
        if (window.handleFaint(currentEnemy)) return;
    } else if (!canMove) {
        updateBattleUI();
        if (currentPlayer.currentHp <= 0) {
            if (!window.handleFaint(currentPlayer)) {
                if (callback) setTimeout(callback, 1000);
            }
        } else {
            if (callback) setTimeout(callback, 1000);
        }
        return;
    }`;
html = html.replace(processStatusesHandleOld2, processStatusesHandleNew2);

// Fix alert when all fainted
html = html.replace(
    "alert('Your lead creature fainted. Healing up...');",
    "alert('All your creatures fainted. Healing up...');"
);

fs.writeFileSync('index.html', html);
console.log('Successfully patched index.html with faint logic.');
