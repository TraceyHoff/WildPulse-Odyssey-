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

// Type Traits definitions
const typeTraits = {
    "Fire": {
        bodySizes: ['medium', 'large', 'massive', 'hulking', 'stout'],
        bodyTypes: ['muscular', 'burly', 'stocky', 'spiky', 'bipedal', 'quadrupedal'],
        uniqueFeatures: ['smoldering embers', 'flaming mane', 'magma veins', 'ash clouds', 'heat haze', 'scorching scales', 'molten core', 'fiery breath', 'lava trail', 'volcanic rock'],
        eyes: ['fiery', 'glowing', 'fierce', 'piercing'],
        skinFurTypes: ['scaly', 'rough', 'thick', 'leathery', 'stony'],
        patterns: ['swirling patterns', 'tiger stripes', 'gradient colors', 'ash patches'],
        wingsType: ['none', 'none', 'flame wings', 'leathery wings', 'ash wings'],
        wingsSize: ['medium', 'large', 'majestic', 'oversized'],
        clawHorn: ['curved horns', 'spiraling horns', 'razor-sharp claws', 'blunt claws'],
        teeth: ['wicked fangs', 'protruding fangs', 'sharp teeth'],
        limbsNum: [2, 4, 4, 6],
        limbsType: ['sturdy legs', 'paws', 'talons'],
        tailSize: ['short', 'long', 'whip-like', 'massive'],
        tailType: ['scaly tail', 'barbed tail', 'clubbed tail'],
        colorsDesc: ['crimson', 'ruby', 'scarlet', 'golden', 'amber', 'orange', 'obsidian', 'charcoal']
    },
    "Water": {
        bodySizes: ['small', 'medium', 'large', 'colossal', 'rotund'],
        bodyTypes: ['graceful', 'agile', 'sleek', 'sinuous', 'serpentine', 'floating'],
        uniqueFeatures: ['flowing water droplets', 'bubble clusters', 'misty aura', 'bioluminescent spots', 'coral growths', 'whirlpool aura', 'tidal wave', 'deep sea glow', 'hydro jet', 'coral reef armor'],
        eyes: ['watery', 'calm', 'gentle', 'wide'],
        skinFurTypes: ['smooth', 'slimy', 'scaly', 'soft', 'translucent'],
        patterns: ['bioluminescent spots', 'wavy bands', 'dappled patterns', 'mottled markings'],
        wingsType: ['none', 'none', 'none', 'webbed wings', 'fin-like wings'],
        wingsSize: ['tiny', 'small', 'medium', 'large'],
        clawHorn: ['none', 'none', 'hooked talons', 'smooth fins'],
        teeth: ['needle-like teeth', 'none', 'sharp teeth'],
        limbsNum: [0, 0, 4, 8],
        limbsType: ['flippers', 'tentacles', 'webbed feet'],
        tailSize: ['sweeping', 'long', 'prehensile', 'twin'],
        tailType: ['fish-like tail', 'flowing tail', 'paddle tail'],
        colorsDesc: ['azure', 'sapphire', 'cyan', 'turquoise', 'teal', 'navy', 'aquamarine', 'sea green', 'pearl']
    },
    "Nature": {
        bodySizes: ['tiny', 'small', 'medium', 'diminutive', 'petite'],
        bodyTypes: ['slender', 'graceful', 'lithe', 'spindly', 'lanky'],
        uniqueFeatures: ['blooming flora', 'leafy tendrils', 'vine wraps', 'pollen dust', 'bark armor', 'thorny vines', 'poisonous sap', 'rapid growth', 'entangling roots', 'floral crown'],
        eyes: ['gentle', 'compound', 'multiple', 'calm'],
        skinFurTypes: ['bark-like', 'leafy', 'mossy', 'furry', 'soft'],
        patterns: ['leafy speckles', 'natural camouflage', 'mossy patches', 'stippled marks'],
        wingsType: ['none', 'none', 'leafy wings', 'insectoid wings', 'gossamer wings'],
        wingsSize: ['small', 'medium', 'vestigial'],
        clawHorn: ['none', 'none', 'wooden antlers', 'thorny spikes'],
        teeth: ['flat teeth', 'none', 'mandibles'],
        limbsNum: [4, 4, 6, 8],
        limbsType: ['agile limbs', 'paws', 'jointed appendages'],
        tailSize: ['short', 'stubby', 'prehensile', 'none'],
        tailType: ['bushy tail', 'fluffy tail', 'vine-like tail'],
        colorsDesc: ['emerald', 'jade', 'olive', 'lime', 'forest green', 'brown', 'tan', 'floral pink']
    },
    "Electric": {
        bodySizes: ['miniscule', 'tiny', 'small', 'agile'],
        bodyTypes: ['agile', 'sleek', 'spiky', 'angular', 'lithe'],
        uniqueFeatures: ['crackling energy', 'static sparks', 'plasma orbs', 'lightning aura', 'magnetic repulsion', 'thunderclap', 'static charge', 'lightning rod', 'shock wave', 'plasma pulse'],
        eyes: ['glowing', 'piercing', 'electric', 'starry'],
        skinFurTypes: ['smooth', 'bristly', 'metallic', 'prismatic'],
        patterns: ['zigzag lines', 'electric stripes', 'geometric patterns', 'glowing bands'],
        wingsType: ['none', 'none', 'energy wings', 'mechanical wings'],
        wingsSize: ['tiny', 'medium', 'asymmetrical'],
        clawHorn: ['jagged spikes', 'crystal shards', 'metallic horns', 'none'],
        teeth: ['sharp teeth', 'needle-like teeth', 'none'],
        limbsNum: [4, 4, 6],
        limbsType: ['agile limbs', 'mechanical legs', 'paws'],
        tailSize: ['whip-like', 'long', 'twin'],
        tailType: ['barbed tail', 'sparking tail', 'cable-like tail'],
        colorsDesc: ['yellow', 'golden', 'electric blue', 'neon green', 'cyan', 'silver', 'white', 'magenta']
    },
    "Ice": {
        bodySizes: ['small', 'medium', 'large', 'stout', 'blocky'],
        bodyTypes: ['stout', 'angular', 'blocky', 'burly', 'floating'],
        uniqueFeatures: ['frost breath', 'icy mist', 'snow flurry', 'frozen crystals', 'chilling aura', 'blizzard aura', 'icicle barrage', 'permafrost coating', 'freezing touch', 'glacier shield'],
        eyes: ['crystalline', 'piercing', 'cold', 'blind'],
        skinFurTypes: ['woolly', 'thick', 'stony', 'smooth', 'translucent'],
        patterns: ['checkerboard patterns', 'frost patches', 'icy spots'],
        wingsType: ['none', 'none', 'crystal wings', 'snowy wings'],
        wingsSize: ['small', 'medium', 'large'],
        clawHorn: ['crystal shards', 'jagged spikes', 'icy tusks'],
        teeth: ['tusks', 'sharp teeth', 'none'],
        limbsNum: [4, 4, 2, 0],
        limbsType: ['sturdy legs', 'paws', 'flippers'],
        tailSize: ['stubby', 'short', 'none'],
        tailType: ['fluffy tail', 'crystalline tail', 'clubbed tail'],
        colorsDesc: ['snow white', 'ice blue', 'pale blue', 'cyan', 'silver', 'translucent blue', 'frost white']
    },
    "Earth": {
        bodySizes: ['medium', 'large', 'massive', 'hulking', 'colossal'],
        bodyTypes: ['stout', 'bulky', 'muscular', 'blocky', 'rounded'],
        uniqueFeatures: ['floating rocks', 'dust clouds', 'gemstone growths', 'sandstone plates', 'muddy aura', 'tremor step', 'bedrock armor', 'sandstorm aura', 'crystal spikes', 'seismic slam'],
        eyes: ['blind', 'narrow', 'calm', 'cyclopic'],
        skinFurTypes: ['stony', 'rough', 'armored', 'thick', 'leathery'],
        patterns: ['earthen bands', 'tribal markings', 'mottled rocks', 'cracked lines'],
        wingsType: ['none', 'none', 'none', 'stone wings'],
        wingsSize: ['small', 'vestigial', 'heavy'],
        clawHorn: ['blunt claws', 'crushing pincers', 'ramming plates', 'boulder horns'],
        teeth: ['crushing molars', 'tusks', 'blunt teeth'],
        limbsNum: [4, 4, 6],
        limbsType: ['sturdy legs', 'hooves', 'mechanical legs'],
        tailSize: ['short', 'massive', 'stubby'],
        tailType: ['clubbed tail', 'spiked mace tail', 'rocky tail'],
        colorsDesc: ['brown', 'bronze', 'copper', 'ochre', 'slate', 'charcoal', 'amber', 'sand', 'dusty grey']
    },
    "Wind": {
        bodySizes: ['miniscule', 'tiny', 'small', 'slender'],
        bodyTypes: ['graceful', 'agile', 'lithe', 'floating', 'spindly'],
        uniqueFeatures: ['whirling winds', 'updraft currents', 'cloud rings', 'feathery trails', 'cyclone aura', 'tornado tail', 'cyclone blast', 'soaring draft', 'gale force', 'hurricane eye'],
        eyes: ['piercing', 'narrow', 'clear', 'wide'],
        skinFurTypes: ['feathered', 'smooth', 'soft', 'gaseous'],
        patterns: ['wind swirls', 'breezy stripes', 'gradient colors', 'wispy trails'],
        wingsType: ['feathered wings', 'gossamer wings', 'energy wings', 'cloud wings'],
        wingsSize: ['large', 'majestic', 'oversized', 'colossal'],
        clawHorn: ['none', 'hooked talons', 'smooth crest'],
        teeth: ['none', 'sharp teeth'],
        limbsNum: [2, 4],
        limbsType: ['talons', 'agile limbs', 'ethereal limbs'],
        tailSize: ['sweeping', 'long', 'flowing', 'twin'],
        tailType: ['feathered tail', 'flowing tail', 'ribbon-like tail'],
        colorsDesc: ['white', 'sky blue', 'pale gray', 'silver', 'mint green', 'azure', 'lavender', 'cream']
    },
    "Light": {
        bodySizes: ['small', 'medium', 'graceful', 'towering'],
        bodyTypes: ['graceful', 'bipedal', 'floating', 'slender', 'radiant'],
        uniqueFeatures: ['glowing markings', 'ethereal aura', 'halo rings', 'blinding flash', 'prismatic light', 'radiant beam', 'solar flare', 'luminous halo', 'divine spark', 'blinding glow'],
        eyes: ['glowing', 'starry', 'gentle', 'hypnotic'],
        skinFurTypes: ['smooth', 'silky', 'prismatic', 'translucent', 'metallic'],
        patterns: ['glowing runes', 'radiant gradient', 'geometric shapes', 'sunburst designs'],
        wingsType: ['none', 'energy wings', 'feathered wings', 'crystal wings'],
        wingsSize: ['majestic', 'large', 'oversized', 'colossal'],
        clawHorn: ['glowing antlers', 'crystal shards', 'none'],
        teeth: ['none', 'flat teeth'],
        limbsNum: [2, 4, 0],
        limbsType: ['graceful legs', 'ethereal limbs', 'hovering bases'],
        tailSize: ['flowing', 'sweeping', 'long', 'multiple'],
        tailType: ['flowing tail', 'feathered tail', 'energy tail'],
        colorsDesc: ['gold', 'white', 'silver', 'pearl', 'ivory', 'yellow', 'pale yellow', 'peach', 'diamond']
    },
    "Dark": {
        bodySizes: ['medium', 'large', 'spindly', 'immense'],
        bodyTypes: ['spindly', 'lanky', 'serpentine', 'angular', 'shadowy'],
        uniqueFeatures: ['shadowy wisps', 'void aura', 'dark mist', 'nightmare trails', 'light-absorbing scales', 'shadow cloak', 'abyssal gaze', 'nightmare aura', 'void strike', 'eclipse shadow'],
        eyes: ['void-like', 'piercing', 'glowing', 'narrow'],
        skinFurTypes: ['rough', 'armored', 'slimy', 'gaseous', 'leathery'],
        patterns: ['shadow tribal marks', 'dark camouflage', 'mottled shadows', 'shadowy patches'],
        wingsType: ['none', 'shadow wings', 'leathery wings', 'bat-like wings'],
        wingsSize: ['large', 'majestic', 'asymmetrical', 'vestigial'],
        clawHorn: ['curved horns', 'jagged spikes', 'razor-sharp claws', 'wicked fangs'],
        teeth: ['wicked fangs', 'protruding fangs', 'sharp teeth'],
        limbsNum: [4, 6, 8],
        limbsType: ['paws', 'talons', 'jointed appendages'],
        tailSize: ['whip-like', 'prehensile', 'twin', 'multiple'],
        tailType: ['barbed tail', 'skeletal tail', 'stinger tail'],
        colorsDesc: ['pitch black', 'obsidian', 'onyx', 'charcoal', 'dark purple', 'indigo', 'midnight blue', 'blood red']
    },
    "Cosmic": {
        bodySizes: ['tiny', 'medium', 'immense', 'colossal', 'floating'],
        bodyTypes: ['floating', 'serpentine', 'graceful', 'bipedal', 'ethereal'],
        uniqueFeatures: ['floating orbs', 'starry aura', 'nebula dust', 'meteor fragments', 'gravity waves', 'starlight burst', 'meteor shower', 'black hole core', 'supernova flash', 'galactic spiral'],
        eyes: ['starry', 'multiple', 'hypnotic', 'blind', 'glowing'],
        skinFurTypes: ['metallic', 'prismatic', 'gaseous', 'smooth', 'translucent'],
        patterns: ['cosmic runes', 'nebula swirls', 'geometric stars', 'constellation patterns'],
        wingsType: ['none', 'energy wings', 'gossamer wings', 'starlight wings'],
        wingsSize: ['colossal', 'majestic', 'oversized'],
        clawHorn: ['crystal shards', 'glowing antlers', 'none', 'majestic horns'],
        teeth: ['none', 'flat teeth'],
        limbsNum: [0, 4, 100],
        limbsType: ['ethereal limbs', 'tentacles', 'pseudopods'],
        tailSize: ['massive', 'sweeping', 'multiple', 'none'],
        tailType: ['flowing tail', 'comet tail', 'stardust tail'],
        colorsDesc: ['magenta', 'cyan', 'purple', 'amethyst', 'violet', 'deep blue', 'starlight white', 'nebula pink']
    }
};

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
    const traits = typeTraits[c.type];

    c.bodySize = getRandom(traits.bodySizes);
    c.bodyType = getRandom(traits.bodyTypes);
    c.uniqueFeature = getRandom(traits.uniqueFeatures);
    c.eyes = getRandom(traits.eyes);
    c.skinFurType = getRandom(traits.skinFurTypes);
    c.pattern = getRandom(traits.patterns);

    const wType = getRandom(traits.wingsType);
    c.wings = wType === 'none' ? 'none' : `${getRandom(traits.wingsSize)} ${wType}`;

    c.clawHorn = getRandom(traits.clawHorn);
    c.teeth = getRandom(traits.teeth);

    const lNum = getRandom(traits.limbsNum);
    c.limbs = lNum === 0 ? 'none' : `${lNum} ${getRandom(traits.limbsType)}`;

    const tSize = getRandom(traits.tailSize);
    c.tail = tSize === 'none' ? 'none' : `${tSize} ${getRandom(traits.tailType)}`;

    c.eyesColor = getRandom(traits.colorsDesc);
    c.skinFurColor = getRandom(traits.colorsDesc);
    c.wingsColor = c.wings === 'none' ? 'none' : getRandom(traits.colorsDesc);
    c.clawHornColor = c.clawHorn === 'none' ? 'none' : getRandom(traits.colorsDesc);
    c.tailColor = c.tail === 'none' ? 'none' : getRandom(traits.colorsDesc);
    c.uniqueFeatureColor = getRandom(traits.colorsDesc);

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
