const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const html = fs.readFileSync('index.html', 'utf8');

const dom = new JSDOM(html, { runScripts: "dangerously", url: "http://localhost/", beforeParse(w) { w.Phaser = { AUTO: 'AUTO', Scale: {}, Game: class {}, Math: { Between: ()=>0 } }; } });
const w = dom.window;

setTimeout(() => {
    let stats = [];
    w.baseCreatures.forEach(c => {
        let sum = c.stats.health + c.stats.attack;
        stats.push({name: c.name, sum: sum, hp: c.stats.health, atk: c.stats.attack});
    });
    stats.sort((a, b) => b.sum - a.sum);
    console.log(stats.slice(0, 5));
}, 500);
