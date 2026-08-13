const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const matchFireflyCanvas = html.match(/const fireflyCanvas = document\.createElement\('canvas'\);[\s\S]*?scene\.textures\.addCanvas\('firefly_particle', fireflyCanvas\);/);
console.log("Firefly Canvas Match:", !!matchFireflyCanvas);

const matchButterflyCanvas = html.match(/const butterflyCanvas = document\.createElement\('canvas'\);[\s\S]*?scene\.textures\.addCanvas\('butterfly_particle', butterflyCanvas\);/);
console.log("Butterfly Canvas Match:", !!matchButterflyCanvas);

const matchFireflyEmitter = html.match(/let fireflyParticles = this\.add\.particles\('firefly_particle'\);[\s\S]*?emitZone: window\.sharedEmitZone\n    \}\);/);
console.log("Firefly Emitter Match:", !!matchFireflyEmitter);

const matchLerpFirefly = html.match(/lerpQuantity\(window\.fireflyEmitter, targetFireflies\);/g);
console.log("Lerp Firefly Match:", matchLerpFirefly ? matchLerpFirefly.length : 0);
