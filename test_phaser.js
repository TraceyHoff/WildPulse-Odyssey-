const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.window = dom.window;
global.document = window.document;
global.navigator = { userAgent: 'node.js' };
global.Element = dom.window.Element;
global.Image = dom.window.Image;
global.XMLHttpRequest = dom.window.XMLHttpRequest;
const Phaser = require('phaser');

let scene = {
    sys: {
        textures: { get: () => ({ get: () => ({ width: 10, height: 10, source: [{}] }), getFramesFromTextureSource: () => [] }) },
        events: { on: () => {} },
        updateList: { add: () => {} },
        queueDepthSort: () => {},
        displayList: { add: () => {} }
    },
    events: { on: () => {} },
    textures: { get: () => ({ get: () => ({ width: 10, height: 10, source: [{}] }), getFramesFromTextureSource: () => [] }) }
};
let manager = new Phaser.GameObjects.Particles.ParticleEmitterManager(scene, 'key');
let emitter = manager.createEmitter();

console.log("setEmitZone exists:", typeof emitter.setEmitZone === 'function');
console.log("Methods:", Object.getOwnPropertyNames(Object.getPrototypeOf(emitter)).filter(n => n.toLowerCase().includes('emit')));
