const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const regex = /window\.tryPlaceMiniTile = function\(playerNum, x, y\) \{([\s\S]*?)^\};/m;
const match = content.match(regex);
if (match) {
    console.log(match[0]);
} else {
    console.log('Not found');
}
