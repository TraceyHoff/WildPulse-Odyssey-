const { performance } = require('perf_hooks');

const collectedCreatures = [];
for (let i = 0; i < 6; i++) {
    collectedCreatures.push({ id: `creature_${i}` });
}
const collectedCreaturesIds = new Set(collectedCreatures.map(c => c.id));

const targetCreature = { id: 'creature_5' }; // worst case for array
const newCreature = { id: 'creature_6' };

function testArray() {
    let found = collectedCreatures.find(c => c.id === targetCreature.id);
    let found2 = collectedCreatures.find(c => c.id === newCreature.id);
}

function testSet() {
    let found = collectedCreaturesIds.has(targetCreature.id);
    let found2 = collectedCreaturesIds.has(newCreature.id);
}

const ITERATIONS = 10000000;

let start = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
    testArray();
}
let end = performance.now();
console.log(`Array find: ${end - start} ms`);

start = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
    testSet();
}
end = performance.now();
console.log(`Set has: ${end - start} ms`);
