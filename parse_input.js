const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

// Find where input handles rotation for preview sprite
const regex = /if \(window\[\`p\$\{playerNum\}MiniTilePlacementMode\`\]\) \{([\s\S]*?)\}/g;
const matches = [...content.matchAll(regex)];
for (const match of matches) {
    console.log(match[0]);
}
