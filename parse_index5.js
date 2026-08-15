const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const regex = /if \(window\.p1MiniTilePlacementMode\) \{([\s\S]*?)\}/g;
const matches = content.matchAll(regex);
for (const match of matches) {
    console.log(match[0]);
    console.log("----------------------");
}
