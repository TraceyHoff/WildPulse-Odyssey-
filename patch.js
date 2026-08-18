const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Add IDs to the sections
function addIDsToSection(html, platformName, sectionId) {
    let searchStr = `<div style="background: rgba(0,0,0,0.5); padding: 12px; border: 1px solid rgba(0, 255, 204, 0.2); border-radius: 6px; box-shadow: inset 0 0 10px rgba(0, 255, 204, 0.05);">\n                        <strong style="color: #00ffcc; display: block; margin-bottom: 5px;">${platformName}</strong>`;

    // Replace first and second instance (p1 and p2)
    html = html.replace(searchStr, `<div id="${sectionId}" style="background: rgba(0,0,0,0.5); padding: 12px; border: 1px solid rgba(0, 255, 204, 0.2); border-radius: 6px; box-shadow: inset 0 0 10px rgba(0, 255, 204, 0.05);">\n                        <strong style="color: #00ffcc; display: block; margin-bottom: 5px;">${platformName}</strong>`);
    html = html.replace(searchStr, `<div id="${sectionId}_p2" style="background: rgba(0,0,0,0.5); padding: 12px; border: 1px solid rgba(0, 255, 204, 0.2); border-radius: 6px; box-shadow: inset 0 0 10px rgba(0, 255, 204, 0.05);">\n                        <strong style="color: #00ffcc; display: block; margin-bottom: 5px;">${platformName}</strong>`);
    return html;
}

html = addIDsToSection(html, "💻 KEYBOARD &amp; MOUSE", "introKeyboardSection"); // Wait, html doesn't have &amp;, it's &
html = addIDsToSection(html, "💻 KEYBOARD & MOUSE", "introKeyboardSection");
html = addIDsToSection(html, "🎮 GAMEPAD / CONTROLLER", "introGamepadSection");
html = addIDsToSection(html, "📱 TOUCH / MOBILE", "introMobileSection");

// Fix Action/Item Wheels texts
// Keyboard
let searchKBD = `<div>Quick Inventory:</div><div><span style="color:#00ff96; background:rgba(0,0,0,0.5); padding:2px 6px; border-radius:3px; border: 1px solid rgba(0,255,150,0.2);">I</span></div>\n                            <div>Action Wheel:</div><div><span style="color:#00ff96; background:rgba(0,0,0,0.5); padding:2px 6px; border-radius:3px; border: 1px solid rgba(0,255,150,0.2);">Q</span> (Press to toggle action wheel)</div>`;
let newKBD = `<div>Inventory Wheel:</div><div><span style="color:#00ff96; background:rgba(0,0,0,0.5); padding:2px 6px; border-radius:3px; border: 1px solid rgba(0,255,150,0.2);">I</span> (Hold to view items)</div>\n                            <div>Action Wheel:</div><div><span style="color:#00ff96; background:rgba(0,0,0,0.5); padding:2px 6px; border-radius:3px; border: 1px solid rgba(0,255,150,0.2);">Q</span> (Press to toggle action wheel)</div>`;
html = html.replace(searchKBD, newKBD);
html = html.replace(searchKBD, newKBD); // p2

// Gamepad
let searchGamepad = `<div>Inventory Mode:</div><div><span style="color:#00ff96; background:rgba(0,0,0,0.5); padding:2px 6px; border-radius:3px; border: 1px solid rgba(0,255,150,0.2);">Hold LB (Left Bumper)</span></div>`;
let newGamepad = `<div>Inventory Wheel:</div><div><span style="color:#00ff96; background:rgba(0,0,0,0.5); padding:2px 6px; border-radius:3px; border: 1px solid rgba(0,255,150,0.2);">Hold LB (Left Bumper)</span> (View items)</div>`;
html = html.replace(searchGamepad, newGamepad);
html = html.replace(searchGamepad, newGamepad); // p2

// Mobile
let searchMobile = `<div>Action Wheel:</div><div>Double-tap/Double-touch anywhere to toggle action wheel</div>`;
let newMobile = `<div>Inventory Wheel:</div><div>Tap UI button to view items</div>\n                            <div>Action Wheel:</div><div>Double-tap/Double-touch anywhere to toggle action wheel</div>`;
html = html.replace(searchMobile, newMobile);
html = html.replace(searchMobile, newMobile); // p2

fs.writeFileSync('index.html', html);
