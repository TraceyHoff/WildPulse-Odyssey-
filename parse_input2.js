const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

// Use indexOf to get the code for the gamepad handling
const searchString = "if (window[`p${playerNum}MiniTilePlacementMode`]) {";
const index = content.indexOf(searchString);
if (index !== -1) {
    const block = content.substring(index, index + 1500);
    console.log(block);
}
