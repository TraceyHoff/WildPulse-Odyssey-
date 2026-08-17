const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

let scaleMap = {
    'furniture_chair': 0.2,    // 2x2 feet
    'furniture_table': 0.4,    // 4x4 feet
    'furniture_plant': 0.2,    // 2x2 feet
    'furniture_lamp': 0.15,    // 1.5x1.5 feet
    'furniture_bin': 0.15,     // 1.5x1.5 feet
    'furniture_tv': 0.4,       // 4x4 feet
    'furniture_arcade': 0.3,   // 3x3 feet
    'furniture_desk': 0.4,     // 4x4 feet
    'furniture_bed': 0.6,      // 6x6 feet
    'furniture_kingbed': 0.8,  // 8x8 feet
    'furniture_bunkbed': 0.6,  // 6x6 feet
    'furniture_server': 0.3,   // 3x3 feet
    'furniture_shelf': 0.3,    // 3x3 feet
    'furniture_wardrobe': 0.4, // 4x4 feet
    'furniture_fridge': 0.3,   // 3x3 feet
    'furniture_display': 0.4,  // 4x4 feet
    'furniture_lavalamp': 0.1, // 1x1 feet
    'furniture_plasmaglobe': 0.1,
    'furniture_cyberposter': 0.3,
    'furniture_neonsign': 0.3,
    'furniture_gamingpc': 0.4,
    'furniture_smartmirror': 0.3,
    'furniture_diningtable': 0.6,
    'furniture_parkbench': 0.5,
    'furniture_cyberbench': 0.5,
    'furniture_filingcabinet': 0.2,
    'furniture_displaycabinet': 0.4,
    'furniture_nightstand': 0.2,
    'furniture_cornertable': 0.2,
    'furniture_carpet': 0.8,
    'furniture_star_carpet': 0.8,
    'furniture_round_cyber_carpet': 0.8,
    'furniture_hexagon_carpet': 0.8,
    'furniture_heart_carpet': 0.8,
    'furniture_diamond_carpet': 0.8,
    'furniture_crystal_bonsai': 0.15,
    'furniture_neon_fern': 0.2,
    'furniture_plasma_cactus': 0.15,
    'furniture_holo_orchid': 0.15,
    'furniture_ficus': 0.2,
    'furniture_monstera': 0.2,
    'furniture_bamboo': 0.2,
    'furniture_succulent': 0.1,
    'furniture_holorose': 0.1,
    'furniture_mushroom': 0.15,
    'furniture_sunflower': 0.15,
    'furniture_zenbonsai': 0.15,
    'furniture_lunarlily': 0.15,
    'furniture_cybertree': 0.4,
    'furniture_neonpine': 0.4
};
