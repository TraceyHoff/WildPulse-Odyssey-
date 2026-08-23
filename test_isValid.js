const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
let match = html.match(/if \(isInside\) \{([\s\S]*?)\} else \{/);
console.log(match[1]);
