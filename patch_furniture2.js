const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// There is one more place in preview setup that we might need to change:
// `window[previewSpriteId].setScale(window.getRealisticScale(itemName));`
// Wait, the else branch in preview doesn't set scale currently!
// Let's add it to the else branch just in case.

code = code.replace(
    /window\[previewSpriteId\]\.setTexture\(textureKey\);\n\s*window\[previewSpriteId\]\.setPosition\(window\[\`p\$\{playerNum\}MiniTilePreviewX\`\], window\[\`p\$\{playerNum\}MiniTilePreviewY\`\]\);\n\s*window\[previewSpriteId\]\.setVisible\(true\);\n\s*window\[previewSpriteId\]\.setAngle\(0\);/g,
    `window[previewSpriteId].setTexture(textureKey);
        window[previewSpriteId].setScale(window.getRealisticScale(itemName));
        window[previewSpriteId].setPosition(window[\`p\${playerNum}MiniTilePreviewX\`], window[\`p\${playerNum}MiniTilePreviewY\`]);
        window[previewSpriteId].setVisible(true);
        window[previewSpriteId].setAngle(0);`
);

fs.writeFileSync('index.html', code);
