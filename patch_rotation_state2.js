const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const regexSprite = /if \(!window\[previewSpriteId\]\) \{([\s\S]*?)\.setVisible\(true\);\n    \}/;
const match = content.match(regexSprite);
if (match) {
    let original = match[0];
    let replacement = original.replace('window[previewSpriteId].setDepth(100);', 'window[previewSpriteId].setDepth(100);\n        window[previewSpriteId].setAngle(0);');
    replacement = replacement.replace('window[previewSpriteId].setVisible(true);', 'window[previewSpriteId].setVisible(true);\n        window[previewSpriteId].setAngle(0);');
    content = content.replace(original, replacement);
}

let notifSearch = 'window.showModernNotification(`🛠️ Mini Tile Placement: Move preview, press A (or click) to place close to your Home. Press B (or ESC) to cancel.`, 6000, playerNum);';
let notifReplace = 'window.showModernNotification(`🛠️ Mini Tile Placement: Move preview, press A (or click) to place close to your Home. Press X (or R key) to rotate. Press B (or ESC) to cancel.`, 6000, playerNum);';
content = content.replace(notifSearch, notifReplace);

fs.writeFileSync('index.html', content);
console.log("Patched!");
