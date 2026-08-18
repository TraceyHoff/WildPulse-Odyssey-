const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

let generatedCode = fs.readFileSync('generated_canvas_code.js', 'utf8');

const searchStr = "    window.finalizeFurnitureTexture(scene, 'furniture_smartmirror_tile', smartMirrorCanvas);";

const insertIndex = html.indexOf(searchStr);

if (insertIndex === -1) {
    console.log("Could not find insert pos");
} else {
    // Find the next `}`
    const endIndex = html.indexOf("}", insertIndex);
    const oldBlock = html.substring(insertIndex, endIndex + 1);
    const replaceStr = `${searchStr}\n\n    // --- DYNAMICALLY GENERATED FROM SVG OVERRIDES ---\n${generatedCode}\n}`;
    html = html.replace(oldBlock, replaceStr);
    fs.writeFileSync('index.html', html);
    console.log("Patched successfully.");
}
