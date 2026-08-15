const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const searchPush = `miniTiles.push({ type: tileType, x: snappedX, y: snappedY });`;
const replacePush = `miniTiles.push({ type: tileType, x: snappedX, y: snappedY, rotation: window[\`p\${playerNum}MiniTileRotation\`] });`;
content = content.replace(searchPush, replacePush);

const searchSpawn = `            if (textureKey) {
                let mSprite = window.miniTilesGroup.create(tile.x, tile.y, textureKey);
                mSprite.setDepth(9);
                mSprite.setScale(0.6); // Smaller version
                mSprite.isMiniTile = true;
                mSprite.miniTileType = tile.type;
                mSprite.playerNum = pNum;
                if (mSprite.body) {
                    mSprite.body.setSize(60, 60);
                    mSprite.body.updateFromGameObject();
                }
            }`;
const replaceSpawn = `            if (textureKey) {
                let mSprite = window.miniTilesGroup.create(tile.x, tile.y, textureKey);
                mSprite.setDepth(9);
                mSprite.setScale(0.6); // Smaller version
                mSprite.isMiniTile = true;
                mSprite.miniTileType = tile.type;
                mSprite.playerNum = pNum;
                mSprite.setAngle(tile.rotation || 0);
                if (mSprite.body) {
                    mSprite.body.setSize(50, 50);
                    mSprite.body.updateFromGameObject();
                }
            }`;
content = content.replace(searchSpawn, replaceSpawn);
fs.writeFileSync('index.html', content);
console.log("Patched 8!");
