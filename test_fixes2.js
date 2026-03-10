const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

// The player should still not be able to walk onto the water, so let's adjust the collision box size
html = html.replace(/obs\.body\.setCircle\(45\);\n    obs\.body\.x = posX - 45;\n    obs\.body\.y = posY - 45;/, 'obs.body.setCircle(45);\n    obs.body.setOffset(5, 5);\n    obs.body.x = posX - 45;\n    obs.body.y = posY - 45;');

fs.writeFileSync('index.html', html);
console.log("Done");
