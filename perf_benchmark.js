const { JSDOM } = require('jsdom');

const dom = new JSDOM(`
  <!DOCTYPE html>
  <html>
    <body>
      <div id="p1ActiveBuffs"></div>
      <div id="p2ActiveBuffs"></div>
    </body>
  </html>
`);

global.document = dom.window.document;
global.window = dom.window;

// Setup global variables
window.p1RepellentTime = 1000;
window.p1JankJuiceTime = 1000;
window.p1ExPallTime = 1000;
window.p1PedometerTime = 1000;
window.p1NpcDualTime = 1000;
window.p1WildDualTime = 1000;

window.p2RepellentTime = 1000;
window.p2JankJuiceTime = 1000;
window.p2ExPallTime = 1000;
window.p2PedometerTime = 1000;
window.p2NpcDualTime = 1000;
window.p2WildDualTime = 1000;

function originalUpdateActiveBuffsHUD() {
    const p1Buffs = document.getElementById('p1ActiveBuffs');
    if (p1Buffs) {
        let txts = [];
        if (window.p1RepellentTime && window.p1RepellentTime > 0) {
            txts.push(`🧴 Repel: ${Math.ceil(window.p1RepellentTime / 1000)}s`);
        }
        if (window.p1JankJuiceTime && window.p1JankJuiceTime > 0) {
            txts.push(`🧃 Shiny: ${Math.ceil(window.p1JankJuiceTime / 1000)}s`);
        }
        if (window.p1ExPallTime && window.p1ExPallTime > 0) {
            txts.push(`✨ ExPALL: ${Math.ceil(window.p1ExPallTime / 1000)}s`);
        }
        if (window.p1PedometerTime && window.p1PedometerTime > 0) {
            txts.push(`👣 Pedometer: ${Math.ceil(window.p1PedometerTime / 1000)}s`);
        }
        if (window.p1NpcDualTime && window.p1NpcDualTime > 0) {
            txts.push(`📡 NPC Dual: ${Math.ceil(window.p1NpcDualTime / 1000)}s`);
        }
        if (window.p1WildDualTime && window.p1WildDualTime > 0) {
            txts.push(`📶 Wild Dual: ${Math.ceil(window.p1WildDualTime / 1000)}s`);
        }
        const textVal = txts.join('\n');
        if (window._lastP1BuffsText !== textVal) {
            p1Buffs.innerText = textVal;
            window._lastP1BuffsText = textVal;
        }
    }

    const p2Buffs = document.getElementById('p2ActiveBuffs');
    if (p2Buffs) {
        let txts = [];
        if (window.p2RepellentTime && window.p2RepellentTime > 0) {
            txts.push(`🧴 Repel: ${Math.ceil(window.p2RepellentTime / 1000)}s`);
        }
        if (window.p2JankJuiceTime && window.p2JankJuiceTime > 0) {
            txts.push(`🧃 Shiny: ${Math.ceil(window.p2JankJuiceTime / 1000)}s`);
        }
        if (window.p2ExPallTime && window.p2ExPallTime > 0) {
            txts.push(`✨ ExPALL: ${Math.ceil(window.p2ExPallTime / 1000)}s`);
        }
        if (window.p2PedometerTime && window.p2PedometerTime > 0) {
            txts.push(`👣 Pedometer: ${Math.ceil(window.p2PedometerTime / 1000)}s`);
        }
        if (window.p2NpcDualTime && window.p2NpcDualTime > 0) {
            txts.push(`📡 NPC Dual: ${Math.ceil(window.p2NpcDualTime / 1000)}s`);
        }
        if (window.p2WildDualTime && window.p2WildDualTime > 0) {
            txts.push(`📶 Wild Dual: ${Math.ceil(window.p2WildDualTime / 1000)}s`);
        }
        const textVal = txts.join('\n');
        if (window._lastP2BuffsText !== textVal) {
            p2Buffs.innerText = textVal;
            window._lastP2BuffsText = textVal;
        }
    }
}


function optimizedUpdateActiveBuffsHUD() {
    if (!window.p1BuffsCache) window.p1BuffsCache = document.getElementById('p1ActiveBuffs');
    const p1Buffs = window.p1BuffsCache;
    if (p1Buffs) {
        let txts = [];
        if (window.p1RepellentTime && window.p1RepellentTime > 0) {
            txts.push(`🧴 Repel: ${Math.ceil(window.p1RepellentTime / 1000)}s`);
        }
        if (window.p1JankJuiceTime && window.p1JankJuiceTime > 0) {
            txts.push(`🧃 Shiny: ${Math.ceil(window.p1JankJuiceTime / 1000)}s`);
        }
        if (window.p1ExPallTime && window.p1ExPallTime > 0) {
            txts.push(`✨ ExPALL: ${Math.ceil(window.p1ExPallTime / 1000)}s`);
        }
        if (window.p1PedometerTime && window.p1PedometerTime > 0) {
            txts.push(`👣 Pedometer: ${Math.ceil(window.p1PedometerTime / 1000)}s`);
        }
        if (window.p1NpcDualTime && window.p1NpcDualTime > 0) {
            txts.push(`📡 NPC Dual: ${Math.ceil(window.p1NpcDualTime / 1000)}s`);
        }
        if (window.p1WildDualTime && window.p1WildDualTime > 0) {
            txts.push(`📶 Wild Dual: ${Math.ceil(window.p1WildDualTime / 1000)}s`);
        }
        const textVal = txts.join('\n');
        if (window._lastP1BuffsText !== textVal) {
            p1Buffs.innerText = textVal;
            window._lastP1BuffsText = textVal;
        }
    }

    if (!window.p2BuffsCache) window.p2BuffsCache = document.getElementById('p2ActiveBuffs');
    const p2Buffs = window.p2BuffsCache;
    if (p2Buffs) {
        let txts = [];
        if (window.p2RepellentTime && window.p2RepellentTime > 0) {
            txts.push(`🧴 Repel: ${Math.ceil(window.p2RepellentTime / 1000)}s`);
        }
        if (window.p2JankJuiceTime && window.p2JankJuiceTime > 0) {
            txts.push(`🧃 Shiny: ${Math.ceil(window.p2JankJuiceTime / 1000)}s`);
        }
        if (window.p2ExPallTime && window.p2ExPallTime > 0) {
            txts.push(`✨ ExPALL: ${Math.ceil(window.p2ExPallTime / 1000)}s`);
        }
        if (window.p2PedometerTime && window.p2PedometerTime > 0) {
            txts.push(`👣 Pedometer: ${Math.ceil(window.p2PedometerTime / 1000)}s`);
        }
        if (window.p2NpcDualTime && window.p2NpcDualTime > 0) {
            txts.push(`📡 NPC Dual: ${Math.ceil(window.p2NpcDualTime / 1000)}s`);
        }
        if (window.p2WildDualTime && window.p2WildDualTime > 0) {
            txts.push(`📶 Wild Dual: ${Math.ceil(window.p2WildDualTime / 1000)}s`);
        }
        const textVal = txts.join('\n');
        if (window._lastP2BuffsText !== textVal) {
            p2Buffs.innerText = textVal;
            window._lastP2BuffsText = textVal;
        }
    }
}

// Warmup
for (let i = 0; i < 1000; i++) {
    originalUpdateActiveBuffsHUD();
    optimizedUpdateActiveBuffsHUD();
}

const ITERATIONS = 100000;

const startOriginal = process.hrtime.bigint();
for (let i = 0; i < ITERATIONS; i++) {
    originalUpdateActiveBuffsHUD();
}
const endOriginal = process.hrtime.bigint();

const startOptimized = process.hrtime.bigint();
for (let i = 0; i < ITERATIONS; i++) {
    optimizedUpdateActiveBuffsHUD();
}
const endOptimized = process.hrtime.bigint();

const originalTime = Number(endOriginal - startOriginal) / 1e6; // ms
const optimizedTime = Number(endOptimized - startOptimized) / 1e6; // ms

console.log(`Original Time: ${originalTime.toFixed(2)} ms`);
console.log(`Optimized Time: ${optimizedTime.toFixed(2)} ms`);
const improvement = ((originalTime - optimizedTime) / originalTime * 100).toFixed(2);
console.log(`Improvement: ${improvement}%`);
