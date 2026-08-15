const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const searchString = "window[`p${playerNum}MiniTilePlacementMode`]";
console.log(content.indexOf(searchString));

// Let's find how the preview sprite moves via mouse!
const regex = /p1MiniTilePreviewX/g;
const matches = [...content.matchAll(regex)];
for (const match of matches) {
    const idx = match.index;
    console.log(content.substring(idx - 150, idx + 150));
    console.log("-----------------------");
}
