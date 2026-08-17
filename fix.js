const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// The instructions talk about `window.finalizeFurnitureTexture`.
// "Can we make all custom furniture sprites have 4 different sprites for every direction they can be rotated (up, down, left, and right)?"
// This implies generating rotated versions of each furniture texture.
// The user asks: "Can we make all custom furniture sprites have 4 different sprites for every direction they can be rotated (up, down, left, and right)?"
