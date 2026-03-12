const { JSDOM } = require("jsdom");
const dom = new JSDOM(`<!DOCTYPE html><body></body>`);
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.Element = dom.window.Element;
global.HTMLElement = dom.window.HTMLElement;
global.Image = dom.window.Image;

const canvas = document.createElement('canvas');
canvas.getContext = () => ({
    fillRect: () => {}, clearRect: () => {}, getImageData: () => ({ data: [] }), putImageData: () => {},
    createImageData: () => ({}), setTransform: () => {}, drawImage: () => {}, save: () => {},
    fillText: () => {}, restore: () => {}, beginPath: () => {}, moveTo: () => {}, lineTo: () => {},
    closePath: () => {}, stroke: () => {}, translate: () => {}, scale: () => {}, rotate: () => {},
    arc: () => {}, fill: () => {}, measureText: () => ({ width: 0 }), transform: () => {},
    rect: () => {}, clip: () => {},
});
global.window.HTMLCanvasElement.prototype.getContext = canvas.getContext;

require('phaser');

const config = {
    type: Phaser.HEADLESS, width: 800, height: 600,
    scene: {
        preload: function() {
            let canvas = document.createElement('canvas');
            canvas.width = 10; canvas.height = 10;
            this.textures.addCanvas('foo', canvas);
        },
        create: function() {
            let particles = this.add.particles('foo');
            let emitter = particles.createEmitter({
                speedX: { min: 100, max: 200 },
                speedY: { min: 50, max: 150 },
            });
            console.log("has setSpeedX?", typeof emitter.setSpeedX === 'function');
            emitter.setSpeedX({min: -50, max: 50});
            emitter.setSpeedY({min: -20, max: 20});
            console.log("Speed set to dynamically generated speeds");
        }
    }
};

new Phaser.Game(config);

setTimeout(() => process.exit(0), 1000);
