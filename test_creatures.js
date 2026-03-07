const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('index.html', 'utf8');

const dom = new JSDOM(html, {
    runScripts: "dangerously",
    url: "http://localhost/",
    beforeParse(window) {
        window.Phaser = {
            AUTO: 'AUTO',
            Scale: { RESIZE: 'RESIZE', CENTER_BOTH: 'CENTER_BOTH' },
            Game: class { constructor() {} },
            Math: { Between: () => 0 }
        };
    }
});
const window = dom.window;

const baseCreatures = window.baseCreatures;

let validCount = 0;

if (baseCreatures && Array.isArray(baseCreatures)) {
    for (let i = 0; i < baseCreatures.length; i++) {
        const c = baseCreatures[i];
        if (c.id && c.name && c.description && c.features && c.type && c.stats && c.generation === 1) {
            validCount++;
        }
    }
}

console.log(`Base creatures length: ${baseCreatures ? baseCreatures.length : 0}`);
console.log(`Expected Base creatures: 50`);
console.log(`Valid Base creatures: ${validCount}`);
console.log(`Descriptions matched expectation: ${validCount === 50}`);

// Breeding Test
if (window.breed && baseCreatures && baseCreatures.length >= 2) {
    const parent1 = baseCreatures[0];
    const parent2 = baseCreatures[1];

    const child = window.breed(parent1, parent2);

    console.log(`Breeding Test: Parent 1 Name: ${parent1.name}, Parent 2 Name: ${parent2.name}`);
    console.log(`Child Name: ${child.name}`);
    console.log(`Child Generation: ${child.generation}`);

    const expectedHealth = Math.floor((parent1.stats.health + parent2.stats.health) / 2);
    const expectedAttack = Math.floor((parent1.stats.attack + parent2.stats.attack) / 2);

    console.log(`Child Health matched expected (${expectedHealth}): ${child.stats.health === expectedHealth}`);
    console.log(`Child Attack matched expected (${expectedAttack}): ${child.stats.attack === expectedAttack}`);
    console.log(`Child Generation matched expected (2): ${child.generation === 2}`);
} else {
    console.log(`Breeding function not found or insufficient base creatures.`);
}
