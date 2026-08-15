const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

// Get all the places we need to patch!
const search1 = "if (window.p1BasePlacementMode) {";
const i1 = content.indexOf(search1);
console.log(content.substring(i1 - 200, i1 + 500));

const search2 = "window.tryPlaceMiniTile = function(playerNum, x, y) {";
const i2 = content.indexOf(search2);
console.log(content.substring(i2 - 100, i2 + 1000));
