const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

// I need to see isValidMiniTileLocation exactly.
const start = content.indexOf("window.isValidMiniTileLocation");
if (start !== -1) {
    console.log(content.substring(start, start + 1500));
}
