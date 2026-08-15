const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const insertTarget = "scene.textures.addCanvas('storage_chest_tile', storageChestCanvas);";
const replacementStr = insertTarget + `

    // -----------------------------------------
    // Furniture Textures
    // -----------------------------------------
    // Neon Couch
    const couchCanvas = document.createElement('canvas');
    couchCanvas.width = 100;
    couchCanvas.height = 100;
    const couchCtx = couchCanvas.getContext('2d');
    couchCtx.fillStyle = '#1e1e2e'; // Base dark cushion color
    couchCtx.fillRect(10, 30, 80, 50); // main seat
    couchCtx.fillStyle = '#181825';
    couchCtx.fillRect(5, 20, 90, 20); // backrest
    couchCtx.fillRect(0, 30, 15, 60); // left arm
    couchCtx.fillRect(85, 30, 15, 60); // right arm
    // Neon accents
    couchCtx.strokeStyle = '#00ffd2'; // Cyber cyan glow
    couchCtx.lineWidth = 3;
    couchCtx.shadowBlur = 10;
    couchCtx.shadowColor = '#00ffd2';
    couchCtx.strokeRect(10, 30, 80, 50);
    couchCtx.strokeRect(5, 20, 90, 20);
    if (window.add3DDepth) window.add3DDepth(couchCtx, 0, 0, 100, 100);
    scene.textures.addCanvas('furniture_couch_tile', couchCanvas);

    // Cyber Desk
    const deskCanvas = document.createElement('canvas');
    deskCanvas.width = 100;
    deskCanvas.height = 100;
    const deskCtx = deskCanvas.getContext('2d');
    deskCtx.fillStyle = '#111'; // Desk top
    deskCtx.fillRect(5, 40, 90, 40);
    // Legs
    deskCtx.fillStyle = '#555';
    deskCtx.fillRect(10, 80, 10, 15);
    deskCtx.fillRect(80, 80, 10, 15);
    // Monitors
    deskCtx.fillStyle = '#0a0a0a';
    deskCtx.fillRect(20, 10, 60, 30);
    deskCtx.strokeStyle = '#ff00ff';
    deskCtx.lineWidth = 2;
    deskCtx.shadowBlur = 5;
    deskCtx.shadowColor = '#ff00ff';
    deskCtx.strokeRect(20, 10, 60, 30);
    // Keyboard glow
    deskCtx.fillStyle = '#00ffd2';
    deskCtx.shadowColor = '#00ffd2';
    deskCtx.fillRect(30, 50, 40, 10);
    if (window.add3DDepth) window.add3DDepth(deskCtx, 0, 0, 100, 100);
    scene.textures.addCanvas('furniture_desk_tile', deskCanvas);

    // Glow Carpet
    const carpetCanvas = document.createElement('canvas');
    carpetCanvas.width = 100;
    carpetCanvas.height = 100;
    const carpetCtx = carpetCanvas.getContext('2d');
    carpetCtx.fillStyle = '#000000';
    carpetCtx.fillRect(5, 5, 90, 90);
    // Cyber circuit patterns
    carpetCtx.strokeStyle = '#ff9f00';
    carpetCtx.lineWidth = 4;
    carpetCtx.shadowBlur = 15;
    carpetCtx.shadowColor = '#ff9f00';
    carpetCtx.beginPath();
    carpetCtx.moveTo(10, 10); carpetCtx.lineTo(90, 10); carpetCtx.lineTo(90, 90); carpetCtx.lineTo(10, 90); carpetCtx.closePath();
    carpetCtx.stroke();
    carpetCtx.beginPath();
    carpetCtx.moveTo(25, 25); carpetCtx.lineTo(75, 25); carpetCtx.lineTo(75, 75); carpetCtx.lineTo(25, 75); carpetCtx.closePath();
    carpetCtx.stroke();
    carpetCtx.strokeStyle = '#00ffd2';
    carpetCtx.shadowColor = '#00ffd2';
    carpetCtx.beginPath();
    carpetCtx.moveTo(50, 25); carpetCtx.lineTo(50, 75);
    carpetCtx.moveTo(25, 50); carpetCtx.lineTo(75, 50);
    carpetCtx.stroke();
    scene.textures.addCanvas('furniture_carpet_tile', carpetCanvas);

    // Holo Bed
    const bedCanvas = document.createElement('canvas');
    bedCanvas.width = 100;
    bedCanvas.height = 100;
    const bedCtx = bedCanvas.getContext('2d');
    bedCtx.fillStyle = '#222';
    bedCtx.fillRect(10, 10, 80, 80); // base frame
    // Holo sheets
    bedCtx.fillStyle = 'rgba(0, 255, 255, 0.4)';
    bedCtx.shadowBlur = 20;
    bedCtx.shadowColor = '#00ffff';
    bedCtx.fillRect(15, 30, 70, 55);
    // Pillow
    bedCtx.fillStyle = '#fff';
    bedCtx.shadowBlur = 5;
    bedCtx.shadowColor = '#fff';
    bedCtx.fillRect(20, 15, 60, 15);
    // Futuristic glowing nodes
    bedCtx.fillStyle = '#ff00ff';
    bedCtx.shadowBlur = 10;
    bedCtx.shadowColor = '#ff00ff';
    bedCtx.beginPath(); bedCtx.arc(15, 15, 5, 0, Math.PI*2); bedCtx.fill();
    bedCtx.beginPath(); bedCtx.arc(85, 15, 5, 0, Math.PI*2); bedCtx.fill();
    bedCtx.beginPath(); bedCtx.arc(15, 90, 5, 0, Math.PI*2); bedCtx.fill();
    bedCtx.beginPath(); bedCtx.arc(85, 90, 5, 0, Math.PI*2); bedCtx.fill();
    if (window.add3DDepth) window.add3DDepth(bedCtx, 0, 0, 100, 100);
    scene.textures.addCanvas('furniture_bed_tile', bedCanvas);
`;

code = code.replace(insertTarget, replacementStr);
fs.writeFileSync('index.html', code);
console.log('Patched tile textures correctly');
