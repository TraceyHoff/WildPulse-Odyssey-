const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const anchor2 = `        if (window.p1HomePlacementMode) {
            let p1WorldX = this.cameras.main.scrollX + pointer.x;
            let p1WorldY = this.cameras.main.scrollY + pointer.y;
            window.tryPlaceHome(1, p1WorldX, p1WorldY);
        }`;

const insertClick = `
        if (window.p1MiniTilePlacementMode) {
            let p1WorldX = this.cameras.main.scrollX + pointer.x;
            let p1WorldY = this.cameras.main.scrollY + pointer.y;
            // Left click to place
            if (pointer.button === 0) {
                window.tryPlaceMiniTile(1, p1WorldX, p1WorldY);
            } else if (pointer.button === 2) {
                // Right click to cancel
                window.cancelMiniTilePlacement(1);
            }
            return;
        }

        if (window.p2MiniTilePlacementMode) {
            const cam = (window.coopActive && window.camera2) ? window.camera2 : this.cameras.main;
            const wp = cam.getWorldPoint(pointer.x, pointer.y);
            // Left click to place
            if (pointer.button === 0) {
                window.tryPlaceMiniTile(2, wp.x, wp.y);
            } else if (pointer.button === 2) {
                // Right click to cancel
                window.cancelMiniTilePlacement(2);
            }
            return;
        }`;

const split2 = content.split(anchor2);
if (split2.length === 2) {
    content = split2[0] + anchor2 + insertClick + split2[1];
    fs.writeFileSync('index.html', content);
    console.log("Patched 5!");
} else {
    console.log("Could not find anchor2");
}
