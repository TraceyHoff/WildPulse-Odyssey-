const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const regex = /if \(window\.p1MiniTilePlacementMode\) \{([\s\S]*?)\}/g;
const matches = [...content.matchAll(regex)];
for (const match of matches) {
    console.log(match[0]);
}

const regex2 = /if \(window\[\`p\$\{playerNum\}MiniTilePlacementMode\`\]\) \{([\s\S]*?)\}/g;
const matches2 = [...content.matchAll(regex2)];
for (const match of matches2) {
    console.log(match[0]);
}
