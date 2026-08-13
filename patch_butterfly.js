const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Butterfly Texture Generation
const oldButterflyGen = `    const butterflyCanvas = document.createElement('canvas');
    butterflyCanvas.width = 12;
    butterflyCanvas.height = 12;
    const butterflyCtx = butterflyCanvas.getContext('2d');
    butterflyCtx.fillStyle = 'rgba(255, 150, 200, 0.8)';
    butterflyCtx.beginPath();
    butterflyCtx.moveTo(6, 6);
    butterflyCtx.lineTo(0, 0);
    butterflyCtx.lineTo(0, 12);
    butterflyCtx.fill();
    butterflyCtx.fillStyle = 'rgba(150, 200, 255, 0.8)';
    butterflyCtx.beginPath();
    butterflyCtx.moveTo(6, 6);
    butterflyCtx.lineTo(12, 0);
    butterflyCtx.lineTo(12, 12);
    butterflyCtx.fill();
    scene.textures.addCanvas('butterfly_particle', butterflyCanvas);`;

const newButterflyGen = `    const butterflyCanvas = document.createElement('canvas');
    butterflyCanvas.width = 48; // 4 frames x 12px
    butterflyCanvas.height = 12;
    const butterflyCtx = butterflyCanvas.getContext('2d');
    const butterflyColors = [
        { left: 'rgba(255, 150, 200, 0.8)', right: 'rgba(150, 200, 255, 0.8)' }, // Pink / Blue
        { left: 'rgba(255, 150, 50, 0.8)', right: 'rgba(50, 50, 50, 0.8)' },   // Orange / Black
        { left: 'rgba(200, 255, 255, 0.8)', right: 'rgba(255, 255, 255, 0.8)' },// Cyan / White
        { left: 'rgba(255, 255, 100, 0.8)', right: 'rgba(150, 255, 100, 0.8)' }// Yellow / Green
    ];
    for (let i = 0; i < 4; i++) {
        let offsetX = i * 12;
        butterflyCtx.fillStyle = butterflyColors[i].left;
        butterflyCtx.beginPath();
        butterflyCtx.moveTo(offsetX + 6, 6);
        butterflyCtx.lineTo(offsetX + 0, 0);
        butterflyCtx.lineTo(offsetX + 0, 12);
        butterflyCtx.fill();
        butterflyCtx.fillStyle = butterflyColors[i].right;
        butterflyCtx.beginPath();
        butterflyCtx.moveTo(offsetX + 6, 6);
        butterflyCtx.lineTo(offsetX + 12, 0);
        butterflyCtx.lineTo(offsetX + 12, 12);
        butterflyCtx.fill();
    }
    scene.textures.addSpriteSheet('butterfly_particles', butterflyCanvas, { frameWidth: 12, frameHeight: 12 });`;

html = html.split(oldButterflyGen).join(newButterflyGen);

// 2. Mock Butterfly Emitter (Sprite Manager)
const oldButterflyEmitter = `    let butterflyParticles = this.add.particles('butterfly_particle');
    butterflyParticles.setDepth(3000);
    window.butterflyEmitter = butterflyParticles.createEmitter({
        speedX: { min: -20, max: 20 },
        speedY: { min: -20, max: 20 },
        lifespan: 4000,
        quantity: 0,
        frequency: 400,
        scale: { start: 0, end: 1, yoyo: true },
        rotate: { min: -45, max: 45 },
        emitZone: window.sharedEmitZone
    });`;

const newButterflyEmitter = `    class ButterflyManager {
        constructor(scene) {
            this.scene = scene;
            this.sprites = [];
            this.active = false;
            this._currentQuantity = 0;
            this.maxButterflies = 0;
        }

        setQuantity(q) {
            this.maxButterflies = Math.floor(q);
            // Throttle spawning
            if (this.sprites.length < this.maxButterflies && Math.random() < 0.1) {
                this.spawnButterfly();
            } else if (this.sprites.length > this.maxButterflies) {
                let removed = this.sprites.pop();
                if (removed) removed.destroy();
            }
        }

        killAll() {
            this.sprites.forEach(s => s.destroy());
            this.sprites = [];
            this._currentQuantity = 0;
            this.maxButterflies = 0;
        }

        spawnButterfly() {
            if (!this.scene || !this.scene.cameras.main) return;
            const cam = this.scene.cameras.main;
            const x = cam.scrollX + Math.random() * cam.width;
            const y = cam.scrollY + Math.random() * cam.height;
            let sprite = this.scene.add.sprite(x, y, 'butterfly_particles', Math.floor(Math.random() * 4));
            sprite.setDepth(3000);
            sprite.bState = 'wandering';
            sprite.vx = (Math.random() - 0.5) * 40;
            sprite.vy = (Math.random() - 0.5) * 40;
            sprite.timer = 0;
            sprite.target = null;
            sprite.flapTime = Math.random() * 100;
            this.sprites.push(sprite);
        }

        update(dt) {
            if (!this.active && this.sprites.length === 0) return;

            const cam = this.scene.cameras.main;

            // Check player stationary
            let playerStationary = false;
            if (typeof player !== 'undefined' && player && player.body && player.body.velocity.x === 0 && player.body.velocity.y === 0) {
                if (!this.playerStillTime) this.playerStillTime = 0;
                this.playerStillTime += dt || 16;
                if (this.playerStillTime > 2000) playerStationary = true;
            } else {
                this.playerStillTime = 0;
            }

            let p2Stationary = false;
            if (typeof window.player2 !== 'undefined' && window.player2 && window.player2.body && window.player2.body.velocity.x === 0 && window.player2.body.velocity.y === 0) {
                if (!this.p2StillTime) this.p2StillTime = 0;
                this.p2StillTime += dt || 16;
                if (this.p2StillTime > 2000) p2Stationary = true;
            } else {
                this.p2StillTime = 0;
            }

            // Find flowers
            let activeFlowers = [];
            if (typeof activeTiles !== 'undefined' && Math.random() < 0.05) { // Only update flower list occasionally
                for (let key in activeTiles) {
                    let tileSprites = activeTiles[key];
                    if (tileSprites) {
                        for (let i = 0; i < tileSprites.length; i++) {
                            let ts = tileSprites[i];
                            if (ts && ts.plantType && ts.visible && ts.alpha > 0) {
                                activeFlowers.push(ts);
                            }
                        }
                    }
                }
                this.cachedFlowers = activeFlowers;
            } else {
                activeFlowers = this.cachedFlowers || [];
            }

            for (let i = this.sprites.length - 1; i >= 0; i--) {
                let sprite = this.sprites[i];
                if (!sprite.active) {
                    this.sprites.splice(i, 1);
                    continue;
                }

                sprite.timer += dt || 16;
                sprite.flapTime += (dt || 16) * 0.01;

                // Cleanup out of bounds
                if (sprite.x < cam.scrollX - 200 || sprite.x > cam.scrollX + cam.width + 200 ||
                    sprite.y < cam.scrollY - 200 || sprite.y > cam.scrollY + cam.height + 200) {
                    sprite.destroy();
                    this.sprites.splice(i, 1);
                    continue;
                }

                if (sprite.bState === 'wandering') {
                    sprite.x += sprite.vx * ((dt || 16) / 1000);
                    sprite.y += sprite.vy * ((dt || 16) / 1000);

                    if (Math.random() < 0.02) {
                        sprite.vx += (Math.random() - 0.5) * 20;
                        sprite.vy += (Math.random() - 0.5) * 20;
                    }

                    // Cap speed
                    let speed = Math.sqrt(sprite.vx * sprite.vx + sprite.vy * sprite.vy);
                    if (speed > 50) {
                        sprite.vx = (sprite.vx / speed) * 50;
                        sprite.vy = (sprite.vy / speed) * 50;
                    }

                    // Flapping
                    sprite.scaleX = Math.sin(sprite.flapTime * 2);
                    sprite.rotation = Math.atan2(sprite.vy, sprite.vx) + Math.PI/2;

                    // Decision time
                    if (sprite.timer > 3000 && Math.random() < 0.05) {
                        sprite.timer = 0;
                        if (playerStationary && Math.random() < 0.3) {
                            sprite.bState = 'seeking_player';
                            sprite.target = player;
                        } else if (p2Stationary && Math.random() < 0.3) {
                            sprite.bState = 'seeking_player';
                            sprite.target = window.player2;
                        } else if (activeFlowers.length > 0 && Math.random() < 0.5) {
                            sprite.bState = 'seeking_flower';
                            sprite.target = activeFlowers[Math.floor(Math.random() * activeFlowers.length)];
                        }
                    }
                } else if (sprite.bState === 'seeking_flower' || sprite.bState === 'seeking_player') {
                    if (!sprite.target || !sprite.target.active || (sprite.bState === 'seeking_player' && sprite.target.body && (sprite.target.body.velocity.x !== 0 || sprite.target.body.velocity.y !== 0))) {
                        sprite.bState = 'wandering';
                        sprite.target = null;
                        continue;
                    }

                    let tx = sprite.target.x;
                    let ty = sprite.target.y - (sprite.bState === 'seeking_player' ? 30 : 10);

                    let dx = tx - sprite.x;
                    let dy = ty - sprite.y;
                    let dist = Math.sqrt(dx*dx + dy*dy);

                    if (dist < 10) {
                        sprite.bState = (sprite.bState === 'seeking_flower') ? 'landing_flower' : 'landing_player';
                        sprite.vx = 0;
                        sprite.vy = 0;
                        sprite.timer = 0;
                    } else {
                        sprite.vx = (dx / dist) * 60;
                        sprite.vy = (dy / dist) * 60;
                        sprite.x += sprite.vx * ((dt || 16) / 1000);
                        sprite.y += sprite.vy * ((dt || 16) / 1000);
                        sprite.scaleX = Math.sin(sprite.flapTime * 2);
                        sprite.rotation = Math.atan2(sprite.vy, sprite.vx) + Math.PI/2;
                    }
                } else if (sprite.bState === 'landing_flower' || sprite.bState === 'landing_player') {
                    if (!sprite.target || !sprite.target.active || (sprite.bState === 'landing_player' && sprite.target.body && (sprite.target.body.velocity.x !== 0 || sprite.target.body.velocity.y !== 0))) {
                        sprite.bState = 'wandering';
                        sprite.target = null;
                        sprite.timer = 0;
                        sprite.vx = (Math.random() - 0.5) * 40;
                        sprite.vy = (Math.random() - 0.5) * 40;
                        continue;
                    }

                    sprite.x = sprite.target.x;
                    sprite.y = sprite.target.y - (sprite.bState === 'landing_player' ? 30 : 10);

                    // Slow flap while resting
                    sprite.scaleX = Math.sin(sprite.flapTime * 0.5) * 0.8 + 0.2;

                    if (sprite.timer > 5000) {
                        sprite.bState = 'wandering';
                        sprite.target = null;
                        sprite.timer = 0;
                        sprite.vx = (Math.random() - 0.5) * 40;
                        sprite.vy = (Math.random() - 0.5) * 40;
                    }
                }
            }
        }
    }

    window.butterflyEmitter = new ButterflyManager(this);`;

html = html.split(oldButterflyEmitter).join(newButterflyEmitter);

fs.writeFileSync('index.html', html);
console.log("Replaced butterfly logic.");
