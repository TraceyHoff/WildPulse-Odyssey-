const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const s = `            if (Phaser.Input.Keyboard.JustDown(escKey) || Phaser.Input.Keyboard.JustDown(cKey)) {
                window.cancelHomePlacement(1);
            }
        }`;
const start = content.indexOf(s);
console.log(content.substring(start, start + 300));
