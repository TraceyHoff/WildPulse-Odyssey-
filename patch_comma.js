const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');
code = code.replace(
    /        { name: "Holo Bed", icon: "🛏️", desc: "A futuristic holographic bed. Place inside using mini-tile placement." }\n        { name: "Dojo Tile", icon: "⛩️", desc: "A placeable tile that summons the Dojo Leader for elite matches. \(Defeat all 24 trainers\)" },/,
    `        { name: "Holo Bed", icon: "🛏️", desc: "A futuristic holographic bed. Place inside using mini-tile placement." },
        { name: "Dojo Tile", icon: "⛩️", desc: "A placeable tile that summons the Dojo Leader for elite matches. (Defeat all 24 trainers)" },`
);
fs.writeFileSync('index.html', code);
console.log('Fixed missing comma');
