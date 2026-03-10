<script>

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.lobby-close-btn')?.addEventListener('click', () => document.getElementById('lobbyModal').style.display='none');
    document.getElementById('joinBtn')?.addEventListener('click', joinMultiplayerRoom);

    document.querySelector('.battle-close-btn')?.addEventListener('click', () => document.getElementById('battleModal').style.display='none');
    document.querySelector('.btn-attack')?.addEventListener('click', () => handlePlayerTurn('attack'));
    document.querySelector('.btn-catch')?.addEventListener('click', () => handlePlayerTurn('catch'));
    document.querySelector('.btn-run')?.addEventListener('click', () => handlePlayerTurn('run'));

    document.getElementById('menuBtn')?.addEventListener('click', openMenuModal);

    document.getElementById('menuPartyBtn')?.addEventListener('click', openPartyModal);
    document.getElementById('breedBtn')?.addEventListener('click', openBreedingModal);
    document.getElementById('menuHelpBtn')?.addEventListener('click', openHelpModal);
    document.getElementById('menuDeleteBtn')?.addEventListener('click', deleteProgress);

    document.querySelectorAll('.close-menu-btn').forEach(btn => btn.addEventListener('click', closeMenuModal));
    document.querySelectorAll('.close-party-btn').forEach(btn => btn.addEventListener('click', closePartyModal));
    document.querySelectorAll('.close-help-btn').forEach(btn => btn.addEventListener('click', closeHelpModal));

    document.getElementById('doBreedBtn')?.addEventListener('click', doBreed);
    document.querySelectorAll('.close-breeding-btn').forEach(btn => btn.addEventListener('click', closeBreedingModal));
});

document.addEventListener('click', function(e) {
    if (e.target.matches('.save-name-btn')) {
        const index = e.target.getAttribute('data-index');
        window.saveName(e.target, parseInt(index));
    } else if (e.target.matches('.move-up-btn')) {
        const index = e.target.getAttribute('data-index');
        window.moveUp(parseInt(index));
    } else if (e.target.matches('.move-down-btn')) {
        const index = e.target.getAttribute('data-index');
        window.moveDown(parseInt(index));
    } else if (e.target.matches('.release-btn')) {
        const index = e.target.getAttribute('data-index');
        window.releaseCreature(parseInt(index));
    }
});


window.baseCreatures = [
    {
        "id": 1,
        "name": "Flamebeast",
        "description": "A large, muscular Fire-type creature. It is covered in pearl feathered skin with distinct checkerboard. Its azure multiple eyes look out thoughtfully. It sports obsidian tiny leafy wings and moves gracefully. It flashes crushing molars when threatened. It moves on 2 pseudopods. A sapphire short clubbed tail trails behind it. Most notably, it possesses golden venomous spines.",
        "features": [
            "horns",
            "claws",
            "fur"
        ],
        "type": "Fire",
        "stats": {
            "health": 88,
            "attack": 49
        },
        "generation": 1,
        "color": 16711680,
        "bodySize": "large",
        "bodyType": "muscular",
        "uniqueFeature": "venomous spines",
        "eyes": "multiple",
        "skinFurType": "feathered",
        "pattern": "checkerboard",
        "wings": "tiny leafy wings",
        "clawHorn": "none",
        "teeth": "crushing molars",
        "limbs": "2 pseudopods",
        "tail": "short clubbed tail",
        "eyesColor": "azure",
        "skinFurColor": "pearl",
        "wingsColor": "obsidian",
        "clawHornColor": "none",
        "tailColor": "sapphire",
        "uniqueFeatureColor": "golden"
    },
    {
        "id": 2,
        "name": "Aquabeast",
        "description": "A immense, serpentine Water-type creature. It is covered in pearl silky skin with distinct checkerboard. Its pearl compound eyes look out thoughtfully. It defends itself with cyan glowing antlers. It flashes venomous fangs when threatened. It moves on 100 hooves. A teal short clubbed tail trails behind it. Most notably, it possesses turquoise floating orbs.",
        "features": [
            "glowing",
            "shell"
        ],
        "type": "Water",
        "stats": {
            "health": 82,
            "attack": 66
        },
        "generation": 1,
        "color": 255,
        "bodySize": "immense",
        "bodyType": "serpentine",
        "uniqueFeature": "floating orbs",
        "eyes": "compound",
        "skinFurType": "silky",
        "pattern": "checkerboard",
        "wings": "none",
        "clawHorn": "glowing antlers",
        "teeth": "venomous fangs",
        "limbs": "100 hooves",
        "tail": "short clubbed tail",
        "eyesColor": "pearl",
        "skinFurColor": "pearl",
        "wingsColor": "none",
        "clawHornColor": "cyan",
        "tailColor": "teal",
        "uniqueFeatureColor": "turquoise"
    },
    {
        "id": 3,
        "name": "Leafbeast",
        "description": "A colossal, slender Nature-type creature. It is covered in pearl silky skin with distinct geometric. Its navy narrow eyes look out thoughtfully. It sports opal colossal energy wings and moves gracefully. It defends itself with topaz crushing pincers. It flashes crushing molars when threatened. It moves on 4 hooves. A azure multiple fluffy tail trails behind it. Most notably, it possesses amber ethereal aura.",
        "features": [
            "shell",
            "glowing"
        ],
        "type": "Nature",
        "stats": {
            "health": 89,
            "attack": 63
        },
        "generation": 1,
        "color": 65280,
        "bodySize": "colossal",
        "bodyType": "slender",
        "uniqueFeature": "ethereal aura",
        "eyes": "narrow",
        "skinFurType": "silky",
        "pattern": "geometric",
        "wings": "colossal energy wings",
        "clawHorn": "crushing pincers",
        "teeth": "crushing molars",
        "limbs": "4 hooves",
        "tail": "multiple fluffy tail",
        "eyesColor": "navy",
        "skinFurColor": "pearl",
        "wingsColor": "opal",
        "clawHornColor": "topaz",
        "tailColor": "azure",
        "uniqueFeatureColor": "amber"
    },
    {
        "id": 4,
        "name": "Zapbeast",
        "description": "A colossal, slender Electric-type creature. It is covered in quartz thick skin with distinct patches. Its salmon narrow eyes look out thoughtfully. It sports obsidian tiny mechanical wings and moves gracefully. It defends itself with hot pink glowing antlers. It flashes saw-like teeth when threatened. A ivory stubby fluffy tail trails behind it. Most notably, it possesses topaz blooming flora.",
        "features": [
            "fangs",
            "shell",
            "glowing"
        ],
        "type": "Electric",
        "stats": {
            "health": 90,
            "attack": 31
        },
        "generation": 1,
        "color": 16776960,
        "bodySize": "colossal",
        "bodyType": "slender",
        "uniqueFeature": "blooming flora",
        "eyes": "narrow",
        "skinFurType": "thick",
        "pattern": "patches",
        "wings": "tiny mechanical wings",
        "clawHorn": "glowing antlers",
        "teeth": "saw-like teeth",
        "limbs": "none",
        "tail": "stubby fluffy tail",
        "eyesColor": "salmon",
        "skinFurColor": "quartz",
        "wingsColor": "obsidian",
        "clawHornColor": "hot pink",
        "tailColor": "ivory",
        "uniqueFeatureColor": "topaz"
    },
    {
        "id": 5,
        "name": "Frostbeast",
        "description": "A stout, angular Ice-type creature. It is covered in emerald leathery skin with distinct geometric. Its cyan piercing eyes look out thoughtfully. It sports opal medium insectoid wings and moves gracefully. It defends itself with onyx glowing antlers. It flashes blunt teeth when threatened. A topaz long skeletal tail trails behind it. Most notably, it possesses teal blooming flora.",
        "features": [
            "tail",
            "fangs"
        ],
        "type": "Ice",
        "stats": {
            "health": 111,
            "attack": 65
        },
        "generation": 1,
        "color": 65535,
        "bodySize": "stout",
        "bodyType": "angular",
        "uniqueFeature": "blooming flora",
        "eyes": "piercing",
        "skinFurType": "leathery",
        "pattern": "geometric",
        "wings": "medium insectoid wings",
        "clawHorn": "glowing antlers",
        "teeth": "blunt teeth",
        "limbs": "none",
        "tail": "long skeletal tail",
        "eyesColor": "cyan",
        "skinFurColor": "emerald",
        "wingsColor": "opal",
        "clawHornColor": "onyx",
        "tailColor": "topaz",
        "uniqueFeatureColor": "teal"
    },
    {
        "id": 6,
        "name": "Rockbeast",
        "description": "A small, graceful Earth-type creature. It is covered in silver stony skin with distinct bands. Its golden starry eyes look out thoughtfully. It defends itself with charcoal razor-sharp claws. It flashes crushing molars when threatened. It moves on 4 sturdy legs. A ivory whip-like clubbed tail trails behind it. Most notably, it possesses pitch black magnetic repulsion.",
        "features": [
            "scales",
            "shell"
        ],
        "type": "Earth",
        "stats": {
            "health": 82,
            "attack": 68
        },
        "generation": 1,
        "color": 9127187,
        "bodySize": "small",
        "bodyType": "graceful",
        "uniqueFeature": "magnetic repulsion",
        "eyes": "starry",
        "skinFurType": "stony",
        "pattern": "bands",
        "wings": "none",
        "clawHorn": "razor-sharp claws",
        "teeth": "crushing molars",
        "limbs": "4 sturdy legs",
        "tail": "whip-like clubbed tail",
        "eyesColor": "golden",
        "skinFurColor": "silver",
        "wingsColor": "none",
        "clawHornColor": "charcoal",
        "tailColor": "ivory",
        "uniqueFeatureColor": "pitch black"
    },
    {
        "id": 7,
        "name": "Aerobeast",
        "description": "A miniscule, graceful Wind-type creature. It is covered in charcoal rough skin with distinct bands. Its cyan narrow eyes look out thoughtfully. It defends itself with amber glowing antlers. It flashes saw-like teeth when threatened. It moves on 4 ethereal limbs. Most notably, it possesses copper blooming flora.",
        "features": [
            "scales",
            "claws",
            "shell"
        ],
        "type": "Wind",
        "stats": {
            "health": 98,
            "attack": 53
        },
        "generation": 1,
        "color": 13882323,
        "bodySize": "miniscule",
        "bodyType": "graceful",
        "uniqueFeature": "blooming flora",
        "eyes": "narrow",
        "skinFurType": "rough",
        "pattern": "bands",
        "wings": "none",
        "clawHorn": "glowing antlers",
        "teeth": "saw-like teeth",
        "limbs": "4 ethereal limbs",
        "tail": "none",
        "eyesColor": "cyan",
        "skinFurColor": "charcoal",
        "wingsColor": "none",
        "clawHornColor": "amber",
        "tailColor": "none",
        "uniqueFeatureColor": "copper"
    },
    {
        "id": 8,
        "name": "Sunbeast",
        "description": "A massive, stocky Light-type creature. It is covered in peach leathery skin with distinct tribal. Its azure compound eyes look out thoughtfully. It sports lavender majestic leathery wings and moves gracefully. It defends itself with emerald glowing antlers. It flashes wicked fangs when threatened. It moves on 8 agile limbs. A lavender twin fish-like tail trails behind it. Most notably, it possesses salmon magnetic repulsion.",
        "features": [
            "horns",
            "shell",
            "tail"
        ],
        "type": "Light",
        "stats": {
            "health": 103,
            "attack": 62
        },
        "generation": 1,
        "color": 16777215,
        "bodySize": "massive",
        "bodyType": "stocky",
        "uniqueFeature": "magnetic repulsion",
        "eyes": "compound",
        "skinFurType": "leathery",
        "pattern": "tribal",
        "wings": "majestic leathery wings",
        "clawHorn": "glowing antlers",
        "teeth": "wicked fangs",
        "limbs": "8 agile limbs",
        "tail": "twin fish-like tail",
        "eyesColor": "azure",
        "skinFurColor": "peach",
        "wingsColor": "lavender",
        "clawHornColor": "emerald",
        "tailColor": "lavender",
        "uniqueFeatureColor": "salmon"
    },
    {
        "id": 9,
        "name": "Voidbeast",
        "description": "A massive, spindly Dark-type creature. It is covered in amber armored skin with distinct tribal. Its charcoal void-like eyes look out thoughtfully. It defends itself with copper curved horns. It flashes sharp teeth when threatened. It moves on 4 flippers. A amethyst short fish-like tail trails behind it. Most notably, it possesses salmon whirling winds.",
        "features": [
            "fur",
            "fangs",
            "horns"
        ],
        "type": "Dark",
        "stats": {
            "health": 92,
            "attack": 32
        },
        "generation": 1,
        "color": 4473924,
        "bodySize": "massive",
        "bodyType": "spindly",
        "uniqueFeature": "whirling winds",
        "eyes": "void-like",
        "skinFurType": "armored",
        "pattern": "tribal",
        "wings": "none",
        "clawHorn": "curved horns",
        "teeth": "sharp teeth",
        "limbs": "4 flippers",
        "tail": "short fish-like tail",
        "eyesColor": "charcoal",
        "skinFurColor": "amber",
        "wingsColor": "none",
        "clawHornColor": "copper",
        "tailColor": "amethyst",
        "uniqueFeatureColor": "salmon"
    },
    {
        "id": 10,
        "name": "Starbeast",
        "description": "A small, lanky Cosmic-type creature. It is covered in lavender furry skin with distinct bands. Its coral crystalline eyes look out thoughtfully. It sports indigo medium gossamer wings and moves gracefully. It defends itself with pearl crushing pincers. It flashes wicked fangs when threatened. It moves on 8 hooves. A electric blue massive spiked mace tail trails behind it. Most notably, it possesses ruby sonic vibrations.",
        "features": [
            "shell",
            "scales",
            "glowing"
        ],
        "type": "Cosmic",
        "stats": {
            "health": 111,
            "attack": 59
        },
        "generation": 1,
        "color": 8388736,
        "bodySize": "small",
        "bodyType": "lanky",
        "uniqueFeature": "sonic vibrations",
        "eyes": "crystalline",
        "skinFurType": "furry",
        "pattern": "bands",
        "wings": "medium gossamer wings",
        "clawHorn": "crushing pincers",
        "teeth": "wicked fangs",
        "limbs": "8 hooves",
        "tail": "massive spiked mace tail",
        "eyesColor": "coral",
        "skinFurColor": "lavender",
        "wingsColor": "indigo",
        "clawHornColor": "pearl",
        "tailColor": "electric blue",
        "uniqueFeatureColor": "ruby"
    },
    {
        "id": 11,
        "name": "Pyrowing",
        "description": "A petite, quadrupedal Fire-type creature. It is covered in crimson stony skin with distinct patches. Its indigo void-like eyes look out thoughtfully. It sports magenta colossal leathery wings and moves gracefully. It defends itself with opal blunt claws. It flashes saw-like teeth when threatened. It moves on 6 hooves. A golden sweeping clubbed tail trails behind it. Most notably, it possesses amethyst bioluminescent spots.",
        "features": [
            "flying",
            "fangs",
            "shell"
        ],
        "type": "Fire",
        "stats": {
            "health": 83,
            "attack": 44
        },
        "generation": 1,
        "color": 16711680,
        "bodySize": "petite",
        "bodyType": "quadrupedal",
        "uniqueFeature": "bioluminescent spots",
        "eyes": "void-like",
        "skinFurType": "stony",
        "pattern": "patches",
        "wings": "colossal leathery wings",
        "clawHorn": "blunt claws",
        "teeth": "saw-like teeth",
        "limbs": "6 hooves",
        "tail": "sweeping clubbed tail",
        "eyesColor": "indigo",
        "skinFurColor": "crimson",
        "wingsColor": "magenta",
        "clawHornColor": "opal",
        "tailColor": "golden",
        "uniqueFeatureColor": "amethyst"
    },
    {
        "id": 12,
        "name": "Hydrowing",
        "description": "A medium, serpentine Water-type creature. It is covered in obsidian bark-like skin with distinct tribal. Its charcoal starry eyes look out thoughtfully. It defends itself with teal crushing pincers. It flashes crushing molars when threatened. It moves on 10 flippers. A opal sweeping stinger tail trails behind it. Most notably, it possesses crimson iridescent scales.",
        "features": [
            "shell",
            "claws"
        ],
        "type": "Water",
        "stats": {
            "health": 115,
            "attack": 65
        },
        "generation": 1,
        "color": 255,
        "bodySize": "medium",
        "bodyType": "serpentine",
        "uniqueFeature": "iridescent scales",
        "eyes": "starry",
        "skinFurType": "bark-like",
        "pattern": "tribal",
        "wings": "none",
        "clawHorn": "crushing pincers",
        "teeth": "crushing molars",
        "limbs": "10 flippers",
        "tail": "sweeping stinger tail",
        "eyesColor": "charcoal",
        "skinFurColor": "obsidian",
        "wingsColor": "none",
        "clawHornColor": "teal",
        "tailColor": "opal",
        "uniqueFeatureColor": "crimson"
    },
    {
        "id": 13,
        "name": "Flora wing",
        "description": "A medium, spindly Nature-type creature. It is covered in magenta stony skin with distinct speckles. Its indigo glowing eyes look out thoughtfully. It defends itself with azure razor-sharp claws. It flashes blunt teeth when threatened. It moves on 8 tentacles. A plum twin skeletal tail trails behind it. Most notably, it possesses jade sonic vibrations.",
        "features": [
            "tail",
            "flying"
        ],
        "type": "Nature",
        "stats": {
            "health": 98,
            "attack": 69
        },
        "generation": 1,
        "color": 65280,
        "bodySize": "medium",
        "bodyType": "spindly",
        "uniqueFeature": "sonic vibrations",
        "eyes": "glowing",
        "skinFurType": "stony",
        "pattern": "speckles",
        "wings": "none",
        "clawHorn": "razor-sharp claws",
        "teeth": "blunt teeth",
        "limbs": "8 tentacles",
        "tail": "twin skeletal tail",
        "eyesColor": "indigo",
        "skinFurColor": "magenta",
        "wingsColor": "none",
        "clawHornColor": "azure",
        "tailColor": "plum",
        "uniqueFeatureColor": "jade"
    },
    {
        "id": 14,
        "name": "Voltawing",
        "description": "A medium, agile Electric-type creature. It is covered in jade translucent skin with distinct zigzag. Its azure mysterious eyes look out thoughtfully. It sports jade colossal bone wings and moves gracefully. It defends itself with opal venomous stingers. It flashes protruding fangs when threatened. It moves on 4 paws. A onyx short skeletal tail trails behind it. Most notably, it possesses teal whirling winds.",
        "features": [
            "fur",
            "claws",
            "scales"
        ],
        "type": "Electric",
        "stats": {
            "health": 99,
            "attack": 56
        },
        "generation": 1,
        "color": 16776960,
        "bodySize": "medium",
        "bodyType": "agile",
        "uniqueFeature": "whirling winds",
        "eyes": "mysterious",
        "skinFurType": "translucent",
        "pattern": "zigzag",
        "wings": "colossal bone wings",
        "clawHorn": "venomous stingers",
        "teeth": "protruding fangs",
        "limbs": "4 paws",
        "tail": "short skeletal tail",
        "eyesColor": "azure",
        "skinFurColor": "jade",
        "wingsColor": "jade",
        "clawHornColor": "opal",
        "tailColor": "onyx",
        "uniqueFeatureColor": "teal"
    },
    {
        "id": 15,
        "name": "Glacierwing",
        "description": "A diminutive, lanky Ice-type creature. It is covered in jade gaseous skin with distinct leopard-spotted. Its coral blind eyes look out thoughtfully. It sports snow white medium bone wings and moves gracefully. It defends itself with opal jagged spikes. It flashes blunt teeth when threatened. It moves on 8 paws. A indigo long scaly tail trails behind it. Most notably, it possesses plum whirling winds.",
        "features": [
            "fur",
            "glowing",
            "horns"
        ],
        "type": "Ice",
        "stats": {
            "health": 94,
            "attack": 48
        },
        "generation": 1,
        "color": 65535,
        "bodySize": "diminutive",
        "bodyType": "lanky",
        "uniqueFeature": "whirling winds",
        "eyes": "blind",
        "skinFurType": "gaseous",
        "pattern": "leopard-spotted",
        "wings": "medium bone wings",
        "clawHorn": "jagged spikes",
        "teeth": "blunt teeth",
        "limbs": "8 paws",
        "tail": "long scaly tail",
        "eyesColor": "coral",
        "skinFurColor": "jade",
        "wingsColor": "snow white",
        "clawHornColor": "opal",
        "tailColor": "indigo",
        "uniqueFeatureColor": "plum"
    },
    {
        "id": 16,
        "name": "Terra wing",
        "description": "A towering, graceful Earth-type creature. It is covered in ash gray silky skin with distinct leopard-spotted. Its turquoise piercing eyes look out thoughtfully. It defends itself with golden blunt claws. It flashes needle-like teeth when threatened. A topaz long barbed tail trails behind it. Most notably, it possesses charcoal blooming flora.",
        "features": [
            "flying",
            "shell",
            "tail"
        ],
        "type": "Earth",
        "stats": {
            "health": 82,
            "attack": 38
        },
        "generation": 1,
        "color": 9127187,
        "bodySize": "towering",
        "bodyType": "graceful",
        "uniqueFeature": "blooming flora",
        "eyes": "piercing",
        "skinFurType": "silky",
        "pattern": "leopard-spotted",
        "wings": "none",
        "clawHorn": "blunt claws",
        "teeth": "needle-like teeth",
        "limbs": "none",
        "tail": "long barbed tail",
        "eyesColor": "turquoise",
        "skinFurColor": "ash gray",
        "wingsColor": "none",
        "clawHornColor": "golden",
        "tailColor": "topaz",
        "uniqueFeatureColor": "charcoal"
    },
    {
        "id": 17,
        "name": "Zephyrwing",
        "description": "A gigantic, spiky Wind-type creature. It is covered in coral feathered skin with distinct swirls. Its turquoise piercing eyes look out thoughtfully. It defends itself with amber blunt claws. It flashes blunt teeth when threatened. It moves on 4 jointed appendages. A obsidian twin flowing tail trails behind it. Most notably, it possesses navy whirling winds.",
        "features": [
            "claws",
            "horns",
            "glowing"
        ],
        "type": "Wind",
        "stats": {
            "health": 111,
            "attack": 37
        },
        "generation": 1,
        "color": 13882323,
        "bodySize": "gigantic",
        "bodyType": "spiky",
        "uniqueFeature": "whirling winds",
        "eyes": "piercing",
        "skinFurType": "feathered",
        "pattern": "swirls",
        "wings": "none",
        "clawHorn": "blunt claws",
        "teeth": "blunt teeth",
        "limbs": "4 jointed appendages",
        "tail": "twin flowing tail",
        "eyesColor": "turquoise",
        "skinFurColor": "coral",
        "wingsColor": "none",
        "clawHornColor": "amber",
        "tailColor": "obsidian",
        "uniqueFeatureColor": "navy"
    },
    {
        "id": 18,
        "name": "Luxwing",
        "description": "A tiny, bipedal Light-type creature. It is covered in salmon furry skin with distinct tiger-striped. Its pitch black starry eyes look out thoughtfully. It defends itself with opal hooked talons. It flashes flat teeth when threatened. It moves on 100 ethereal limbs. A magenta twin fish-like tail trails behind it. Most notably, it possesses crimson crystalline spikes.",
        "features": [
            "wings",
            "glowing"
        ],
        "type": "Light",
        "stats": {
            "health": 110,
            "attack": 50
        },
        "generation": 1,
        "color": 16777215,
        "bodySize": "tiny",
        "bodyType": "bipedal",
        "uniqueFeature": "crystalline spikes",
        "eyes": "starry",
        "skinFurType": "furry",
        "pattern": "tiger-striped",
        "wings": "none",
        "clawHorn": "hooked talons",
        "teeth": "flat teeth",
        "limbs": "100 ethereal limbs",
        "tail": "twin fish-like tail",
        "eyesColor": "pitch black",
        "skinFurColor": "salmon",
        "wingsColor": "none",
        "clawHornColor": "opal",
        "tailColor": "magenta",
        "uniqueFeatureColor": "crimson"
    },
    {
        "id": 19,
        "name": "Shadowing",
        "description": "A gigantic, serpentine Dark-type creature. It is covered in ivory rough skin with distinct spots. Its emerald wide eyes look out thoughtfully. It sports emerald oversized feathered wings and moves gracefully. It defends itself with crimson spiraling horns. It flashes blunt teeth when threatened. It moves on 10 ethereal limbs. A jade stubby flowing tail trails behind it. Most notably, it possesses charcoal magnetic repulsion.",
        "features": [
            "shell",
            "claws",
            "wings"
        ],
        "type": "Dark",
        "stats": {
            "health": 98,
            "attack": 31
        },
        "generation": 1,
        "color": 4473924,
        "bodySize": "gigantic",
        "bodyType": "serpentine",
        "uniqueFeature": "magnetic repulsion",
        "eyes": "wide",
        "skinFurType": "rough",
        "pattern": "spots",
        "wings": "oversized feathered wings",
        "clawHorn": "spiraling horns",
        "teeth": "blunt teeth",
        "limbs": "10 ethereal limbs",
        "tail": "stubby flowing tail",
        "eyesColor": "emerald",
        "skinFurColor": "ivory",
        "wingsColor": "emerald",
        "clawHornColor": "crimson",
        "tailColor": "jade",
        "uniqueFeatureColor": "charcoal"
    },
    {
        "id": 20,
        "name": "Nova wing",
        "description": "A colossal, serpentine Cosmic-type creature. It is covered in ash gray stony skin with distinct runes. Its peach watery eyes look out thoughtfully. It sports amethyst medium leafy wings and moves gracefully. It defends itself with obsidian blunt claws. It flashes venomous fangs when threatened. It moves on 6 sturdy legs. A indigo whip-like stinger tail trails behind it. Most notably, it possesses topaz smoldering embers.",
        "features": [
            "flying",
            "horns"
        ],
        "type": "Cosmic",
        "stats": {
            "health": 91,
            "attack": 43
        },
        "generation": 1,
        "color": 8388736,
        "bodySize": "colossal",
        "bodyType": "serpentine",
        "uniqueFeature": "smoldering embers",
        "eyes": "watery",
        "skinFurType": "stony",
        "pattern": "runes",
        "wings": "medium leafy wings",
        "clawHorn": "blunt claws",
        "teeth": "venomous fangs",
        "limbs": "6 sturdy legs",
        "tail": "whip-like stinger tail",
        "eyesColor": "peach",
        "skinFurColor": "ash gray",
        "wingsColor": "amethyst",
        "clawHornColor": "obsidian",
        "tailColor": "indigo",
        "uniqueFeatureColor": "topaz"
    },
    {
        "id": 21,
        "name": "Cinderclaw",
        "description": "A medium, sinuous Fire-type creature. It is covered in opal translucent skin with distinct dappled. Its lavender crystalline eyes look out thoughtfully. It sports topaz asymmetrical webbed wings and moves gracefully. It defends itself with neon green ramming plates. It flashes blunt teeth when threatened. It moves on 10 flippers. A maroon whip-like feathered tail trails behind it. Most notably, it possesses salmon crystalline spikes.",
        "features": [
            "horns",
            "claws",
            "glowing"
        ],
        "type": "Fire",
        "stats": {
            "health": 102,
            "attack": 41
        },
        "generation": 1,
        "color": 16711680,
        "bodySize": "medium",
        "bodyType": "sinuous",
        "uniqueFeature": "crystalline spikes",
        "eyes": "crystalline",
        "skinFurType": "translucent",
        "pattern": "dappled",
        "wings": "asymmetrical webbed wings",
        "clawHorn": "ramming plates",
        "teeth": "blunt teeth",
        "limbs": "10 flippers",
        "tail": "whip-like feathered tail",
        "eyesColor": "lavender",
        "skinFurColor": "opal",
        "wingsColor": "topaz",
        "clawHornColor": "neon green",
        "tailColor": "maroon",
        "uniqueFeatureColor": "salmon"
    },
    {
        "id": 22,
        "name": "Tideclaw",
        "description": "A rotund, rounded Water-type creature. It is covered in violet smooth skin with distinct leopard-spotted. Its bronze calm eyes look out thoughtfully. It sports magenta oversized leafy wings and moves gracefully. It defends itself with lavender spiraling horns. It flashes venomous fangs when threatened. It moves on 2 hooves. A maroon short feathered tail trails behind it. Most notably, it possesses ash gray bioluminescent spots.",
        "features": [
            "horns",
            "fur",
            "shell"
        ],
        "type": "Water",
        "stats": {
            "health": 86,
            "attack": 33
        },
        "generation": 1,
        "color": 255,
        "bodySize": "rotund",
        "bodyType": "rounded",
        "uniqueFeature": "bioluminescent spots",
        "eyes": "calm",
        "skinFurType": "smooth",
        "pattern": "leopard-spotted",
        "wings": "oversized leafy wings",
        "clawHorn": "spiraling horns",
        "teeth": "venomous fangs",
        "limbs": "2 hooves",
        "tail": "short feathered tail",
        "eyesColor": "bronze",
        "skinFurColor": "violet",
        "wingsColor": "magenta",
        "clawHornColor": "lavender",
        "tailColor": "maroon",
        "uniqueFeatureColor": "ash gray"
    },
    {
        "id": 23,
        "name": "Thornclaw",
        "description": "A rotund, slender Nature-type creature. It is covered in navy bark-like skin with distinct mottled. Its jade blind eyes look out thoughtfully. It defends itself with jade glowing antlers. It flashes venomous fangs when threatened. A pitch black multiple bushy tail trails behind it. Most notably, it possesses emerald illusionary copies.",
        "features": [
            "fur",
            "scales"
        ],
        "type": "Nature",
        "stats": {
            "health": 103,
            "attack": 63
        },
        "generation": 1,
        "color": 65280,
        "bodySize": "rotund",
        "bodyType": "slender",
        "uniqueFeature": "illusionary copies",
        "eyes": "blind",
        "skinFurType": "bark-like",
        "pattern": "mottled",
        "wings": "none",
        "clawHorn": "glowing antlers",
        "teeth": "venomous fangs",
        "limbs": "none",
        "tail": "multiple bushy tail",
        "eyesColor": "jade",
        "skinFurColor": "navy",
        "wingsColor": "none",
        "clawHornColor": "jade",
        "tailColor": "pitch black",
        "uniqueFeatureColor": "emerald"
    },
    {
        "id": 24,
        "name": "Sparkclaw",
        "description": "A gigantic, bulky Electric-type creature. It is covered in maroon leathery skin with distinct checkerboard. Its cyan cyclopic eyes look out thoughtfully. It sports navy oversized mechanical wings and moves gracefully. It defends itself with salmon curved horns. It flashes wicked fangs when threatened. It moves on 100 paws. A plum massive scaly tail trails behind it. Most notably, it possesses azure magnetic repulsion.",
        "features": [
            "horns",
            "fur",
            "wings"
        ],
        "type": "Electric",
        "stats": {
            "health": 99,
            "attack": 66
        },
        "generation": 1,
        "color": 16776960,
        "bodySize": "gigantic",
        "bodyType": "bulky",
        "uniqueFeature": "magnetic repulsion",
        "eyes": "cyclopic",
        "skinFurType": "leathery",
        "pattern": "checkerboard",
        "wings": "oversized mechanical wings",
        "clawHorn": "curved horns",
        "teeth": "wicked fangs",
        "limbs": "100 paws",
        "tail": "massive scaly tail",
        "eyesColor": "cyan",
        "skinFurColor": "maroon",
        "wingsColor": "navy",
        "clawHornColor": "salmon",
        "tailColor": "plum",
        "uniqueFeatureColor": "azure"
    },
    {
        "id": 25,
        "name": "Snowclaw",
        "description": "A large, burly Ice-type creature. It is covered in snow white woolly skin with distinct spots. Its jade cyclopic eyes look out thoughtfully. It sports peach medium shadow wings and moves gracefully. It defends itself with indigo hooked talons. It flashes saw-like teeth when threatened. It moves on 6 flippers. A opal stubby spiked mace tail trails behind it. Most notably, it possesses pitch black magnetic repulsion.",
        "features": [
            "flying",
            "glowing",
            "fangs"
        ],
        "type": "Ice",
        "stats": {
            "health": 115,
            "attack": 62
        },
        "generation": 1,
        "color": 65535,
        "bodySize": "large",
        "bodyType": "burly",
        "uniqueFeature": "magnetic repulsion",
        "eyes": "cyclopic",
        "skinFurType": "woolly",
        "pattern": "spots",
        "wings": "medium shadow wings",
        "clawHorn": "hooked talons",
        "teeth": "saw-like teeth",
        "limbs": "6 flippers",
        "tail": "stubby spiked mace tail",
        "eyesColor": "jade",
        "skinFurColor": "snow white",
        "wingsColor": "peach",
        "clawHornColor": "indigo",
        "tailColor": "opal",
        "uniqueFeatureColor": "pitch black"
    },
    {
        "id": 26,
        "name": "Stoneclaw",
        "description": "A miniscule, bipedal Earth-type creature. It is covered in copper leathery skin with distinct runes. Its maroon gentle eyes look out thoughtfully. It sports obsidian vestigial shadow wings and moves gracefully. It defends itself with charcoal majestic horns. It flashes venomous fangs when threatened. It moves on 4 mechanical legs. A topaz prehensile flowing tail trails behind it. Most notably, it possesses magenta magnetic repulsion.",
        "features": [
            "horns",
            "wings",
            "claws"
        ],
        "type": "Earth",
        "stats": {
            "health": 82,
            "attack": 44
        },
        "generation": 1,
        "color": 9127187,
        "bodySize": "miniscule",
        "bodyType": "bipedal",
        "uniqueFeature": "magnetic repulsion",
        "eyes": "gentle",
        "skinFurType": "leathery",
        "pattern": "runes",
        "wings": "vestigial shadow wings",
        "clawHorn": "majestic horns",
        "teeth": "venomous fangs",
        "limbs": "4 mechanical legs",
        "tail": "prehensile flowing tail",
        "eyesColor": "maroon",
        "skinFurColor": "copper",
        "wingsColor": "obsidian",
        "clawHornColor": "charcoal",
        "tailColor": "topaz",
        "uniqueFeatureColor": "magenta"
    },
    {
        "id": 27,
        "name": "Breezeclaw",
        "description": "A miniscule, slender Wind-type creature. It is covered in copper armored skin with distinct bands. Its amber piercing eyes look out thoughtfully. It sports magenta small energy wings and moves gracefully. It defends itself with ruby hooked talons. It flashes blunt teeth when threatened. It moves on 4 jointed appendages. A crimson prehensile barbed tail trails behind it. Most notably, it possesses neon green spectral trails.",
        "features": [
            "fur",
            "horns",
            "flying"
        ],
        "type": "Wind",
        "stats": {
            "health": 83,
            "attack": 69
        },
        "generation": 1,
        "color": 13882323,
        "bodySize": "miniscule",
        "bodyType": "slender",
        "uniqueFeature": "spectral trails",
        "eyes": "piercing",
        "skinFurType": "armored",
        "pattern": "bands",
        "wings": "small energy wings",
        "clawHorn": "hooked talons",
        "teeth": "blunt teeth",
        "limbs": "4 jointed appendages",
        "tail": "prehensile barbed tail",
        "eyesColor": "amber",
        "skinFurColor": "copper",
        "wingsColor": "magenta",
        "clawHornColor": "ruby",
        "tailColor": "crimson",
        "uniqueFeatureColor": "neon green"
    },
    {
        "id": 28,
        "name": "Dawnclaw",
        "description": "A gigantic, bulky Light-type creature. It is covered in salmon furry skin with distinct speckles. Its olive multiple eyes look out thoughtfully. It sports crimson colossal energy wings and moves gracefully. It defends itself with olive curved horns. It flashes wicked fangs when threatened. It moves on 10 tentacles. A hot pink short scaly tail trails behind it. Most notably, it possesses azure sonic vibrations.",
        "features": [
            "scales",
            "horns"
        ],
        "type": "Light",
        "stats": {
            "health": 98,
            "attack": 65
        },
        "generation": 1,
        "color": 16777215,
        "bodySize": "gigantic",
        "bodyType": "bulky",
        "uniqueFeature": "sonic vibrations",
        "eyes": "multiple",
        "skinFurType": "furry",
        "pattern": "speckles",
        "wings": "colossal energy wings",
        "clawHorn": "curved horns",
        "teeth": "wicked fangs",
        "limbs": "10 tentacles",
        "tail": "short scaly tail",
        "eyesColor": "olive",
        "skinFurColor": "salmon",
        "wingsColor": "crimson",
        "clawHornColor": "olive",
        "tailColor": "hot pink",
        "uniqueFeatureColor": "azure"
    },
    {
        "id": 29,
        "name": "Duskclaw",
        "description": "A large, lithe Dark-type creature. It is covered in ash gray thick skin with distinct mottled. Its ash gray starry eyes look out thoughtfully. It sports maroon tiny energy wings and moves gracefully. It defends itself with onyx razor-sharp claws. It flashes tusks when threatened. It moves on 4 agile limbs. A emerald prehensile fluffy tail trails behind it. Most notably, it possesses sapphire whirling winds.",
        "features": [
            "fur",
            "flying",
            "shell"
        ],
        "type": "Dark",
        "stats": {
            "health": 105,
            "attack": 61
        },
        "generation": 1,
        "color": 4473924,
        "bodySize": "large",
        "bodyType": "lithe",
        "uniqueFeature": "whirling winds",
        "eyes": "starry",
        "skinFurType": "thick",
        "pattern": "mottled",
        "wings": "tiny energy wings",
        "clawHorn": "razor-sharp claws",
        "teeth": "tusks",
        "limbs": "4 agile limbs",
        "tail": "prehensile fluffy tail",
        "eyesColor": "ash gray",
        "skinFurColor": "ash gray",
        "wingsColor": "maroon",
        "clawHornColor": "onyx",
        "tailColor": "emerald",
        "uniqueFeatureColor": "sapphire"
    },
    {
        "id": 30,
        "name": "Meteorclaw",
        "description": "A immense, slender Cosmic-type creature. It is covered in lavender metallic skin with distinct runes. Its jade blind eyes look out thoughtfully. It defends itself with crimson majestic horns. It flashes sharp teeth when threatened. It moves on 10 ethereal limbs. A pearl massive skeletal tail trails behind it. Most notably, it possesses electric blue sonic vibrations.",
        "features": [
            "horns",
            "scales",
            "tail"
        ],
        "type": "Cosmic",
        "stats": {
            "health": 83,
            "attack": 66
        },
        "generation": 1,
        "color": 8388736,
        "bodySize": "immense",
        "bodyType": "slender",
        "uniqueFeature": "sonic vibrations",
        "eyes": "blind",
        "skinFurType": "metallic",
        "pattern": "runes",
        "wings": "none",
        "clawHorn": "majestic horns",
        "teeth": "sharp teeth",
        "limbs": "10 ethereal limbs",
        "tail": "massive skeletal tail",
        "eyesColor": "jade",
        "skinFurColor": "lavender",
        "wingsColor": "none",
        "clawHornColor": "crimson",
        "tailColor": "pearl",
        "uniqueFeatureColor": "electric blue"
    },
    {
        "id": 31,
        "name": "Emberfang",
        "description": "A miniscule, burly Fire-type creature. It is covered in opal soft skin with distinct geometric. Its golden cyclopic eyes look out thoughtfully. It sports amethyst small feathered wings and moves gracefully. It defends itself with golden curved horns. It flashes wicked fangs when threatened. It moves on 6 ethereal limbs. Most notably, it possesses plum glowing markings.",
        "features": [
            "horns",
            "tail",
            "shell"
        ],
        "type": "Fire",
        "stats": {
            "health": 107,
            "attack": 40
        },
        "generation": 1,
        "color": 16711680,
        "bodySize": "miniscule",
        "bodyType": "burly",
        "uniqueFeature": "glowing markings",
        "eyes": "cyclopic",
        "skinFurType": "soft",
        "pattern": "geometric",
        "wings": "small feathered wings",
        "clawHorn": "curved horns",
        "teeth": "wicked fangs",
        "limbs": "6 ethereal limbs",
        "tail": "none",
        "eyesColor": "golden",
        "skinFurColor": "opal",
        "wingsColor": "amethyst",
        "clawHornColor": "golden",
        "tailColor": "none",
        "uniqueFeatureColor": "plum"
    },
    {
        "id": 32,
        "name": "Riverfang",
        "description": "A rotund, sinuous Water-type creature. It is covered in turquoise stony skin with distinct checkerboard. Its snow white mysterious eyes look out thoughtfully. It sports lavender small crystal wings and moves gracefully. It defends itself with lavender ramming plates. It flashes wicked fangs when threatened. A silver sweeping flowing tail trails behind it. Most notably, it possesses pitch black crackling energy.",
        "features": [
            "shell",
            "tail",
            "horns"
        ],
        "type": "Water",
        "stats": {
            "health": 112,
            "attack": 32
        },
        "generation": 1,
        "color": 255,
        "bodySize": "rotund",
        "bodyType": "sinuous",
        "uniqueFeature": "crackling energy",
        "eyes": "mysterious",
        "skinFurType": "stony",
        "pattern": "checkerboard",
        "wings": "small crystal wings",
        "clawHorn": "ramming plates",
        "teeth": "wicked fangs",
        "limbs": "none",
        "tail": "sweeping flowing tail",
        "eyesColor": "snow white",
        "skinFurColor": "turquoise",
        "wingsColor": "lavender",
        "clawHornColor": "lavender",
        "tailColor": "silver",
        "uniqueFeatureColor": "pitch black"
    },
    {
        "id": 33,
        "name": "Vinefang",
        "description": "A large, sinuous Nature-type creature. It is covered in jade bristly skin with distinct zigzag. Its obsidian fierce eyes look out thoughtfully. It sports charcoal asymmetrical insectoid wings and moves gracefully. It defends itself with ivory spiraling horns. It flashes crushing molars when threatened. It moves on 4 hooves. A indigo short scaly tail trails behind it. Most notably, it possesses turquoise crystalline spikes.",
        "features": [
            "claws",
            "flying",
            "fur"
        ],
        "type": "Nature",
        "stats": {
            "health": 87,
            "attack": 45
        },
        "generation": 1,
        "color": 65280,
        "bodySize": "large",
        "bodyType": "sinuous",
        "uniqueFeature": "crystalline spikes",
        "eyes": "fierce",
        "skinFurType": "bristly",
        "pattern": "zigzag",
        "wings": "asymmetrical insectoid wings",
        "clawHorn": "spiraling horns",
        "teeth": "crushing molars",
        "limbs": "4 hooves",
        "tail": "short scaly tail",
        "eyesColor": "obsidian",
        "skinFurColor": "jade",
        "wingsColor": "charcoal",
        "clawHornColor": "ivory",
        "tailColor": "indigo",
        "uniqueFeatureColor": "turquoise"
    },
    {
        "id": 34,
        "name": "Stormfang",
        "description": "A small, quadrupedal Electric-type creature. It is covered in sapphire armored skin with distinct mottled. Its crimson piercing eyes look out thoughtfully. It sports copper medium mechanical wings and moves gracefully. It defends itself with amber crystal shards. It flashes saw-like teeth when threatened. It moves on 2 flippers. Most notably, it possesses plum crystalline spikes.",
        "features": [
            "fur",
            "scales",
            "claws"
        ],
        "type": "Electric",
        "stats": {
            "health": 82,
            "attack": 57
        },
        "generation": 1,
        "color": 16776960,
        "bodySize": "small",
        "bodyType": "quadrupedal",
        "uniqueFeature": "crystalline spikes",
        "eyes": "piercing",
        "skinFurType": "armored",
        "pattern": "mottled",
        "wings": "medium mechanical wings",
        "clawHorn": "crystal shards",
        "teeth": "saw-like teeth",
        "limbs": "2 flippers",
        "tail": "none",
        "eyesColor": "crimson",
        "skinFurColor": "sapphire",
        "wingsColor": "copper",
        "clawHornColor": "amber",
        "tailColor": "none",
        "uniqueFeatureColor": "plum"
    },
    {
        "id": 35,
        "name": "Hailfang",
        "description": "A tiny, serpentine Ice-type creature. It is covered in pearl furry skin with distinct stippled. Its azure gentle eyes look out thoughtfully. It sports obsidian small bone wings and moves gracefully. It defends itself with ivory serrated blades. It flashes crushing molars when threatened. It moves on 4 agile limbs. A violet massive feathered tail trails behind it. Most notably, it possesses onyx iridescent scales.",
        "features": [
            "shell",
            "scales",
            "wings"
        ],
        "type": "Ice",
        "stats": {
            "health": 92,
            "attack": 40
        },
        "generation": 1,
        "color": 65535,
        "bodySize": "tiny",
        "bodyType": "serpentine",
        "uniqueFeature": "iridescent scales",
        "eyes": "gentle",
        "skinFurType": "furry",
        "pattern": "stippled",
        "wings": "small bone wings",
        "clawHorn": "serrated blades",
        "teeth": "crushing molars",
        "limbs": "4 agile limbs",
        "tail": "massive feathered tail",
        "eyesColor": "azure",
        "skinFurColor": "pearl",
        "wingsColor": "obsidian",
        "clawHornColor": "ivory",
        "tailColor": "violet",
        "uniqueFeatureColor": "onyx"
    },
    {
        "id": 36,
        "name": "Quakefang",
        "description": "A small, quadrupedal Earth-type creature. It is covered in neon green smooth skin with distinct geometric. Its ivory hypnotic eyes look out thoughtfully. It sports ash gray tiny leathery wings and moves gracefully. It flashes venomous fangs when threatened. It moves on 100 sturdy legs. A neon green multiple scaly tail trails behind it. Most notably, it possesses hot pink venomous spines.",
        "features": [
            "horns",
            "fur",
            "shell"
        ],
        "type": "Earth",
        "stats": {
            "health": 114,
            "attack": 50
        },
        "generation": 1,
        "color": 9127187,
        "bodySize": "small",
        "bodyType": "quadrupedal",
        "uniqueFeature": "venomous spines",
        "eyes": "hypnotic",
        "skinFurType": "smooth",
        "pattern": "geometric",
        "wings": "tiny leathery wings",
        "clawHorn": "none",
        "teeth": "venomous fangs",
        "limbs": "100 sturdy legs",
        "tail": "multiple scaly tail",
        "eyesColor": "ivory",
        "skinFurColor": "neon green",
        "wingsColor": "ash gray",
        "clawHornColor": "none",
        "tailColor": "neon green",
        "uniqueFeatureColor": "hot pink"
    },
    {
        "id": 37,
        "name": "Gale fang",
        "description": "A massive, lithe Wind-type creature. It is covered in snow white rough skin with distinct gradient. Its snow white narrow eyes look out thoughtfully. It sports ash gray medium gossamer wings and moves gracefully. It defends itself with opal jagged spikes. It flashes protruding fangs when threatened. It moves on 4 pseudopods. A turquoise massive clubbed tail trails behind it. Most notably, it possesses ivory metallic plating.",
        "features": [
            "fur",
            "scales",
            "claws"
        ],
        "type": "Wind",
        "stats": {
            "health": 99,
            "attack": 69
        },
        "generation": 1,
        "color": 13882323,
        "bodySize": "massive",
        "bodyType": "lithe",
        "uniqueFeature": "metallic plating",
        "eyes": "narrow",
        "skinFurType": "rough",
        "pattern": "gradient",
        "wings": "medium gossamer wings",
        "clawHorn": "jagged spikes",
        "teeth": "protruding fangs",
        "limbs": "4 pseudopods",
        "tail": "massive clubbed tail",
        "eyesColor": "snow white",
        "skinFurColor": "snow white",
        "wingsColor": "ash gray",
        "clawHornColor": "opal",
        "tailColor": "turquoise",
        "uniqueFeatureColor": "ivory"
    },
    {
        "id": 38,
        "name": "Aura fang",
        "description": "A medium, burly Light-type creature. It is covered in ash gray leathery skin with distinct speckles. Its crimson hypnotic eyes look out thoughtfully. It sports opal large shadow wings and moves gracefully. It defends itself with emerald serrated blades. It flashes protruding fangs when threatened. It moves on 100 flippers. Most notably, it possesses onyx magnetic repulsion.",
        "features": [
            "wings",
            "flying",
            "glowing"
        ],
        "type": "Light",
        "stats": {
            "health": 101,
            "attack": 48
        },
        "generation": 1,
        "color": 16777215,
        "bodySize": "medium",
        "bodyType": "burly",
        "uniqueFeature": "magnetic repulsion",
        "eyes": "hypnotic",
        "skinFurType": "leathery",
        "pattern": "speckles",
        "wings": "large shadow wings",
        "clawHorn": "serrated blades",
        "teeth": "protruding fangs",
        "limbs": "100 flippers",
        "tail": "none",
        "eyesColor": "crimson",
        "skinFurColor": "ash gray",
        "wingsColor": "opal",
        "clawHornColor": "emerald",
        "tailColor": "none",
        "uniqueFeatureColor": "onyx"
    },
    {
        "id": 39,
        "name": "Gloomfang",
        "description": "A immense, angular Dark-type creature. It is covered in golden slimy skin with distinct camouflage. Its teal watery eyes look out thoughtfully. It sports crimson majestic leafy wings and moves gracefully. It defends itself with teal crystal shards. It moves on 6 jointed appendages. A amethyst sweeping flowing tail trails behind it. Most notably, it possesses plum spectral trails.",
        "features": [
            "wings",
            "flying"
        ],
        "type": "Dark",
        "stats": {
            "health": 109,
            "attack": 48
        },
        "generation": 1,
        "color": 4473924,
        "bodySize": "immense",
        "bodyType": "angular",
        "uniqueFeature": "spectral trails",
        "eyes": "watery",
        "skinFurType": "slimy",
        "pattern": "camouflage",
        "wings": "majestic leafy wings",
        "clawHorn": "crystal shards",
        "teeth": "none",
        "limbs": "6 jointed appendages",
        "tail": "sweeping flowing tail",
        "eyesColor": "teal",
        "skinFurColor": "golden",
        "wingsColor": "crimson",
        "clawHornColor": "teal",
        "tailColor": "amethyst",
        "uniqueFeatureColor": "plum"
    },
    {
        "id": 40,
        "name": "Astral fang",
        "description": "A diminutive, rounded Cosmic-type creature. It is covered in bronze bristly skin with distinct bands. Its copper watery eyes look out thoughtfully. It sports snow white colossal webbed wings and moves gracefully. It defends itself with magenta crystal shards. It flashes wicked fangs when threatened. A snow white massive clubbed tail trails behind it. Most notably, it possesses crimson ethereal aura.",
        "features": [
            "wings",
            "claws",
            "flying"
        ],
        "type": "Cosmic",
        "stats": {
            "health": 105,
            "attack": 40
        },
        "generation": 1,
        "color": 8388736,
        "bodySize": "diminutive",
        "bodyType": "rounded",
        "uniqueFeature": "ethereal aura",
        "eyes": "watery",
        "skinFurType": "bristly",
        "pattern": "bands",
        "wings": "colossal webbed wings",
        "clawHorn": "crystal shards",
        "teeth": "wicked fangs",
        "limbs": "none",
        "tail": "massive clubbed tail",
        "eyesColor": "copper",
        "skinFurColor": "bronze",
        "wingsColor": "snow white",
        "clawHornColor": "magenta",
        "tailColor": "snow white",
        "uniqueFeatureColor": "crimson"
    },
    {
        "id": 41,
        "name": "Blazetail",
        "description": "A diminutive, slender Fire-type creature. It is covered in olive armored skin with distinct gradient. Its olive calm eyes look out thoughtfully. It sports neon green colossal crystal wings and moves gracefully. It defends itself with emerald glowing antlers. It flashes needle-like teeth when threatened. It moves on 8 agile limbs. A sapphire massive flowing tail trails behind it. Most notably, it possesses coral blooming flora.",
        "features": [
            "shell",
            "fur"
        ],
        "type": "Fire",
        "stats": {
            "health": 91,
            "attack": 59
        },
        "generation": 1,
        "color": 16711680,
        "bodySize": "diminutive",
        "bodyType": "slender",
        "uniqueFeature": "blooming flora",
        "eyes": "calm",
        "skinFurType": "armored",
        "pattern": "gradient",
        "wings": "colossal crystal wings",
        "clawHorn": "glowing antlers",
        "teeth": "needle-like teeth",
        "limbs": "8 agile limbs",
        "tail": "massive flowing tail",
        "eyesColor": "olive",
        "skinFurColor": "olive",
        "wingsColor": "neon green",
        "clawHornColor": "emerald",
        "tailColor": "sapphire",
        "uniqueFeatureColor": "coral"
    },
    {
        "id": 42,
        "name": "Oceantail",
        "description": "A small, lanky Water-type creature. It is covered in amber rough skin with distinct bands. Its cyan cyclopic eyes look out thoughtfully. It sports azure vestigial bone wings and moves gracefully. It defends itself with ash gray venomous stingers. It flashes flat teeth when threatened. It moves on 8 ethereal limbs. A navy stubby fluffy tail trails behind it. Most notably, it possesses opal crystalline spikes.",
        "features": [
            "claws",
            "horns",
            "tail"
        ],
        "type": "Water",
        "stats": {
            "health": 86,
            "attack": 63
        },
        "generation": 1,
        "color": 255,
        "bodySize": "small",
        "bodyType": "lanky",
        "uniqueFeature": "crystalline spikes",
        "eyes": "cyclopic",
        "skinFurType": "rough",
        "pattern": "bands",
        "wings": "vestigial bone wings",
        "clawHorn": "venomous stingers",
        "teeth": "flat teeth",
        "limbs": "8 ethereal limbs",
        "tail": "stubby fluffy tail",
        "eyesColor": "cyan",
        "skinFurColor": "amber",
        "wingsColor": "azure",
        "clawHornColor": "ash gray",
        "tailColor": "navy",
        "uniqueFeatureColor": "opal"
    },
    {
        "id": 43,
        "name": "Root tail",
        "description": "A large, agile Nature-type creature. It is covered in maroon metallic skin with distinct spots. Its pearl cyclopic eyes look out thoughtfully. It sports charcoal small energy wings and moves gracefully. It defends itself with charcoal razor-sharp claws. It flashes mandibles when threatened. It moves on 6 agile limbs. A plum short feathered tail trails behind it. Most notably, it possesses sapphire flowing water droplets.",
        "features": [
            "horns",
            "fur",
            "flying"
        ],
        "type": "Nature",
        "stats": {
            "health": 95,
            "attack": 62
        },
        "generation": 1,
        "color": 65280,
        "bodySize": "large",
        "bodyType": "agile",
        "uniqueFeature": "flowing water droplets",
        "eyes": "cyclopic",
        "skinFurType": "metallic",
        "pattern": "spots",
        "wings": "small energy wings",
        "clawHorn": "razor-sharp claws",
        "teeth": "mandibles",
        "limbs": "6 agile limbs",
        "tail": "short feathered tail",
        "eyesColor": "pearl",
        "skinFurColor": "maroon",
        "wingsColor": "charcoal",
        "clawHornColor": "charcoal",
        "tailColor": "plum",
        "uniqueFeatureColor": "sapphire"
    },
    {
        "id": 44,
        "name": "Bolt tail",
        "description": "A colossal, slender Electric-type creature. It is covered in coral scaly skin with distinct dappled. Its pitch black starry eyes look out thoughtfully. It sports charcoal tiny crystal wings and moves gracefully. It defends itself with sapphire spiraling horns. It flashes blunt teeth when threatened. It moves on 8 flippers. A ash gray twin scaly tail trails behind it. Most notably, it possesses cyan bioluminescent spots.",
        "features": [
            "flying",
            "tail"
        ],
        "type": "Electric",
        "stats": {
            "health": 107,
            "attack": 48
        },
        "generation": 1,
        "color": 16776960,
        "bodySize": "colossal",
        "bodyType": "slender",
        "uniqueFeature": "bioluminescent spots",
        "eyes": "starry",
        "skinFurType": "scaly",
        "pattern": "dappled",
        "wings": "tiny crystal wings",
        "clawHorn": "spiraling horns",
        "teeth": "blunt teeth",
        "limbs": "8 flippers",
        "tail": "twin scaly tail",
        "eyesColor": "pitch black",
        "skinFurColor": "coral",
        "wingsColor": "charcoal",
        "clawHornColor": "sapphire",
        "tailColor": "ash gray",
        "uniqueFeatureColor": "cyan"
    },
    {
        "id": 45,
        "name": "Chilltail",
        "description": "A immense, floating Ice-type creature. It is covered in snow white prismatic skin with distinct runes. Its lavender mysterious eyes look out thoughtfully. It sports indigo medium flame wings and moves gracefully. It defends itself with topaz ramming plates. It flashes wicked fangs when threatened. It moves on 4 talons. A azure stubby skeletal tail trails behind it. Most notably, it possesses hot pink crystalline spikes.",
        "features": [
            "scales",
            "horns",
            "fangs"
        ],
        "type": "Ice",
        "stats": {
            "health": 85,
            "attack": 58
        },
        "generation": 1,
        "color": 65535,
        "bodySize": "immense",
        "bodyType": "floating",
        "uniqueFeature": "crystalline spikes",
        "eyes": "mysterious",
        "skinFurType": "prismatic",
        "pattern": "runes",
        "wings": "medium flame wings",
        "clawHorn": "ramming plates",
        "teeth": "wicked fangs",
        "limbs": "4 talons",
        "tail": "stubby skeletal tail",
        "eyesColor": "lavender",
        "skinFurColor": "snow white",
        "wingsColor": "indigo",
        "clawHornColor": "topaz",
        "tailColor": "azure",
        "uniqueFeatureColor": "hot pink"
    },
    {
        "id": 46,
        "name": "Cragtail",
        "description": "A immense, serpentine Earth-type creature. It is covered in onyx metallic skin with distinct patches. Its neon green multiple eyes look out thoughtfully. It sports neon green small webbed wings and moves gracefully. It defends itself with peach blunt claws. It flashes blunt teeth when threatened. It moves on 2 flippers. A azure massive fish-like tail trails behind it. Most notably, it possesses pearl spectral trails.",
        "features": [
            "wings",
            "scales"
        ],
        "type": "Earth",
        "stats": {
            "health": 110,
            "attack": 35
        },
        "generation": 1,
        "color": 9127187,
        "bodySize": "immense",
        "bodyType": "serpentine",
        "uniqueFeature": "spectral trails",
        "eyes": "multiple",
        "skinFurType": "metallic",
        "pattern": "patches",
        "wings": "small webbed wings",
        "clawHorn": "blunt claws",
        "teeth": "blunt teeth",
        "limbs": "2 flippers",
        "tail": "massive fish-like tail",
        "eyesColor": "neon green",
        "skinFurColor": "onyx",
        "wingsColor": "neon green",
        "clawHornColor": "peach",
        "tailColor": "azure",
        "uniqueFeatureColor": "pearl"
    },
    {
        "id": 47,
        "name": "Gust tail",
        "description": "A hulking, sleek Wind-type creature. It is covered in pearl silky skin with distinct bands. Its topaz glowing eyes look out thoughtfully. It sports salmon colossal flame wings and moves gracefully. It defends itself with crimson razor-sharp claws. It flashes crushing molars when threatened. It moves on 6 ethereal limbs. A navy prehensile fluffy tail trails behind it. Most notably, it possesses obsidian whirling winds.",
        "features": [
            "flying",
            "horns",
            "fangs"
        ],
        "type": "Wind",
        "stats": {
            "health": 111,
            "attack": 63
        },
        "generation": 1,
        "color": 13882323,
        "bodySize": "hulking",
        "bodyType": "sleek",
        "uniqueFeature": "whirling winds",
        "eyes": "glowing",
        "skinFurType": "silky",
        "pattern": "bands",
        "wings": "colossal flame wings",
        "clawHorn": "razor-sharp claws",
        "teeth": "crushing molars",
        "limbs": "6 ethereal limbs",
        "tail": "prehensile fluffy tail",
        "eyesColor": "topaz",
        "skinFurColor": "pearl",
        "wingsColor": "salmon",
        "clawHornColor": "crimson",
        "tailColor": "navy",
        "uniqueFeatureColor": "obsidian"
    },
    {
        "id": 48,
        "name": "Halo tail",
        "description": "A petite, spiky Light-type creature. It is covered in obsidian soft skin with distinct spots. Its navy mysterious eyes look out thoughtfully. It sports indigo vestigial insectoid wings and moves gracefully. It defends itself with charcoal venomous stingers. It moves on 4 jointed appendages. A sapphire twin stinger tail trails behind it. Most notably, it possesses maroon crackling energy.",
        "features": [
            "fangs",
            "scales"
        ],
        "type": "Light",
        "stats": {
            "health": 114,
            "attack": 42
        },
        "generation": 1,
        "color": 16777215,
        "bodySize": "petite",
        "bodyType": "spiky",
        "uniqueFeature": "crackling energy",
        "eyes": "mysterious",
        "skinFurType": "soft",
        "pattern": "spots",
        "wings": "vestigial insectoid wings",
        "clawHorn": "venomous stingers",
        "teeth": "none",
        "limbs": "4 jointed appendages",
        "tail": "twin stinger tail",
        "eyesColor": "navy",
        "skinFurColor": "obsidian",
        "wingsColor": "indigo",
        "clawHornColor": "charcoal",
        "tailColor": "sapphire",
        "uniqueFeatureColor": "maroon"
    },
    {
        "id": 49,
        "name": "Night tail",
        "description": "A miniscule, bipedal Dark-type creature. It is covered in violet scaly skin with distinct mottled. Its charcoal calm eyes look out thoughtfully. It sports magenta small crystal wings and moves gracefully. It defends itself with opal venomous stingers. It flashes needle-like teeth when threatened. It moves on 100 mechanical legs. Most notably, it possesses ash gray sonic vibrations.",
        "features": [
            "horns",
            "tail"
        ],
        "type": "Dark",
        "stats": {
            "health": 97,
            "attack": 31
        },
        "generation": 1,
        "color": 4473924,
        "bodySize": "miniscule",
        "bodyType": "bipedal",
        "uniqueFeature": "sonic vibrations",
        "eyes": "calm",
        "skinFurType": "scaly",
        "pattern": "mottled",
        "wings": "small crystal wings",
        "clawHorn": "venomous stingers",
        "teeth": "needle-like teeth",
        "limbs": "100 mechanical legs",
        "tail": "none",
        "eyesColor": "charcoal",
        "skinFurColor": "violet",
        "wingsColor": "magenta",
        "clawHornColor": "opal",
        "tailColor": "none",
        "uniqueFeatureColor": "ash gray"
    },
    {
        "id": 50,
        "name": "Nebula tail",
        "description": "A rotund, sinuous Cosmic-type creature. It is covered in topaz thick skin with distinct zigzag. Its ivory cyclopic eyes look out thoughtfully. It sports neon green large bone wings and moves gracefully. It defends itself with jade razor-sharp claws. It flashes saw-like teeth when threatened. It moves on 6 sturdy legs. A navy long fish-like tail trails behind it. Most notably, it possesses golden venomous spines.",
        "features": [
            "horns",
            "glowing",
            "fangs"
        ],
        "type": "Cosmic",
        "stats": {
            "health": 110,
            "attack": 60
        },
        "generation": 1,
        "color": 8388736,
        "bodySize": "rotund",
        "bodyType": "sinuous",
        "uniqueFeature": "venomous spines",
        "eyes": "cyclopic",
        "skinFurType": "thick",
        "pattern": "zigzag",
        "wings": "large bone wings",
        "clawHorn": "razor-sharp claws",
        "teeth": "saw-like teeth",
        "limbs": "6 sturdy legs",
        "tail": "long fish-like tail",
        "eyesColor": "ivory",
        "skinFurColor": "topaz",
        "wingsColor": "neon green",
        "clawHornColor": "jade",
        "tailColor": "navy",
        "uniqueFeatureColor": "golden"
    }
];

window.natures = [{"name":"Neutral","increase":null,"decrease":null},{"name":"Balanced","increase":null,"decrease":null},{"name":"Stable","increase":null,"decrease":null},{"name":"Even","increase":null,"decrease":null},{"name":"Placid","increase":null,"decrease":null},{"name":"Brave Heart","increase":"defense","decrease":"speed"},{"name":"Brave Soul","increase":"specialDefense","decrease":"attack"},{"name":"Brave Mind","increase":"health","decrease":"specialAttack"},{"name":"Brave Spirit","increase":"specialDefense","decrease":"health"},{"name":"Brave Claw","increase":"specialDefense","decrease":"defense"},{"name":"Brave Fang","increase":"attack","decrease":"defense"},{"name":"Brave Tail","increase":"speed","decrease":"defense"},{"name":"Brave Eye","increase":"speed","decrease":"specialDefense"},{"name":"Brave Wing","increase":"specialAttack","decrease":"defense"},{"name":"Brave Foot","increase":"speed","decrease":"health"},{"name":"Bold Heart","increase":"specialDefense","decrease":"speed"},{"name":"Bold Soul","increase":"defense","decrease":"specialDefense"},{"name":"Bold Mind","increase":"defense","decrease":"health"},{"name":"Bold Spirit","increase":"health","decrease":"speed"},{"name":"Bold Claw","increase":"speed","decrease":"health"},{"name":"Bold Fang","increase":"speed","decrease":"defense"},{"name":"Bold Tail","increase":"specialAttack","decrease":"speed"},{"name":"Bold Eye","increase":"defense","decrease":"health"},{"name":"Bold Wing","increase":"speed","decrease":"attack"},{"name":"Bold Foot","increase":"specialAttack","decrease":"speed"},{"name":"Calm Heart","increase":"health","decrease":"defense"},{"name":"Calm Soul","increase":"health","decrease":"specialDefense"},{"name":"Calm Mind","increase":"specialDefense","decrease":"attack"},{"name":"Calm Spirit","increase":"specialDefense","decrease":"defense"},{"name":"Calm Claw","increase":null,"decrease":null},{"name":"Calm Fang","increase":"specialDefense","decrease":"specialAttack"},{"name":"Calm Tail","increase":null,"decrease":null},{"name":"Calm Eye","increase":"speed","decrease":"specialAttack"},{"name":"Calm Wing","increase":null,"decrease":null},{"name":"Calm Foot","increase":"health","decrease":"attack"},{"name":"Careful Heart","increase":null,"decrease":null},{"name":"Careful Soul","increase":null,"decrease":null},{"name":"Careful Mind","increase":"specialDefense","decrease":"health"},{"name":"Careful Spirit","increase":"attack","decrease":"specialAttack"},{"name":"Careful Claw","increase":"defense","decrease":"specialDefense"},{"name":"Careful Fang","increase":"specialDefense","decrease":"defense"},{"name":"Careful Tail","increase":null,"decrease":null},{"name":"Careful Eye","increase":"defense","decrease":"speed"},{"name":"Careful Wing","increase":"specialDefense","decrease":"health"},{"name":"Careful Foot","increase":"specialDefense","decrease":"defense"},{"name":"Gentle Heart","increase":"health","decrease":"specialAttack"},{"name":"Gentle Soul","increase":"speed","decrease":"specialDefense"},{"name":"Gentle Mind","increase":"attack","decrease":"defense"},{"name":"Gentle Spirit","increase":"defense","decrease":"attack"},{"name":"Gentle Claw","increase":null,"decrease":null},{"name":"Gentle Fang","increase":null,"decrease":null},{"name":"Gentle Tail","increase":null,"decrease":null},{"name":"Gentle Eye","increase":"specialAttack","decrease":"specialDefense"},{"name":"Gentle Wing","increase":"specialDefense","decrease":"specialAttack"},{"name":"Gentle Foot","increase":null,"decrease":null},{"name":"Hasty Heart","increase":null,"decrease":null},{"name":"Hasty Soul","increase":"defense","decrease":"specialDefense"},{"name":"Hasty Mind","increase":"specialDefense","decrease":"defense"},{"name":"Hasty Spirit","increase":"attack","decrease":"specialDefense"},{"name":"Hasty Claw","increase":"defense","decrease":"attack"},{"name":"Hasty Fang","increase":"specialAttack","decrease":"speed"},{"name":"Hasty Tail","increase":"specialDefense","decrease":"health"},{"name":"Hasty Eye","increase":"specialDefense","decrease":"specialAttack"},{"name":"Hasty Wing","increase":"specialDefense","decrease":"attack"},{"name":"Hasty Foot","increase":"attack","decrease":"specialAttack"},{"name":"Jolly Heart","increase":"speed","decrease":"specialAttack"},{"name":"Jolly Soul","increase":"attack","decrease":"defense"},{"name":"Jolly Mind","increase":"health","decrease":"specialDefense"},{"name":"Jolly Spirit","increase":"specialDefense","decrease":"specialAttack"},{"name":"Jolly Claw","increase":"health","decrease":"specialDefense"},{"name":"Jolly Fang","increase":"specialAttack","decrease":"speed"},{"name":"Jolly Tail","increase":null,"decrease":null},{"name":"Jolly Eye","increase":null,"decrease":null},{"name":"Jolly Wing","increase":"defense","decrease":"specialDefense"},{"name":"Jolly Foot","increase":"specialDefense","decrease":"defense"},{"name":"Lax Heart","increase":"speed","decrease":"specialAttack"},{"name":"Lax Soul","increase":"specialDefense","decrease":"specialAttack"},{"name":"Lax Mind","increase":"attack","decrease":"specialAttack"},{"name":"Lax Spirit","increase":"health","decrease":"specialDefense"},{"name":"Lax Claw","increase":"defense","decrease":"attack"},{"name":"Lax Fang","increase":"attack","decrease":"health"},{"name":"Lax Tail","increase":"speed","decrease":"specialDefense"},{"name":"Lax Eye","increase":"specialDefense","decrease":"health"},{"name":"Lax Wing","increase":"specialDefense","decrease":"speed"},{"name":"Lax Foot","increase":"speed","decrease":"specialDefense"},{"name":"Lonely Heart","increase":"attack","decrease":"speed"},{"name":"Lonely Soul","increase":"defense","decrease":"specialDefense"},{"name":"Lonely Mind","increase":"health","decrease":"speed"},{"name":"Lonely Spirit","increase":"defense","decrease":"attack"},{"name":"Lonely Claw","increase":"attack","decrease":"specialAttack"},{"name":"Lonely Fang","increase":"specialAttack","decrease":"health"},{"name":"Lonely Tail","increase":"attack","decrease":"speed"},{"name":"Lonely Eye","increase":"specialDefense","decrease":"speed"},{"name":"Lonely Wing","increase":"speed","decrease":"defense"},{"name":"Lonely Foot","increase":"attack","decrease":"specialDefense"},{"name":"Mild Heart","increase":"speed","decrease":"defense"},{"name":"Mild Soul","increase":"health","decrease":"specialAttack"},{"name":"Mild Mind","increase":null,"decrease":null},{"name":"Mild Spirit","increase":"speed","decrease":"specialDefense"},{"name":"Mild Claw","increase":"specialDefense","decrease":"attack"},{"name":"Mild Fang","increase":"health","decrease":"speed"},{"name":"Mild Tail","increase":"speed","decrease":"attack"},{"name":"Mild Eye","increase":"specialDefense","decrease":"attack"},{"name":"Mild Wing","increase":"speed","decrease":"specialDefense"},{"name":"Mild Foot","increase":"health","decrease":"defense"},{"name":"Modest Heart","increase":"attack","decrease":"health"},{"name":"Modest Soul","increase":"specialDefense","decrease":"attack"},{"name":"Modest Mind","increase":"specialAttack","decrease":"speed"},{"name":"Modest Spirit","increase":"specialAttack","decrease":"specialDefense"},{"name":"Modest Claw","increase":"specialDefense","decrease":"health"},{"name":"Modest Fang","increase":"attack","decrease":"health"},{"name":"Modest Tail","increase":"specialAttack","decrease":"health"},{"name":"Modest Eye","increase":"health","decrease":"specialDefense"},{"name":"Modest Wing","increase":"specialAttack","decrease":"health"},{"name":"Modest Foot","increase":"specialAttack","decrease":"health"},{"name":"Naive Heart","increase":"specialAttack","decrease":"specialDefense"},{"name":"Naive Soul","increase":"health","decrease":"specialDefense"},{"name":"Naive Mind","increase":"speed","decrease":"specialAttack"},{"name":"Naive Spirit","increase":"specialDefense","decrease":"specialAttack"},{"name":"Naive Claw","increase":"speed","decrease":"specialDefense"},{"name":"Naive Fang","increase":"defense","decrease":"specialDefense"},{"name":"Naive Tail","increase":"speed","decrease":"defense"},{"name":"Naive Eye","increase":"specialDefense","decrease":"defense"},{"name":"Naive Wing","increase":"attack","decrease":"specialAttack"},{"name":"Naive Foot","increase":"specialAttack","decrease":"attack"},{"name":"Naughty Heart","increase":"health","decrease":"specialAttack"},{"name":"Naughty Soul","increase":"attack","decrease":"speed"},{"name":"Naughty Mind","increase":null,"decrease":null},{"name":"Naughty Spirit","increase":null,"decrease":null},{"name":"Naughty Claw","increase":"health","decrease":"attack"},{"name":"Naughty Fang","increase":"speed","decrease":"specialAttack"},{"name":"Naughty Tail","increase":null,"decrease":null},{"name":"Naughty Eye","increase":"defense","decrease":"health"},{"name":"Naughty Wing","increase":"specialDefense","decrease":"speed"},{"name":"Naughty Foot","increase":"speed","decrease":"health"},{"name":"Quiet Heart","increase":"defense","decrease":"speed"},{"name":"Quiet Soul","increase":"defense","decrease":"health"},{"name":"Quiet Mind","increase":"speed","decrease":"specialAttack"},{"name":"Quiet Spirit","increase":"specialAttack","decrease":"defense"},{"name":"Quiet Claw","increase":null,"decrease":null},{"name":"Quiet Fang","increase":"specialAttack","decrease":"speed"},{"name":"Quiet Tail","increase":"speed","decrease":"attack"},{"name":"Quiet Eye","increase":"specialDefense","decrease":"specialAttack"},{"name":"Quiet Wing","increase":"attack","decrease":"speed"},{"name":"Quiet Foot","increase":"specialAttack","decrease":"defense"},{"name":"Quirky Heart","increase":"attack","decrease":"health"},{"name":"Quirky Soul","increase":"specialAttack","decrease":"health"},{"name":"Quirky Mind","increase":"specialAttack","decrease":"health"},{"name":"Quirky Spirit","increase":"specialAttack","decrease":"defense"},{"name":"Quirky Claw","increase":"specialAttack","decrease":"attack"},{"name":"Quirky Fang","increase":"attack","decrease":"health"},{"name":"Quirky Tail","increase":"specialDefense","decrease":"specialAttack"},{"name":"Quirky Eye","increase":"speed","decrease":"defense"},{"name":"Quirky Wing","increase":"speed","decrease":"specialDefense"},{"name":"Quirky Foot","increase":null,"decrease":null},{"name":"Rash Heart","increase":null,"decrease":null},{"name":"Rash Soul","increase":"speed","decrease":"health"},{"name":"Rash Mind","increase":null,"decrease":null},{"name":"Rash Spirit","increase":"specialAttack","decrease":"defense"},{"name":"Rash Claw","increase":"defense","decrease":"specialAttack"},{"name":"Rash Fang","increase":"speed","decrease":"attack"},{"name":"Rash Tail","increase":"specialDefense","decrease":"attack"},{"name":"Rash Eye","increase":"defense","decrease":"specialDefense"},{"name":"Rash Wing","increase":"defense","decrease":"specialAttack"},{"name":"Rash Foot","increase":"attack","decrease":"specialDefense"},{"name":"Relaxed Heart","increase":"defense","decrease":"speed"},{"name":"Relaxed Soul","increase":"defense","decrease":"speed"},{"name":"Relaxed Mind","increase":"health","decrease":"attack"},{"name":"Relaxed Spirit","increase":"speed","decrease":"specialAttack"},{"name":"Relaxed Claw","increase":null,"decrease":null},{"name":"Relaxed Fang","increase":"attack","decrease":"specialDefense"},{"name":"Relaxed Tail","increase":"specialDefense","decrease":"speed"},{"name":"Relaxed Eye","increase":"specialDefense","decrease":"attack"},{"name":"Relaxed Wing","increase":null,"decrease":null},{"name":"Relaxed Foot","increase":"specialAttack","decrease":"attack"},{"name":"Sassy Heart","increase":null,"decrease":null},{"name":"Sassy Soul","increase":"defense","decrease":"speed"},{"name":"Sassy Mind","increase":"attack","decrease":"defense"},{"name":"Sassy Spirit","increase":"attack","decrease":"specialAttack"},{"name":"Sassy Claw","increase":"health","decrease":"speed"},{"name":"Sassy Fang","increase":"health","decrease":"speed"},{"name":"Sassy Tail","increase":"health","decrease":"speed"},{"name":"Sassy Eye","increase":null,"decrease":null},{"name":"Sassy Wing","increase":"specialAttack","decrease":"defense"},{"name":"Sassy Foot","increase":"defense","decrease":"health"},{"name":"Serious Heart","increase":null,"decrease":null},{"name":"Serious Soul","increase":"specialDefense","decrease":"attack"},{"name":"Serious Mind","increase":"specialAttack","decrease":"defense"},{"name":"Serious Spirit","increase":"specialAttack","decrease":"defense"},{"name":"Serious Claw","increase":null,"decrease":null},{"name":"Serious Fang","increase":null,"decrease":null},{"name":"Serious Tail","increase":"specialDefense","decrease":"defense"},{"name":"Serious Eye","increase":"attack","decrease":"speed"},{"name":"Serious Wing","increase":"speed","decrease":"specialDefense"},{"name":"Serious Foot","increase":"speed","decrease":"defense"},{"name":"Timid Heart","increase":"specialDefense","decrease":"speed"},{"name":"Timid Soul","increase":"speed","decrease":"specialAttack"},{"name":"Timid Mind","increase":"health","decrease":"specialAttack"},{"name":"Timid Spirit","increase":"defense","decrease":"attack"},{"name":"Timid Claw","increase":"specialAttack","decrease":"speed"}];
const statsArr = ['attack', 'defense', 'speed', 'specialAttack', 'specialDefense', 'health'];
const buffAdjectives = ['Mighty', 'Sturdy', 'Swift', 'Brilliant', 'Resilient', 'Vital', 'Fierce', 'Tough', 'Nimble', 'Clever'];
const debuffAdjectives = ['Frail', 'Clumsy', 'Sluggish', 'Dull', 'Fragile', 'Sickly', 'Weak', 'Soft', 'Slow', 'Foolish'];
const nouns = ['Spirit', 'Form', 'Stride', 'Mind', 'Aura', 'Core', 'Heart', 'Soul', 'Essence', 'Presence'];

for (let i = 1; i <= 50; i++) {
    let adj = buffAdjectives[i % buffAdjectives.length];
    let noun = nouns[(i + 1) % nouns.length];
    window.natures.push({ name: adj + ' ' + noun, increase: statsArr[i % 6], decrease: null });
}
for (let i = 1; i <= 50; i++) {
    let adj = debuffAdjectives[i % debuffAdjectives.length];
    let noun = nouns[(i + 1) % nouns.length];
    window.natures.push({ name: adj + ' ' + noun, increase: null, decrease: statsArr[i % 6] });
}

window.getRandomNature = function() {
    // Only return natures that actually have a buff OR debuff (removes Neutral / null entries)
    const validNatures = window.natures.filter(n => n.increase || n.decrease);
    return validNatures[Math.floor(Math.random() * validNatures.length)];
};
window.getEffectiveStat = function(creature, statName) {
    let base = creature.stats[statName] || 50; // Fallback
    let lvl = creature.level || 1;
    let scaledBase = base + (base * (lvl - 1) * 0.05);

    if (creature.nature) {
        if (creature.nature.increase === statName) scaledBase *= 1.1;
        if (creature.nature.decrease === statName) scaledBase *= 0.9;
    }

    // Diminishing returns for high stats
    if (scaledBase > 500) {
        scaledBase = 500 + (scaledBase - 500) * 0.5;
    }
    // Hard cap at 999
    return Math.min(999, scaledBase);
};

window.getScaledBaseStat = function(creature, statName) {
    let base = creature.stats[statName] || 50;
    let lvl = creature.level || 1;
    return base + (base * (lvl - 1) * 0.05);
};

window.typeChart = {
    "Fire": { "Nature": 2, "Ice": 2, "Water": 0.5, "Fire": 0.5, "Earth": 0.5, "Rock": 0.5 },
    "Water": { "Fire": 2, "Earth": 2, "Water": 0.5, "Nature": 0.5, "Electric": 0.5 },
    "Nature": { "Water": 2, "Earth": 2, "Fire": 0.5, "Nature": 0.5, "Wind": 0.5 },
    "Electric": { "Water": 2, "Wind": 2, "Nature": 0.5, "Electric": 0.5, "Earth": 0 },
    "Ice": { "Nature": 2, "Earth": 2, "Wind": 2, "Fire": 0.5, "Water": 0.5, "Ice": 0.5 },
    "Earth": { "Fire": 2, "Electric": 2, "Nature": 0.5, "Wind": 0 },
    "Wind": { "Nature": 2, "Earth": 0.5, "Electric": 0.5 },
    "Light": { "Dark": 2, "Cosmic": 2, "Light": 0.5 },
    "Dark": { "Cosmic": 2, "Light": 2, "Dark": 0.5 },
    "Cosmic": { "Light": 2, "Dark": 2, "Cosmic": 0.5 }
};

window.getTypeModifier = function(attackType, defenseType) {
    // If complex type (e.g. Fire-Water)
    if (defenseType.includes('-')) {
        let types = defenseType.split('-');
        let mod1 = (window.typeChart[attackType] && window.typeChart[attackType][types[0]] !== undefined) ? window.typeChart[attackType][types[0]] : 1;
        let mod2 = (window.typeChart[attackType] && window.typeChart[attackType][types[1]] !== undefined) ? window.typeChart[attackType][types[1]] : 1;
        return mod1 * mod2;
    }
    if (window.typeChart[attackType] && window.typeChart[attackType][defenseType] !== undefined) {
        return window.typeChart[attackType][defenseType];
    }
    return 1;
};

window.calculateDamage = function(attacker, defender, power = 50) {
    const atk = window.getEffectiveStat(attacker, 'attack');
    const def = window.getEffectiveStat(defender, 'defense');
    const typeMod = window.getTypeModifier(attacker.type, defender.type);

    // Scale damage by stat difference
    let statDiff = atk - def;
    let diffMultiplier = 1 + (statDiff > 0 ? Math.pow(statDiff, 0.8) : -Math.pow(Math.abs(statDiff), 0.8)) / 100;
    diffMultiplier = Math.max(0.1, diffMultiplier); // Floor multiplier at 0.1x

    const damage = power * diffMultiplier * typeMod;
    return Math.max(1, damage); // Minimum 1 damage
};



window.getXpRequirement = function(level) {
    return 100 * Math.pow(level, 2);
};

window.gainXp = function(creature, amount) {
    creature.xp = (creature.xp || 0) + amount;
    let leveledUp = false;
    while (creature.xp >= window.getXpRequirement(creature.level || 1)) {
        creature.xp -= window.getXpRequirement(creature.level || 1);
        creature.level = (creature.level || 1) + 1;
        leveledUp = true;
    }
    return leveledUp;
};

// Augment base creatures with new stats and a nature
window.baseCreatures.forEach(c => {
    c.stats.defense = c.stats.defense || Math.floor(Math.random() * 50 + 30);
    c.stats.speed = c.stats.speed || Math.floor(Math.random() * 50 + 30);
    c.stats.specialAttack = c.stats.specialAttack || Math.floor(Math.random() * 50 + 30);
    c.stats.specialDefense = c.stats.specialDefense || Math.floor(Math.random() * 50 + 30);
});


// Descriptions are fully formed.

// ==================== PERSISTENCE ====================
const STORAGE_KEY = 'wildpulse_collected_creatures';
let collectedCreatures = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let collectedCreaturesIds = new Set(collectedCreatures.map(c => c.id));

// Provide a starting creature if the player is new
if (collectedCreatures.length === 0 && window.baseCreatures && window.baseCreatures.length > 0) {
    let randomIndex = Math.floor(Math.random() * window.baseCreatures.length);
    let starter = JSON.parse(JSON.stringify(window.baseCreatures[randomIndex]));

    // Assign IVs
    if (starter.stats) {
        for (let stat in starter.stats) {
            starter.stats[stat] += Math.floor(Math.random() * 32);
        }
    }

    // Starter Shiny Chance
    starter.isShiny = Math.random() < 0.001;
    if (starter.isShiny && starter.stats) {
        for (let stat in starter.stats) {
            starter.stats[stat] = Math.floor(starter.stats[stat] * 1.2);
        }
    }

    starter.baseId = starter.id;
    starter.nature = window.getRandomNature();
    starter.level = 1;
    starter.xp = 0;
    starter.id = Date.now().toString() + "_starter";

    collectedCreaturesIds.add(starter.id);
    collectedCreatures.push(starter);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collectedCreatures));
}

function saveCollected(creature) {
    if (!collectedCreaturesIds.has(creature.id)) {
        collectedCreaturesIds.add(creature.id);
        collectedCreatures.push(creature);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(collectedCreatures));
    }
}


// ==================== MENU & PARTY ====================
window.openMenuModal = function() {
    document.getElementById('menuModal').style.display = 'block';
};
window.closeMenuModal = function() {
    let _m_menuModal = document.getElementById('menuModal'); _m_menuModal.children[0].classList.add('modal-fade-out'); setTimeout(() => { _m_menuModal.style.display = 'none'; _m_menuModal.children[0].classList.remove('modal-fade-out'); }, 190);
};



window.openHelpModal = function() {
    closeMenuModal();

    // Generate Type Chart HTML
    let types = Object.keys(window.typeChart);
    let typeChartHtml = '<table style="width:100%; text-align:center; border-collapse:collapse; font-size:14px; color:#ddd;">';
    typeChartHtml += '<tr><th style="border-bottom:1px solid #555;">Attacker \\ Defender</th>' + types.map(t => `<th style="border-bottom:1px solid #555; padding:4px;">${t}</th>`).join('') + '</tr>';

    types.forEach(attacker => {
        typeChartHtml += `<tr><td style="border-bottom:1px solid #333; font-weight:bold; padding:4px;">${attacker}</td>`;
        types.forEach(defender => {
            let mod = window.typeChart[attacker][defender] !== undefined ? window.typeChart[attacker][defender] : 1;
            let bgColor = 'transparent';
            let color = '#ddd';
            let text = '1x';
            if (mod === 2) { bgColor = 'rgba(76, 175, 80, 0.2)'; color = '#4caf50'; text = '2x'; }
            else if (mod === 0.5) { bgColor = 'rgba(244, 67, 54, 0.2)'; color = '#f44336'; text = '0.5x'; }
            else if (mod === 0) { bgColor = 'rgba(158, 158, 158, 0.2)'; color = '#9e9e9e'; text = '0x'; }

            typeChartHtml += `<td style="border-bottom:1px solid #333; background:${bgColor}; color:${color}; padding:4px;">${text}</td>`;
        });
        typeChartHtml += '</tr>';
    });
    typeChartHtml += '</table>';

    let typeContainer = document.getElementById('typeChartContainer');
    if (typeContainer) typeContainer.innerHTML = typeChartHtml;

    let naturesHtml = window.natures.filter(n => n.increase || n.decrease).map(n => {
        let text = n.name + ': ';
        if (n.increase) text += '<span style="color:#4caf50">+10% ' + n.increase + '</span> ';
        if (n.decrease) text += '<span style="color:#f44336">-10% ' + n.decrease + '</span>';
        return '<li>' + text + '</li>';
    }).join('');
    let container = document.getElementById('naturesListContainer');
    if(container) container.innerHTML = '<ul style="margin:0; padding-left:20px; font-size:14px; color:#ddd;">' + naturesHtml + '</ul>';
    document.getElementById('helpModal').style.display = 'block';
};



window.closeHelpModal = function() {
    let _m_helpModal = document.getElementById('helpModal'); _m_helpModal.children[0].classList.add('modal-fade-out'); setTimeout(() => { _m_helpModal.style.display = 'none'; _m_helpModal.children[0].classList.remove('modal-fade-out'); }, 190);
};
window.openPartyModal = function() {
    closeMenuModal();
    document.getElementById('partyModal').style.display = 'block';
    renderPartyList();
};
window.closePartyModal = function() {
    let _m_partyModal = document.getElementById('partyModal'); _m_partyModal.children[0].classList.add('modal-fade-out'); setTimeout(() => { _m_partyModal.style.display = 'none'; _m_partyModal.children[0].classList.remove('modal-fade-out'); }, 190);
};

window.renderPartyList = function() {
    const list = document.getElementById('partyList');
    list.innerHTML = '';
    const fragment = document.createDocumentFragment();
    if (collectedCreatures.length === 0) {
        list.innerHTML = '<p>Your party is empty.</p>';
        return;
    }

    const activeParty = collectedCreatures.slice(0, 6);
    const storageBox = collectedCreatures.slice(6);

    const partyHeader = document.createElement('h3');
    partyHeader.innerText = "Active Party";
    partyHeader.style.color = "#e0e0ff";
    partyHeader.style.marginTop = "0";
    fragment.appendChild(partyHeader);

    activeParty.forEach((c, index) => {
        const card = document.createElement('div');
        card.className = 'party-card' + (c.isShiny ? ' shiny' : '');

        const statColors = {health: '#4caf50', attack: '#ff9800', defense: '#9c27b0', speed: '#ffeb3b', specialAttack: '#00bcd4', specialDefense: '#e91e63'};

        const statsHtml = ['health', 'attack', 'defense', 'speed', 'specialAttack', 'specialDefense'].map(stat => {
            let base = c.stats[stat] || 50;
            let eff = window.getEffectiveStat(c, stat).toFixed(1);
            let scaled = window.getScaledBaseStat(c, stat).toFixed(1);
            let effColor = parseFloat(eff) > parseFloat(scaled) ? 'green' : (parseFloat(eff) < parseFloat(scaled) ? 'red' : 'white');
            let statColor = statColors[stat] || 'white';
            return `<div data-tooltip="${stat} indicates the creature's combat capability. Base is ${base}, scaled by level to ${scaled}. Effective is ${eff} after Nature modifications."><span style="color:${statColor};">${stat}</span>: ${base} <span style="color:${effColor}">(Eff: ${eff})</span></div>`;
        }).join('');

        let parentsHtml = '';
        if (c.parents) {
            parentsHtml = `<p><em>Parents: ${c.parents.name1} (${c.parents.type1}) & ${c.parents.name2} (${c.parents.type2})</em></p>`;
        }

        let natureColor = 'white';
        if (c.nature) {
            if (c.nature.increase && !c.nature.decrease) {
                natureColor = '#4caf50';
            }
            else if (!c.nature.increase && c.nature.decrease) {
                natureColor = '#f44336';
            }
            else if (c.nature.increase && c.nature.decrease) {
                natureColor = '#ff9800';
            }
        }
        let natureHtml = c.nature ? `<p data-tooltip="${c.nature.name}: Increases ${c.nature.increase || 'Nothing'} and decreases ${c.nature.decrease || 'Nothing'}">Nature: <span style="color:${natureColor};">${c.nature.name}</span></p>` : '<p>Nature: None</p>';
        let shinyPrefix = c.isShiny ? '<span class="shiny-star">⭐</span>' : '';

        card.innerHTML = `
            <div>
                <h3 style="font-size: 1.2em; border-bottom: 1px solid #87CEEB; padding-bottom: 5px; margin-bottom: 10px;">${shinyPrefix}<input class="creature-name" aria-label="Creature Name" value="${c.nickname || c.name}" maxlength="20"> <button class="save-name-btn" data-index="${index}">Save</button> - ${c.type}</h3>
                <p><strong>Level <span style="color:#2196F3">${c.level || 1}</span></strong> (Gen ${c.generation}) | <span style="color:#2196F3">XP: ${Math.floor(c.xp || 0)} / ${window.getXpRequirement(c.level || 1)}</span></p>
                <div class="creature-description">
                    <p style="color: #ccc; font-style: italic;">${c.description}</p>
                </div>
                ${natureHtml}
                ${parentsHtml}
                <div style="border-top: 1px solid #555; padding-top: 10px; margin-top: 10px;">
                    <h4 style="margin: 0 0 5px 0;">Base Stats</h4>
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 5px; font-size: 0.9em;">
                        ${statsHtml}
                    </div>
                </div>
            </div>
            <div class="party-controls">
                <button class="move-up-btn" data-index="${index}" aria-label="Move Up">▲</button>
                <button class="move-down-btn" data-index="${index}" aria-label="Move Down">▼</button>
                <button class="release-btn" data-index="${index}" style="background-color: #f44336; color: white;">Release</button>
            </div>
        `;
        fragment.appendChild(card);
    });

    if (storageBox.length > 0) {
        const storageHeader = document.createElement('h3');
        storageHeader.innerText = "Storage Box";
        storageHeader.style.color = "#e0e0ff";
        storageHeader.style.marginTop = "20px";
        fragment.appendChild(storageHeader);

        const storageGrid = document.createElement('div');
        storageGrid.style.display = 'grid';
        storageGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
        storageGrid.style.gap = '15px';
        storageGrid.style.maxHeight = '400px';
        storageGrid.style.overflowY = 'auto';
        storageGrid.style.padding = '10px';

        storageBox.forEach((c, i) => {
            const index = i + 6;
            const card = document.createElement('div');
            card.className = 'party-card' + (c.isShiny ? ' shiny' : '');

            const nameHtml = `<h4>${window.escapeHtml(c.name)} ${c.nickname ? `("${window.escapeHtml(c.nickname)}")` : ''}</h4>`;
            const typeHtml = `<p>Lvl ${c.level} | Type: ${c.type} | Gen ${c.generation}</p>`;

            let actionHtml = `<div class="party-controls">`;
            actionHtml += `<button onclick="window.moveToParty(${index})">Move to Party</button>`;
            actionHtml += `<button onclick="window.releaseCreature(${index})">Release</button>`;
            actionHtml += `</div>`;

            card.innerHTML = nameHtml + typeHtml + actionHtml;
            storageGrid.appendChild(card);
        });
        fragment.appendChild(storageGrid);
    }

    list.appendChild(fragment);
};

window.saveName = function(btn, index) {
    collectedCreatures[index].nickname = btn.previousElementSibling.value || collectedCreatures[index].name;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collectedCreatures));
    window.renderPartyList();
};

window.moveUp = function(index) {
    if (index > 0) {
        let temp = collectedCreatures[index];
        collectedCreatures[index] = collectedCreatures[index - 1];
        collectedCreatures[index - 1] = temp;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(collectedCreatures));
        renderPartyList();
    }
};

window.moveDown = function(index) {
    if (index < collectedCreatures.length - 1) {
        let temp = collectedCreatures[index];
        collectedCreatures[index] = collectedCreatures[index + 1];
        collectedCreatures[index + 1] = temp;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(collectedCreatures));
        renderPartyList();
    }
};

window.moveToParty = function(index) {
    if (index >= 6 && index < collectedCreatures.length) {
        // Swap with the 6th slot (index 5)
        let targetIndex = 5;
        let temp = collectedCreatures[targetIndex];
        collectedCreatures[targetIndex] = collectedCreatures[index];
        collectedCreatures[index] = temp;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(collectedCreatures));
        renderPartyList();
    }
};

window.releaseCreature = function(index) {
    if (collectedCreatures.length <= 1) {
        alert("You cannot release your last creature!");
        return;
    }
    if (confirm('Are you sure you want to release ' + collectedCreatures[index].name + '?')) {
        collectedCreaturesIds.delete(collectedCreatures[index].id);
        collectedCreatures.splice(index, 1);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(collectedCreatures));
        renderPartyList();
    }
};

window.deleteProgress = function() {
    if (confirm('Are you sure? This will erase all save data.')) {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem('wildpulse_player_x');
        localStorage.removeItem('wildpulse_player_y');
        location.reload();
    }
};

// ==================== BREEDING ====================
window.breed = function(parent1, parent2) {
    let p1Prefix = parent1.name.substring(0, Math.ceil(parent1.name.length / 2));
    let p2Suffix = parent2.name.substring(Math.floor(parent2.name.length / 2));
    let childName = p1Prefix + p2Suffix;

    // Prevent duplicate names
    if (childName === parent1.name || childName === parent2.name) {
        childName = parent1.name.substring(0, 3) + parent2.name.substring(parent2.name.length - 3);
    }

    const combinedFeatures = [...parent1.features, ...parent2.features];

    // Shuffle and pick a random subset to avoid feature bloat
    const uniqueFeatures = Array.from(new Set(combinedFeatures)).sort(() => 0.5 - Math.random());
    const childFeatures = uniqueFeatures.slice(0, Math.min(4, Math.max(2, Math.floor(uniqueFeatures.length / 2))));

    // Inherit the visual characteristics
    const inheritedTraits = {
        bodySize: Math.random() < 0.5 ? parent1.bodySize : parent2.bodySize,
        bodyType: Math.random() < 0.5 ? parent1.bodyType : parent2.bodyType,
        uniqueFeature: Math.random() < 0.5 ? parent1.uniqueFeature : parent2.uniqueFeature,
        eyes: Math.random() < 0.5 ? parent1.eyes : parent2.eyes,
        skinFurType: Math.random() < 0.5 ? parent1.skinFurType : parent2.skinFurType,
        pattern: Math.random() < 0.5 ? parent1.pattern : parent2.pattern,
        wings: Math.random() < 0.5 ? parent1.wings : parent2.wings,
        clawHorn: Math.random() < 0.5 ? parent1.clawHorn : parent2.clawHorn,
        teeth: Math.random() < 0.5 ? parent1.teeth : parent2.teeth,
        limbs: Math.random() < 0.5 ? parent1.limbs : parent2.limbs,
        tail: Math.random() < 0.5 ? parent1.tail : parent2.tail,
        eyesColor: Math.random() < 0.5 ? parent1.eyesColor : parent2.eyesColor,
        skinFurColor: Math.random() < 0.5 ? parent1.skinFurColor : parent2.skinFurColor,
        wingsColor: Math.random() < 0.5 ? parent1.wingsColor : parent2.wingsColor,
        clawHornColor: Math.random() < 0.5 ? parent1.clawHornColor : parent2.clawHornColor,
        tailColor: Math.random() < 0.5 ? parent1.tailColor : parent2.tailColor,
        uniqueFeatureColor: Math.random() < 0.5 ? parent1.uniqueFeatureColor : parent2.uniqueFeatureColor
    };

    const childGeneration = Math.max(parent1.generation, parent2.generation) + 1;
    const childType = (parent1.type === parent2.type) ? parent1.type : `${parent1.type}-${parent2.type}`;

    // Advanced description blending
    let childDesc = `A generation ${childGeneration} marvel, ${childName} beautifully blends the traits of its parents, ${parent1.name} (${parent1.type}) and ${parent2.name} (${parent2.type}). `;
    childDesc += `It has inherited a ${inheritedTraits.bodySize}, ${inheritedTraits.bodyType} ${childType}-type body. `;
    childDesc += `Its form is covered in ${inheritedTraits.skinFurColor ? inheritedTraits.skinFurColor + ' ' : ''}${inheritedTraits.skinFurType} skin exhibiting distinct ${inheritedTraits.pattern}. `;
    childDesc += `${inheritedTraits.eyesColor ? inheritedTraits.eyesColor + ' ' : ''}${inheritedTraits.eyes} eyes gaze out with an ancestral intelligence. `;

    if (inheritedTraits.wings !== 'none') childDesc += `It soars gracefully on ${inheritedTraits.wingsColor ? inheritedTraits.wingsColor + ' ' : ''}${inheritedTraits.wings}. `;
    if (inheritedTraits.clawHorn !== 'none') childDesc += `It brandishes ${inheritedTraits.clawHornColor ? inheritedTraits.clawHornColor + ' ' : ''}${inheritedTraits.clawHorn} with striking confidence. `;
    if (inheritedTraits.teeth !== 'none') childDesc += `It bears ${inheritedTraits.teeth} inherited from its lineage. `;

    if (inheritedTraits.limbs !== 'none') childDesc += `It moves adeptly on ${inheritedTraits.limbs}. `;
    if (inheritedTraits.tail !== 'none') childDesc += `A ${inheritedTraits.tailColor ? inheritedTraits.tailColor + ' ' : ''}${inheritedTraits.tail} follows its every motion. `;

    childDesc += `Most stunningly, it manifests ${inheritedTraits.uniqueFeatureColor ? inheritedTraits.uniqueFeatureColor + ' ' : ''}${inheritedTraits.uniqueFeature}, a perfect synergy of its parents' extraordinary qualities.`;

    const childStats = {
        health: Math.floor((parent1.stats.health + parent2.stats.health) / 2),
        attack: Math.floor((parent1.stats.attack + parent2.stats.attack) / 2),
        defense: Math.floor(((parent1.stats.defense || 50) + (parent2.stats.defense || 50)) / 2),
        speed: Math.floor(((parent1.stats.speed || 50) + (parent2.stats.speed || 50)) / 2),
        specialAttack: Math.floor(((parent1.stats.specialAttack || 50) + (parent2.stats.specialAttack || 50)) / 2),
        specialDefense: Math.floor(((parent1.stats.specialDefense || 50) + (parent2.stats.specialDefense || 50)) / 2)
    };

    // Unique ID combining parent IDs and timestamp to avoid collisions
    const childId = `gen${childGeneration}_${parent1.id}_${parent2.id}_${Date.now()}`;

    // Blend colors simply by averaging RGB
    const c1 = parent1.color;
    const c2 = parent2.color;
    const r = Math.floor((((c1 >> 16) & 0xFF) + ((c2 >> 16) & 0xFF)) / 2);
    const g = Math.floor((((c1 >> 8) & 0xFF) + ((c2 >> 8) & 0xFF)) / 2);
    const b = Math.floor(((c1 & 0xFF) + (c2 & 0xFF)) / 2);
    const childColor = (r << 16) | (g << 8) | b;

    const childShiny = (parent1.isShiny || parent2.isShiny) && Math.random() < 0.25;
    if (childShiny) {
        for (let stat in childStats) {
            childStats[stat] = Math.floor(childStats[stat] * 1.2);
        }
    }

    return {
        id: childId,
        name: childName,
        description: childDesc,
        features: childFeatures,
        ...inheritedTraits,
        type: childType,
        stats: childStats,
        generation: childGeneration,
        color: childColor,
        level: 1,
        xp: 0,
        level: 1,
        xp: 0,
        nature: window.getRandomNature(),
        isShiny: childShiny,
        parents: {
            name1: parent1.name,
            type1: parent1.type,
            name2: parent2.name,
            type2: parent2.type
        }
    };
};

function populateSelect(selectElement) {
    selectElement.innerHTML = '';
    collectedCreatures.forEach(c => {
        const option = document.createElement('option');
        option.value = c.id;
        option.text = `${c.name} (Gen ${c.generation})`;
        selectElement.appendChild(option);
    });
}

window.openBreedingModal = function() {
    document.getElementById('breedingModal').style.display = 'block';
    const s1 = document.getElementById('parent1Select');
    const s2 = document.getElementById('parent2Select');
    populateSelect(s1);
    populateSelect(s2);
    document.getElementById('breedResult').innerText = '';
};

window.closeBreedingModal = function() {
    let _m_breedingModal = document.getElementById('breedingModal'); _m_breedingModal.children[0].classList.add('modal-fade-out'); setTimeout(() => { _m_breedingModal.style.display = 'none'; _m_breedingModal.children[0].classList.remove('modal-fade-out'); }, 190);
};

window.doBreed = function() {
    const id1 = document.getElementById('parent1Select').value;
    const id2 = document.getElementById('parent2Select').value;

    if (!id1 || !id2) {
        document.getElementById('breedResult').innerText = 'Please collect and select two parents.';
        return;
    }

    if (id1 === id2) {
        document.getElementById('breedResult').innerText = 'Cannot breed a creature with itself.';
        return;
    }

    const p1Index = collectedCreatures.findIndex(c => String(c.id) === String(id1));
    const p2Index = collectedCreatures.findIndex(c => String(c.id) === String(id2));

    if (p1Index !== -1 && p2Index !== -1) {
        const p1 = collectedCreatures[p1Index];
        const p2 = collectedCreatures[p2Index];

        // Ensure compatibility - either same type, or based on typeChart if they are somewhat compatible
        // Let's use the type modifier. If it's 0, they can't breed.
        const compatibility = window.getTypeModifier(p1.type, p2.type);
        if (compatibility === 0) {
             document.getElementById('breedResult').innerText = `Incompatible types: ${p1.type} cannot breed with ${p2.type}.`;
             return;
        }

        const child = window.breed(p1, p2);

        // Add the child
        saveCollected(child);

        document.getElementById('breedResult').innerText = `Successfully bred ${child.name} (Gen ${child.generation})! The parents remain in your party.`;

        // Re-populate to show new child
        populateSelect(document.getElementById('parent1Select'));
        populateSelect(document.getElementById('parent2Select'));
    }
};

// ==================== MULTIPLAYER LOBBY ====================
let multiplayerRoom = null;
let socket = null;
let peers = {};
let dataChannels = {};
let lastPing = {}; // userId -> timestamp

// Periodically broadcast ping to keep connections alive and check for dead peers
setInterval(() => {
    const now = Date.now();
    // Check for dead connections
    for (let userId in lastPing) {
        if (now - lastPing[userId] > 10000) { // 10 seconds timeout
            console.warn(`[Multiplayer] Connection to ${userId} timed out. Removing.`);
            if (peers[userId]) {
                peers[userId].close();
                delete peers[userId];
            }
            if (dataChannels[userId]) {
                delete dataChannels[userId];
            }
            delete lastPing[userId];
            if (window.removeRemotePlayer) {
                window.removeRemotePlayer(userId);
            }
        }
    }

    // Send ping
    const pingMsg = JSON.stringify({ type: 'ping' });
    Object.values(dataChannels).forEach(dc => {
        if (dc.readyState === 'open') {
            dc.send(pingMsg);
        }
    });
}, 3000);

window.joinMultiplayerRoom = function() {
    const code = document.getElementById('roomCodeInput').value.trim();
    if (code) {
        multiplayerRoom = code;
        let _m_lobbyModal = document.getElementById('lobbyModal'); _m_lobbyModal.children[0].classList.add('modal-fade-out'); setTimeout(() => { _m_lobbyModal.style.display = 'none'; _m_lobbyModal.children[0].classList.remove('modal-fade-out'); }, 190);

        // Signal intention to start multiplayer setup in the game config
        if (window.initializeMultiplayer) {
            window.initializeMultiplayer(multiplayerRoom);
        }
    }
};

window.initializeMultiplayer = function(roomCode) {
    socket = io();

    socket.emit('join-room', roomCode);

    socket.on('disconnect', () => {
        console.warn("[Multiplayer] Disconnected from server. Reconnecting...");
    });

    socket.on('connect', () => {
        console.log("[Multiplayer] Connected to server.");
        if (multiplayerRoom) {
            console.log(`[Multiplayer] Rejoining room ${multiplayerRoom}`);
            socket.emit('join-room', multiplayerRoom);
        }
    });

    socket.on('room-users', (users) => {
        users.forEach(userId => {
            createPeerConnection(userId, true);
        });
    });

    socket.on('user-joined', (userId) => {
        console.log("User joined:", userId);
        // Will receive offer from this user
    });

    socket.on('user-left', (userId) => {
        if (peers[userId]) {
            peers[userId].close();
            delete peers[userId];
        }
        if (dataChannels[userId]) {
            delete dataChannels[userId];
        }
        if (window.removeRemotePlayer) {
            window.removeRemotePlayer(userId);
        }
    });

    socket.on('signal', async (data) => {
        const { sender, signal } = data;
        let peer = peers[sender];

        if (!peer) {
            peer = createPeerConnection(sender, false);
        }

        if (signal.type === 'offer') {
            await peer.setRemoteDescription(new RTCSessionDescription(signal));
            const answer = await peer.createAnswer();
            await peer.setLocalDescription(answer);
            socket.emit('signal', {
                target: sender,
                signal: peer.localDescription
            });
        } else if (signal.type === 'answer') {
            await peer.setRemoteDescription(new RTCSessionDescription(signal));
        } else if (signal.candidate) {
            await peer.addIceCandidate(new RTCIceCandidate(signal));
        }
    });
};

function createPeerConnection(userId, initiator) {
    const pc = new RTCPeerConnection({
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
        ]
    });

    peers[userId] = pc;

    pc.onicecandidate = (event) => {
        if (event.candidate) {
            socket.emit('signal', {
                target: userId,
                signal: event.candidate
            });
        }
    };

    if (initiator) {
        const dc = pc.createDataChannel('gameData');
        setupDataChannel(dc, userId);

        pc.createOffer().then(offer => {
            return pc.setLocalDescription(offer);
        }).then(() => {
            socket.emit('signal', {
                target: userId,
                signal: pc.localDescription
            });
        });
    } else {
        pc.ondatachannel = (event) => {
            setupDataChannel(event.channel, userId);
        };
    }

    return pc;
}

function setupDataChannel(dc, userId) {
    dataChannels[userId] = dc;

    dc.onopen = () => {
        console.log("[Multiplayer] Data channel open with", userId);
        lastPing[userId] = Date.now();
    };

    dc.onclose = () => {
        console.log("[Multiplayer] Data channel closed with", userId);
        delete lastPing[userId];
    };

    dc.onmessage = (event) => {
        try {
            const msg = JSON.parse(event.data);
            lastPing[userId] = Date.now(); // update on ANY message to keep backward compatibility
            if (msg.type === 'ping') {
                return;
            }
            if (window.handleMultiplayerMessage) {
                window.handleMultiplayerMessage(userId, msg);
            }
        } catch (e) {
            console.error("[Multiplayer] Failed to parse msg:", e);
        }
    };
}

// ==================== PHASER GAME ====================
const WORLD_SIZE = 20000;

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    },
    scene: { preload: preload, create: create, update: update },
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

const game = new Phaser.Game(config);

let player;
let cursors;
let pointerTarget = null;
let creaturesGroup;
let popupText;
let popupBackground;
let popupTimer;
let bgGrass;
let inBattle = false;
let currentEnemy = null;
let currentPlayer = null;
let currentEnemySprite = null;
let remotePlayers = {}; // userId -> Phaser sprite

let battleLogQueue = [];
let isTyping = false;

function processLogQueue() {
    if (isTyping || battleLogQueue.length === 0) return;

    isTyping = true;
    const msg = battleLogQueue.shift();
    const log = document.getElementById('battleLog');

    const div = document.createElement('div');
    log.appendChild(div);

    // Strip simple HTML tags for the typewriter effect to work correctly
    // Since we sometimes use <b> tags
    const isHtml = msg.includes('<');

    if (isHtml) {
        div.innerHTML = msg;
        log.scrollTop = log.scrollHeight;
        isTyping = false;
        setTimeout(processLogQueue, 50);
        return;
    }

    let i = 0;
    function typeChar() {
        if (i < msg.length) {
            div.innerHTML += msg.charAt(i);
            i++;
            log.scrollTop = log.scrollHeight;
            setTimeout(typeChar, 20); // typing speed
        } else {
            isTyping = false;
            setTimeout(processLogQueue, 50); // wait before next message
        }
    }
    typeChar();
}

function logBattle(msg) {
    battleLogQueue.push(msg);
    processLogQueue();
}

function updateBattleUI() {
    // Player
    document.getElementById('pName').innerText = currentPlayer.nickname || currentPlayer.name;
    document.getElementById('pLevel').innerText = currentPlayer.level || 1;
    document.getElementById('pLevel').style.color = '#2196F3';
    document.getElementById('pStatus').innerText = currentPlayer.status ? `[${currentPlayer.status}]` : '';
    document.getElementById('pHPText').innerText = Math.max(0, currentPlayer.currentHp).toFixed(1) + ' / ' + currentPlayer.maxHp.toFixed(1);
    document.getElementById('pHPText').style.color = currentPlayer.currentHp <= 0.3 * currentPlayer.maxHp ? '#f44336' : '#4caf50';
    document.getElementById('pHPBar').style.width = (Math.max(0, currentPlayer.currentHp) / currentPlayer.maxHp * 100) + '%';
    if(currentPlayer.color) document.getElementById('pSprite').style.backgroundColor = '#' + currentPlayer.color.toString(16).padStart(6, '0');

    // Enemy
    document.getElementById('eName').innerText = currentEnemy.name;
    document.getElementById('eLevel').innerText = currentEnemy.level || 1;
    document.getElementById('eLevel').style.color = '#2196F3';
    document.getElementById('eStatus').innerText = currentEnemy.status ? `[${currentEnemy.status}]` : '';
    document.getElementById('eHPText').innerText = Math.max(0, currentEnemy.currentHp).toFixed(1) + ' / ' + currentEnemy.maxHp.toFixed(1);
    document.getElementById('eHPText').style.color = currentEnemy.currentHp <= 0.3 * currentEnemy.maxHp ? '#f44336' : '#4caf50';
    document.getElementById('eHPBar').style.width = (Math.max(0, currentEnemy.currentHp) / currentEnemy.maxHp * 100) + '%';
    if(currentEnemy.color) document.getElementById('eSprite').style.backgroundColor = '#' + currentEnemy.color.toString(16).padStart(6, '0');
}



function preload() {
    // Pre-generate detailed grass blades so they remain consistent across frames
    const blades = [];
    for (let i = 0; i < 400; i++) {
        blades.push({
            x: Math.random() * 64,
            y: Math.random() * 64,
            height: Math.random() * 10 + 5,
            color: Math.random() > 0.6 ? '#006400' : (Math.random() > 0.3 ? '#2E8B57' : '#32CD32')
        });
    }

    // Generate procedural animated grass background frames
    const numFrames = 12;
    for (let frame = 0; frame < numFrames; frame++) {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        // Better base grass color gradient blending for seamlessness
        let gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 45);
        gradient.addColorStop(0, '#1a661a'); // Dark center
        gradient.addColorStop(1, '#228B22'); // Edge blend color
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);

        // Dither the base slightly to break grid appearance
        for (let j = 0; j < 64; j += 4) {
            for (let k = 0; k < 64; k += 4) {
                if (Math.random() < 0.2) {
                    ctx.fillStyle = Math.random() < 0.5 ? '#1c731c' : '#1e781e';
                    ctx.fillRect(j, k, 4, 4);
                }
            }
        }

        // Calculate offset for wind waving effect
        const windOffset = Math.sin((frame / numFrames) * Math.PI * 2) * 3;

        // Draw multiple layers of grass for depth
        for (let i = 0; i < blades.length; i++) {
            ctx.fillStyle = blades[i].color;
            let drawX = blades[i].x;

            ctx.beginPath();
            ctx.moveTo(drawX, blades[i].y + blades[i].height);
            // Bend the blade of grass at the top based on wind
            ctx.quadraticCurveTo(drawX, blades[i].y + blades[i].height / 2, drawX + windOffset * (blades[i].height / 15), blades[i].y);
            ctx.lineTo(drawX + 2, blades[i].y + blades[i].height);
            ctx.fill();

            // Handle wrap around for seamless horizontal tile edges
            if (drawX + windOffset > 60) {
                 ctx.beginPath();
                 ctx.moveTo(drawX - 64, blades[i].y + blades[i].height);
                 ctx.quadraticCurveTo(drawX - 64, blades[i].y + blades[i].height / 2, drawX - 64 + windOffset * (blades[i].height / 15), blades[i].y);
                 ctx.lineTo(drawX - 64 + 2, blades[i].y + blades[i].height);
                 ctx.fill();
            }
            if (drawX + windOffset < 4) { // Handle left-side wrap around
                 ctx.beginPath();
                 ctx.moveTo(drawX + 64, blades[i].y + blades[i].height);
                 ctx.quadraticCurveTo(drawX + 64, blades[i].y + blades[i].height / 2, drawX + 64 + windOffset * (blades[i].height / 15), blades[i].y);
                 ctx.lineTo(drawX + 64 + 2, blades[i].y + blades[i].height);
                 ctx.fill();
            }
        }

        this.textures.addCanvas('grass_' + frame, canvas);
    }



    // Generate animated realistic water textures
    const numWaterFrames = 16;

    for (let frame = 0; frame < numWaterFrames; frame++) {
        const obsCanvas = document.createElement('canvas');
        obsCanvas.width = 400;
        obsCanvas.height = 400;
        const obsCtx = obsCanvas.getContext('2d');

        // Solid sapphire blue base to prevent grid-like borders
        obsCtx.fillStyle = '#0f52ba';
        obsCtx.fillRect(0, 0, 400, 400);

        const t = (frame / numWaterFrames) * Math.PI * 2;

        // Draw overlapping transparent wave bands for caustics/ripples effect
        // Using globalCompositeOperation to blend the waves seamlessly
        obsCtx.globalCompositeOperation = 'screen';

        for (let layer = 0; layer < 3; layer++) {
            obsCtx.fillStyle = `rgba(135, 206, 250, ${0.15 - layer * 0.03})`; // Fade layers

            let speed = 1 + layer * 0.5;

            // Calculate perfect repeating scales across 400px
            let k1 = 2 + layer;
            let k2 = 3 + layer;
            let k3 = 4 - layer;
            let s1 = (Math.PI * 2 * k1) / 400;
            let s2 = (Math.PI * 2 * k2) / 400;
            let s3 = (Math.PI * 2 * k3) / 400;

            for (let y = -40; y < 440; y += 20) {
                obsCtx.beginPath();
                for (let x = 0; x <= 400; x += 10) {
                    // Mathematically perfect wrapping sines at boundaries
                    let waveY = y +
                                Math.sin((x * s1) + (t * speed)) * 5 +
                                Math.sin(((x+y) * s2) - t) * 3 +
                                Math.cos((x * s3) + (t * speed * 0.7)) * 2;

                    if (x === 0) obsCtx.moveTo(x, waveY);
                    else obsCtx.lineTo(x, waveY);
                }
                obsCtx.lineTo(400, y + 20);
                obsCtx.lineTo(0, y + 20);
                obsCtx.fill();
            }
        }

        obsCtx.globalCompositeOperation = 'source-over';

        // Add subtle shimmering reflection dots
        obsCtx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        for (let s = 0; s < 10; s++) {
            // Seed random positions based on deterministic math to loop perfectly
            let sx = (s * 37 + frame * 5) % 100;
            let sy = (s * 53 - frame * 2 + 100) % 100;
            obsCtx.beginPath();
            obsCtx.arc(sx, sy, 1 + Math.sin(t + s)*0.5, 0, Math.PI * 2);
            obsCtx.fill();
        }

        this.textures.addCanvas('obs_tex_' + frame, obsCanvas);

        // Generate foam edge overlay texture (transparent background, white bubbling foam on one side)
        const foamCanvas = document.createElement('canvas');
        foamCanvas.width = 100;
        foamCanvas.height = 100;
        const foamCtx = foamCanvas.getContext('2d');

        foamCtx.clearRect(0, 0, 100, 100);
        foamCtx.fillStyle = 'rgba(240, 248, 255, 0.8)'; // Alice blue foam

        foamCtx.beginPath();
        foamCtx.moveTo(0, 0);
        for(let fy = 0; fy <= 100; fy += 5) {
            // Foam undulates along the left edge (x=0)
            let fx = 5 + Math.sin(fy * 0.1 + t * 2) * 3 + Math.cos(fy * 0.2 - t) * 2;
            foamCtx.lineTo(fx, fy);
        }
        foamCtx.lineTo(0, 100);
        foamCtx.fill();

        // Add scattered bubbles pulling away from foam
        foamCtx.fillStyle = 'rgba(240, 248, 255, 0.6)';
        for(let b=0; b<15; b++) {
            let bx = 8 + (Math.sin(b*13 + t*3) + 1) * 6; // range 8 to 20
            let by = (b*27 + frame*2) % 100;
            let size = 1 + (b%2);
            foamCtx.beginPath();
            foamCtx.arc(bx, by, size, 0, Math.PI*2);
            foamCtx.fill();
        }

        this.textures.addCanvas('foam_tex_' + frame, foamCanvas);
    }

    // Generate rounded corner cutouts (8px radius to match buttons)
    // Convex corner (outer edge of water, grass cuts into the water square)
    const convexCanvas = document.createElement('canvas');
    convexCanvas.width = 8;
    convexCanvas.height = 8;
    const convexCtx = convexCanvas.getContext('2d');
    convexCtx.fillStyle = '#1a661a'; // Grass color
    convexCtx.fillRect(0, 0, 8, 8);
    convexCtx.globalCompositeOperation = 'destination-out';
    convexCtx.beginPath();
    convexCtx.arc(8, 8, 8, 0, Math.PI * 2);
    convexCtx.fill();
    this.textures.addCanvas('grass_corner_convex', convexCanvas);

    // Concave corner (inner edge of water, water cuts into the grass square)
    const concaveCanvas = document.createElement('canvas');
    concaveCanvas.width = 8;
    concaveCanvas.height = 8;
    const concaveCtx = concaveCanvas.getContext('2d');
    // Draw a water-colored square, then cut out a grass-colored circle
    // Actually, it's easier to just draw the grass filling the corner
    concaveCtx.fillStyle = '#1a661a'; // Grass color
    concaveCtx.beginPath();
    concaveCtx.moveTo(0, 0);
    concaveCtx.lineTo(8, 0);
    concaveCtx.arc(0, 0, 8, 0, Math.PI / 2, false);
    concaveCtx.lineTo(0, 0);
    concaveCtx.fill();
    this.textures.addCanvas('grass_corner_concave', concaveCanvas);

    // Pre-generate a water overlay texture to mimic the linear-gradient button style
    const overlayCanvas = document.createElement('canvas');
    overlayCanvas.width = 100;
    overlayCanvas.height = 100;
    const overlayCtx = overlayCanvas.getContext('2d');
    let overlayGrad = overlayCtx.createLinearGradient(0, 0, 0, 100);
    overlayGrad.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
    overlayGrad.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
    overlayCtx.fillStyle = overlayGrad;
    overlayCtx.fillRect(0, 0, 100, 100);
    this.textures.addCanvas('water_overlay', overlayCanvas);
}

let mapData = []; // To store 100x100 grid data
let obstaclesGroup;
let activeTiles = {}; // Track active viewport tiles to cull

function spawnTile(scene, r, c, tileSize, cols, rows) {
    let sprites = [];
    let posX = c * tileSize + tileSize / 2;
    let posY = r * tileSize + tileSize / 2;

    // Add drop shadow
    let shadow = scene.add.rectangle(posX + 6, posY + 4, 100, 100, 0x000000, 0.5);
    shadow.setDepth(0);
    sprites.push(shadow);

    // Create obstacle
    let obs = obstaclesGroup.create(posX, posY, 'obs_tex_0');
    let gridX = (c * tileSize) % 400;
    let gridY = (r * tileSize) % 400;
    obs.setCrop(gridX, gridY, 100, 100);
    obs.setDisplayOrigin(gridX + 50, gridY + 50);
    obs.body.setSize(100, 100);
    obs.body.x = posX - 50;
    obs.body.y = posY - 50;
    obs.anims.play('water_anim', true);
    obs.setDepth(0);
    sprites.push(obs);

    // Add overlay
    let overlay = scene.add.sprite(posX, posY, 'water_overlay');
    overlay.setBlendMode(Phaser.BlendModes.MULTIPLY);
    overlay.setDepth(0);
    sprites.push(overlay);

    // Convex corners
    if (c > 0 && mapData[r][c-1] === 'grass' && r > 0 && mapData[r-1][c] === 'grass') {
        let corner = scene.add.sprite(posX - 50 + 4, posY - 50 + 4, 'grass_corner_convex');
        corner.setDepth(0);
        sprites.push(corner);
    }
    if (c < cols-1 && mapData[r][c+1] === 'grass' && r > 0 && mapData[r-1][c] === 'grass') {
        let corner = scene.add.sprite(posX + 50 - 4, posY - 50 + 4, 'grass_corner_convex');
        corner.setAngle(90);
        corner.setDepth(0);
        sprites.push(corner);
    }
    if (c < cols-1 && mapData[r][c+1] === 'grass' && r < rows-1 && mapData[r+1][c] === 'grass') {
        let corner = scene.add.sprite(posX + 50 - 4, posY + 50 - 4, 'grass_corner_convex');
        corner.setAngle(180);
        corner.setDepth(0);
        sprites.push(corner);
    }
    if (c > 0 && mapData[r][c-1] === 'grass' && r < rows-1 && mapData[r+1][c] === 'grass') {
        let corner = scene.add.sprite(posX - 50 + 4, posY + 50 - 4, 'grass_corner_convex');
        corner.setAngle(270);
        corner.setDepth(0);
        sprites.push(corner);
    }

    // Concave corners
    if (c > 0 && mapData[r][c-1] === 'obs' && r > 0 && mapData[r-1][c] === 'obs' && mapData[r-1][c-1] === 'grass') {
        let corner = scene.add.sprite(posX - 50 + 4, posY - 50 + 4, 'grass_corner_concave');
        corner.setDepth(0);
        sprites.push(corner);
    }
    if (c < cols-1 && mapData[r][c+1] === 'obs' && r > 0 && mapData[r-1][c] === 'obs' && mapData[r-1][c+1] === 'grass') {
        let corner = scene.add.sprite(posX + 50 - 4, posY - 50 + 4, 'grass_corner_concave');
        corner.setAngle(90);
        corner.setDepth(0);
        sprites.push(corner);
    }
    if (c < cols-1 && mapData[r][c+1] === 'obs' && r < rows-1 && mapData[r+1][c] === 'obs' && mapData[r+1][c+1] === 'grass') {
        let corner = scene.add.sprite(posX + 50 - 4, posY + 50 - 4, 'grass_corner_concave');
        corner.setAngle(180);
        corner.setDepth(0);
        sprites.push(corner);
    }
    if (c > 0 && mapData[r][c-1] === 'obs' && r < rows-1 && mapData[r+1][c] === 'obs' && mapData[r+1][c-1] === 'grass') {
        let corner = scene.add.sprite(posX - 50 + 4, posY + 50 - 4, 'grass_corner_concave');
        corner.setAngle(270);
        corner.setDepth(0);
        sprites.push(corner);
    }

    // Foams
    if (c > 0 && mapData[r][c-1] === 'grass') {
        let foam = scene.add.sprite(posX, posY, 'foam_tex_0');
        foam.anims.play('foam_anim', true);
        foam.setDepth(0);
        sprites.push(foam);
    }
    if (c < cols-1 && mapData[r][c+1] === 'grass') {
        let foam = scene.add.sprite(posX, posY, 'foam_tex_0');
        foam.setAngle(180);
        foam.anims.play('foam_anim', true);
        foam.setDepth(0);
        sprites.push(foam);
    }
    if (r > 0 && mapData[r-1][c] === 'grass') {
        let foam = scene.add.sprite(posX, posY, 'foam_tex_0');
        foam.setAngle(90);
        foam.anims.play('foam_anim', true);
        foam.setDepth(0);
        sprites.push(foam);
    }
    if (r < rows-1 && mapData[r+1][c] === 'grass') {
        let foam = scene.add.sprite(posX, posY, 'foam_tex_0');
        foam.setAngle(-90);
        foam.anims.play('foam_anim', true);
        foam.setDepth(0);
        sprites.push(foam);
    }

    return sprites;
}

function destroyTile(key) {
    if (activeTiles[key]) {
        activeTiles[key].forEach(sprite => {
            if (sprite && sprite.destroy) sprite.destroy();
        });
        delete activeTiles[key];
    }
}

function create() {
    // Generate map terrain
    const TILE_SIZE = 100;
    const cols = WORLD_SIZE / TILE_SIZE; // 100
    const rows = WORLD_SIZE / TILE_SIZE; // 100

    // Fill background with grass
    bgGrass = this.add.tileSprite(0, 0, WORLD_SIZE, WORLD_SIZE, 'grass_0').setOrigin(0, 0);
    bgGrass.setDepth(-1);
    obstaclesGroup = this.physics.add.staticGroup();

    // Create water animation globally so it can be played on sprites
    let waterFrames = [];
    let foamFrames = [];
    for(let i = 0; i < 16; i++) {
        waterFrames.push({ key: 'obs_tex_' + i });
        foamFrames.push({ key: 'foam_tex_' + i });
    }

    this.anims.create({
        key: 'water_anim',
        frames: waterFrames,
        frameRate: 8,
        repeat: -1
    });

    this.anims.create({
        key: 'foam_anim',
        frames: foamFrames,
        frameRate: 8,
        repeat: -1
    });

    // Procedural generation
    // First fill map with grass
    for (let r = 0; r < rows; r++) {
        mapData[r] = [];
        for (let c = 0; c < cols; c++) {
            mapData[r][c] = 'grass';
        }
    }

    // Generate lakes (clusters of water)
    const numLakes = Math.floor((cols * rows) * 0.015); // Adjust density
    for (let l = 0; l < numLakes; l++) {
        let cx = Math.floor(Math.random() * cols);
        let cy = Math.floor(Math.random() * rows);
        let lakeSize = Math.floor(Math.random() * 7) + 2; // 2 to 8 tiles

        let tilesPlaced = 0;
        let queue = [{x: cx, y: cy}];
        let visited = new Set([`${cx},${cy}`]);

        while(queue.length > 0 && tilesPlaced < lakeSize) {
            let current = queue.shift();

            if (current.x >= 0 && current.x < cols && current.y >= 0 && current.y < rows) {
                mapData[current.y][current.x] = 'obs';
                tilesPlaced++;

                // Add neighbors to queue with a chance
                const neighbors = [
                    {x: current.x + 1, y: current.y}, {x: current.x - 1, y: current.y},
                    {x: current.x, y: current.y + 1}, {x: current.x, y: current.y - 1}
                ];

                // Shuffle neighbors to make organic shapes
                neighbors.sort(() => Math.random() - 0.5);

                for (let n of neighbors) {
                    let key = `${n.x},${n.y}`;
                    if (!visited.has(key) && Math.random() < 0.7) { // 70% chance to spread
                        visited.add(key);
                        queue.push(n);
                    }
                }
            }
        }
    }

    // Tiles are no longer instantiated upfront. They will be instantiated
    // dynamically in the update() loop based on the viewport.

    // Player setup
    const savedX = localStorage.getItem('wildpulse_player_x');
    const savedY = localStorage.getItem('wildpulse_player_y');
    let startX = savedX ? parseFloat(savedX) : WORLD_SIZE / 2;
    let startY = savedY ? parseFloat(savedY) : WORLD_SIZE / 2;

    // Ensure player spawns on grass
    let pCol = Math.floor(startX / 100);
    let pRow = Math.floor(startY / 100);
    if (!mapData[pRow] || mapData[pRow][pCol] !== 'grass') {
        let safePos = window.getStrictSafeDryLandSpawn(null);
        startX = safePos.x;
        startY = safePos.y;
    }

    player = this.add.rectangle(startX, startY, 40, 40, 0xFFFFFF);
    player.setDepth(10);
    this.physics.add.existing(player);
    player.body.setCollideWorldBounds(true);
    this.physics.add.collider(player, obstaclesGroup);

    this.physics.world.setBounds(0, 0, WORLD_SIZE, WORLD_SIZE);
    this.cameras.main.setBounds(0, 0, WORLD_SIZE, WORLD_SIZE);
    this.cameras.main.startFollow(player);

    // Popup Layer
    popupBackground = this.add.rectangle(window.innerWidth / 2, window.innerHeight - 100, 600, 150, 0x000000, 0.8)
        .setScrollFactor(0)
        .setOrigin(0.5);
    popupText = this.add.text(window.innerWidth / 2, window.innerHeight - 100, "", {
        fontSize: '18px',
        fill: '#FFF',
        align: 'center',
        wordWrap: { width: 560 }
    }).setScrollFactor(0).setOrigin(0.5);

    popupBackground.setVisible(false);
    popupText.setVisible(false);

    // Controls
    cursors = this.input.keyboard.createCursorKeys();

    this.input.on('pointerdown', (pointer) => {
        pointerTarget = { x: pointer.worldX, y: pointer.worldY };
    });

    this.input.on('pointermove', (pointer) => {
        if (pointer.isDown) {
            pointerTarget = { x: pointer.worldX, y: pointer.worldY };
        }
    });

    this.input.on('pointerup', () => {
        pointerTarget = null;
    });

    // Resize handling for popup
    this.scale.on('resize', (gameSize) => {
        popupBackground.setPosition(gameSize.width / 2, gameSize.height - 100);
        popupText.setPosition(gameSize.width / 2, gameSize.height - 100);
    });

    // Set up multiplayer message handler for Phaser scene
    window.handleMultiplayerMessage = (userId, msg) => {
        if (msg.type === 'pos' || msg.type === 'position') { // accept both for backwards compatibility if needed
            if (!remotePlayers[userId]) {
                // Create new remote player
                let remotePlayer = this.add.rectangle(msg.x, msg.y, 40, 40, 0xFF0000); // Red for other players
                this.physics.add.existing(remotePlayer);
                remotePlayer.setDepth(10);
                remotePlayer.setData('targetX', msg.x);
                remotePlayer.setData('targetY', msg.y);
                remotePlayer.setData('vx', msg.vx || 0);
                remotePlayer.setData('vy', msg.vy || 0);
                remotePlayer.setData('lastUpdate', Date.now());
                remotePlayers[userId] = remotePlayer;
            } else {
                const rp = remotePlayers[userId];

                // Ignore large unexpected jumps to prevent cheating
                const dist = Math.hypot(rp.x - msg.x, rp.y - msg.y);
                if (dist > 1500) {
                    console.warn(`[Multiplayer] Dropping impossible movement update from ${userId} (${dist}px jump)`);
                    return; // Reject movement
                }

                // Update target position and velocity
                rp.setData('targetX', msg.x);
                rp.setData('targetY', msg.y);
                rp.setData('vx', msg.vx || 0);
                rp.setData('vy', msg.vy || 0);
                rp.setData('lastUpdate', Date.now());
            }
        }
    };

    window.removeRemotePlayer = (userId) => {
        if (remotePlayers[userId]) {
            remotePlayers[userId].destroy();
            delete remotePlayers[userId];
        }
    };

    // Creatures setup
    creaturesGroup = this.physics.add.group();
    creaturesGroup.setDepth(1);
    this.physics.world.setBounds(0, 0, WORLD_SIZE, WORLD_SIZE);

    // Spawn base creatures (increased by 200% for density)
    let spawnCount = Math.floor(baseCreatures.length * 2.0);
    for (let i = 0; i < spawnCount; i++) {
        spawnCreature(this, baseCreatures[i % baseCreatures.length]);
    }

    // Overlap physics
    this.physics.add.overlap(player, creaturesGroup, collectCreature, null, this);
}

function spawnCreature(scene, creatureData, forceX, forceY) {
    if (creaturesGroup && creaturesGroup.getChildren().length >= 100) return;
    let x = forceX;
    let y = forceY;
    if (x === undefined || y === undefined) {
        let found = false;
        let attempts = 0;
        while (!found && attempts < 100) {
            let tryX = Phaser.Math.Between(100, WORLD_SIZE - 100);
            let tryY = Phaser.Math.Between(100, WORLD_SIZE - 100);
            let col = Math.floor(tryX / 100);
            let row = Math.floor(tryY / 100);
            if (mapData[row] && mapData[row][col] === 'grass') {
                x = tryX;
                y = tryY;
                found = true;
            }
            attempts++;
        }
        if (!found) {
            x = 500;
            y = 500;
        }
    }

    let clonedData = JSON.parse(JSON.stringify(creatureData));

    // Randomize stats with IVs (0-31)
    if (clonedData.stats) {
        for (let stat in clonedData.stats) {
            clonedData.stats[stat] += Math.floor(Math.random() * 32);
        }
    }

    // 0.1% Shiny Chance
    clonedData.isShiny = Math.random() < 0.001;
    if (clonedData.isShiny && clonedData.stats) {
        for (let stat in clonedData.stats) {
            clonedData.stats[stat] = Math.floor(clonedData.stats[stat] * 1.2);
        }
    }

    // Generate Pokémon-like fantasy name
    const prefixes = ["Flare", "Aqua", "Volt", "Glim", "Thorn", "Zephyr", "Umbra", "Aero", "Cinder", "Frost"];
    const suffixes = ["wing", "tail", "fang", "bloom", "claw", "spark", "horn", "scale", "shell", "strike"];
    if (!clonedData.baseId) {
        clonedData.baseId = clonedData.id; // Store original base prototype ID
    }

    // Only generate a new name if it's not a bred creature (generation > 1) and not already generated
    if (!clonedData.generation || clonedData.generation === 1) {
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
        clonedData.name = prefix + suffix;
    }

    // Assign random nature and unique ID on spawn
    clonedData.nature = window.getRandomNature();

    let maxPossibleLevel = collectedCreatures.length > 0 ? Math.max(...collectedCreatures.map(c => c.level || 1)) : 1;
    if (maxPossibleLevel === 1) {
        clonedData.level = 1;
    } else {
        let baseLevel = Math.floor(Math.random() * 5) + 1;
        let wildLevel = Math.min(baseLevel + Math.floor(Math.random() * 3), maxPossibleLevel + 2);
        clonedData.level = Math.max(1, wildLevel);
    }
    clonedData.xp = 0;

    clonedData.id = Date.now().toString() + "_" + Math.floor(Math.random() * 1000000).toString();

    const sprite = scene.add.rectangle(x, y, 30, 30, clonedData.color);
    scene.physics.add.existing(sprite);
    sprite.setDepth(10);
    sprite.setData('creatureData', clonedData);
    creaturesGroup.add(sprite);
}

function collectCreature(playerCollider, creatureSprite) {
    if (inBattle) return;
    if (playerCollider.lastBattleTime && this.time.now - playerCollider.lastBattleTime < 5000) return;

    if (collectedCreatures.length === 0) {
        const data = JSON.parse(JSON.stringify(creatureSprite.getData('creatureData')));
        saveCollected(data);
        creatureSprite.destroy();
        const basePrototype = window.baseCreatures.find(c => c.id === data.baseId) || window.baseCreatures.find(c => c.name === data.name);
        spawnCreature(this, basePrototype || data, 500, 500);
        return;
    }

    inBattle = true;
    playerCollider.body.setVelocity(0);
    playerCollider.body.moves = false;

    currentEnemy = JSON.parse(JSON.stringify(creatureSprite.getData('creatureData')));
    currentEnemySprite = creatureSprite;

    currentEnemy.maxHp = window.getEffectiveStat(currentEnemy, 'health');
    currentEnemy.currentHp = currentEnemy.maxHp;
    currentEnemy.isDefending = false;

    currentPlayer = JSON.parse(JSON.stringify(collectedCreatures[0]));
    currentPlayer.maxHp = window.getEffectiveStat(currentPlayer, 'health');
    currentPlayer.currentHp = currentPlayer.maxHp;
    currentPlayer.isDefending = false;

    document.getElementById('battleModal').style.display = 'block';
    document.getElementById('battleLog').innerHTML = '';
    battleLogQueue = []; // Clear queue on new battle
    isTyping = false;

    let shinyPrefix = currentEnemy.isShiny ? "Shiny " : "";
    const flavorTexts = [
        `emerges from the tall grass, eyes gleaming!`,
        `blocks your path with wild energy!`,
        `suddenly jumps out of the foliage!`,
        `stares you down intensely.`
    ];
    const randomFlavor = flavorTexts[Math.floor(Math.random() * flavorTexts.length)];

    logBattle(`A wild <span style="color:#f44336">${shinyPrefix}${currentEnemy.name}</span> <span style="color:#ffb74d">${randomFlavor}</span>`);
    logBattle(`Your pulse quickens... Go, <span style="color:#2196F3">${currentPlayer.nickname || currentPlayer.name}</span>!`);

    if (currentEnemy.isShiny) {
        const flash = this.add.rectangle(playerCollider.x, playerCollider.y, window.innerWidth * 2, window.innerHeight * 2, 0xFFFFFF, 0.8).setScrollFactor(0);
        this.tweens.add({
            targets: flash,
            alpha: 0,
            duration: 1000,
            onComplete: () => flash.destroy()
        });
    }

    updateBattleUI();
}

function applyStatusEffect(target, status) {
    if (target.status) return;
    if (Math.random() < 0.20) {
        target.status = status;
        let color = target === currentPlayer ? "#2196F3" : "#f44336";
        logBattle(`<span class="status"><span style="color:${color}">${target.nickname || target.name}</span> was inflicted with ${status}!</span>`);
    }
}

function processStatuses(creature) {
    if (!creature.status) return true;
    let color = creature === currentPlayer ? "#2196F3" : "#f44336";

    if (creature.status === 'Poison') {
        let dmg = creature.maxHp * 0.10;
        creature.currentHp -= dmg;
        logBattle(`<span style="color:${color}">${creature.nickname || creature.name}</span> is hurt by Poison for <span class="damage">${dmg.toFixed(1)} damage</span>!`);
    } else if (creature.status === 'Burn') {
        let dmg = creature.maxHp * 0.05;
        creature.currentHp -= dmg;
        logBattle(`<span style="color:${color}">${creature.nickname || creature.name}</span> is hurt by Burn for <span class="damage">${dmg.toFixed(1)} damage</span>!`);
    } else if (creature.status === 'Sleep') {
        if (Math.random() < 0.40) {
            creature.status = null;
            logBattle(`<span style="color:${color}">${creature.nickname || creature.name}</span> woke up!`);
            return true;
        } else {
            logBattle(`<span style="color:${color}">${creature.nickname || creature.name}</span> is fast asleep...`);
            return false;
        }
    }

    return true;
}

window.doPlayerAction = function(action, callback) {
    if (!inBattle) return;
    let canMove = processStatuses(currentPlayer);
    if (!canMove) {
        updateBattleUI();
        if (callback) setTimeout(callback, 1000);
        return;
    }

    if (action === 'attack') {
        let damage = window.calculateDamage(currentPlayer, currentEnemy, 50);

        if (Math.random() < 0.10) {
            damage *= 1.5;
            logBattle("<span class=\"critical\">Critical Hit!</span>");
        }

        currentEnemy.currentHp -= damage;
        logBattle(`<span style="color:#2196F3">${currentPlayer.nickname || currentPlayer.name}</span> <span style="color:#ffb74d">used Attack!</span> Dealt <span class="damage">${damage.toFixed(1)} damage</span>.`);

        if (currentPlayer.type === 'Fire') applyStatusEffect(currentEnemy, 'Burn');
        else if (currentPlayer.type === 'Nature') applyStatusEffect(currentEnemy, 'Poison');
        else if (currentPlayer.type === 'Water') applyStatusEffect(currentEnemy, 'Sleep');
    } else if (action === 'catch') {
        if (collectedCreatures.length >= 1375) {
            logBattle("<b>Your storage is full! You cannot catch more creatures.</b>");
            updateBattleUI();
            if (callback) setTimeout(callback, 1500);
            return;
        }
        let hpPct = currentEnemy.currentHp / currentEnemy.maxHp;
        let base_rate = 1.0;
        let chance = 100 * (1.1 - hpPct) * base_rate; // 10% at full HP, 110% at 0 HP
        let catchChance = Math.max(1, Math.min(100, chance));

        if ((Math.random() * 100) < catchChance) {
            logBattle(`<b><span style="color:#4caf50">Success! Caught </span><span style="color:#f44336">${currentEnemy.name}</span><span style="color:#4caf50">!</span></b>`);
            updateBattleUI();
            endBattle('caught');
            return;
        } else {
            logBattle(`<span style="color:#9e9e9e">Oh no! The wild </span><span style="color:#f44336">${currentEnemy.name}</span><span style="color:#9e9e9e"> broke free!</span>`);
        }
    } else if (action === 'run') {
        let pSpe = window.getEffectiveStat(currentPlayer, 'speed');
        let eSpe = window.getEffectiveStat(currentEnemy, 'speed');
        let runChance = 0.5 + (pSpe - eSpe) * 0.01;
        if (Math.random() < runChance) {
            logBattle('<b><span style="color:#9e9e9e">Got away safely!</span></b>');
            updateBattleUI();
            endBattle('run');
            return;
        } else {
            logBattle('<span style="color:#9e9e9e">Failed to run away!</span>');
        }
    }

    updateBattleUI();

    if (currentEnemy.currentHp <= 0) {
        logBattle(`<span style="color:#9e9e9e">The wild </span><span style="color:#f44336">${currentEnemy.name}</span><span style="color:#9e9e9e"> fainted!</span>`);
        endBattle('win');
        return;
    }

    if (callback) setTimeout(callback, 1000);
};

window.doEnemyAction = function(callback) {
    if (!inBattle) return;
    let canMove = processStatuses(currentEnemy);
    if (!canMove) {
        updateBattleUI();
        if (currentPlayer.currentHp <= 0) {
            logBattle(`<span style="color:#2196F3">${currentPlayer.nickname || currentPlayer.name}</span><span style="color:#9e9e9e"> fainted!</span>`);
            endBattle('loss');
        } else if (currentEnemy.currentHp <= 0) {
            logBattle(`<span style="color:#9e9e9e">The wild </span><span style="color:#f44336">${currentEnemy.name}</span><span style="color:#9e9e9e"> fainted!</span>`);
            endBattle('win');
        } else {
            if (callback) setTimeout(callback, 1000);
        }
        return;
    }

    let damage = window.calculateDamage(currentEnemy, currentPlayer, 50);

    if (Math.random() < 0.10) {
        damage *= 1.5;
        logBattle("<span class=\"critical\">Critical Hit by enemy!</span>");
    }

    currentPlayer.currentHp -= damage;
    logBattle(`Wild <span style="color:#f44336">${currentEnemy.name}</span> <span style="color:#ffb74d">used Attack!</span> Dealt <span class="damage">${damage.toFixed(1)} damage</span>.`);

    if (currentEnemy.type === 'Fire') applyStatusEffect(currentPlayer, 'Burn');
    else if (currentEnemy.type === 'Nature') applyStatusEffect(currentPlayer, 'Poison');
    else if (currentEnemy.type === 'Water') applyStatusEffect(currentPlayer, 'Sleep');

    updateBattleUI();

    if (currentPlayer.currentHp <= 0) {
        logBattle(`<span style="color:#2196F3">${currentPlayer.nickname || currentPlayer.name}</span><span style="color:#9e9e9e"> fainted!</span>`);
        endBattle('loss');
        return;
    }

    if (callback) setTimeout(callback, 1000);
};

window.handlePlayerTurn = function(action) {
    if (!inBattle) return;

    let pSpe = window.getEffectiveStat(currentPlayer, 'speed');
    let eSpe = window.getEffectiveStat(currentEnemy, 'speed');

    // Initiative roll (1-20 modifier)
    let pRoll = pSpe + (Math.random() * 20);
    let eRoll = eSpe + (Math.random() * 20);

    let playerGoesFirst = pRoll >= eRoll;
    if (action === 'catch' || action === 'run') {
        playerGoesFirst = true; // Utility actions have priority
    }

    if (playerGoesFirst) {
        window.doPlayerAction(action, () => {
            if (inBattle && currentEnemy.currentHp > 0) {
                window.doEnemyAction();
            }
        });
    } else {
        window.doEnemyAction(() => {
            if (inBattle && currentPlayer.currentHp > 0) {
                window.doPlayerAction(action);
            }
        });
    }
};

window.endBattle = function(result) {
    setTimeout(() => {
        let _m_battleModal = document.getElementById('battleModal'); _m_battleModal.children[0].classList.add('modal-fade-out'); setTimeout(() => { _m_battleModal.style.display = 'none'; _m_battleModal.children[0].classList.remove('modal-fade-out'); }, 190);
        inBattle = false;
        player.body.moves = true; // Restore player physics movement
        player.lastBattleTime = game.scene.scenes[0].time.now;

        if (result === 'caught') {
            saveCollected(currentEnemy);
            currentEnemySprite.destroy();
            respawnEnemyBase();
        } else if (result === 'win') {
            let xpGained = Math.floor(currentEnemy.level * 50);
            logBattle(`<span style="color:#4caf50">Gained ${xpGained} XP!</span>`);
            let leveledUp = window.gainXp(collectedCreatures[0], xpGained);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(collectedCreatures));

            if (leveledUp) {
                alert(`${collectedCreatures[0].nickname || collectedCreatures[0].name} leveled up to Level ${collectedCreatures[0].level}!`);
            }

            currentEnemySprite.destroy();
            respawnEnemyBase();
        } else if (result === 'run') {
            player.x += 100;
        } else if (result === 'loss') {
            alert('Your lead creature fainted. Healing up...');
            let safePos = window.getStrictSafeDryLandSpawn(currentEnemySprite);
            player.x = safePos.x;
            player.y = safePos.y;
        }
    }, 1500);
};

window.getStrictSafeDryLandSpawn = function(enemyObj) {
    let rx, ry, d, col, row, d_water;
    let attempts = 0;
    do {
        rx = Phaser.Math.Between(100, WORLD_SIZE - 100);
        ry = Phaser.Math.Between(100, WORLD_SIZE - 100);
        col = Math.floor(rx / 100);
        row = Math.floor(ry / 100);
        d = enemyObj ? Math.hypot(enemyObj.x - rx, enemyObj.y - ry) : 1000;

        d_water = 800; // start assuming safe
        if (mapData && mapData.length > 0) {
            waterSearchLoop:
            for (let wr = Math.max(0, row - 8); wr <= Math.min(mapData.length - 1, row + 8); wr++) {
                for (let wc = Math.max(0, col - 8); wc <= Math.min(mapData[0].length - 1, col + 8); wc++) {
                    if (mapData[wr] && mapData[wr][wc] === 'obs') {
                        let distW = Math.hypot(wc * 100 + 50 - rx, wr * 100 + 50 - ry);
                        if (distW < d_water) {
                            d_water = distW;
                            if (d_water < 800) break waterSearchLoop;
                        }
                    }
                }
            }
        }
        attempts++;
        if (attempts > 500) {
            console.warn("Could not find safe spawn within strict limits, falling back to center spawn.");
            return {x: WORLD_SIZE / 2, y: WORLD_SIZE / 2};
        }
    } while ((enemyObj && d < 1000) || d_water < 800 || !mapData[row] || mapData[row][col] !== 'grass');
    return {x: rx, y: ry};
};

function respawnEnemyBase() {
    const basePrototype = window.baseCreatures.find(c => c.id === currentEnemy.baseId) || window.baseCreatures.find(c => c.name === currentEnemy.name);
    let rx, ry, d, col, row;
    do {
        rx = Phaser.Math.Between(100, WORLD_SIZE - 100);
        ry = Phaser.Math.Between(100, WORLD_SIZE - 100);
        col = Math.floor(rx / 100);
        row = Math.floor(ry / 100);
        d = Math.hypot(player.x - rx, player.y - ry);
    } while (d < 500 || (mapData[row] && mapData[row][col] !== 'grass'));
    spawnCreature(game.scene.scenes[0], basePrototype || currentEnemy, rx, ry);
}

function update() {
    if (inBattle) return;
    const speed = 200;

    if (!window.lastSaveTime) window.lastSaveTime = 0;
    const now = Date.now();
    const shouldSave = (now - window.lastSaveTime > 2000);

    if (!window.aiFrameCounter) window.aiFrameCounter = 0;
    window.aiFrameCounter++;
    const updateAIThisFrame = (window.aiFrameCounter % 12 === 0);

    // Animate background
    const frame = Math.floor(this.time.now / 150) % 12;
    bgGrass.setTexture('grass_' + frame);

    // Dynamic Tile Viewport Culling
    const cam = this.cameras.main;
    const TILE_SIZE = 100;
    const buffer = 2; // Render 2 tiles outside view

    const minCol = Math.max(0, Math.floor(cam.scrollX / TILE_SIZE) - buffer);
    const maxCol = Math.min((mapData[0] || []).length - 1, Math.floor((cam.scrollX + cam.width) / TILE_SIZE) + buffer);
    const minRow = Math.max(0, Math.floor(cam.scrollY / TILE_SIZE) - buffer);
    const maxRow = Math.min(mapData.length - 1, Math.floor((cam.scrollY + cam.height) / TILE_SIZE) + buffer);

    // Track which tiles we need this frame
    let neededTiles = new Set();

    for (let r = minRow; r <= maxRow; r++) {
        for (let c = minCol; c <= maxCol; c++) {
            if (mapData[r] && mapData[r][c] === 'obs') {
                const key = `${r},${c}`;
                neededTiles.add(key);
                if (!activeTiles[key]) {
                    activeTiles[key] = spawnTile(this, r, c, TILE_SIZE, mapData[0].length, mapData.length);
                }
            }
        }
    }

    // Destroy tiles no longer in view
    for (const key of Object.keys(activeTiles)) {
        if (!neededTiles.has(key)) {
            destroyTile(key);
        }
    }

    player.body.setVelocity(0);

    // Keyboard movement
    let movedX = false;
    let movedY = false;

    // Broadcast position over WebRTC if changed significantly
    if (!this.lastBroadcastTime || this.time.now - this.lastBroadcastTime > 100) { // 10 times a sec
        const dt = this.time.now - (this.lastBroadcastTime || this.time.now - 100);
        const dist = Math.hypot(player.x - (this.lastX || player.x), player.y - (this.lastY || player.y));
        if (dist > 1 || !this.lastBroadcastTime) {
            // Calculate velocity since last broadcast
            let vx = 0;
            let vy = 0;
            if (dt > 0 && this.lastX !== undefined && this.lastY !== undefined) {
                vx = (player.x - this.lastX) / (dt / 1000); // pixels per second
                vy = (player.y - this.lastY) / (dt / 1000);
            }
            // Use shortened keys and integer values for payload compression
            const msg = JSON.stringify({ type: 'pos', x: Math.round(player.x), y: Math.round(player.y), vx: Math.round(vx), vy: Math.round(vy) });
            Object.values(dataChannels).forEach(dc => {
                if (dc.readyState === 'open') {
                    dc.send(msg);
                }
            });
            this.lastX = player.x;
            this.lastY = player.y;
        }
        this.lastBroadcastTime = this.time.now;
    }

    // Interpolate remote players
    Object.values(remotePlayers).forEach(rp => {
        const tx = rp.getData('targetX');
        const ty = rp.getData('targetY');
        const lastUpdate = rp.getData('lastUpdate') || now;
        const dt = now - lastUpdate;

        if (tx !== undefined && ty !== undefined) {
            if (dt > 200) {
                // If it's been more than 200ms since the last update,
                // extrapolate position based on their last known velocity
                const vx = rp.getData('vx') || 0;
                const vy = rp.getData('vy') || 0;
                // Cap extrapolation time to avoid wandering off into infinity
                const extrapolationTime = Math.min(dt / 1000, 1.0);

                // Gradually approach extrapolated target
                const projectedX = tx + (vx * extrapolationTime);
                const projectedY = ty + (vy * extrapolationTime);

                rp.x += (projectedX - rp.x) * 0.1;
                rp.y += (projectedY - rp.y) * 0.1;
            } else {
                // Standard linear interpolation if updates are flowing normally
                rp.x += (tx - rp.x) * 0.2;
                rp.y += (ty - rp.y) * 0.2;
            }
        }
    });

    // Periodically save player position (every ~1000ms)
    if (shouldSave) {
        localStorage.setItem('wildpulse_player_x', player.x);
        localStorage.setItem('wildpulse_player_y', player.y);
        window.lastSaveTime = now;
    }

    if (cursors.left.isDown) {
        player.body.setVelocityX(-speed);
        movedX = true;
    } else if (cursors.right.isDown) {
        player.body.setVelocityX(speed);
        movedX = true;
    }

    if (cursors.up.isDown) {
        player.body.setVelocityY(-speed);
        movedY = true;
    } else if (cursors.down.isDown) {
        player.body.setVelocityY(speed);
        movedY = true;
    }

    // Pointer movement (if active and overriding keyboard or not moving via keyboard)
    if (pointerTarget) {
        const dx = pointerTarget.x - player.x;
        const dy = pointerTarget.y - player.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 10) {
            player.body.setVelocity((dx / distance) * speed, (dy / distance) * speed);
        } else {
            // Reached target
            player.body.setVelocity(0);
        }
    } else if (!movedX && !movedY) {
        player.body.setVelocity(0);
    }

    // Entity Viewport Culling Bounds (Pixels)
    const viewPadding = 300;
    const viewLeft = cam.scrollX - viewPadding;
    const viewRight = cam.scrollX + cam.width + viewPadding;
    const viewTop = cam.scrollY - viewPadding;
    const viewBottom = cam.scrollY + cam.height + viewPadding;

    // Remote Players Culling
    Object.values(remotePlayers).forEach(rp => {
        const isVisible = (rp.x >= viewLeft && rp.x <= viewRight && rp.y >= viewTop && rp.y <= viewBottom);
        rp.setVisible(isVisible);
    });

    // Creature wandering logic & culling
    creaturesGroup.getChildren().forEach(creature => {
        const isVisible = (creature.x >= viewLeft && creature.x <= viewRight && creature.y >= viewTop && creature.y <= viewBottom);
        creature.setVisible(isVisible);

        if (updateAIThisFrame) {
            // Background wandering continues even if invisible
            if (Math.random() < 0.02) {
                const distToPlayer = Math.hypot(player.x - creature.x, player.y - creature.y);

                // Teleport creatures that are too far away to just outside the viewport
                if (distToPlayer > 2500) {
                    const angle = Math.random() * Math.PI * 2;
                    const rDist = 1000 + Math.random() * 1000; // 1000 to 2000 px away
                    const targetX = Phaser.Math.Clamp(player.x + Math.cos(angle) * rDist, 100, WORLD_SIZE - 100);
                    const targetY = Phaser.Math.Clamp(player.y + Math.sin(angle) * rDist, 100, WORLD_SIZE - 100);

                    const col = Math.floor(targetX / 100);
                    const row = Math.floor(targetY / 100);
                    if (mapData[row] && mapData[row][col] === 'grass') {
                        creature.x = targetX;
                        creature.y = targetY;
                        creature.setData('targetX', targetX);
                        creature.setData('targetY', targetY);
                    }
                } else {
                    const rx = (Math.random() - 0.5) * 200;
                    const ry = (Math.random() - 0.5) * 200;
                    const targetX = Phaser.Math.Clamp(creature.x + rx, 100, WORLD_SIZE - 100);
                    const targetY = Phaser.Math.Clamp(creature.y + ry, 100, WORLD_SIZE - 100);

                    // Only move if target isn't water
                    const col = Math.floor(targetX / 100); // TILE_SIZE is 100
                    const row = Math.floor(targetY / 100);
                    if (mapData[row] && mapData[row][col] === 'grass') {
                        creature.setData('targetX', targetX);
                        creature.setData('targetY', targetY);
                    } else {
                        creature.setData('targetX', creature.x);
                        creature.setData('targetY', creature.y);
                    }
                }
            }

            const tx = creature.getData('targetX');
            const ty = creature.getData('targetY');

            if (tx !== undefined && ty !== undefined) {
                creature.x += (tx - creature.x) * 0.05;
                creature.y += (ty - creature.y) * 0.05;
            }
        }
    });

    // Performance Logging
    if (!window.logFrameCounter) window.logFrameCounter = 0;
    window.logFrameCounter++;
    if (window.logFrameCounter % 60 === 0) {
        let visibleCreatures = creaturesGroup.getChildren().filter(c => c.visible).length;
        let visiblePlayers = Object.values(remotePlayers).filter(p => p.visible).length;
        console.log(`[Viewport Performance] Active Tiles: ${Object.keys(activeTiles).length} | Visible Entities: ${visibleCreatures + visiblePlayers + 1}`);
    }
}

document.addEventListener('mouseover', (e) => {
    const tooltipTarget = e.target.closest('[data-tooltip]');
    if (tooltipTarget) {
        const tooltip = document.getElementById('tooltip');
        tooltip.innerHTML = tooltipTarget.getAttribute('data-tooltip');
        tooltip.style.display = 'block';
    }
});
document.addEventListener('mousemove', (e) => {
    const tooltip = document.getElementById('tooltip');
    if (tooltip.style.display === 'block') {
        tooltip.style.left = e.pageX + 10 + 'px';
        tooltip.style.top = e.pageY + 10 + 'px';
    }
});
document.addEventListener('mouseout', (e) => {
    const tooltipTarget = e.target.closest('[data-tooltip]');
    if (tooltipTarget) {
        const tooltip = document.getElementById('tooltip');
        tooltip.style.display = 'none';
    }
});
</script>
