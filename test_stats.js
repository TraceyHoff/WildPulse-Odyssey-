const assert = require('assert');

// Mock existing code
let creature = {
    level: 10,
    stats: { health: 60, attack: 49, defense: 49, speed: 49, specialAttack: 49, specialDefense: 49 },
    bonusStats: { health: 8, attack: 8, defense: 8, speed: 8, specialAttack: 8, specialDefense: 8 }
};

window = {};
window.initializeCreatureLevelUps = function(creature) {
    if (creature.levelUpCount) return;
    creature.levelUpCount = { health: 0, attack: 0, defense: 0, speed: 0, specialAttack: 0, specialDefense: 0 };
    creature.lastLeveledStats = [];

    let allStats = ['health', 'attack', 'defense', 'speed', 'specialAttack', 'specialDefense'];
    let lvl = creature.level || 1;

    for (let l = 2; l <= lvl; l++) {
        if (l % 10 === 0) {
            allStats.forEach(s => {
                creature.levelUpCount[s] = (creature.levelUpCount[s] || 0) + 1;
                if (creature.bonusStats && creature.bonusStats[s] >= 2) {
                    creature.bonusStats[s] -= 2;
                }
            });
            creature.lastLeveledStats = [];
        } else {
            let lastLeveledStatsSet = new Set(creature.lastLeveledStats || []);
            let avail = allStats.filter(s => !lastLeveledStatsSet.has(s));
            if (avail.length < 2) avail = [...allStats];

            let numToChoose = Math.random() < 0.5 ? 2 : 3;
            if (numToChoose > avail.length) numToChoose = avail.length;

            let chosen = [];
            for (let i = 0; i < numToChoose; i++) {
                let idx = Math.floor(Math.random() * avail.length);
                let p = avail.splice(idx, 1)[0];
                chosen.push(p);
                creature.levelUpCount[p] = (creature.levelUpCount[p] || 0) + 1;

                if (creature.bonusStats && creature.bonusStats[p] >= 2) {
                    creature.bonusStats[p] -= 2;
                }
            }
            creature.lastLeveledStats = chosen;
        }
    }
};

window.getRawScaledStat = function(creature, statName) {
    if (!creature.stats) creature.stats = {};
    let base = creature.stats[statName] || 50;

    if (!creature.levelUpCount && creature.level > 1) {
        window.initializeCreatureLevelUps(creature);
    }

    let lvlCount = (creature.levelUpCount && creature.levelUpCount[statName]) || 0;

    let val = 0;
    if (statName === 'health') {
        val = (base * 0.4) + (base * 0.15) + (base * lvlCount * 0.15);
    } else {
        val = base + (base * lvlCount * 0.15);
    }

    let bonus = 0;
    if (creature.bonusStats && creature.bonusStats[statName]) {
        bonus = creature.bonusStats[statName];
    }
    let friendBonus = 0;
    if (creature.friendBonusStats && creature.friendBonusStats[statName]) {
        friendBonus = creature.friendBonusStats[statName];
    }
    return val + bonus + friendBonus;
};

console.log("Raw health (initialized):", window.getRawScaledStat(creature, 'health'));
console.log("levelUpCount:", creature.levelUpCount);
console.log("bonusStats after init:", creature.bonusStats);
