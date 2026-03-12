const fs = require('fs');

let code = fs.readFileSync('index.html', 'utf8');

// 1. Generate Lilly Pad Texture
const lillyPadGen = `
    // Generate Lilly Pad Texture
    const padCanvas = document.createElement('canvas');
    padCanvas.width = 40;
    padCanvas.height = 40;
    const padCtx = padCanvas.getContext('2d');

    padCtx.fillStyle = '#2d8a2d';
    padCtx.beginPath();
    padCtx.arc(20, 20, 15, 0, Math.PI * 1.8);
    padCtx.lineTo(20, 20);
    padCtx.fill();

    padCtx.strokeStyle = '#1e5e1e';
    padCtx.lineWidth = 1;
    padCtx.beginPath();
    padCtx.arc(20, 20, 13, 0, Math.PI * 1.8);
    padCtx.stroke();

    padCtx.strokeStyle = '#3a9b3a';
    padCtx.lineWidth = 1;
    for(let i=0; i<5; i++){
        padCtx.beginPath();
        padCtx.moveTo(20, 20);
        padCtx.lineTo(20 + Math.cos(i) * 12, 20 + Math.sin(i) * 12);
        padCtx.stroke();
    }

    this.textures.addCanvas('lilly_pad_tex', padCanvas);
`;

const texAddPattern = "    this.textures.addCanvas('trade_tile', tradeCanvas);\n}";
code = code.replace(texAddPattern, `    this.textures.addCanvas('trade_tile', tradeCanvas);\n${lillyPadGen}\n}`);


// 2. Spawn Lilly Pads
const spawnLillyPadsCode = `
        // Convex corners
        if (c > 0 && mapData[r][c-1] === 'grass' && r > 0 && mapData[r-1][c] === 'grass') {`;

const newSpawnLillyPadsCode = `
        // Add lilly pads occasionally on shallow or mid water
        if (depth <= 2 && Math.random() < 0.1) {
            let numPads = Math.floor(Math.random() * 3) + 1;
            for(let p=0; p<numPads; p++) {
                let pad = scene.add.sprite(posX + (Math.random()*60-30), posY + (Math.random()*60-30), 'lilly_pad_tex');
                pad.setRotation(Math.random() * Math.PI * 2);
                pad.setScale(0.5 + Math.random() * 0.7);
                pad.setDepth(0);
                sprites.push(pad);
            }
        }

        // Convex corners
        if (c > 0 && mapData[r][c-1] === 'grass' && r > 0 && mapData[r-1][c] === 'grass') {`;

code = code.replace(spawnLillyPadsCode, newSpawnLillyPadsCode);

fs.writeFileSync('index.html', code);
console.log("Patched lilly pads");
