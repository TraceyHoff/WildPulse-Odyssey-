const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

// Are there keyboard controls for minitile placement?
const idx = content.indexOf("if (window.p1MiniTilePlacementMode) {");
if (idx !== -1) {
    console.log("Found p1MiniTilePlacementMode logic at index " + idx);
} else {
    // maybe it checks `p${playerNum}MiniTilePlacementMode`
    console.log("no explicit p1MiniTilePlacementMode");
}

const rx = /window\[\`p\$\{playerNum\}MiniTilePlacementMode\`\]/g;
console.log("matches: " + content.match(rx).length);

// Only used once in gamepad loop!
