const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const str = `if (window.p1HomePlacementMode) {
            const pointer = activeScene.input.activePointer;`;
const idx = content.indexOf(str);
if (idx !== -1) {
    console.log(content.substring(idx - 200, idx + 500));
} else {
    const backup = content.indexOf("if (window.p1HomePlacementMode) {");
    console.log(content.substring(backup - 200, backup + 1000));
}
