const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

// Use indexOf to get the code for keyboard handling
const searchString = "if (window.p1MiniTilePlacementMode) {";
const index = content.indexOf(searchString);
if (index !== -1) {
    const block = content.substring(index, index + 1000);
    console.log(block);
} else {
    console.log("not found");
}
