const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

code = code.replace(
    /            else if \(tile.type === 'furniture_couch'\) textureKey = 'furniture_couch_tile';\n            else if \(tile.type === 'furniture_desk'\) textureKey = 'furniture_desk_tile';\n            else if \(tile.type === 'furniture_carpet'\) textureKey = 'furniture_carpet_tile';\n            else if \(tile.type === 'furniture_bed'\) textureKey = 'furniture_bed_tile';\n            else if \(tile.type === 'furniture_couch'\) textureKey = 'furniture_couch_tile';\n            else if \(tile.type === 'furniture_desk'\) textureKey = 'furniture_desk_tile';\n            else if \(tile.type === 'furniture_carpet'\) textureKey = 'furniture_carpet_tile';\n            else if \(tile.type === 'furniture_bed'\) textureKey = 'furniture_bed_tile';/g,
    `            else if (tile.type === 'furniture_couch') textureKey = 'furniture_couch_tile';
            else if (tile.type === 'furniture_desk') textureKey = 'furniture_desk_tile';
            else if (tile.type === 'furniture_carpet') textureKey = 'furniture_carpet_tile';
            else if (tile.type === 'furniture_bed') textureKey = 'furniture_bed_tile';`
);

fs.writeFileSync('index.html', code);
console.log('Fixed duplicate rendering patch');
