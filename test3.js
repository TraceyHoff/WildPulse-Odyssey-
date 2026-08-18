const fs = require('fs');
const code = fs.readFileSync('index.html', 'utf8');
const lines = code.split('\n');

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('// Update NPC trainers logic & culling')) {
        for (let j = i; j < i + 100; j++) {
            console.log(lines[j]);
        }
        break;
    }
}
