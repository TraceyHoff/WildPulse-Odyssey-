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
const bodySizes = ['miniscule', 'tiny', 'small', 'medium', 'large', 'massive', 'colossal', 'gigantic', 'immense', 'hulking', 'towering', 'diminutive', 'petite', 'stout', 'rotund'];
const bodyTypes = ['slender', 'stout', 'graceful', 'bulky', 'agile', 'sleek', 'muscular', 'lithe', 'spindly', 'lanky', 'burly', 'stocky', 'sinuous', 'angular', 'rounded', 'spiky', 'blocky', 'bipedal', 'quadrupedal', 'serpentine', 'floating'];
const uniqueFeatures = ['glowing markings', 'iridescent scales', 'crystalline spikes', 'ethereal aura', 'shadowy wisps', 'crackling energy', 'blooming flora', 'flowing water droplets', 'smoldering embers', 'floating orbs', 'spectral trails', 'metallic plating', 'bioluminescent spots', 'whirling winds', 'frost breath', 'venomous spines', 'magnetic repulsion', 'sonic vibrations', 'illusionary copies'];
const eyes = ['piercing', 'gentle', 'narrow', 'wide', 'glowing', 'mysterious', 'fierce', 'calm', 'compound', 'multiple', 'cyclopic', 'blind', 'hypnotic', 'crystalline', 'fiery', 'watery', 'starry', 'void-like'];
const skinFurTypes = ['smooth', 'bristly', 'silky', 'scaly', 'soft', 'rough', 'thick', 'feathered', 'leathery', 'armored', 'slimy', 'furry', 'woolly', 'metallic', 'translucent', 'stony', 'bark-like', 'gaseous', 'prismatic'];
const patterns = ['spots', 'swirls', 'patches', 'stripes', 'bands', 'runes', 'speckles', 'mottled', 'checkerboard', 'zigzag', 'geometric', 'tribal', 'camouflage', 'gradient', 'stippled', 'dappled', 'tiger-striped', 'leopard-spotted'];
const wingsType = ['none', 'none', 'none', 'none', 'feathered wings', 'leathery wings', 'insectoid wings', 'gossamer wings', 'energy wings', 'bone wings', 'crystal wings', 'leafy wings', 'webbed wings', 'shadow wings', 'mechanical wings', 'flame wings']; // higher chance for none
const wingsSize = ['tiny', 'small', 'medium', 'large', 'majestic', 'colossal', 'vestigial', 'oversized', 'asymmetrical'];
const clawHorn = ['razor-sharp claws', 'blunt claws', 'majestic horns', 'curved horns', 'spiraling horns', 'jagged spikes', 'none', 'serrated blades', 'hooked talons', 'crushing pincers', 'ramming plates', 'venomous stingers', 'glowing antlers', 'crystal shards'];
const teeth = ['wicked fangs', 'sharp teeth', 'blunt teeth', 'flat teeth', 'none', 'tusks', 'mandibles', 'saw-like teeth', 'needle-like teeth', 'crushing molars', 'protruding fangs', 'venomous fangs'];
const limbsNum = [0, 2, 4, 4, 4, 6, 8, 10, 100]; // mostly 4
const limbsType = ['sturdy legs', 'agile limbs', 'tentacles', 'paws', 'talons', 'hooves', 'flippers', 'pseudopods', 'mechanical legs', 'ethereal limbs', 'jointed appendages'];
const tailSize = ['short', 'long', 'sweeping', 'stubby', 'none', 'whip-like', 'massive', 'prehensile', 'twin', 'multiple'];
const tailType = ['fluffy tail', 'scaly tail', 'barbed tail', 'clubbed tail', 'flowing tail', 'feathered tail', 'spiked mace tail', 'stinger tail', 'fish-like tail', 'reptilian tail', 'bushy tail', 'skeletal tail'];
const colorsDesc = ['crimson', 'azure', 'emerald', 'golden', 'obsidian', 'amethyst', 'sapphire', 'ruby', 'pearl', 'silver', 'bronze', 'copper', 'jade', 'coral', 'indigo', 'violet', 'magenta', 'cyan', 'turquoise', 'teal', 'maroon', 'olive', 'navy', 'plum', 'peach', 'salmon', 'lavender', 'charcoal', 'ivory', 'amber', 'topaz', 'quartz', 'onyx', 'opal', 'neon green', 'electric blue', 'hot pink', 'pitch black', 'snow white', 'ash gray'];

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

    const lNum = getRandom(limbsNum);
    c.limbs = lNum === 0 ? 'none' : `${lNum} ${getRandom(limbsType)}`;

    const tSize = getRandom(tailSize);
    c.tail = tSize === 'none' ? 'none' : `${tSize} ${getRandom(tailType)}`;

    c.eyesColor = getRandom(colorsDesc);
    c.skinFurColor = getRandom(colorsDesc);
    c.wingsColor = c.wings === 'none' ? 'none' : getRandom(colorsDesc);
    c.clawHornColor = c.clawHorn === 'none' ? 'none' : getRandom(colorsDesc);
    c.tailColor = c.tail === 'none' ? 'none' : getRandom(colorsDesc);
    c.uniqueFeatureColor = getRandom(colorsDesc);

    // Generate description based on new features
    let desc = `A ${c.bodySize}, ${c.bodyType} ${c.type}-type creature. `;
    desc += `It is covered in ${c.skinFurColor} ${c.skinFurType} skin with distinct ${c.pattern}. `;
    desc += `Its ${c.eyesColor} ${c.eyes} eyes look out thoughtfully. `;
    if (c.wings !== 'none') desc += `It sports ${c.wingsColor} ${c.wings} and moves gracefully. `;
    if (c.clawHorn !== 'none') desc += `It defends itself with ${c.clawHornColor} ${c.clawHorn}. `;
    if (c.teeth !== 'none') desc += `It flashes ${c.teeth} when threatened. `;
    if (c.limbs !== 'none') desc += `It moves on ${c.limbs}. `;
    if (c.tail !== 'none') desc += `A ${c.tailColor} ${c.tail} trails behind it. `;
    desc += `Most notably, it possesses ${c.uniqueFeatureColor} ${c.uniqueFeature}.`;

    c.description = desc;
});

const newJson = JSON.stringify(baseCreatures, null, 4);
html = html.replace(regex, `window.baseCreatures = ${newJson};`);

fs.writeFileSync('index.html', html);
console.log("Updated baseCreatures in index.html");
