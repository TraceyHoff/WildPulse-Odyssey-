const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// #tradeModal select, #tradeModal button  needs #journalModal too
html = html.replace('#tradeModal select, #tradeModal button', '#tradeModal select, #tradeModal button, #journalModal button');

fs.writeFileSync('index.html', html);
