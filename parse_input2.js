const fs = require('fs');

let code = fs.readFileSync('index.html', 'utf8');

// I should look at window.createTypeIconTexture and see how it works currently.
console.log(code.substring(code.indexOf('window.createTypeIconTexture'), code.indexOf('window.createShinyIconTexture')));
