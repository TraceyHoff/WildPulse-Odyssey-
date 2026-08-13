const { performance } = require('perf_hooks');

let allStats = ['health', 'attack', 'defense', 'speed', 'specialAttack', 'specialDefense'];
let lastLeveledStats = ['health', 'speed'];

function before() {
    return allStats.filter(s => !lastLeveledStats.includes(s));
}

function after() {
    let lastLeveledStatsSet = new Set(lastLeveledStats);
    return allStats.filter(s => !lastLeveledStatsSet.has(s));
}

let N = 1000000;

let start = performance.now();
for (let i = 0; i < N; i++) {
    before();
}
let end = performance.now();
console.log('Before:', end - start, 'ms');

start = performance.now();
for (let i = 0; i < N; i++) {
    after();
}
end = performance.now();
console.log('After:', end - start, 'ms');
