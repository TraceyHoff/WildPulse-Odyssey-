const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const regex = /p1MiniTilePreviewX/g;
const matches = [...content.matchAll(regex)];
for (const match of matches) {
    if (match.index > 1000000) {
        console.log(content.substring(match.index - 50, match.index + 100));
    }
}
