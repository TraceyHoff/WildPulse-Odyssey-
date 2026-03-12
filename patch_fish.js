const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const oldFishDrawCode = /if \(depth\.prefix === 'obs_mid_tex_' \|\| depth\.prefix === 'obs_deep_tex_'\) \{\s*obsCtx\.globalCompositeOperation = 'multiply';\s*obsCtx\.fillStyle = 'rgba\(0, 0, 0, 0\.3\)';\s*for \(let f = 0; f < 3; f\+\+\) \{\s*let fx = \(f \* 150 \+ t \* 40\) % 400;\s*let fy = \(f \* 100 \+ Math\.sin\(t \+ f\) \* 20\) % 400;\s*obsCtx\.beginPath\(\);\s*obsCtx\.ellipse\(fx, fy, 15, 5, Math\.sin\(t\)\*0\.2, 0, Math\.PI\*2\);\s*obsCtx\.fill\(\);\s*\}\s*\}/g;

const newFishDrawCode = `if (depth.prefix === 'obs_mid_tex_' || depth.prefix === 'obs_deep_tex_') {
                obsCtx.globalCompositeOperation = 'multiply';
                obsCtx.fillStyle = 'rgba(0, 0, 0, 0.4)';
                let numFish = depth.prefix === 'obs_deep_tex_' ? 6 : 3;
                for (let f = 0; f < numFish; f++) {
                    let speedF = 20 + f * 5;
                    let fx = (f * 150 + t * speedF) % 400;
                    let fy = (f * 100 + Math.sin(t + f) * 20) % 400;
                    let angle = Math.sin(t + f) * 0.2;

                    obsCtx.save();
                    obsCtx.translate(fx, fy);
                    obsCtx.rotate(angle);

                    obsCtx.beginPath();
                    // Body
                    obsCtx.ellipse(0, 0, 12, 4, 0, 0, Math.PI*2);
                    // Tail with wiggle
                    let tailWiggle = Math.sin(t * 10 + f) * 3;
                    obsCtx.moveTo(-10, 0);
                    obsCtx.lineTo(-18, -4 + tailWiggle);
                    obsCtx.lineTo(-18, 4 + tailWiggle);
                    obsCtx.fill();

                    obsCtx.restore();
                }
            }`;

code = code.replace(oldFishDrawCode, newFishDrawCode);
fs.writeFileSync('index.html', code);
console.log("Patched fish drawing successfully");
