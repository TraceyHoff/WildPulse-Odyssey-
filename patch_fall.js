const fs = require('fs');

let code = fs.readFileSync('index.html', 'utf8');

// 1. Initialization
code = code.replace(/let wildpulse_inGameDays = parseInt\(localStorage\.getItem\('wildpulse_inGameDays'\)\) \|\| 0;/g, `let wildpulse_inGameDays = parseInt(localStorage.getItem('wildpulse_inGameDays')) || 40;`);
code = code.replace(/window\.currentSeason = localStorage\.getItem\('wildpulse_currentSeason'\) \|\| 'Summer';/g, `window.currentSeason = localStorage.getItem('wildpulse_currentSeason') || 'Fall';`);

// 2. Fall colors
code = code.replace(/colors = \['#8B8000', '#B8860B', '#DAA520'\];/g, `colors = ['#FFD700', '#FF0000', '#FFA500', '#D2B48C'];`);
// Note: original updateGrassColors assumes 3 colors or 4 colors randomly picked? Let's check how it uses it.
// "window.grassBlades[i].color = rand > 0.6 ? colors[0] : (rand > 0.3 ? colors[1] : colors[2]);"
// I will rewrite that inner loop body.
code = code.replace(/window\.grassBlades\[i\]\.color = rand > 0\.6 \? colors\[0\] : \(rand > 0\.3 \? colors\[1\] : colors\[2\]\);/g, `
            if (colors.length === 4) {
                if (rand > 0.75) window.grassBlades[i].color = colors[0];
                else if (rand > 0.5) window.grassBlades[i].color = colors[1];
                else if (rand > 0.25) window.grassBlades[i].color = colors[2];
                else window.grassBlades[i].color = colors[3];
            } else {
                window.grassBlades[i].color = rand > 0.6 ? colors[0] : (rand > 0.3 ? colors[1] : colors[2]);
            }
`);

// 3. Ground gradient
code = code.replace(/gradient\.addColorStop\(0, '#665c1a'\);\n                gradient\.addColorStop\(1, '#8b7d22'\);/g, `gradient.addColorStop(0, '#d2b48c');\n                gradient.addColorStop(1, '#e6ccb2');`);

code = code.replace(/else if \(window\.currentSeason === 'Fall'\) bgCtx\.fillStyle = Math\.random\(\) < 0\.5 \? '#73681c' : '#786c1e';/g, `else if (window.currentSeason === 'Fall') bgCtx.fillStyle = Math.random() < 0.5 ? '#f5ebd9' : '#d2b48c';`);

fs.writeFileSync('index.html', code, 'utf8');
