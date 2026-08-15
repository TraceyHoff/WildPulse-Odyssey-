const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const searchString = "function update(time, delta) {";
const index = content.indexOf(searchString);
if (index !== -1) {
    const afterBlock = content.substring(index, index + 35000);
    // Find p1MiniTilePlacementMode in there
    console.log(afterBlock.includes("MiniTilePlacementMode"));
}
