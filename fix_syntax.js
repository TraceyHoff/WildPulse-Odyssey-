const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace("timeText = this.add.text(20, window.innerHeight - 40, \"08:00\", { fontSize: '24px', fill: '#FFF' }).setScrollFactor(0).setDepth(100);\ne);", "timeText = this.add.text(20, window.innerHeight - 40, \"08:00\", { fontSize: '24px', fill: '#FFF' }).setScrollFactor(0).setDepth(100);");

fs.writeFileSync('index.html', html);
