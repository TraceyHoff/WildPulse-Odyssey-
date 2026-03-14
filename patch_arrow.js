const fs = require('fs');

let code = fs.readFileSync('index.html', 'utf8');

// Remove arrow texture logic in preload
code = code.replace(/\/\/ Pre-generate Hospital Arrow texture[\s\S]*?this\.textures\.addCanvas\('arrow_tex', arrowCanvas\);/g, '');

// Remove arrow sprite in create
code = code.replace(/\/\/ Hospital Directional Arrow[\s\S]*?window\.hospitalArrow = hospitalArrow;/g, '');

// Remove arrow update logic
code = code.replace(/if \(allDead && window\.hospitalArrow\) \{[\s\S]*?\} else if \(window\.hospitalArrow\) \{[\s\S]*?\}/g, '');

fs.writeFileSync('index.html', code, 'utf8');
