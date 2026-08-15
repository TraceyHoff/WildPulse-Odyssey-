const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

// The mouse moving preview code wasn't found using p1HomePlacementMode because there wasn't any. Wait, the mouse preview code for home placement is:
const idx = content.indexOf("if (window.p1HomePlacementMode) {");
// But the update loop for the active preview sprite might be elsewhere... wait, I checked earlier.

// Is there a PC event listener for preview sprite movement for mini tiles?
const regex = /MiniTilePreviewSprite/g;
const matches = [...content.matchAll(regex)];
for(const match of matches) {
   console.log(content.substring(match.index-100, match.index+100));
}
