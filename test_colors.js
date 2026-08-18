const fs = require('fs');
const code = fs.readFileSync('index.html', 'utf8');

const lines = code.split('\n');
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('tSprite.getData(\'trainerId\');')) {
        // Look ahead to see if originalColor is set anywhere
    }
}
