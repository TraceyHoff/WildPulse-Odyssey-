const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

let typeIconCode = code.substring(code.indexOf('window.createTypeIconTexture ='), code.indexOf('window.createShinyIconTexture ='));
console.log(typeIconCode);
