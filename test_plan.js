const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

if (code.includes('mSprite.setDepth(9);')) {
  console.log('Found setDepth(9)');
}
