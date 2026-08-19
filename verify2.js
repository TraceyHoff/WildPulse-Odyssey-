const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Extract the two functions we want to test
const scriptMatch1 = html.match(/window\.initializeCreatureLevelUps = function\([\s\S]*?^};/m);
const scriptMatch2 = html.match(/window\.getRawScaledStat = function\([\s\S]*?^};/m);
const scriptMatch3 = html.match(/window\.gainXp = function\([\s\S]*?^};/m);
const scriptMatch4 = html.match(/window\.getXpRequirement = function\([\s\S]*?^};/m);

if (!scriptMatch1 || !scriptMatch2) {
    console.error("Failed to extract functions");
    process.exit(1);
}

const window = {};
eval(scriptMatch1[0]);
eval(scriptMatch2[0]);
eval(scriptMatch3[0]);
eval(scriptMatch4[0]);

let creature = {
    level: 10,
    xp: 0,
    stats: { health: 60, attack: 49, defense: 49, speed: 49, specialAttack: 49, specialDefense: 49 },
    bonusStats: { health: 8, attack: 8, defense: 8, speed: 8, specialAttack: 8, specialDefense: 8 }
};

let hp = window.getRawScaledStat(creature, 'health');
console.log("Health computed correctly:", hp);
console.log("Level up counts populated:", creature.levelUpCount);
console.log("Bonus stats reduced:", creature.bonusStats);

if (hp > 0 && creature.levelUpCount && creature.bonusStats.health === 0) {
    console.log("Test passed!");
} else {
    console.error("Test failed");
    process.exit(1);
}

// Test gainXp
let c2 = { level: 2, xp: 0, stats: { health: 50, attack: 50, defense: 50, speed: 50, specialAttack: 50, specialDefense: 50 } };
window.getRawScaledStat(c2, 'health'); // Initialize it
console.log("c2 levelUpCount before:", Object.assign({}, c2.levelUpCount));
let leveledUp = window.gainXp(c2, 1000);
console.log("c2 leveled up:", leveledUp, "level:", c2.level);
console.log("c2 levelUpCount after:", c2.levelUpCount);
