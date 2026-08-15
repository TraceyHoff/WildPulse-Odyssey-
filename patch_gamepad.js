const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const anchor3 = `        if (justA) {
            window.tryPlaceMiniTile(playerNum, window[\`p\${playerNum}MiniTilePreviewX\`], window[\`p\${playerNum}MiniTilePreviewY\`]);
        }

        if (justB) {
            window.cancelMiniTilePlacement(playerNum);
        }`;

const insertGamepad = `        if (justX) {
            window[\`p\${playerNum}MiniTileRotation\`] = (window[\`p\${playerNum}MiniTileRotation\`] + 90) % 360;
            if (window[previewSpriteId]) {
                window[previewSpriteId].setAngle(window[\`p\${playerNum}MiniTileRotation\`]);
            }
        }`;

const split3 = content.split(anchor3);
if (split3.length === 2) {
    content = split3[0] + anchor3 + "\n" + insertGamepad + split3[1];
    fs.writeFileSync('index.html', content);
    console.log("Patched 6!");
} else {
    console.log("Could not find anchor3");
}
