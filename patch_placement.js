const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// Update textureMap
code = code.replace(
    /        "Dojo Tile": "dojo_tile"/g,
    `        "Dojo Tile": "dojo_tile",
        "Neon Couch": "furniture_couch_tile",
        "Cyber Desk": "furniture_desk_tile",
        "Glow Carpet": "furniture_carpet_tile",
        "Holo Bed": "furniture_bed_tile"`
);

// Update typeMap
code = code.replace(
    /        "Dojo Tile": "dojo"/g,
    `        "Dojo Tile": "dojo",
        "Neon Couch": "furniture_couch",
        "Cyber Desk": "furniture_desk",
        "Glow Carpet": "furniture_carpet",
        "Holo Bed": "furniture_bed"`
);

fs.writeFileSync('index.html', code);
console.log('Patched placement maps');
