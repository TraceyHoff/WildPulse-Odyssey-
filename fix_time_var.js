const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The Phaser update loop signature is usually update(time, delta) or we can use the main time loop variables
// Looking at the context, 'time' is not defined in this scope. Phaser update uses:
// function update(time, delta) or we can just use the provided 'dt' or 'this.time.now'
// Let's replace 'time' with 'this.time.now'

html = html.replace('window.butterflyEmitter.update(time - (this.lastTime || time));', 'window.butterflyEmitter.update(this.time.now - (this.lastTime || this.time.now));');
html = html.replace('this.lastTime = time;', 'this.lastTime = this.time.now;');

fs.writeFileSync('index.html', html);
console.log("Fixed 'time is not defined' error.");
