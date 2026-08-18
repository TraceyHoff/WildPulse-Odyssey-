const fs = require('fs');
const code = fs.readFileSync('index.html', 'utf8');

const lines = code.split('\n');

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('tSprite.setTint(0x88ccff);') || lines[i].includes('creature.setTint(0x88ccff);')) {
        console.log(`Line ${i + 1}: ${lines[i]}`);
    }
}
