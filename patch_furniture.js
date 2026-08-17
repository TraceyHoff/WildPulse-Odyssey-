const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// Replace inside window.spawnMiniTiles
code = code.replace(
    /mSprite\.setScale\(0\.6\); \/\/ Smaller version/g,
    `mSprite.setScale(window.getRealisticScale(tile.type));`
);

// Replace inside window.cancelMiniTilePlacement and tryPlaceMiniTile preview
code = code.replace(
    /window\[previewSpriteId\]\.setScale\(0\.6\);/g,
    `window[previewSpriteId].setScale(window.getRealisticScale(itemName));`
);

fs.writeFileSync('index.html', code);
