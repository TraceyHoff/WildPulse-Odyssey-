const fs = require('fs');

function updateGainXpExtracted(filename) {
    let content = fs.readFileSync(filename, 'utf-8');

    // In extracted_script, it looks like gainXp is very simple:
    const oldCode = `window.gainXp = function(creature, amount) {
    creature.xp = (creature.xp || 0) + amount;
    let leveledUp = false;
    while (creature.xp >= window.getXpRequirement(creature.level || 1)) {
        creature.xp -= window.getXpRequirement(creature.level || 1);
        creature.level = (creature.level || 1) + 1;
        leveledUp = true;
    }
    return leveledUp;
};`;

    const newCode = `window.gainXp = function(creature, amount) {
    creature.xp = (creature.xp || 0) + amount;
    let leveledUp = false;
    while (creature.xp >= window.getXpRequirement(creature.level || 1)) {
        creature.xp -= window.getXpRequirement(creature.level || 1);
        creature.level = (creature.level || 1) + 1;
        leveledUp = true;

        if (!creature.bonusStats) {
            creature.bonusStats = { health: 0, attack: 0, defense: 0, speed: 0, specialAttack: 0, specialDefense: 0 };
        }
        if (!creature.lastLeveledStats) {
            creature.lastLeveledStats = [];
        }

        let allStats = ['health', 'attack', 'defense', 'speed', 'specialAttack', 'specialDefense'];

        if (creature.level % 10 === 0) {
            allStats.forEach(s => creature.bonusStats[s] += 2);
            creature.growthSpurtThisLevel = true;
            creature.lastLeveledStats = []; // Reset restrictions after growth spurt
        } else {
            let avail = allStats.filter(s => !creature.lastLeveledStats.includes(s));
            if (avail.length < 2) avail = [...allStats]; // Fallback

            let idx1 = Math.floor(Math.random() * avail.length);
            let p1 = avail.splice(idx1, 1)[0];

            let idx2 = Math.floor(Math.random() * avail.length);
            let p2 = avail.splice(idx2, 1)[0];

            creature.bonusStats[p1] += 2;
            creature.bonusStats[p2] += 2;
            creature.lastLeveledStats = [p1, p2];
        }
    }
    return leveledUp;
};`;

    if (content.includes(oldCode)) {
        content = content.replace(oldCode, newCode);
        fs.writeFileSync(filename, content);
        console.log(`Updated ${filename}`);
    } else {
        console.log(`Could not find old code in ${filename}`);
    }
}
['extracted_script.js', 'clean_script.js'].forEach(updateGainXpExtracted);
