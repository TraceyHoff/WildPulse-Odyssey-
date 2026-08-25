const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// 1. generateTreeTextures
content = content.replace(
    /const treeCtx = treeCanvas\.getContext\('2d'\);/g,
    `const treeCtx = treeCanvas.getContext('2d');
        treeCtx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        treeCtx.shadowBlur = 8;
        treeCtx.shadowOffsetX = 4;
        treeCtx.shadowOffsetY = 4;`
);

// 2. window.generatePlantTextures
content = content.replace(
    /ctx\.fillStyle = 'rgba\(0,0,0,0\)'; ctx\.fillRect\(0,0,100,100\);/g,
    `ctx.fillStyle = 'rgba(0,0,0,0)'; ctx.fillRect(0,0,100,100);
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowBlur = 8;
            ctx.shadowOffsetX = 4;
            ctx.shadowOffsetY = 4;`
);

// 3. window.generatePlayerTexture
content = content.replace(
    /const pCtx = pCanvas\.getContext\('2d'\);/g,
    `const pCtx = pCanvas.getContext('2d');
        pCtx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        pCtx.shadowBlur = 8;
        pCtx.shadowOffsetX = 4;
        pCtx.shadowOffsetY = 4;`
);

// 4. window.generateQuestNpcTexture
content = content.replace(
    /let ctx = canvas\.getContext\('2d'\);\n\n    \/\/ Draw a beautiful, glowing golden-yellow star/g,
    `let ctx = canvas.getContext('2d');

    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;

    // Draw a beautiful, glowing golden-yellow star`
);

// 5. window.renderCreatureCanvas
content = content.replace(
    /ctx\.scale\(size \/ 100, size \/ 100\);/g,
    `ctx.scale(size / 100, size / 100);
    if (!drawBackground) {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 4;
    }`
);

fs.writeFileSync('index.html', content);
