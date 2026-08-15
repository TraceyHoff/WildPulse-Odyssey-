const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

// I need to find the PC input handling for mini tile placement.
// Maybe it's handled via generic pointerdown / keyboard events? Let's check `tryPlaceMiniTile` usages.
const regex = /tryPlaceMiniTile/g;
const matches = [...content.matchAll(regex)];
for (const match of matches) {
    const idx = match.index;
    console.log(content.substring(idx - 150, idx + 150));
    console.log("-----------------------");
}
