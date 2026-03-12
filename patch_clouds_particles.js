const fs = require('fs');

let code = fs.readFileSync('index.html', 'utf8');

// 1. Particle Set Scroll Factor & fixed emitZone
code = code.replace(
    /let leafRedParticles = this\.add\.particles\('leaf_particle_red'\);\s*leafRedParticles\.setDepth\(3000\);\s*window\.leafRedEmitter = leafRedParticles\.createEmitter\(\{/g,
    `let leafRedParticles = this.add.particles('leaf_particle_red');
    leafRedParticles.setDepth(3000);
    leafRedParticles.setScrollFactor(0);
    window.leafRedEmitter = leafRedParticles.createEmitter({`
);

code = code.replace(
    /emitZone: \{ source: new Phaser\.Geom\.Rectangle\(0, 0, window\.innerWidth, window\.innerHeight\) \}/g,
    `emitZone: { source: new Phaser.Geom.Rectangle(-400, -400, window.innerWidth + 800, window.innerHeight + 800) }`
);

code = code.replace(
    /let leafYellowParticles = this\.add\.particles\('leaf_particle_yellow'\);\s*leafYellowParticles\.setDepth\(3000\);\s*window\.leafYellowEmitter = leafYellowParticles\.createEmitter\(\{/g,
    `let leafYellowParticles = this.add.particles('leaf_particle_yellow');
    leafYellowParticles.setDepth(3000);
    leafYellowParticles.setScrollFactor(0);
    window.leafYellowEmitter = leafYellowParticles.createEmitter({`
);

code = code.replace(
    /let pollenParticles = this\.add\.particles\('pollen_particle'\);\s*pollenParticles\.setDepth\(3000\);\s*window\.pollenEmitter = pollenParticles\.createEmitter\(\{/g,
    `let pollenParticles = this.add.particles('pollen_particle');
    pollenParticles.setDepth(3000);
    pollenParticles.setScrollFactor(0);
    window.pollenEmitter = pollenParticles.createEmitter({`
);

// 2. Cloud Group Set Scroll Factor
code = code.replace(
    /cloud\.setDepth\(2000\);\s*cloud\.setAlpha\(0\.6\);\s*cloud\.setScale\(1 \+ Math\.random\(\) \* 2\);/g,
    `cloud.setDepth(2000);
        cloud.setAlpha(0.6);
        cloud.setScale(1 + Math.random() * 2);
        cloud.setScrollFactor(0);`
);

// 3. Remove buggy emitZone update in update() loop
const badEmitZoneCodeRegex = /\/\/ Update emitZone bounds based on camera position and wind direction so particles spawn appropriately[\s\S]*?\/\/ We alternate emit zones or just use a wide buffer around the screen\s*window\.leafRedEmitter\.setEmitZone\(\{ source: new Phaser\.Geom\.Rectangle\(cx - padding, cy - padding, cw \+ padding \* 2, ch \+ padding \* 2\) \}\);\s*window\.leafYellowEmitter\.setEmitZone\(\{ source: new Phaser\.Geom\.Rectangle\(cx - padding, cy - padding, cw \+ padding \* 2, ch \+ padding \* 2\) \}\);\s*window\.pollenEmitter\.setEmitZone\(\{ source: new Phaser\.Geom\.Rectangle\(cx - padding, cy - padding, cw \+ padding \* 2, ch \+ padding \* 2\) \}\);/g;

code = code.replace(badEmitZoneCodeRegex, `// emitZone is now fixed and independent of camera position because particles use setScrollFactor(0)`);


// 4. Update cloud wrap logic
const badCloudWrapCode = /\/\/ Wrap around viewport\s*if \(cloud\.x < cam\.scrollX - 400 && windVx < 0\) cloud\.x = cam\.scrollX \+ cam\.width \+ 400;\s*if \(cloud\.x > cam\.scrollX \+ cam\.width \+ 400 && windVx > 0\) cloud\.x = cam\.scrollX - 400;\s*if \(cloud\.y < cam\.scrollY - 400 && windVy < 0\) cloud\.y = cam\.scrollY \+ cam\.height \+ 400;\s*if \(cloud\.y > cam\.scrollY \+ cam\.height \+ 400 && windVy > 0\) cloud\.y = cam\.scrollY - 400;/g;

const newCloudWrapCode = `// Wrap around viewport in UI space
            if (cloud.x < -400) cloud.x = window.innerWidth + 400;
            if (cloud.x > window.innerWidth + 400) cloud.x = -400;
            if (cloud.y < -400) cloud.y = window.innerHeight + 400;
            if (cloud.y > window.innerHeight + 400) cloud.y = -400;`;

code = code.replace(badCloudWrapCode, newCloudWrapCode);


fs.writeFileSync('index.html', code);
console.log("Patched clouds and particles");
