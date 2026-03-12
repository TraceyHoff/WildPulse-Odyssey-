const fs = require('fs');

let code = fs.readFileSync('index.html', 'utf8');

// 1. Water tile depth color transition
// Replace depthTypes colors
code = code.replace(
    /const depthTypes = \[\s*\{ prefix: 'obs_shallow_tex_', colors: \['#4682B4', '#1E90FF'\] \},\s*\{ prefix: 'obs_mid_tex_', colors: \['#0a3a6a', '#05254a'\] \},\s*\{ prefix: 'obs_deep_tex_', colors: \['#000033', '#00001a'\] \}\s*\];/,
    `const depthTypes = [
        { prefix: 'obs_shallow_tex_', colors: ['#1E90FF', '#1c86ee'] },
        { prefix: 'obs_mid_tex_', colors: ['#1E90FF', '#1c86ee'] },
        { prefix: 'obs_deep_tex_', colors: ['#1E90FF', '#1c86ee'] }
    ];`
);

// 2. Add 4-corner smooth tinting in spawnTile
let spawnTileStr = `let depth = window.waterDist && window.waterDist[r] && window.waterDist[r][c] ? window.waterDist[r][c] : 1;
        let prefix = 'obs_shallow_tex_';
        if (depth === 2) prefix = 'obs_mid_tex_';
        if (depth >= 3) prefix = 'obs_deep_tex_';

        let obs = obstaclesGroup.create(posX, posY, prefix + '0');`;

let newSpawnTileStr = `let depth = window.waterDist && window.waterDist[r] && window.waterDist[r][c] ? window.waterDist[r][c] : 1;
        let prefix = 'obs_shallow_tex_';
        if (depth === 2) prefix = 'obs_mid_tex_';
        if (depth >= 3) prefix = 'obs_deep_tex_';

        let obs = obstaclesGroup.create(posX, posY, prefix + '0');

        // Apply smooth 4-corner tinting for seamless depth color transition
        function getWaterDepth(wr, wc) {
            if (wr < 0 || wr >= mapData.length || wc < 0 || wc >= mapData[0].length || mapData[wr][wc] !== 'obs') return 0;
            return window.waterDist && window.waterDist[wr] && window.waterDist[wr][wc] ? window.waterDist[wr][wc] : 0;
        }

        let dTL = (getWaterDepth(r, c) + getWaterDepth(r-1, c) + getWaterDepth(r, c-1) + getWaterDepth(r-1, c-1)) / 4;
        let dTR = (getWaterDepth(r, c) + getWaterDepth(r-1, c) + getWaterDepth(r, c+1) + getWaterDepth(r-1, c+1)) / 4;
        let dBL = (getWaterDepth(r, c) + getWaterDepth(r+1, c) + getWaterDepth(r, c-1) + getWaterDepth(r+1, c-1)) / 4;
        let dBR = (getWaterDepth(r, c) + getWaterDepth(r+1, c) + getWaterDepth(r, c+1) + getWaterDepth(r+1, c+1)) / 4;

        function depthToColor(d) {
            let factor = Math.min(1, Math.max(0, d / 4)); // 0 for shallow, 1 for deep
            let r_col = Math.floor(255 - factor * 180);
            let g_col = Math.floor(255 - factor * 140);
            let b_col = Math.floor(255 - factor * 50);
            return (r_col << 16) | (g_col << 8) | b_col;
        }

        obs.setTint(depthToColor(dTL), depthToColor(dTR), depthToColor(dBL), depthToColor(dBR));`;

code = code.replace(spawnTileStr, newSpawnTileStr);

fs.writeFileSync('index.html', code);
console.log("Patched water successfully");
