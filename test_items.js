const fs = require('fs');
const text = fs.readFileSync('index.html', 'utf8');
const lines = text.split('\n');
const startIndex = lines.findIndex(line => line.includes('const homeItems = [];'));
const endIndex = lines.findIndex((line, idx) => idx > startIndex && line.includes('if (window.hasDefeatedAllTrainers && window.hasDefeatedAllTrainers(playerNum)) {'));

for (let i = startIndex; i < endIndex; i++) {
    if (lines[i].includes('name:')) {
        console.log(lines[i].trim());
    }
}
