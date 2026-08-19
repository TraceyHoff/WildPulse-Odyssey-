const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const html = fs.readFileSync('index.html', 'utf8');

const dom = new JSDOM(html, { runScripts: "dangerously" });
const window = dom.window;

let creature = {
    level: 10,
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
