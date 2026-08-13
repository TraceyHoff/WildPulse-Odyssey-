const { performance } = require('perf_hooks');

const runs = 10;
let queryTotal = 0;
let cachedTotal = 0;

for (let j = 0; j < runs; j++) {
    // Mock the DOM query
    const mockDocument = {
        getElementById: () => ({ innerText: '' })
    };

    let start = performance.now();
    for (let i = 0; i < 1000000; i++) {
        const p1 = mockDocument.getElementById('p1ActiveBuffs');
        const p2 = mockDocument.getElementById('p2ActiveBuffs');
    }
    let end = performance.now();
    queryTotal += (end - start);

    const cachedP1 = mockDocument.getElementById('p1ActiveBuffs');
    const cachedP2 = mockDocument.getElementById('p2ActiveBuffs');

    start = performance.now();
    for (let i = 0; i < 1000000; i++) {
        const p1 = cachedP1;
        const p2 = cachedP2;
    }
    end = performance.now();
    cachedTotal += (end - start);
}

console.log(`Average Query Time: ${queryTotal / runs}ms`);
console.log(`Average Cached Time: ${cachedTotal / runs}ms`);
