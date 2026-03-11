const fs = require('fs');
let execSync = require('child_process').execSync;
execSync('git checkout -- index.html');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Cap base stats
const match = html.match(/window\.baseCreatures\s*=\s*(\[\s*\{[\s\S]*?\}\s*\]);/);
if (match) {
    const baseCreatures = JSON.parse(match[1]);
    baseCreatures.forEach(c => {
        for (let stat in c.stats) {
            if (c.stats[stat] > 60) {
                c.stats[stat] = 60;
            }
        }
    });
    html = html.replace(match[0], 'window.baseCreatures = ' + JSON.stringify(baseCreatures, null, 4) + ';');
}

// 2. Add currentBattleParty initialization to collectCreature
html = html.replace(
    "currentPlayer = JSON.parse(JSON.stringify(collectedCreatures[0]));",
    "window.currentBattleParty = collectedCreatures.filter(c => !c.stored);\n    currentPlayer = JSON.parse(JSON.stringify(window.currentBattleParty.shift()));"
);

// 3. Change processStatuses to handle faint
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

// 4. Add handleFaint function before doPlayerAction
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


// 5. Update doPlayerAction - replace endBattle
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

// 6. Update doEnemyAction - replace endBattle
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

// 7. Handle processStatuses in doPlayerAction
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

// 8. Handle processStatuses in doEnemyAction
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

// DAY NIGHT CYCLE
// 1. Declare globals using strict replacement on the exact line where battleLogQueue is.
// Using match index to only replace the FIRST occurrence in case it appears elsewhere
const globalIndex = html.indexOf('let battleLogQueue = [];');
if (globalIndex !== -1) {
    html = html.slice(0, globalIndex) +
           'let dayNightTime = 8.0;\nlet dayNightOverlay;\nlet timeText;\nlet lastDayNightUpdate = 0;\n' +
           html.slice(globalIndex);
}

// 2. Add to create
const createIndex = html.indexOf('popupBackground.setVisible(false);\n    popupText.setVisible(false);');
if (createIndex !== -1) {
    const createAddition = `
    // Day and Night Cycle
    dayNightOverlay = this.add.rectangle(0, 0, window.innerWidth, window.innerHeight, 0x000033).setOrigin(0).setScrollFactor(0).setDepth(99).setAlpha(0);
    timeText = this.add.text(20, window.innerHeight - 40, "08:00", { fontSize: '24px', fill: '#FFF' }).setScrollFactor(0).setDepth(100);
`;
    html = html.slice(0, createIndex) + 'popupBackground.setVisible(false);\n    popupText.setVisible(false);\n' + createAddition + html.slice(createIndex + 64);
}

// 3. Update resize
const resizeIndex = html.indexOf('popupText.setPosition(gameSize.width / 2, gameSize.height - 100);\n    });');
if (resizeIndex !== -1) {
    const resizeAddition = `
        if (dayNightOverlay) {
            dayNightOverlay.setSize(gameSize.width, gameSize.height);
        }
        if (timeText) {
            timeText.setPosition(20, gameSize.height - 40);
        }
`;
    html = html.slice(0, resizeIndex) + 'popupText.setPosition(gameSize.width / 2, gameSize.height - 100);\n' + resizeAddition + '    });' + html.slice(resizeIndex + 73);
}

// 4. Update loop
const updateIndex = html.indexOf('const frame = Math.floor(this.time.now / 150) % 12;\n    bgGrass.setTexture(\'grass_\' + frame);');
if (updateIndex !== -1) {
    const updateAddition = `
    // Day Night Cycle Update
    if (!lastDayNightUpdate) lastDayNightUpdate = this.time.now;
    let dt = this.time.now - lastDayNightUpdate;
    lastDayNightUpdate = this.time.now;

    // 24 hours = 20 real minutes = 1200 seconds = 1,200,000 ms
    // 1 in-game hour = 50,000 ms
    dayNightTime += (dt / 50000);
    if (dayNightTime >= 24.0) dayNightTime -= 24.0;

    let hours = Math.floor(dayNightTime);
    let minutes = Math.floor((dayNightTime % 1) * 60);
    let hStr = hours < 10 ? '0' + hours : hours.toString();
    let mStr = minutes < 10 ? '0' + minutes : minutes.toString();
    if (timeText) timeText.setText(hStr + ":" + mStr);

    // Calculate alpha
    let targetAlpha = 0;
    if (dayNightTime >= 6 && dayNightTime <= 18) {
        targetAlpha = 0;
    } else if (dayNightTime > 18 && dayNightTime < 20) {
        targetAlpha = ((dayNightTime - 18) / 2) * 0.5;
    } else if (dayNightTime >= 20 || dayNightTime <= 4) {
        targetAlpha = 0.5;
    } else if (dayNightTime > 4 && dayNightTime < 6) {
        targetAlpha = 0.5 - (((dayNightTime - 4) / 2) * 0.5);
    }
    if (dayNightOverlay) dayNightOverlay.setAlpha(targetAlpha);
`;
    html = html.slice(0, updateIndex) + updateAddition + '\n    const frame = Math.floor(this.time.now / 150) % 12;\n    bgGrass.setTexture(\'grass_\' + frame);' + html.slice(updateIndex + 92);
}

fs.writeFileSync('index.html', html);
console.log('Successfully patched index.html with all features cleanly.');
