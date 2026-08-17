const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// Replace plant shadow scale
code = code.replace(
    /shadow\.setScale\(0\.8, 0\.45 \* 0\.8\);/g,
    `shadow.setScale(1.2, 0.45 * 1.2);`
);

// Replace plant scale
code = code.replace(
    /plant\.setScale\(0\.8\);/g,
    `plant.setScale(1.2);`
);

fs.writeFileSync('index.html', code);
