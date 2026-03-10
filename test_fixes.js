const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

// 1. Remove battle close button
html = html.replace('<button class="close-btn battle-close-btn" aria-label="Close Battle">X</button>', '');
html = html.replace("document.querySelector('.battle-close-btn')?.addEventListener('click', () => document.getElementById('battleModal').style.display='none');", "");

// 2. Reduce XP gained
html = html.replace(/let xpGained = Math\.floor\(currentEnemy\.level \* 50\);/g, 'let xpGained = Math.floor(currentEnemy.level * 25);');

// 3. Fix jitter by setting roundPixels to false
html = html.replace(/render: \{\s*roundPixels: true\s*\}/, 'render: {\n        roundPixels: false\n    }');

// 4. Update lake generation (numLakes, numCircles, radius)
html = html.replace(/const numLakes = Math\.floor\(\(cols \* rows\) \* 0\.005\);/, 'const numLakes = Math.floor((cols * rows) * 0.01);');
html = html.replace(/let numCircles = Math\.floor\(Math\.random\(\) \* 5\) \+ 3;/, 'let numCircles = Math.floor(Math.random() * 2) + 1;');
html = html.replace(/let radius = Math\.floor\(Math\.random\(\) \* 3\) \+ 2;/, 'let radius = Math.floor(Math.random() * 2) + 1;');

// 5. Update corners to 50px radius
html = html.replace(/convexCanvas\.width = 12;/g, 'convexCanvas.width = 50;');
html = html.replace(/convexCanvas\.height = 12;/g, 'convexCanvas.height = 50;');
html = html.replace(/convexCtx\.fillRect\(0, 0, 12, 12\);/g, 'convexCtx.fillRect(0, 0, 50, 50);');
html = html.replace(/convexCtx\.arc\(12, 12, 12, 0, Math\.PI \* 2\);/g, 'convexCtx.arc(50, 50, 50, 0, Math.PI * 2);');

html = html.replace(/concaveCanvas\.width = 12;/g, 'concaveCanvas.width = 50;');
html = html.replace(/concaveCanvas\.height = 12;/g, 'concaveCanvas.height = 50;');
html = html.replace(/concaveCtx\.lineTo\(12, 0\);/g, 'concaveCtx.lineTo(50, 0);');
html = html.replace(/concaveCtx\.arc\(0, 0, 12, 0, Math\.PI \/ 2, false\);/g, 'concaveCtx.arc(0, 0, 50, 0, Math.PI / 2, false);');

// 6. Fix corner offsets from 6 to 25
html = html.replace(/posX - 50 \+ 6/g, 'posX - 50 + 25');
html = html.replace(/posY - 50 \+ 6/g, 'posY - 50 + 25');
html = html.replace(/posX \+ 50 - 6/g, 'posX + 50 - 25');
html = html.replace(/posY \+ 50 - 6/g, 'posY + 50 - 25');

// 7. Remove shadow and water_overlay
html = html.replace(/let shadow = scene\.add\.rectangle\(posX \+ 6, posY \+ 4, 100, 100, 0x000000, 0\.5\);\s*shadow\.setDepth\(0\);\s*sprites\.push\(shadow\);/g, '');
html = html.replace(/let overlay = scene\.add\.sprite\(posX, posY, 'water_overlay'\);\s*overlay\.setBlendMode\(Phaser\.BlendModes\.MULTIPLY\);\s*overlay\.setDepth\(0\);\s*sprites\.push\(overlay\);/g, '');

// 8. Update water collision
html = html.replace(/obs\.body\.setSize\(100, 100\);\s*obs\.body\.x = posX - 50;\s*obs\.body\.y = posY - 50;/g, 'obs.body.setCircle(45);\n    obs.body.x = posX - 45;\n    obs.body.y = posY - 45;');

fs.writeFileSync('index.html', html);
console.log("Done");
