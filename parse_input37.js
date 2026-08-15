const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

console.log("Found pointerdown logic");
const searchPointerDown = `if (window.p1HomePlacementMode) {
            let p1WorldX = this.cameras.main.scrollX + pointer.x;
            let p1WorldY = this.cameras.main.scrollY + pointer.y;
            window.tryPlaceHome(1, p1WorldX, p1WorldY);
        }`;
const searchPointerDownIndex = content.indexOf(searchPointerDown);
console.log(searchPointerDownIndex !== -1);
