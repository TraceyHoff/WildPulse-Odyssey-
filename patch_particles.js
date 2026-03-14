const fs = require('fs');

let code = fs.readFileSync('index.html', 'utf8');

// 1. Add leaf_particle_mixed texture
const mixedTextureCode = `
    const leafMixedCanvas = document.createElement('canvas');
    leafMixedCanvas.width = 16;
    leafMixedCanvas.height = 16;
    const leafMixedCtx = leafMixedCanvas.getContext('2d');

    // Draw mixed leaf body
    let leafMixedGrad = leafMixedCtx.createLinearGradient(2, 14, 14, 2);
    leafMixedGrad.addColorStop(0, '#FF0000'); // Red base
    leafMixedGrad.addColorStop(1, '#FFFF00'); // Yellow tip
    leafMixedCtx.fillStyle = leafMixedGrad;
    leafMixedCtx.beginPath();
    leafMixedCtx.moveTo(2, 14); // Stem base
    leafMixedCtx.bezierCurveTo(4, 10, 0, 4, 14, 2); // Left edge to tip
    leafMixedCtx.bezierCurveTo(10, 6, 12, 12, 2, 14); // Right edge back to base
    leafMixedCtx.fill();

    // Draw stem/vein
    leafMixedCtx.strokeStyle = '#B8860B'; // Dark goldenrod stem
    leafMixedCtx.lineWidth = 1;
    leafMixedCtx.beginPath();
    leafMixedCtx.moveTo(2, 14);
    leafMixedCtx.lineTo(10, 6);
    leafMixedCtx.stroke();

    this.textures.addCanvas('leaf_particle_mixed', leafMixedCanvas);
`;
code = code.replace(/const pollenCanvas = document\.createElement\('canvas'\);/g, `${mixedTextureCode}\n    const pollenCanvas = document.createElement('canvas');`);


// 2. Add leafMixedEmitter and fix emitZone and setScrollFactor for ALL emitters
code = code.replace(/emitZone: \{ type: 'random', source: new Phaser\.Geom\.Rectangle\(-400, -400, window\.innerWidth \+ 800, window\.innerHeight \+ 800\) \}/g, `emitZone: { type: 'random', source: new Phaser.Geom.Rectangle(0, 0, window.innerWidth, window.innerHeight) }`);

code = code.replace(/leafRedParticles\.setDepth\(3000\);/g, `leafRedParticles.setDepth(3000);\n    leafRedParticles.setScrollFactor(0);`);
code = code.replace(/leafYellowParticles\.setDepth\(3000\);/g, `leafYellowParticles.setDepth(3000);\n    leafYellowParticles.setScrollFactor(0);`);
code = code.replace(/pollenParticles\.setDepth\(3000\);/g, `pollenParticles.setDepth(3000);\n    pollenParticles.setScrollFactor(0);`);

const mixedEmitterCode = `
    let leafMixedParticles = this.add.particles('leaf_particle_mixed');
    leafMixedParticles.setDepth(3000);
    leafMixedParticles.setScrollFactor(0);
    window.leafMixedEmitter = leafMixedParticles.createEmitter({
        speed: { min: 50, max: 150 },
        lifespan: 8000,
        quantity: 3,
        frequency: 100,
        scale: { start: 1, end: 0 },
        rotate: { start: 0, end: 360 },
        emitZone: { type: 'random', source: new Phaser.Geom.Rectangle(0, 0, window.innerWidth, window.innerHeight) }
    });
`;

code = code.replace(/let pollenParticles = this\.add\.particles\('pollen_particle'\);/g, `${mixedEmitterCode}\n    let pollenParticles = this.add.particles('pollen_particle');`);


// Update quantity and frequency for denser spawn
code = code.replace(/quantity: 1,\n        frequency: 200,/g, 'quantity: 3,\n        frequency: 100,');
code = code.replace(/quantity: 3,\n        frequency: 150,/g, 'quantity: 6,\n        frequency: 80,');


// Update emitter speeds
code = code.replace(/if \(window\.leafRedEmitter && window\.leafYellowEmitter && window\.pollenEmitter\) \{/g, `if (window.leafRedEmitter && window.leafYellowEmitter && window.leafMixedEmitter && window.pollenEmitter) {`);
code = code.replace(/window\.leafYellowEmitter\.setSpeedY\(\{ min: windVy \* 0\.8, max: windVy \* 1\.2 \}\);/g, `window.leafYellowEmitter.setSpeedY({ min: windVy * 0.8, max: windVy * 1.2 });
        window.leafMixedEmitter.setSpeedX({ min: windVx * 0.8, max: windVx * 1.2 });
        window.leafMixedEmitter.setSpeedY({ min: windVy * 0.8, max: windVy * 1.2 });`);


fs.writeFileSync('index.html', code, 'utf8');
