const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const block = content.substring(1617552 - 1000, 1617552 + 3000);
console.log(block);
