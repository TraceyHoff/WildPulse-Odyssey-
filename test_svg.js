const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// evaluate getItemIconHTML
const window = {};
eval(html.match(/window\.getItemIconHTML = function\(.*?};/s)[0]);

let res = window.getItemIconHTML("Neon Couch", 100);
console.log(res);
