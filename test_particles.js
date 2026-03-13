const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// increase cloud count to 500
code = code.replace(/for \(let i = 0; i < 60; i\+\+\)/, 'for (let i = 0; i < 500; i++)');
// increase particles
code = code.replace(/quantity: 1/g, 'quantity: 50');
code = code.replace(/quantity: 3/g, 'quantity: 150');

fs.writeFileSync('index_test.html', code);
