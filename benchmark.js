const { performance } = require('perf_hooks');

const iterations = 5000000;

const allStats = ['health', 'attack', 'defense', 'speed', 'specialAttack', 'specialDefense'];
let creature = {
    friendLevel: 1,
    lastLeveledFriendStats: ['health', 'attack'],
    friendBonusStats: {
        health: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        specialAttack: 0,
        specialDefense: 0
    }
};

function runBenchmark(name, func) {
    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
        func();
    }
    const end = performance.now();
    console.log(`${name}: ${end - start} ms`);
}

runBenchmark('Baseline (includes)', () => {
    // Reset state slightly to keep the function working
    creature.friendLevel = 1;
    creature.lastLeveledFriendStats = ['health', 'attack'];

    let avail = allStats.filter(s => !creature.lastLeveledFriendStats.includes(s));
    if (avail.length < 2) avail = [...allStats];

    let idx1 = Math.floor(Math.random() * avail.length);
    let p1 = avail.splice(idx1, 1)[0];

    let idx2 = Math.floor(Math.random() * avail.length);
    let p2 = avail.splice(idx2, 1)[0];

    creature.friendBonusStats[p1] += 2;
    creature.friendBonusStats[p2] += 2;
    creature.lastLeveledFriendStats = [p1, p2];
});

runBenchmark('Optimized (Set)', () => {
    creature.friendLevel = 1;
    creature.lastLeveledFriendStats = ['health', 'attack'];

    const lastStatsSet = new Set(creature.lastLeveledFriendStats);
    let avail = allStats.filter(s => !lastStatsSet.has(s));
    if (avail.length < 2) avail = [...allStats];

    let idx1 = Math.floor(Math.random() * avail.length);
    let p1 = avail.splice(idx1, 1)[0];

    let idx2 = Math.floor(Math.random() * avail.length);
    let p2 = avail.splice(idx2, 1)[0];

    creature.friendBonusStats[p1] += 2;
    creature.friendBonusStats[p2] += 2;
    creature.lastLeveledFriendStats = [p1, p2];
});