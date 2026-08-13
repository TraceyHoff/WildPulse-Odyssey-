const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Firefly Texture Generation
const oldFireflyGen = `    const fireflyCanvas = document.createElement('canvas');
    fireflyCanvas.width = 8;
    fireflyCanvas.height = 8;
    const fireflyCtx = fireflyCanvas.getContext('2d');
    let fireflyGrad = fireflyCtx.createRadialGradient(4, 4, 0, 4, 4, 4);
    fireflyGrad.addColorStop(0, 'rgba(200, 255, 100, 1)');
    fireflyGrad.addColorStop(0.3, 'rgba(150, 255, 50, 0.8)');
    fireflyGrad.addColorStop(1, 'rgba(50, 150, 0, 0)');
    fireflyCtx.fillStyle = fireflyGrad;
    fireflyCtx.fillRect(0, 0, 8, 8);
    scene.textures.addCanvas('firefly_particle', fireflyCanvas);`;

const newFireflyGen = `    const fireflyCanvas = document.createElement('canvas');
    fireflyCanvas.width = 32; // 4 frames x 8px
    fireflyCanvas.height = 8;
    const fireflyCtx = fireflyCanvas.getContext('2d');
    const fireflyColors = [
        { c1: 'rgba(200, 255, 100, 1)', c2: 'rgba(150, 255, 50, 0.8)', c3: 'rgba(50, 150, 0, 0)' }, // Green/Yellow
        { c1: 'rgba(100, 255, 255, 1)', c2: 'rgba(50, 200, 255, 0.8)', c3: 'rgba(0, 50, 150, 0)' }, // Cyan/Blue
        { c1: 'rgba(255, 200, 100, 1)', c2: 'rgba(255, 150, 50, 0.8)', c3: 'rgba(150, 50, 0, 0)' }, // Orange/Red
        { c1: 'rgba(255, 150, 255, 1)', c2: 'rgba(200, 50, 200, 0.8)', c3: 'rgba(150, 0, 100, 0)' }  // Pink/Purple
    ];
    for (let i = 0; i < 4; i++) {
        let fireflyGrad = fireflyCtx.createRadialGradient(4 + i*8, 4, 0, 4 + i*8, 4, 4);
        fireflyGrad.addColorStop(0, fireflyColors[i].c1);
        fireflyGrad.addColorStop(0.3, fireflyColors[i].c2);
        fireflyGrad.addColorStop(1, fireflyColors[i].c3);
        fireflyCtx.fillStyle = fireflyGrad;
        fireflyCtx.fillRect(i*8, 0, 8, 8);
    }
    scene.textures.addSpriteSheet('firefly_particles', fireflyCanvas, { frameWidth: 8, frameHeight: 8 });`;

html = html.split(oldFireflyGen).join(newFireflyGen);

// 2. Firefly Emitter Update
const oldFireflyEmitter = `    let fireflyParticles = this.add.particles('firefly_particle');
    fireflyParticles.setDepth(3000);
    window.fireflyEmitter = fireflyParticles.createEmitter({
        speedX: { min: -10, max: 10 },
        speedY: { min: -10, max: 10 },
        lifespan: 3000,
        quantity: 0,
        frequency: 200,
        scale: { start: 0, end: 1, yoyo: true },
        alpha: { start: 0, end: 1, yoyo: true },
        emitZone: window.sharedEmitZone
    });`;

const newFireflyEmitter = `    let fireflyParticles = this.add.particles('firefly_particles');
    fireflyParticles.setDepth(3000);
    window.fireflyEmitter = fireflyParticles.createEmitter({
        frame: [0, 1, 2, 3],
        speedX: { min: -10, max: 10 },
        speedY: { min: -10, max: 10 },
        lifespan: 3000,
        quantity: 0,
        frequency: 200,
        scale: { start: 0, end: 1, yoyo: true },
        alpha: { start: 0, end: 1, yoyo: true },
        emitZone: window.sharedEmitZone
    });`;

html = html.split(oldFireflyEmitter).join(newFireflyEmitter);

fs.writeFileSync('index.html', html);
console.log("Replaced fireflies logic again.");
