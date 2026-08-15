const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const searchString = "window.tryPlaceMiniTile = function(playerNum, x, y) {";
const index = content.indexOf(searchString);
if (index !== -1) {
    console.log(content.substring(index, index + 2000));
}
