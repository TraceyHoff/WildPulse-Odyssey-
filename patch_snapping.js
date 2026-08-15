const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const anchor4 = `window.tryPlaceMiniTile = function(playerNum, x, y) {
    const itemName = window[\`p\${playerNum}MiniTilePlacementMode\`];
    const slotIndex = window[\`p\${playerNum}MiniTileSlotIndex\`];
    if (!itemName) return;

    let col = Math.floor(x / 100);
    let row = Math.floor(y / 100);
    let snappedX = col * 100 + 50;
    let snappedY = row * 100 + 50;`;

const newTryPlace = `window.tryPlaceMiniTile = function(playerNum, x, y) {
    const itemName = window[\`p\${playerNum}MiniTilePlacementMode\`];
    const slotIndex = window[\`p\${playerNum}MiniTileSlotIndex\`];
    if (!itemName) return;

    let snappedX = x;
    let snappedY = y;
    let col = Math.floor(x / 100);
    let row = Math.floor(y / 100);`;

content = content.replace(anchor4, newTryPlace);

const anchor5 = `window.isValidMiniTileLocation = function(row, col, playerNum) {
    if (!mapData || !mapData[row] || col < 0 || col >= mapData[0].length) return false;

    const tileType = mapData[row][col];
    const isInside = window.isPlayerInsideHome && window.isPlayerInsideHome(playerNum);

    if (isInside) {
        // Must be placed on home_floor tile
        if (tileType !== 'home_floor') return false;
        // Check player boundaries
        const minR = 580, maxR = 584;
        const minC = playerNum === 2 ? 590 : 580;
        const maxC = playerNum === 2 ? 594 : 584;
        if (row < minR || row > maxR || col < minC || col > maxC) return false;
    } else {
        // Check if tile is grass
        if (tileType !== 'grass') return false;

        // Check if there is a tree on this grass tile
        let hash = (row * 31 + col * 17) % 100;
        const isAboveHospital = (row === 99 && col === 100);
        if (hash < 12 && !isAboveHospital) return false;
    }

    // Check other homes/structures
    for (let pNum of [1, 2]) {
        // check home
        const hx = localStorage.getItem(\`wildpulse_p\${pNum}_home_x\`);
        const hy = localStorage.getItem(\`wildpulse_p\${pNum}_home_y\`);
        if (hx && hy) {
            let hRow = Math.floor(parseFloat(hy) / 100);
            let hCol = Math.floor(parseFloat(hx) / 100);
            if (hRow === row && hCol === col) return false;
        }
        // check existing mini tiles for this player
        const miniTilesKey = \`wildpulse_p\${pNum}_mini_tiles\`;
        const miniTiles = JSON.parse(localStorage.getItem(miniTilesKey)) || [];
        for (let tile of miniTiles) {
            let tRow = Math.floor(tile.y / 100);
            let tCol = Math.floor(tile.x / 100);
            if (tRow === row && tCol === col) return false;
        }
    }
    return true;
};`;

// We also need to update tryPlaceMiniTile to call it with x, y
const replaceValidCall = `    // 2. Validate location
    if (!window.isValidMiniTileLocation(x, y, playerNum)) {`;
const searchValidCall = `    // 2. Validate location
    if (!window.isValidMiniTileLocation(row, col, playerNum)) {`;
content = content.replace(searchValidCall, replaceValidCall);

const newIsValid = `window.isValidMiniTileLocation = function(x, y, playerNum) {
    let col = Math.floor(x / 100);
    let row = Math.floor(y / 100);
    if (!mapData || !mapData[row] || col < 0 || col >= mapData[0].length) return false;

    const tileType = mapData[row][col];
    const isInside = window.isPlayerInsideHome && window.isPlayerInsideHome(playerNum);

    const HALF_SIZE = 25;
    const tileRect = { left: x - HALF_SIZE, right: x + HALF_SIZE, top: y - HALF_SIZE, bottom: y + HALF_SIZE };

    if (isInside) {
        // Must be placed on home_floor tile bounds exactly
        const minR = 580, maxR = 584;
        const minC = playerNum === 2 ? 590 : 580;
        const maxC = playerNum === 2 ? 594 : 584;

        const homeMinX = minC * 100;
        const homeMaxX = (maxC + 1) * 100;
        const homeMinY = minR * 100;
        const homeMaxY = (maxR + 1) * 100;

        if (tileRect.left < homeMinX || tileRect.right > homeMaxX || tileRect.top < homeMinY || tileRect.bottom > homeMaxY) {
            return false;
        }
    } else {
        // Check if tile is grass
        if (tileType !== 'grass') return false;

        // Check if there is a tree on this grass tile
        let hash = (row * 31 + col * 17) % 100;
        const isAboveHospital = (row === 99 && col === 100);
        if (hash < 12 && !isAboveHospital) return false;
    }

    // Check other homes/structures and other mini tiles
    for (let pNum of [1, 2]) {
        // check home
        const hx = localStorage.getItem(\`wildpulse_p\${pNum}_home_x\`);
        const hy = localStorage.getItem(\`wildpulse_p\${pNum}_home_y\`);
        if (hx && hy) {
            let hRow = Math.floor(parseFloat(hy) / 100);
            let hCol = Math.floor(parseFloat(hx) / 100);
            if (hRow === row && hCol === col) return false;
        }
        // check existing mini tiles for overlaps
        const miniTilesKey = \`wildpulse_p\${pNum}_mini_tiles\`;
        const miniTiles = JSON.parse(localStorage.getItem(miniTilesKey)) || [];
        for (let tile of miniTiles) {
            const otherRect = { left: tile.x - HALF_SIZE, right: tile.x + HALF_SIZE, top: tile.y - HALF_SIZE, bottom: tile.y + HALF_SIZE };
            if (tileRect.left < otherRect.right && tileRect.right > otherRect.left &&
                tileRect.top < otherRect.bottom && tileRect.bottom > otherRect.top) {
                return false; // overlapping
            }
        }
    }
    return true;
};`;

content = content.replace(anchor5, newIsValid);
fs.writeFileSync('index.html', content);
console.log("Patched 7!");
