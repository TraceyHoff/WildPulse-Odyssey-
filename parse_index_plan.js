const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

let mSpriteStr = `
            if (textureKey) {
                let mSprite = window.miniTilesGroup.create(tile.x, tile.y, textureKey);
                mSprite.setDepth(9);`;

if (code.includes(mSpriteStr)) {
  console.log('Matches mSprite setDepth exactly');
} else {
  console.log('No exact match');
}
