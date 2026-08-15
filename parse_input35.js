const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const searchString = "window.spawnMiniTiles = function(scene) {";
const index = content.indexOf(searchString);
if (index !== -1) {
    const afterBlock = content.substring(index, index + 2500);
    console.log(afterBlock);
}
