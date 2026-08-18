const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

let searchMobile = `<div>Move Character:</div><div>Swipe or tap relative position to move</div>\n                            <div>Action Wheel:</div><div>Double-tap/Double-touch anywhere to toggle action wheel</div>`;
let newMobile = `<div>Move Character:</div><div>Swipe or tap relative position to move</div>\n                            <div>Inventory Wheel:</div><div>Tap UI button to view items</div>\n                            <div>Action Wheel:</div><div>Double-tap/Double-touch anywhere to toggle action wheel</div>`;
html = html.replace(searchMobile, newMobile);

fs.writeFileSync('index.html', html);
