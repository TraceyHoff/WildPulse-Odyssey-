const fs = require('fs');
const code = fs.readFileSync('index.html', 'utf8');
const lines = code.split('\n');

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('if (window.npcTrainersGroup && window.npcTrainersGroup.getLength() > 0) {')) {
        for (let j = i; j < i + 150; j++) {
            console.log(lines[j]);
        }
        break;
    }
}
