const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Declare globals
html = html.replace('let battleLogQueue = [];', 'let dayNightTime = 8.0;\nlet dayNightOverlay;\nlet timeText;\nlet lastDayNightUpdate = 0;\nlet battleLogQueue = [];');

// 2. Add to create
const createAddition = `
    // Day and Night Cycle
    dayNightOverlay = this.add.rectangle(0, 0, window.innerWidth, window.innerHeight, 0x000033).setOrigin(0).setScrollFactor(0).setDepth(99).setAlpha(0);
    timeText = this.add.text(20, window.innerHeight - 40, "08:00", { fontSize: '24px', fill: '#FFF' }).setScrollFactor(0).setDepth(100);
`;
html = html.replace('popupBackground.setVisible(false);\n    popupText.setVisible(false);', 'popupBackground.setVisible(false);\n    popupText.setVisible(false);\n' + createAddition);

// 3. Update resize
const resizeAddition = `
        if (dayNightOverlay) {
            dayNightOverlay.setSize(gameSize.width, gameSize.height);
        }
        if (timeText) {
            timeText.setPosition(20, gameSize.height - 40);
        }
`;
html = html.replace('popupText.setPosition(gameSize.width / 2, gameSize.height - 100);\n    });', 'popupText.setPosition(gameSize.width / 2, gameSize.height - 100);\n' + resizeAddition + '    });');

// 4. Update loop
const updateAddition = `
    // Day Night Cycle Update
    if (!lastDayNightUpdate) lastDayNightUpdate = this.time.now;
    let dt = this.time.now - lastDayNightUpdate;
    lastDayNightUpdate = this.time.now;

    // 24 hours = 20 real minutes = 1200 seconds = 1,200,000 ms
    // 1 in-game hour = 50,000 ms
    dayNightTime += (dt / 50000);
    if (dayNightTime >= 24.0) dayNightTime -= 24.0;

    let hours = Math.floor(dayNightTime);
    let minutes = Math.floor((dayNightTime % 1) * 60);
    let hStr = hours < 10 ? '0' + hours : hours.toString();
    let mStr = minutes < 10 ? '0' + minutes : minutes.toString();
    if (timeText) timeText.setText(hStr + ":" + mStr);

    // Calculate alpha
    // Dawn: 04:00 (alpha 0.5) to 06:00 (alpha 0.0)
    // Day: 06:00 to 18:00 (alpha 0.0)
    // Dusk: 18:00 (alpha 0.0) to 20:00 (alpha 0.5)
    // Night: 20:00 to 04:00 (alpha 0.5)
    let targetAlpha = 0;
    if (dayNightTime >= 6 && dayNightTime <= 18) {
        targetAlpha = 0;
    } else if (dayNightTime > 18 && dayNightTime < 20) {
        targetAlpha = ((dayNightTime - 18) / 2) * 0.5;
    } else if (dayNightTime >= 20 || dayNightTime <= 4) {
        targetAlpha = 0.5;
    } else if (dayNightTime > 4 && dayNightTime < 6) {
        targetAlpha = 0.5 - (((dayNightTime - 4) / 2) * 0.5);
    }
    if (dayNightOverlay) dayNightOverlay.setAlpha(targetAlpha);
`;
html = html.replace('// Animate background', updateAddition + '\n    // Animate background');

fs.writeFileSync('index.html', html);
console.log('Successfully patched index.html with day night cycle.');
