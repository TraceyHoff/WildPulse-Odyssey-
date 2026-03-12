const xpReq = level => 100 * Math.pow(level, 2);
window = {
  getXpRequirement: xpReq,
  gainXp: function(creature, amount) {
    creature.xp = (creature.xp || 0) + amount;
    let leveledUp = false;
    creature.levelUpMessages = creature.levelUpMessages || [];
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
            creature.levelUpMessages.push(`Growth Spurt at Level ${creature.level}! All stats increased!`);
            creature.lastLeveledStats = [];
        } else {
            let avail = allStats.filter(s => !creature.lastLeveledStats.includes(s));
            if (avail.length < 2) avail = allStats;

            let p1 = avail.splice(Math.floor(Math.random() * avail.length), 1)[0];
            let p2 = avail.splice(Math.floor(Math.random() * avail.length), 1)[0];

            creature.bonusStats[p1] += 2;
            creature.bonusStats[p2] += 2;
            creature.lastLeveledStats = [p1, p2];
        }
    }
    return leveledUp;
  }
};

let c = { level: 8, xp: 0 };
window.gainXp(c, xpReq(8) + xpReq(9));
console.log(c.level);
console.log(c.bonusStats);
console.log(c.levelUpMessages);
