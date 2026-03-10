const fs = require('fs');

let content = fs.readFileSync('update_creatures.js', 'utf8');

const additions = {
    "Fire": ["scorching scales", "molten core", "fiery breath", "lava trail", "volcanic rock"],
    "Water": ["whirlpool aura", "tidal wave", "deep sea glow", "hydro jet", "coral reef armor"],
    "Nature": ["thorny vines", "poisonous sap", "rapid growth", "entangling roots", "floral crown"],
    "Electric": ["thunderclap", "static charge", "lightning rod", "shock wave", "plasma pulse"],
    "Ice": ["blizzard aura", "icicle barrage", "permafrost coating", "freezing touch", "glacier shield"],
    "Earth": ["tremor step", "bedrock armor", "sandstorm aura", "crystal spikes", "seismic slam"],
    "Wind": ["tornado tail", "cyclone blast", "soaring draft", "gale force", "hurricane eye"],
    "Light": ["radiant beam", "solar flare", "luminous halo", "divine spark", "blinding glow"],
    "Dark": ["shadow cloak", "abyssal gaze", "nightmare aura", "void strike", "eclipse shadow"],
    "Cosmic": ["starlight burst", "meteor shower", "black hole core", "supernova flash", "galactic spiral"]
};

for (const type in additions) {
    const searchRegex = new RegExp(`("${type}":\\s*{[^}]*?uniqueFeatures:\\s*\\[)([^\\]]+)(\\])`);
    content = content.replace(searchRegex, (match, p1, p2, p3) => {
        const newFeatures = additions[type].map(f => "'" + f + "'").join(', ');
        return p1 + p2 + ", " + newFeatures + p3;
    });
}

fs.writeFileSync('update_creatures.js', content);
console.log("update_creatures.js patched.");
