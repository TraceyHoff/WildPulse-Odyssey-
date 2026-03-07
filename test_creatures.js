const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('index.html', 'utf8');

const dom = new JSDOM(html, { runScripts: "dangerously" });
const window = dom.window;

let validCount = 0;
let nullCount = 0;

for (let i = 0; i < 1300; i++) {
    const desc = window.getCreatureDescription(i);
    if (desc) {
        console.log(`ID: ${desc.id}, Name: ${desc.name}`);
        validCount++;
    } else {
        nullCount++;
    }
}

console.log(`Valid descriptions: ${validCount}`);
console.log(`Expected Valid descriptions: 1275`);
console.log(`Descriptions matched expectation: ${validCount === 1275}`);
