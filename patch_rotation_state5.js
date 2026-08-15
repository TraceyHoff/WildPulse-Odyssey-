const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const regexSprite = /if \(\!window\[previewSpriteId\]\) \{\n        window\[previewSpriteId\] = scene\.add\.sprite\(window\[\`p\$\{playerNum\}MiniTilePreviewX\`\], window\[\`p\$\{playerNum\}MiniTilePreviewY\`\], textureKey\);\n        window\[previewSpriteId\]\.setAlpha\(0\.6\);\n        window\[previewSpriteId\]\.setScale\(0\.6\);\n        window\[previewSpriteId\]\.setDepth\(100\);\n    \} else \{\n        window\[previewSpriteId\]\.setTexture\(textureKey\);\n        window\[previewSpriteId\]\.setPosition\(window\[\`p\$\{playerNum\}MiniTilePreviewX\`\], window\[\`p\$\{playerNum\}MiniTilePreviewY\`\]\);\n        window\[previewSpriteId\]\.setVisible\(true\);\n    \}/;

let replacement = `if (!window[previewSpriteId]) {
        window[previewSpriteId] = scene.add.sprite(window[\`p\${playerNum}MiniTilePreviewX\`], window[\`p\${playerNum}MiniTilePreviewY\`], textureKey);
        window[previewSpriteId].setAlpha(0.6);
        window[previewSpriteId].setScale(0.6);
        window[previewSpriteId].setDepth(100);
        window[previewSpriteId].setAngle(0);
    } else {
        window[previewSpriteId].setTexture(textureKey);
        window[previewSpriteId].setPosition(window[\`p\${playerNum}MiniTilePreviewX\`], window[\`p\${playerNum}MiniTilePreviewY\`]);
        window[previewSpriteId].setVisible(true);
        window[previewSpriteId].setAngle(0);
    }`;

content = content.replace(regexSprite, replacement);
fs.writeFileSync('index.html', content);
console.log("Patched 3!");
