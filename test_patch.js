const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');
let badStr = `<div>Inventory Wheel:</div><div>Tap UI button to view items</div>\n                            <div>Inventory Wheel:</div><div>Tap UI button to view items</div>\n                            <div>Action Wheel:</div><div>Double-tap/Double-touch anywhere to toggle action wheel</div>`;
let goodStr = `<div>Inventory Wheel:</div><div>Tap UI button to view items</div>\n                            <div>Action Wheel:</div><div>Double-tap/Double-touch anywhere to toggle action wheel</div>`;
html = html.replace(badStr, goodStr);

let badStr2 = `<div>Inventory Wheel:</div><div><span style="color:#00ff96; background:rgba(0,0,0,0.5); padding:2px 6px; border-radius:3px; border: 1px solid rgba(0,255,150,0.2);">Hold LB (Left Bumper)</span> (View items)</div>\n                            <div>Use / Confirm:</div>`;
let goodStr2 = `<div>Inventory Wheel:</div><div><span style="color:#00ff96; background:rgba(0,0,0,0.5); padding:2px 6px; border-radius:3px; border: 1px solid rgba(0,255,150,0.2);">Hold LB (Left Bumper)</span> (View items)</div>\n                            <div>Use / Confirm:</div>`;

fs.writeFileSync('index.html', html);
