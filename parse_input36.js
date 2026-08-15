const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const regex = /mSprite.setDepth\(9\);([\s\S]*?)mSprite.playerNum = pNum;/g;
const matches = [...content.matchAll(regex)];
for (const match of matches) {
    console.log(match[0]);
}
