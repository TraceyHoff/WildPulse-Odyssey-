const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const regex = /tryPlaceMiniTile/g;
const matches = [...content.matchAll(regex)];
for (const match of matches) {
    console.log(content.substring(match.index - 500, match.index + 500));
    console.log("-----------------------");
}
