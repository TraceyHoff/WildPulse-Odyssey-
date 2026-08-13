const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const s = `id="questTalkBtn_p1"`;

console.log("P1 found:", html.includes(s));
