const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const scaleFunc = `
window.getRealisticScale = function(type) {
    if (!type) return 1;
    // 40px = 4 feet, 10px = 1 foot. Base furniture size is 100x100px = 10x10 feet.
    const t = type.toLowerCase();
    if (t.includes('chair') || t.includes('nightstand') || t.includes('bin') || t.includes('succulent') || t.includes('holorose')) return 0.25; // 2.5 ft
    if (t.includes('plant') || t.includes('fern') || t.includes('cactus') || t.includes('bonsai') || t.includes('orchid') || t.includes('ficus') || t.includes('monstera') || t.includes('bamboo') || t.includes('mushroom') || t.includes('sunflower') || t.includes('lunarlily') || t.includes('lavalamp') || t.includes('plasmaglobe') || t.includes('lamp')) return 0.3; // 3 ft
    if (t.includes('table') || t.includes('desk') || t.includes('cabinet') || t.includes('gamingpc') || t.includes('tv') || t.includes('arcade') || t.includes('display') || t.includes('fridge') || t.includes('server') || t.includes('shelf') || t.includes('wardrobe') || t.includes('smartmirror') || t.includes('cyberposter') || t.includes('neonsign')) return 0.4; // 4 ft
    if (t.includes('bench')) return 0.5; // 5 ft
    if (t.includes('bed')) return 0.7; // 7 ft
    if (t.includes('tree') || t.includes('pine')) return 0.8; // 8 ft
    if (t.includes('carpet')) return 0.9; // 9 ft
    return 0.5;
};
`;

code = code.replace('window.gameStarted = false;', 'window.gameStarted = false;\n' + scaleFunc);
fs.writeFileSync('index.html', code);
