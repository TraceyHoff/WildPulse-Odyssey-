const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const regexMap = /\/\/ Generate lakes \(clusters of water\)[\s\S]*?\/\/ Tiles are no longer instantiated upfront/m;

const newMapLogic = `// Generate lakes (clusters of water) using overlapping circles
    const numLakes = Math.floor((cols * rows) * 0.005); // Adjust density for larger features
    for (let l = 0; l < numLakes; l++) {
        let cx = Math.floor(Math.random() * cols);
        let cy = Math.floor(Math.random() * rows);

        let numCircles = Math.floor(Math.random() * 5) + 3; // 3 to 7 circles

        for (let i = 0; i < numCircles; i++) {
            // Offset from center to make overlapping
            let ox = cx + Math.floor(Math.random() * 9) - 4; // -4 to +4
            let oy = cy + Math.floor(Math.random() * 9) - 4; // -4 to +4
            let radius = Math.floor(Math.random() * 3) + 2; // 2 to 4 radius

            // Draw circle
            for (let y = -radius; y <= radius; y++) {
                for (let x = -radius; x <= radius; x++) {
                    if (x*x + y*y <= radius*radius) {
                        let nx = ox + x;
                        let ny = oy + y;
                        if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
                            mapData[ny][nx] = 'obs';
                        }
                    }
                }
            }
        }
    }

    // Tiles are no longer instantiated upfront`;

content = content.replace(regexMap, newMapLogic);
fs.writeFileSync('index.html', content);
console.log("Map logic patched");
