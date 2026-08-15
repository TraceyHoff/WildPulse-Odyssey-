const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const searchString = "activeScene.input.activePointer;";
const index = content.indexOf(searchString);
if (index !== -1) {
    console.log(content.substring(index - 500, index + 2000));
}
