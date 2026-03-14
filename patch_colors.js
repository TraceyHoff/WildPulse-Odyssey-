const fs = require('fs');

let code = fs.readFileSync('index.html', 'utf8');

// 1. Inject window.getCreatureColor right after window.baseCreatures definition (before assigning abilities)
const colorLogic = `
window.getCreatureColor = function(creature) {
    const typeColors = {
        "Fire": {r: 229, g: 57, b: 53},
        "Water": {r: 30, g: 136, b: 229},
        "Nature": {r: 67, g: 160, b: 71},
        "Electric": {r: 253, g: 216, b: 53},
        "Ice": {r: 3, g: 169, b: 244},
        "Earth": {r: 109, g: 76, b: 65},
        "Rock": {r: 117, g: 117, b: 117},
        "Wind": {r: 129, g: 212, b: 250},
        "Light": {r: 255, g: 238, b: 88},
        "Dark": {r: 33, g: 33, b: 33},
        "Cosmic": {r: 142, g: 36, b: 170},
        "Normal": {r: 158, g: 158, b: 158}
    };

    let pType = creature.type ? creature.type.split('-')[0] : 'Normal';
    let baseCol = typeColors[pType] || typeColors['Normal'];

    // Generate deterministic shade based on string
    let seedStr = String(creature.baseId || creature.name || '');
    let hash = 0;
    for (let i = 0; i < seedStr.length; i++) {
        hash = seedStr.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Vary between -40 and +40
    let offset = (Math.abs(hash) % 80) - 40;

    let r = Math.max(0, Math.min(255, baseCol.r + offset));
    let g = Math.max(0, Math.min(255, baseCol.g + offset));
    let b = Math.max(0, Math.min(255, baseCol.b + offset));

    return (r << 16) | (g << 8) | b;
};
`;

code = code.replace(/window\.assignAbility = function\(creature\)/, colorLogic + '\nwindow.assignAbility = function(creature)');

// 2. Remove hardcoded color and dynamic color assignment in baseCreatures loop
code = code.replace(/^[ \t]*"color": \d+,[\r\n]+/gm, '');

// A Safer replace for window.baseCreatures.forEach
let forEachRegex = /(window\.baseCreatures\.forEach\(c => \{[\s\S]*?)(c\.color = Math\.floor\(Math\.random\(\) \* 16777215\);)([\s\S]*?window\.assignAbility\(c\);[\s\S]*?\}\);)/;
code = code.replace(forEachRegex, `$1c.color = window.getCreatureColor(c);$3`);

// 3. Update breed color logic
code = code.replace(/const c1 = parent1\.color;[\s\S]*?const childColor = \(r << 16\) \| \(g << 8\) \| b;/g, `const childColor = window.getCreatureColor({ type: childType, name: childName });`);

// 4. Update spawnCreature color logic
code = code.replace(/const sprite = scene\.add\.rectangle\(x, y, 30, 30, clonedData\.color\);/, `if (!clonedData.color) clonedData.color = window.getCreatureColor(clonedData);\n    const sprite = scene.add.rectangle(x, y, 30, 30, clonedData.color);`);

fs.writeFileSync('index.html', code, 'utf8');
