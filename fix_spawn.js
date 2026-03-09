const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Fix spawn loop variables
html = html.replace(
    `    let x = forceX;
    let y = forceY;
    if (x === undefined || y === undefined) {
        let found = false;
        let attempts = 0;
        while (!found && attempts < 100) {
            x = Phaser.Math.Between(100, WORLD_SIZE - 100);
            y = Phaser.Math.Between(100, WORLD_SIZE - 100);
            let col = Math.floor(x / 100);
            let row = Math.floor(y / 100);
            if (mapData[row] && mapData[row][col] === 'grass') {
                found = true;
            }
            attempts++;
        }
    }`,
    `    let x = forceX;
    let y = forceY;
    if (x === undefined || y === undefined) {
        let found = false;
        let attempts = 0;
        while (!found && attempts < 100) {
            let tryX = Phaser.Math.Between(100, WORLD_SIZE - 100);
            let tryY = Phaser.Math.Between(100, WORLD_SIZE - 100);
            let col = Math.floor(tryX / 100);
            let row = Math.floor(tryY / 100);
            if (mapData[row] && mapData[row][col] === 'grass') {
                x = tryX;
                y = tryY;
                found = true;
            }
            attempts++;
        }
        if (!found) {
            x = 500;
            y = 500;
        }
    }`
);

fs.writeFileSync('index.html', html);
console.log("Fixed spawn loop");
