const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

let searchStart = `window.startMiniTilePlacement = function(playerNum, itemName, slotIndex) {
    // Check if player has placed a Home first
    const hx = localStorage.getItem(\`wildpulse_p\${playerNum}_home_x\`);
    const hy = localStorage.getItem(\`wildpulse_p\${playerNum}_home_y\`);
    if (!hx || !hy) {
        window.showModernNotification("❌ You must place a Home first before placing mini tiles close to it!", 4000, playerNum);
        return;
    }

    window[\`p\${playerNum}MiniTilePlacementMode\`] = itemName;
    window[\`p\${playerNum}MiniTileSlotIndex\`] = slotIndex;`;

let replaceStart = `window.startMiniTilePlacement = function(playerNum, itemName, slotIndex) {
    // Check if player has placed a Home first
    const hx = localStorage.getItem(\`wildpulse_p\${playerNum}_home_x\`);
    const hy = localStorage.getItem(\`wildpulse_p\${playerNum}_home_y\`);
    if (!hx || !hy) {
        window.showModernNotification("❌ You must place a Home first before placing mini tiles close to it!", 4000, playerNum);
        return;
    }

    window[\`p\${playerNum}MiniTilePlacementMode\`] = itemName;
    window[\`p\${playerNum}MiniTileSlotIndex\`] = slotIndex;
    window[\`p\${playerNum}MiniTileRotation\`] = 0;`;

content = content.replace(searchStart, replaceStart);

let searchSprite = `    if (!window[previewSpriteId]) {
        window[previewSpriteId] = scene.add.sprite(window[\`p\${playerNum}MiniTilePreviewX\`], window[\`p\${playerNum}MiniTilePreviewY\`], textureKey);
        window[previewSpriteId].setAlpha(0.6);
        window[previewSpriteId].setScale(0.6);
        window[previewSpriteId].setDepth(100);
    } else {
        window[previewSpriteId].setTexture(textureKey);
        window[previewSpriteId].setPosition(window[\`p\${playerNum}MiniTilePreviewX\`], window[\`p\${playerNum}MiniTilePreviewY\`], textureKey);
        window[previewSpriteId].setVisible(true);
    }`;

// Wait, the string in the code is slightly different for the else block. Let's find it.
