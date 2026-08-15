const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const str2 = `            if (window.p1HomePreviewSprite) {
                window.p1HomePreviewSprite.setPosition(window.p1HomePreviewX, window.p1HomePreviewY);
            }`;
console.log(content.indexOf(str2) !== -1);
