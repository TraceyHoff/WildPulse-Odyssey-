const ITERATIONS = 10_000_000;

function benchSqrt() {
    let sum = 0;
    for (let i = 0; i < ITERATIONS; i++) {
        const dx = Math.random() * 100;
        const dy = Math.random() * 100;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > 10) {
            sum += (dx / distance);
        }
    }
    return sum;
}

function benchNoSqrt() {
    let sum = 0;
    for (let i = 0; i < ITERATIONS; i++) {
        const dx = Math.random() * 100;
        const dy = Math.random() * 100;
        const distSq = dx * dx + dy * dy;
        if (distSq > 100) { // 10 * 10
            const distance = Math.sqrt(distSq); // We still need distance for division
            sum += (dx / distance);
        }
    }
    return sum;
}

const startSqrt = performance.now();
benchSqrt();
const endSqrt = performance.now();
console.log(`With sqrt: ${endSqrt - startSqrt} ms`);

const startNoSqrt = performance.now();
benchNoSqrt();
const endNoSqrt = performance.now();
console.log(`Without sqrt for condition: ${endNoSqrt - startNoSqrt} ms`);
