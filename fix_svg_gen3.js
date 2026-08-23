const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const codeToEval = html.match(/window\.getItemIconHTML = function\(itemName, size = 24\) \{([\s\S]*?)\};/s)[0];

const window = {};
eval(codeToEval);

console.log(window.getItemIconHTML("Potted Ficus", 100));
