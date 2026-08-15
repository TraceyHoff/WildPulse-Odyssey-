const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

// Find pointerdown logic for minitile placement mode
const regex = /this\.input\.on\('pointerdown', \(pointer\) => \{([\s\S]*?)this\.input\.on/g;
const matches = [...content.matchAll(regex)];
if (matches.length > 0) {
    console.log(matches[0][0]);
} else {
    // If not found this way, just get the first pointerdown
    const index = content.indexOf("this.input.on('pointerdown'");
    if (index !== -1) {
        console.log(content.substring(index, index + 2000));
    }
}
