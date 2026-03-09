const { performance } = require('perf_hooks');

// Dummy data
const mapData = [];
for (let r = 0; r < 200; r++) {
    mapData[r] = [];
    for (let c = 0; c < 200; c++) {
        mapData[r][c] = (Math.random() < 0.1) ? 'obs' : 'grass';
    }
}

// Function with unoptimized loop
function unoptimized(rx, ry, row, col) {
    let d_water = 800; // start assuming safe
    if (mapData && mapData.length > 0) {
        for (let wr = Math.max(0, row - 8); wr <= Math.min(mapData.length - 1, row + 8); wr++) {
            for (let wc = Math.max(0, col - 8); wc <= Math.min(mapData[0].length - 1, col + 8); wc++) {
                if (mapData[wr] && mapData[wr][wc] === 'obs') {
                    let distW = Math.hypot(wc * 100 + 50 - rx, wr * 100 + 50 - ry);
                    if (distW < d_water) d_water = distW;
                }
            }
        }
    }
    return d_water;
}

// Function with optimized loop (break early if d_water drops below threshold? Wait, if we only need to know if any water is within 800, we could potentially just return early?)
// Looking at the original code: `} while ((enemyObj && d < 1000) || d_water < 800 || !mapData[row] || mapData[row][col] !== 'grass');`
// If d_water ever drops below 800, the attempt is immediately invalid because of `d_water < 800`. So we don't need to find the absolute minimum d_water, we just need to know if any is < 800.
function optimized(rx, ry, row, col) {
    let d_water = 800; // start assuming safe
    if (mapData && mapData.length > 0) {
        for (let wr = Math.max(0, row - 8); wr <= Math.min(mapData.length - 1, row + 8); wr++) {
            for (let wc = Math.max(0, col - 8); wc <= Math.min(mapData[0].length - 1, col + 8); wc++) {
                if (mapData[wr] && mapData[wr][wc] === 'obs') {
                    let distW = Math.hypot(wc * 100 + 50 - rx, wr * 100 + 50 - ry);
                    if (distW < d_water) {
                        d_water = distW;
                        if (d_water < 800) {
                            // We can just return because it's already invalid!
                            return d_water;
                        }
                    }
                }
            }
        }
    }
    return d_water;
}

const ITERATIONS = 10000;
let totalUnopt = 0;
let totalOpt = 0;

for (let i = 0; i < ITERATIONS; i++) {
    let rx = Math.random() * 20000;
    let ry = Math.random() * 20000;
    let col = Math.floor(rx / 100);
    let row = Math.floor(ry / 100);

    let start = performance.now();
    let res1 = unoptimized(rx, ry, row, col);
    totalUnopt += performance.now() - start;

    start = performance.now();
    let res2 = optimized(rx, ry, row, col);
    totalOpt += performance.now() - start;

    if ((res1 < 800) !== (res2 < 800)) {
        console.error("Mismatch!");
    }
}

console.log(`Unoptimized: ${totalUnopt.toFixed(2)} ms`);
console.log(`Optimized: ${totalOpt.toFixed(2)} ms`);
