const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const searchString = "window[`p${playerNum}MiniTilePlacementMode`]";
const index = content.indexOf(searchString);
const block = content.substring(index - 1000, index + 1000);
console.log(block);
