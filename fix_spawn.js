const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Fix spawn loop variables
html = html.replace(
    `    let x = forceX;
    let y = forceY;
    if (x === undefined || y === undefined) {
        let found = false;
        let attempts = 0;`,
    `    let x = forceX;
    let y = forceY;
    let found = false;
    let attempts = 0;
    if (x === undefined || y === undefined) {`
);

fs.writeFileSync('index.html', html);
console.log('Modified index.html');
