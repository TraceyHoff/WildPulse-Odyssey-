const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

content = content.replace(
    /dustGrad\.addColorStop\(0, 'rgba\(180, 160, 140, 0\.4\)'\);/g,
    `dustGrad.addColorStop(0, 'rgba(180, 160, 140, 1.0)');`
);
content = content.replace(
    /dustGrad\.addColorStop\(1, 'rgba\(180, 160, 140, 0\)'\);/g,
    `dustGrad.addColorStop(1, 'rgba(180, 160, 140, 0)');`
);

content = content.replace(
    /footprintGrad\.addColorStop\(0, 'rgba\(0, 0, 0, 0\.25\)'\);/g,
    `footprintGrad.addColorStop(0, 'rgba(0, 0, 0, 0.7)');`
);
content = content.replace(
    /footprintGrad\.addColorStop\(0\.6, 'rgba\(0, 0, 0, 0\.15\)'\);/g,
    `footprintGrad.addColorStop(0.6, 'rgba(0, 0, 0, 0.4)');`
);

content = content.replace(
    /const butterflyCanvas = document.createElement\('canvas'\);\s*butterflyCanvas\.width = 48; \/\/ 4 frames x 12px\s*butterflyCanvas\.height = 12;\s*const butterflyCtx = butterflyCanvas\.getContext\('2d'\);\s*const butterflyColors = \[\s*\{ left: 'rgba\(255, 150, 200, 0.8\)', right: 'rgba\(150, 200, 255, 0.8\)' \}, \/\/ Pink \/ Blue\s*\{ left: 'rgba\(255, 150, 50, 0.8\)', right: 'rgba\(50, 50, 50, 0.8\)' \},   \/\/ Orange \/ Black\s*\{ left: 'rgba\(200, 255, 255, 0.8\)', right: 'rgba\(255, 255, 255, 0.8\)' \},\/\/ Cyan \/ White\s*\{ left: 'rgba\(255, 255, 100, 0.8\)', right: 'rgba\(150, 255, 100, 0.8\)' \}\/\/ Yellow \/ Green\s*\];\s*for \(let i = 0; i < 4; i\+\+\) \{\s*let offsetX = i \* 12;\s*butterflyCtx\.fillStyle = butterflyColors\[i\]\.left;\s*butterflyCtx\.beginPath\(\);\s*butterflyCtx\.moveTo\(offsetX \+ 6, 6\);\s*butterflyCtx\.lineTo\(offsetX \+ 0, 0\);\s*butterflyCtx\.lineTo\(offsetX \+ 0, 12\);\s*butterflyCtx\.fill\(\);\s*butterflyCtx\.fillStyle = butterflyColors\[i\]\.right;\s*butterflyCtx\.beginPath\(\);\s*butterflyCtx\.moveTo\(offsetX \+ 6, 6\);\s*butterflyCtx\.lineTo\(offsetX \+ 12, 0\);\s*butterflyCtx\.lineTo\(offsetX \+ 12, 12\);\s*butterflyCtx\.fill\(\);\s*\}\s*scene\.textures\.addSpriteSheet\('butterfly_particles', butterflyCanvas, \{ frameWidth: 12, frameHeight: 12 \}\);/g,
    `const butterflyCanvas = document.createElement('canvas');
    butterflyCanvas.width = 64; // 4 frames x 16px
    butterflyCanvas.height = 16;
    const butterflyCtx = butterflyCanvas.getContext('2d');
    const butterflyColors = [
        { left: 'rgba(255, 150, 200, 0.8)', right: 'rgba(150, 200, 255, 0.8)' }, // Pink / Blue
        { left: 'rgba(255, 150, 50, 0.8)', right: 'rgba(50, 50, 50, 0.8)' },   // Orange / Black
        { left: 'rgba(200, 255, 255, 0.8)', right: 'rgba(255, 255, 255, 0.8)' },// Cyan / White
        { left: 'rgba(255, 255, 100, 0.8)', right: 'rgba(150, 255, 100, 0.8)' }// Yellow / Green
    ];
    for (let i = 0; i < 4; i++) {
        let offsetX = i * 16;
        let cX = offsetX + 8;
        let cY = 8;

        butterflyCtx.fillStyle = butterflyColors[i].left;
        butterflyCtx.beginPath();
        if (i === 0) {
            // Swallowtail style
            butterflyCtx.moveTo(cX, cY);
            butterflyCtx.quadraticCurveTo(offsetX + 2, cY - 8, offsetX + 0, cY - 6);
            butterflyCtx.lineTo(offsetX + 3, cY);
            butterflyCtx.lineTo(offsetX + 1, cY + 6);
            butterflyCtx.quadraticCurveTo(offsetX + 4, cY + 7, cX, cY);
        } else if (i === 1) {
            // Monarch style
            butterflyCtx.moveTo(cX, cY);
            butterflyCtx.bezierCurveTo(offsetX + 4, cY - 8, offsetX + 0, cY - 4, offsetX + 2, cY);
            butterflyCtx.bezierCurveTo(offsetX + 0, cY + 4, offsetX + 4, cY + 7, cX, cY);
        } else if (i === 2) {
            // Rounder style
            butterflyCtx.moveTo(cX, cY);
            butterflyCtx.arc(offsetX + 5, cY - 3, 4, Math.PI/4, Math.PI*1.5, true);
            butterflyCtx.arc(offsetX + 5, cY + 3, 3, Math.PI*0.5, Math.PI*1.5, true);
            butterflyCtx.lineTo(cX, cY);
        } else {
            // Angled style
            butterflyCtx.moveTo(cX, cY);
            butterflyCtx.lineTo(offsetX + 2, cY - 7);
            butterflyCtx.lineTo(offsetX + 0, cY - 2);
            butterflyCtx.lineTo(offsetX + 4, cY);
            butterflyCtx.lineTo(offsetX + 1, cY + 5);
            butterflyCtx.lineTo(cX, cY);
        }
        butterflyCtx.fill();

        butterflyCtx.fillStyle = butterflyColors[i].right;
        butterflyCtx.beginPath();
        if (i === 0) {
            butterflyCtx.moveTo(cX, cY);
            butterflyCtx.quadraticCurveTo(offsetX + 14, cY - 8, offsetX + 16, cY - 6);
            butterflyCtx.lineTo(offsetX + 13, cY);
            butterflyCtx.lineTo(offsetX + 15, cY + 6);
            butterflyCtx.quadraticCurveTo(offsetX + 12, cY + 7, cX, cY);
        } else if (i === 1) {
            butterflyCtx.moveTo(cX, cY);
            butterflyCtx.bezierCurveTo(offsetX + 12, cY - 8, offsetX + 16, cY - 4, offsetX + 14, cY);
            butterflyCtx.bezierCurveTo(offsetX + 16, cY + 4, offsetX + 12, cY + 7, cX, cY);
        } else if (i === 2) {
            butterflyCtx.moveTo(cX, cY);
            butterflyCtx.arc(offsetX + 11, cY - 3, 4, Math.PI*1.5, Math.PI*2.75, false);
            butterflyCtx.arc(offsetX + 11, cY + 3, 3, Math.PI*1.5, Math.PI*0.5, false);
            butterflyCtx.lineTo(cX, cY);
        } else {
            butterflyCtx.moveTo(cX, cY);
            butterflyCtx.lineTo(offsetX + 14, cY - 7);
            butterflyCtx.lineTo(offsetX + 16, cY - 2);
            butterflyCtx.lineTo(offsetX + 12, cY);
            butterflyCtx.lineTo(offsetX + 15, cY + 5);
            butterflyCtx.lineTo(cX, cY);
        }
        butterflyCtx.fill();

        // Body (small dark line in center)
        butterflyCtx.fillStyle = 'rgba(30, 30, 30, 0.9)';
        butterflyCtx.beginPath();
        butterflyCtx.ellipse(cX, cY, 1.5, 4, 0, 0, Math.PI*2);
        butterflyCtx.fill();
    }
    scene.textures.addSpriteSheet('butterfly_particles', butterflyCanvas, { frameWidth: 16, frameHeight: 16 });`
);

content = content.replace(
    /let sprite = this\.scene\.add\.sprite\(x, y, 'butterfly_particles', Math\.floor\(Math\.random\(\) \* 4\)\);\s*sprite\.setDepth\(3000\);/g,
    `let sprite = this.scene.add.sprite(x, y, 'butterfly_particles', Math.floor(Math.random() * 4));
            sprite.setDepth(3000);
            sprite.setScale(Math.random() * 0.4 + 1.2);`
);

fs.writeFileSync('index.html', content);
