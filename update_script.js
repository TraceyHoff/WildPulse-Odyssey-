const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Fix water tile collisions
html = html.replace(
    `obs.setDisplayOrigin(gridX + 50, gridY + 50);`,
    `obs.setDisplayOrigin(gridX + 50, gridY + 50);\n                obs.body.setSize(100, 100);\n                obs.body.setOffset(gridX, gridY);`
);

// 2. Round outer edges of water tiles
html = html.replace(
    `this.textures.addCanvas('foam_tex_' + frame, foamCanvas);\n    }`,
    `this.textures.addCanvas('foam_tex_' + frame, foamCanvas);\n    }\n\n    const cornerCanvas = document.createElement('canvas');\n    cornerCanvas.width = 16;\n    cornerCanvas.height = 16;\n    const cornerCtx = cornerCanvas.getContext('2d');\n    cornerCtx.fillStyle = '#1a661a';\n    cornerCtx.fillRect(0, 0, 16, 16);\n    cornerCtx.globalCompositeOperation = 'destination-out';\n    cornerCtx.beginPath();\n    cornerCtx.arc(16, 16, 16, 0, Math.PI * 2);\n    cornerCtx.fill();\n    this.textures.addCanvas('grass_corner', cornerCanvas);`
);

html = html.replace(
    `// Add foam edges if adjacent to grass`,
    `// Add rounded corners for convex edges
                if (c > 0 && mapData[r][c-1] === 'grass' && r > 0 && mapData[r-1][c] === 'grass') {
                    let corner = this.add.sprite(posX - 50 + 8, posY - 50 + 8, 'grass_corner');
                }
                if (c < cols-1 && mapData[r][c+1] === 'grass' && r > 0 && mapData[r-1][c] === 'grass') {
                    let corner = this.add.sprite(posX + 50 - 8, posY - 50 + 8, 'grass_corner');
                    corner.setAngle(90);
                }
                if (c < cols-1 && mapData[r][c+1] === 'grass' && r < rows-1 && mapData[r+1][c] === 'grass') {
                    let corner = this.add.sprite(posX + 50 - 8, posY + 50 - 8, 'grass_corner');
                    corner.setAngle(180);
                }
                if (c > 0 && mapData[r][c-1] === 'grass' && r < rows-1 && mapData[r+1][c] === 'grass') {
                    let corner = this.add.sprite(posX - 50 + 8, posY + 50 - 8, 'grass_corner');
                    corner.setAngle(270);
                }

                // Add foam edges if adjacent to grass`
);

// 3. Balance battle stats
html = html.replace(
    `window.getEffectiveStat = function(creature, statName) {
    let base = creature.stats[statName] || 50; // Fallback
    let lvl = creature.level || 1;
    let scaledBase = base + (base * (lvl - 1) * 0.05);

    if (!creature.nature) return scaledBase;
    if (creature.nature.increase === statName) return scaledBase * 1.1;
    if (creature.nature.decrease === statName) return scaledBase * 0.9;
    return scaledBase;
};`,
    `window.getEffectiveStat = function(creature, statName) {
    let base = creature.stats[statName] || 50; // Fallback
    let lvl = creature.level || 1;
    let scaledBase = base + (base * (lvl - 1) * 0.05);

    if (creature.nature) {
        if (creature.nature.increase === statName) scaledBase *= 1.1;
        if (creature.nature.decrease === statName) scaledBase *= 0.9;
    }

    // Diminishing returns for high stats
    if (scaledBase > 500) {
        scaledBase = 500 + (scaledBase - 500) * 0.5;
    }
    // Hard cap at 999
    return Math.min(999, scaledBase);
};`
);

html = html.replace(
    `window.calculateDamage = function(attacker, defender, power = 50) {
    const atk = window.getEffectiveStat(attacker, 'attack');
    const def = window.getEffectiveStat(defender, 'defense');
    const typeMod = window.getTypeModifier(attacker.type, defender.type);
    const damage = (atk / def) * power * typeMod;
    return damage;
};`,
    `window.calculateDamage = function(attacker, defender, power = 50) {
    const atk = window.getEffectiveStat(attacker, 'attack');
    const def = window.getEffectiveStat(defender, 'defense');
    const typeMod = window.getTypeModifier(attacker.type, defender.type);

    // Scale damage by stat difference
    let statDiff = atk - def;
    let diffMultiplier = 1 + (statDiff > 0 ? Math.pow(statDiff, 0.8) : -Math.pow(Math.abs(statDiff), 0.8)) / 100;
    diffMultiplier = Math.max(0.1, diffMultiplier); // Floor multiplier at 0.1x

    const damage = power * diffMultiplier * typeMod;
    return Math.max(1, damage); // Minimum 1 damage
};`
);

// 4. Remove defend button
html = html.replace(
    `<button class="btn-defend" onclick="handlePlayerTurn('defend')">Defend</button>`,
    ``
);

html = html.replace(
    `grid-template-columns: 1fr 1fr;`,
    `grid-template-columns: 1fr 1fr 1fr;`
);

// Battle turn logic - Speed & Defend removal
html = html.replace(
    `window.handlePlayerTurn = function(action) {
    if (!inBattle) return;

    currentPlayer.isDefending = false;

    let canMove = processStatuses(currentPlayer);
    if (!canMove) {
        updateBattleUI();
        setTimeout(() => { enemyTurn(); }, 1000);
        return;
    }

    if (action === 'attack') {
        let pAtk = window.getEffectiveStat(currentPlayer, 'attack');
        let eDef = window.getEffectiveStat(currentEnemy, 'defense');
        if (currentEnemy.isDefending) eDef *= 1.5;

        let damage = window.calculateDamage(currentPlayer, currentEnemy, 50);

        if (Math.random() < 0.10) {
            damage *= 1.5;
            logBattle("<span class=\\"critical\\">Critical Hit!</span>");
        }

        currentEnemy.currentHp -= damage;
        logBattle(\`\${currentPlayer.nickname || currentPlayer.name} used Attack! Dealt <span class="damage">\${damage.toFixed(1)} damage</span>.\`);

        if (currentPlayer.type === 'Fire') applyStatusEffect(currentEnemy, 'Burn');
        else if (currentPlayer.type === 'Nature') applyStatusEffect(currentEnemy, 'Poison');
        else if (currentPlayer.type === 'Water') applyStatusEffect(currentEnemy, 'Sleep');
    } else if (action === 'defend') {
        currentPlayer.isDefending = true;
        logBattle(\`\${currentPlayer.nickname || currentPlayer.name} is defending.\`);
    } else if (action === 'catch') {
        if (collectedCreatures.length >= 6) {
            logBattle("<b>Your party is full! You cannot catch more creatures.</b>");
            updateBattleUI();
            setTimeout(() => { enemyTurn(); }, 1500);
            return;
        }
        let hpPct = currentEnemy.currentHp / currentEnemy.maxHp;
        let catchChance = 0.3 + (1 - hpPct) * 0.6;
        if (Math.random() < catchChance) {
            logBattle(\`<b>Success! Caught \${currentEnemy.name}!</b>\`);
            endBattle('caught');
            return;
        } else {
            logBattle(\`Oh no! The wild \${currentEnemy.name} broke free!\`);
        }
    } else if (action === 'run') {
        let pSpe = window.getEffectiveStat(currentPlayer, 'speed');
        let eSpe = window.getEffectiveStat(currentEnemy, 'speed');
        let runChance = 0.5 + (pSpe - eSpe) * 0.01;
        if (Math.random() < runChance) {
            logBattle("<b>Got away safely!</b>");
            endBattle('run');
            return;
        } else {
            logBattle("Failed to run away!");
        }
    }

    updateBattleUI();

    if (currentEnemy.currentHp <= 0) {
        logBattle(\`The wild \${currentEnemy.name} fainted!\`);
        endBattle('win');
        return;
    }

    setTimeout(() => {
        enemyTurn();
    }, 1000);
};

window.enemyTurn = function() {
    if (!inBattle) return;

    currentEnemy.isDefending = false;

    let canMove = processStatuses(currentEnemy);
    if (!canMove) {
        updateBattleUI();
        if (currentPlayer.currentHp <= 0) {
            logBattle(\`\${currentPlayer.nickname || currentPlayer.name} fainted!\`);
            endBattle('loss');
        } else if (currentEnemy.currentHp <= 0) {
            logBattle(\`The wild \${currentEnemy.name} fainted!\`);
            endBattle('win');
        }
        return;
    }

    if (Math.random() < 0.20) {
        currentEnemy.isDefending = true;
        logBattle(\`Wild \${currentEnemy.name} is defending.\`);
    } else {
        let damage = window.calculateDamage(currentEnemy, currentPlayer, 50);
        if (currentPlayer.isDefending) damage *= 0.5;

        if (Math.random() < 0.10) {
            damage *= 1.5;
            logBattle("<span class=\\"critical\\">Critical Hit by enemy!</span>");
        }

        currentPlayer.currentHp -= damage;
        logBattle(\`Wild \${currentEnemy.name} used Attack! Dealt <span class="damage">\${damage.toFixed(1)} damage</span>.\`);

        if (currentEnemy.type === 'Fire') applyStatusEffect(currentPlayer, 'Burn');
        else if (currentEnemy.type === 'Nature') applyStatusEffect(currentPlayer, 'Poison');
        else if (currentEnemy.type === 'Water') applyStatusEffect(currentPlayer, 'Sleep');
    }

    updateBattleUI();

    if (currentPlayer.currentHp <= 0) {
        logBattle(\`\${currentPlayer.nickname || currentPlayer.name} fainted!\`);
        endBattle('loss');
    }
};`,
    `window.doPlayerAction = function(action, callback) {
    if (!inBattle) return;
    let canMove = processStatuses(currentPlayer);
    if (!canMove) {
        updateBattleUI();
        if (callback) setTimeout(callback, 1000);
        return;
    }

    if (action === 'attack') {
        let damage = window.calculateDamage(currentPlayer, currentEnemy, 50);

        if (Math.random() < 0.10) {
            damage *= 1.5;
            logBattle("<span class=\\"critical\\">Critical Hit!</span>");
        }

        currentEnemy.currentHp -= damage;
        logBattle(\`\${currentPlayer.nickname || currentPlayer.name} used Attack! Dealt <span class="damage">\${damage.toFixed(1)} damage</span>.\`);

        if (currentPlayer.type === 'Fire') applyStatusEffect(currentEnemy, 'Burn');
        else if (currentPlayer.type === 'Nature') applyStatusEffect(currentEnemy, 'Poison');
        else if (currentPlayer.type === 'Water') applyStatusEffect(currentEnemy, 'Sleep');
    } else if (action === 'catch') {
        if (collectedCreatures.length >= 6) {
            logBattle("<b>Your party is full! You cannot catch more creatures.</b>");
            updateBattleUI();
            if (callback) setTimeout(callback, 1500);
            return;
        }
        let hpPct = currentEnemy.currentHp / currentEnemy.maxHp;
        let base_rate = 1.0;
        let chance = 100 * (1.1 - hpPct) * base_rate; // 10% at full HP, 110% at 0 HP
        let catchChance = Math.max(1, Math.min(100, chance));

        if ((Math.random() * 100) < catchChance) {
            logBattle(\`<b>Success! Caught \${currentEnemy.name}!</b>\`);
            updateBattleUI();
            endBattle('caught');
            return;
        } else {
            logBattle(\`Oh no! The wild \${currentEnemy.name} broke free!\`);
        }
    } else if (action === 'run') {
        let pSpe = window.getEffectiveStat(currentPlayer, 'speed');
        let eSpe = window.getEffectiveStat(currentEnemy, 'speed');
        let runChance = 0.5 + (pSpe - eSpe) * 0.01;
        if (Math.random() < runChance) {
            logBattle("<b>Got away safely!</b>");
            updateBattleUI();
            endBattle('run');
            return;
        } else {
            logBattle("Failed to run away!");
        }
    }

    updateBattleUI();

    if (currentEnemy.currentHp <= 0) {
        logBattle(\`The wild \${currentEnemy.name} fainted!\`);
        endBattle('win');
        return;
    }

    if (callback) setTimeout(callback, 1000);
};

window.doEnemyAction = function(callback) {
    if (!inBattle) return;
    let canMove = processStatuses(currentEnemy);
    if (!canMove) {
        updateBattleUI();
        if (currentPlayer.currentHp <= 0) {
            logBattle(\`\${currentPlayer.nickname || currentPlayer.name} fainted!\`);
            endBattle('loss');
        } else if (currentEnemy.currentHp <= 0) {
            logBattle(\`The wild \${currentEnemy.name} fainted!\`);
            endBattle('win');
        } else {
            if (callback) setTimeout(callback, 1000);
        }
        return;
    }

    let damage = window.calculateDamage(currentEnemy, currentPlayer, 50);

    if (Math.random() < 0.10) {
        damage *= 1.5;
        logBattle("<span class=\\"critical\\">Critical Hit by enemy!</span>");
    }

    currentPlayer.currentHp -= damage;
    logBattle(\`Wild \${currentEnemy.name} used Attack! Dealt <span class="damage">\${damage.toFixed(1)} damage</span>.\`);

    if (currentEnemy.type === 'Fire') applyStatusEffect(currentPlayer, 'Burn');
    else if (currentEnemy.type === 'Nature') applyStatusEffect(currentPlayer, 'Poison');
    else if (currentEnemy.type === 'Water') applyStatusEffect(currentPlayer, 'Sleep');

    updateBattleUI();

    if (currentPlayer.currentHp <= 0) {
        logBattle(\`\${currentPlayer.nickname || currentPlayer.name} fainted!\`);
        endBattle('loss');
        return;
    }

    if (callback) setTimeout(callback, 1000);
};

window.handlePlayerTurn = function(action) {
    if (!inBattle) return;

    let pSpe = window.getEffectiveStat(currentPlayer, 'speed');
    let eSpe = window.getEffectiveStat(currentEnemy, 'speed');

    // Initiative roll (1-20 modifier)
    let pRoll = pSpe + (Math.random() * 20);
    let eRoll = eSpe + (Math.random() * 20);

    let playerGoesFirst = pRoll >= eRoll;
    if (action === 'catch' || action === 'run') {
        playerGoesFirst = true; // Utility actions have priority
    }

    if (playerGoesFirst) {
        window.doPlayerAction(action, () => {
            if (inBattle && currentEnemy.currentHp > 0) {
                window.doEnemyAction();
            }
        });
    } else {
        window.doEnemyAction(() => {
            if (inBattle && currentPlayer.currentHp > 0) {
                window.doPlayerAction(action);
            }
        });
    }
};`
);

// 6. Prevent water spawns

html = html.replace(
    `const startX = savedX ? parseFloat(savedX) : WORLD_SIZE / 2;
    const startY = savedY ? parseFloat(savedY) : WORLD_SIZE / 2;`,
    `let startX = savedX ? parseFloat(savedX) : WORLD_SIZE / 2;
    let startY = savedY ? parseFloat(savedY) : WORLD_SIZE / 2;

    // Ensure player spawns on grass
    let pCol = Math.floor(startX / 100);
    let pRow = Math.floor(startY / 100);
    if (!mapData[pRow] || mapData[pRow][pCol] !== 'grass') {
        let found = false;
        for (let r = 0; r < mapData.length && !found; r++) {
            for (let c = 0; c < mapData[r].length && !found; c++) {
                if (mapData[r][c] === 'grass') {
                    startX = c * 100 + 50;
                    startY = r * 100 + 50;
                    found = true;
                }
            }
        }
    }`
);

html = html.replace(
    `const x = forceX !== undefined ? forceX : Phaser.Math.Between(100, WORLD_SIZE - 100);
    const y = forceY !== undefined ? forceY : Phaser.Math.Between(100, WORLD_SIZE - 100);`,
    `let x = forceX;
    let y = forceY;
    if (x === undefined || y === undefined) {
        let found = false;
        let attempts = 0;
        while (!found && attempts < 100) {
            x = Phaser.Math.Between(100, WORLD_SIZE - 100);
            y = Phaser.Math.Between(100, WORLD_SIZE - 100);
            let col = Math.floor(x / 100);
            let row = Math.floor(y / 100);
            if (mapData[row] && mapData[row][col] === 'grass') {
                found = true;
            }
            attempts++;
        }
    }`
);

html = html.replace(
    `function respawnEnemyBase() {
    const basePrototype = window.baseCreatures.find(c => c.id === currentEnemy.baseId) || window.baseCreatures.find(c => c.name === currentEnemy.name);
    let rx, ry, d;
    do {
        rx = Phaser.Math.Between(100, WORLD_SIZE - 100);
        ry = Phaser.Math.Between(100, WORLD_SIZE - 100);
        d = Math.hypot(player.x - rx, player.y - ry);
    } while (d < 500);
    spawnCreature(game.scene.scenes[0], basePrototype || currentEnemy, rx, ry);
}`,
    `function respawnEnemyBase() {
    const basePrototype = window.baseCreatures.find(c => c.id === currentEnemy.baseId) || window.baseCreatures.find(c => c.name === currentEnemy.name);
    let rx, ry, d, col, row;
    do {
        rx = Phaser.Math.Between(100, WORLD_SIZE - 100);
        ry = Phaser.Math.Between(100, WORLD_SIZE - 100);
        col = Math.floor(rx / 100);
        row = Math.floor(ry / 100);
        d = Math.hypot(player.x - rx, player.y - ry);
    } while (d < 500 || (mapData[row] && mapData[row][col] !== 'grass'));
    spawnCreature(game.scene.scenes[0], basePrototype || currentEnemy, rx, ry);
}`
);


fs.writeFileSync('index.html', html);
console.log("Updated index.html");
