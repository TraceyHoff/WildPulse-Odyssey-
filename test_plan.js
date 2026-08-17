const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const regex = /mSprite\.setScale\(([^)]+)\)/;
const match = code.match(regex);
console.log(match ? match[0] : 'not found');
