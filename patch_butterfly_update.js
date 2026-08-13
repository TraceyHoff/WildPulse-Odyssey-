const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 3. Hook ButterflyManager into main update() loop
const oldSavePos = `    // Periodically save player position (every ~1000ms)
    if (shouldSave) {
        localStorage.setItem('wildpulse_player_x', player.x);
        localStorage.setItem('wildpulse_player_y', player.y);
        window.lastSaveTime = now;
    }`;

const newSavePos = `    // Periodically save player position (every ~1000ms)
    if (shouldSave) {
        localStorage.setItem('wildpulse_player_x', player.x);
        localStorage.setItem('wildpulse_player_y', player.y);
        window.lastSaveTime = now;
    }

    if (window.butterflyEmitter && typeof window.butterflyEmitter.update === 'function') {
        window.butterflyEmitter.update(time - (this.lastTime || time));
        this.lastTime = time;
    }`;

html = html.split(oldSavePos).join(newSavePos);

fs.writeFileSync('index.html', html);
console.log("Hooked butterfly emitter into update loop.");
