const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');
console.log(html.includes('Hold to view items'));
console.log(html.includes('Hold LB (Left Bumper)</span> (View items)'));
console.log(html.includes('Tap UI button to view items'));
