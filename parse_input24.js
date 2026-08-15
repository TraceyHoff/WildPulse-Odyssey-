const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

// Are there any pointer events or keyboard events for mini tile placement?
// We need to support PC users doing this. If it's missing, let's just add it.
// Wait, is there a `p1MiniTilePreviewX` update inside the update() loop using mouse coordinates?
const idx = content.indexOf("function update(time, delta) {");
if (idx !== -1) {
    const afterBlock = content.substring(idx, idx + 5000);
    // Find p1MiniTilePreviewX in there
    console.log(afterBlock.includes("p1MiniTilePreviewX"));
}
