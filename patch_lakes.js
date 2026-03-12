const fs = require('fs');

let code = fs.readFileSync('index.html', 'utf8');

let lakeGenStr = `    // Generate lakes (clusters of water) using overlapping circles
    const numLakes = Math.floor((cols * rows) * 0.01); // Adjust density for larger features
    for (let l = 0; l < numLakes; l++) {
        let cx = Math.floor(Math.random() * cols);
        let cy = Math.floor(Math.random() * rows);

        let numCircles = Math.floor(Math.random() * 2) + 1; // 3 to 7 circles`;

let newLakeGenStr = `    // Generate lakes (clusters of water) using overlapping circles
    const numLakes = Math.floor((cols * rows) * 0.01); // Adjust density for larger features
    for (let l = 0; l < numLakes; l++) {
        let cx = Math.floor(Math.random() * cols);
        let cy = Math.floor(Math.random() * rows);

        // Check if there is already water nearby to prevent long connected chains
        let tooClose = false;
        for (let r = Math.max(0, cy - 8); r <= Math.min(rows - 1, cy + 8); r++) {
            for (let c = Math.max(0, cx - 8); c <= Math.min(cols - 1, cx + 8); c++) {
                if (mapData[r][c] === 'obs') {
                    tooClose = true;
                    break;
                }
            }
            if (tooClose) break;
        }
        if (tooClose) continue; // Skip generating this lake to prevent chains

        let numCircles = Math.floor(Math.random() * 2) + 1; // 3 to 7 circles`;

code = code.replace(lakeGenStr, newLakeGenStr);
fs.writeFileSync('index.html', code);
console.log("Patched lakes successfully");
