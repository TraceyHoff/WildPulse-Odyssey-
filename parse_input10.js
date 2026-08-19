const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');
const searchString = "const typeColors = {";
let idx = code.indexOf(searchString);
console.log(code.substring(idx - 100, idx + 200));
