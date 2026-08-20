const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const match = html.match(/furnitureItems\.forEach\([\s\S]*?\}\);/);
console.log(match[0]);
