const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const searchString = "const previewSpriteId = `p${playerNum}MiniTilePreviewSprite`;";
const index = content.indexOf(searchString);
if (index !== -1) {
    console.log("first index", index);
}
const index2 = content.indexOf(searchString, index + 1);
if (index2 !== -1) {
    console.log("second index", index2);
}
