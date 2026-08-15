const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const regexSprite = /if \(!window\[previewSpriteId\]\) \{([\s\S]*?)\.setVisible\(true\);\n    \}/;
// Wait, the regex is for home preview or mini tile preview?
// The previous run replaced something, let's check what it replaced.

const idx = content.indexOf('window[`p${playerNum}MiniTilePreviewY`], textureKey);');
if (idx !== -1) {
    console.log(content.substring(idx - 500, idx + 500));
}
