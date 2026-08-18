const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
const svgs = JSON.parse(fs.readFileSync('extracted_svgs.json', 'utf8'));

// Find the area inside window.generateHomeInteriorTextures
// that generates the furniture textures, from `// Neon Couch` down to `function generateMiscTextures`
const startIndex = html.indexOf('// Neon Couch');
const endIndex = html.indexOf('function generateMiscTextures');

if (startIndex !== -1 && endIndex !== -1) {
    console.log("Found texture generation block.");
} else {
    console.log("Not found.");
}
