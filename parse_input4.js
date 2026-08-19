const fs = require('fs');

let code = fs.readFileSync('index.html', 'utf8');

// Also look at window.createShinyIconTexture
console.log(code.substring(code.indexOf('window.createShinyIconTexture ='), code.indexOf('window.createShinyIconTexture =') + 1000));
