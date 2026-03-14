const fs = require('fs');

let code = fs.readFileSync('index.html', 'utf8');

code = code.replace(/cloud\.setAlpha\(0\.6\);/g, 'cloud.setAlpha(0.1 + Math.random() * 0.4);');
code = code.replace(/cloud\.setScale\(1 \+ Math\.random\(\) \* 2\);/g, 'cloud.setScale(1 + Math.random() * 2, 1 + Math.random() * 2);');

fs.writeFileSync('index.html', code, 'utf8');
