const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const regex = /if \(window\.p1MiniTilePlacementMode\) \{([\s\S]*?)return;/g;
const matches = [...content.matchAll(regex)];
for (const match of matches) {
    console.log(match[0]);
}

// Find keyboard inputs in update loop
const updateIndex = content.indexOf('function update(time, delta) {');
if (updateIndex !== -1) {
    const updateBlock = content.substring(updateIndex, updateIndex + 5000);
    // find key events
    console.log("Update loop found");
}
