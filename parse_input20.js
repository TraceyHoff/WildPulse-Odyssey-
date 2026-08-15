const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const regex = /if \(window\[\`p\$\{playerNum\}MiniTilePlacementMode\`\]\) \{/g;
const matches = [...content.matchAll(regex)];
for (const match of matches) {
    const startIdx = match.index;
    const endIdx = content.indexOf("return;", startIdx) + 8;
    console.log(content.substring(startIdx, endIdx));
    console.log("-------------------");
}
