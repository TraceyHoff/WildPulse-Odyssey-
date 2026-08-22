const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// 1. Change typeMapLocal to window.typeMapLocal
content = content.replace(
    'const typeMapLocal = {',
    'window.typeMapLocal = {'
);
// In the same block, change typeMapLocal[item] to window.typeMapLocal[item]
content = content.replace(
    'const tileKey = typeMapLocal[item];',
    'const tileKey = window.typeMapLocal[item];'
);


// 2. Add place_furniture to evaluateActiveQuests
const evalCondition = "} else if (q.type === 'creature_level') {";
const evalReplacement = `} else if (q.type === 'place_furniture') {
            const targetFurnitureTileType = window.typeMapLocal && window.typeMapLocal[q.target] ? window.typeMapLocal[q.target] : null;
            if (targetFurnitureTileType) {
                const miniTilesKey = \`wildpulse_p\${playerNum}_mini_tiles\`;
                const miniTiles = JSON.parse(localStorage.getItem(miniTilesKey)) || [];
                for (const tile of miniTiles) {
                    if (tile.type === targetFurnitureTileType) {
                        if (q.progress < q.targetCount) {
                            q.progress = q.targetCount;
                            changed = true;
                            window.showModernNotification(\`📈 Quest Update: \${q.title} (\${q.progress}/\${q.targetCount})\`, 4000, playerNum);
                        }
                        break;
                    }
                }
            }
        } else if (q.type === 'creature_level') {`;

content = content.replace(evalCondition, evalReplacement);

fs.writeFileSync('index.html', content);
console.log('Successfully patched evaluateActiveQuests and typeMapLocal');
