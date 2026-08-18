const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// The replacement for mobile
let searchMobile = `<div>Action Wheel:</div><div>Double-tap/Double-touch anywhere to toggle action wheel</div>`;
let newMobile = `<div>Inventory Wheel:</div><div>Tap UI button to view items</div>\n                            <div>Action Wheel:</div><div>Double-tap/Double-touch anywhere to toggle action wheel</div>`;
html = html.replace(searchMobile, newMobile);
html = html.replace(searchMobile, newMobile);

console.log(html.includes("Tap UI button to view items"));
