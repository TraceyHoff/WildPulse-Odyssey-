const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// Replace in window.spawnPlayerHomes (Player 1)
code = code.replace(
    /let hSprite = window\.homesGroup\.create\(hx, hy, 'home_tile'\);\n\s*hSprite\.setDepth\(9\);\n\s*hSprite\.isHomeTile = true;\n\s*hSprite\.playerNum = 1;\n\s*if \(hSprite\.body\) hSprite\.body\.updateFromGameObject\(\);/g,
    `let hSprite = window.homesGroup.create(hx, hy, 'home_tile');
        hSprite.setScale(3);
        hSprite.setDepth(9);
        hSprite.isHomeTile = true;
        hSprite.playerNum = 1;
        if (hSprite.body) hSprite.body.updateFromGameObject();`
);

// Replace in window.spawnPlayerHomes (Player 2)
code = code.replace(
    /let hSprite = window\.homesGroup\.create\(hx, hy, 'home_tile'\);\n\s*hSprite\.setDepth\(9\);\n\s*hSprite\.isHomeTile = true;\n\s*hSprite\.playerNum = 2;\n\s*if \(hSprite\.body\) hSprite\.body\.updateFromGameObject\(\);/g,
    `let hSprite = window.homesGroup.create(hx, hy, 'home_tile');
        hSprite.setScale(3);
        hSprite.setDepth(9);
        hSprite.isHomeTile = true;
        hSprite.playerNum = 2;
        if (hSprite.body) hSprite.body.updateFromGameObject();`
);

// Replace in window.spawnPlayerHomePreview
code = code.replace(
    /window\[previewSpriteId\] = scene\.add\.sprite\(window\[\`p\$\{playerNum\}HomePreviewX\`\], window\[\`p\$\{playerNum\}HomePreviewY\`\], 'home_tile'\);\n\s*window\[previewSpriteId\]\.setAlpha\(0\.6\);\n\s*window\[previewSpriteId\]\.setDepth\(100\);\n\s*window\[previewSpriteId\]\.setAngle\(0\);/g,
    `window[previewSpriteId] = scene.add.sprite(window[\`p\${playerNum}HomePreviewX\`], window[\`p\${playerNum}HomePreviewY\`], 'home_tile');
        window[previewSpriteId].setScale(3);
        window[previewSpriteId].setAlpha(0.6);
        window[previewSpriteId].setDepth(100);
        window[previewSpriteId].setAngle(0);`
);

code = code.replace(
    /window\[previewSpriteId\]\.setPosition\(window\[\`p\$\{playerNum\}HomePreviewX\`\], window\[\`p\$\{playerNum\}HomePreviewY\`\]\);\n\s*window\[previewSpriteId\]\.setVisible\(true\);\n\s*window\[previewSpriteId\]\.setAngle\(0\);/g,
    `window[previewSpriteId].setPosition(window[\`p\${playerNum}HomePreviewX\`], window[\`p\${playerNum}HomePreviewY\`]);
        window[previewSpriteId].setScale(3);
        window[previewSpriteId].setVisible(true);
        window[previewSpriteId].setAngle(0);`
);

fs.writeFileSync('index.html', code);
