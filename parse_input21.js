const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const searchString = "window.p1MiniTilePlacementMode";
const regex = /MiniTilePlacementMode/g;
const matches = [...content.matchAll(regex)];
for (const match of matches) {
    console.log(content.substring(match.index - 20, match.index + 20));
}
