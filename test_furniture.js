const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const regex = /mSprite\.setDepth\(9\);/;
if (code.match(regex)) {
  console.log("Matched mSprite depth");
}
