const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

// Searching for `MiniTilePreview`
const regex = /MiniTilePreview/g;
const matches = [...content.matchAll(regex)];
for (const match of matches) {
    const idx = match.index;
    console.log(content.substring(idx - 100, idx + 100));
}
