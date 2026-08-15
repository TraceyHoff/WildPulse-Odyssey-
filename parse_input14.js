const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const searchString = "if (window.p1HomePlacementMode) {";
const index = content.indexOf(searchString);
if (index !== -1) {
    const afterBlock = content.substring(index, index + 3500);
    console.log(afterBlock);
}
