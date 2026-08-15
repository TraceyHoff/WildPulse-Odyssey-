const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

// There is no pointer/keyboard handling for MiniTilePlacementMode at all, only Gamepad! Let's check how the mouse places it.
// "🛠️ Mini Tile Placement: Move preview, press A (or click) to place close to your Home. Press B (or ESC) to cancel."
const idx = content.indexOf("window.tryPlaceMiniTile(");
if (idx !== -1) {
    const afterBlock = content.substring(idx - 1000, idx + 1000);
    console.log(afterBlock);
}
