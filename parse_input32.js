const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

// I need to see the rest of isValidMiniTileLocation
const start = content.indexOf("window.isValidMiniTileLocation");
if (start !== -1) {
    console.log(content.substring(start + 1000, start + 2000));
}
