const fs = require('fs');

const code = fs.readFileSync('index.html', 'utf8');

const regex1 = /window\.updateActiveBuffsHUD = function\(\) \{[\s\S]*?\};/;
const match1 = code.match(regex1);
if (!match1) {
  console.log("Could not find updateActiveBuffsHUD");
  process.exit(1);
}

const originalFunction = match1[0];

const newFunction = originalFunction.replace(
  "const p1Buffs = document.getElementById('p1ActiveBuffs');",
  "if (!window.p1BuffsCache) window.p1BuffsCache = document.getElementById('p1ActiveBuffs');\n    const p1Buffs = window.p1BuffsCache;"
).replace(
  "const p2Buffs = document.getElementById('p2ActiveBuffs');",
  "if (!window.p2BuffsCache) window.p2BuffsCache = document.getElementById('p2ActiveBuffs');\n    const p2Buffs = window.p2BuffsCache;"
);

console.log("Original function:");
console.log(originalFunction.substring(0, 200) + '...');
console.log("\nNew function:");
console.log(newFunction.substring(0, 200) + '...');
