const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Currently:
// Top arrow:
// moveTo(30, 30);
// lineTo(60, 30);
// lineTo(60, 20);
// lineTo(80, 40);
// lineTo(60, 60);
// lineTo(60, 50);
// lineTo(30, 50);

// Bottom arrow:
// moveTo(70, 70);
// lineTo(40, 70);
// lineTo(40, 80);
// lineTo(20, 60);
// lineTo(40, 40);
// lineTo(40, 50);
// lineTo(70, 50);

// We want to shift the top arrow up by 5 and the bottom arrow down by 5 to create a small gap.
html = html.replace(`    // Right facing arrow (top)
    tradeCtx.beginPath();
    tradeCtx.moveTo(30, 30);
    tradeCtx.lineTo(60, 30);
    tradeCtx.lineTo(60, 20);
    tradeCtx.lineTo(80, 40);
    tradeCtx.lineTo(60, 60);
    tradeCtx.lineTo(60, 50);
    tradeCtx.lineTo(30, 50);
    tradeCtx.fill();`, `    // Right facing arrow (top)
    tradeCtx.beginPath();
    tradeCtx.moveTo(30, 25);
    tradeCtx.lineTo(60, 25);
    tradeCtx.lineTo(60, 15);
    tradeCtx.lineTo(80, 35);
    tradeCtx.lineTo(60, 55);
    tradeCtx.lineTo(60, 45);
    tradeCtx.lineTo(30, 45);
    tradeCtx.fill();`);

html = html.replace(`    // Left facing arrow (bottom)
    tradeCtx.beginPath();
    tradeCtx.moveTo(70, 70);
    tradeCtx.lineTo(40, 70);
    tradeCtx.lineTo(40, 80);
    tradeCtx.lineTo(20, 60);
    tradeCtx.lineTo(40, 40);
    tradeCtx.lineTo(40, 50);
    tradeCtx.lineTo(70, 50);
    tradeCtx.fill();`, `    // Left facing arrow (bottom)
    tradeCtx.beginPath();
    tradeCtx.moveTo(70, 75);
    tradeCtx.lineTo(40, 75);
    tradeCtx.lineTo(40, 85);
    tradeCtx.lineTo(20, 65);
    tradeCtx.lineTo(40, 45);
    tradeCtx.lineTo(40, 55);
    tradeCtx.lineTo(70, 55);
    tradeCtx.fill();`);

fs.writeFileSync('index.html', html);
