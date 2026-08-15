const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

code = code.replace(
    /            else if \(tile.type === 'dojo'\) textureKey = 'dojo_tile';/g,
    `            else if (tile.type === 'dojo') textureKey = 'dojo_tile';
            else if (tile.type === 'furniture_couch') textureKey = 'furniture_couch_tile';
            else if (tile.type === 'furniture_desk') textureKey = 'furniture_desk_tile';
            else if (tile.type === 'furniture_carpet') textureKey = 'furniture_carpet_tile';
            else if (tile.type === 'furniture_bed') textureKey = 'furniture_bed_tile';`
);

fs.writeFileSync('index.html', code);
console.log('Patched mini tile rendering logic 2');
