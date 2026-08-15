const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const str = `if (window.p1HomePlacementMode) {
            const pointer = activeScene.input.activePointer;`;
const idx = content.indexOf(str);
console.log(idx);
