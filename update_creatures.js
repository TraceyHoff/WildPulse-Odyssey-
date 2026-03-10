const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const regex = /window\.baseCreatures\s*=\s*(\[[\s\S]*?\]);/;
const match = html.match(regex);

if (!match) {
    console.error("Could not find window.baseCreatures");
    process.exit(1);
}

let baseCreatures;
try {
    baseCreatures = JSON.parse(match[1]);
} catch (e) {
    console.error("Failed to parse baseCreatures JSON", e);
    process.exit(1);
}

// Data for randomization
const bodySizes = ['tiny', 'small', 'medium', 'large', 'massive'];
const bodyTypes = ['slender', 'stout', 'graceful', 'bulky', 'agile', 'sleek', 'muscular'];
const uniqueFeatures = ['glowing markings', 'iridescent scales', 'crystalline spikes', 'ethereal aura', 'shadowy wisps', 'crackling energy', 'blooming flora', 'flowing water droplets', 'smoldering embers'];
const eyes = ['piercing', 'gentle', 'narrow', 'wide', 'glowing', 'mysterious', 'fierce', 'calm'];
const skinFurTypes = ['smooth', 'bristly', 'silky', 'scaly', 'soft', 'rough', 'thick', 'feathered'];
const patterns = ['spots', 'swirls', 'patches', 'stripes', 'bands', 'runes', 'speckles', 'mottled'];
const wingsType = ['none', 'none', 'none', 'none', 'feathered wings', 'leathery wings', 'insectoid wings', 'gossamer wings', 'energy wings']; // higher chance for none
const wingsSize = ['small', 'medium', 'large', 'majestic'];
const clawHorn = ['razor-sharp claws', 'blunt claws', 'majestic horns', 'curved horns', 'spiraling horns', 'jagged spikes', 'none'];
const teeth = ['wicked fangs', 'sharp teeth', 'blunt teeth', 'flat teeth', 'none'];
const limbsNum = [2, 4, 4, 4, 6, 8]; // mostly 4
const limbsType = ['sturdy legs', 'agile limbs', 'tentacles', 'paws', 'talons'];
const tailSize = ['short', 'long', 'sweeping', 'stubby', 'none'];
const tailType = ['fluffy tail', 'scaly tail', 'barbed tail', 'clubbed tail', 'flowing tail'];

// Seeded random
let seed = 12345;
function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

function getRandom(arr) {
    return arr[Math.floor(random() * arr.length)];
}

baseCreatures.forEach(c => {
    c.bodySize = getRandom(bodySizes);
    c.bodyType = getRandom(bodyTypes);
    c.uniqueFeature = getRandom(uniqueFeatures);
    c.eyes = getRandom(eyes);
    c.skinFurType = getRandom(skinFurTypes);
    c.pattern = getRandom(patterns);

    const wType = getRandom(wingsType);
    c.wings = wType === 'none' ? 'none' : `${getRandom(wingsSize)} ${wType}`;

    c.clawHorn = getRandom(clawHorn);
    c.teeth = getRandom(teeth);
    c.limbs = `${getRandom(limbsNum)} ${getRandom(limbsType)}`;

    const tSize = getRandom(tailSize);
    c.tail = tSize === 'none' ? 'none' : `${tSize} ${getRandom(tailType)}`;

    // Generate description based on new features
    let desc = `A ${c.bodySize}, ${c.bodyType} ${c.type}-type creature. `;
    desc += `It is covered in ${c.skinFurType} skin with distinct ${c.pattern}. `;
    desc += `Its ${c.eyes} eyes look out thoughtfully. `;
    if (c.wings !== 'none') desc += `It sports ${c.wings} and moves gracefully. `;
    if (c.clawHorn !== 'none') desc += `It defends itself with ${c.clawHorn}. `;
    if (c.teeth !== 'none') desc += `It flashes ${c.teeth} when threatened. `;
    desc += `It moves on ${c.limbs}. `;
    if (c.tail !== 'none') desc += `A ${c.tail} trails behind it. `;
    desc += `Most notably, it possesses ${c.uniqueFeature}.`;

    c.description = desc;
});

const newJson = JSON.stringify(baseCreatures, null, 4);
html = html.replace(regex, `window.baseCreatures = ${newJson};`);

fs.writeFileSync('index.html', html);
console.log("Updated baseCreatures in index.html");
