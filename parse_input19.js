const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const searchString = "window.tryPlaceMiniTile(1, window.p1MiniTilePreviewX, window.p1MiniTilePreviewY)";
console.log(content.indexOf(searchString));
