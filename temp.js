
function escapeHtml(unsafe) {
    return (unsafe || '').toString()
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}


document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.lobby-close-btn')?.addEventListener('click', () => document.getElementById('lobbyModal').style.display='none');
    document.getElementById('joinBtn')?.addEventListener('click', joinMultiplayerRoom);


    document.querySelector('.btn-attack')?.addEventListener('click', () => handlePlayerTurn('attack'));
    document.querySelector('.btn-catch')?.addEventListener('click', () => handlePlayerTurn('catch'));
    document.querySelector('.btn-run')?.addEventListener('click', () => handlePlayerTurn('run'));

    document.getElementById('menuBtn')?.addEventListener('click', openMenuModal);

    document.getElementById('menuPartyBtn')?.addEventListener('click', openPartyModal);
    document.getElementById('menuStorageBtn')?.addEventListener('click', openStorageModal);
    document.getElementById('breedBtn')?.addEventListener('click', openBreedingModal);
    document.getElementById('menuHelpBtn')?.addEventListener('click', openHelpModal);
    document.getElementById('menuDeleteBtn')?.addEventListener('click', deleteProgress);

    document.querySelectorAll('.close-menu-btn').forEach(btn => btn.addEventListener('click', closeMenuModal));
    document.querySelectorAll('.close-party-btn').forEach(btn => btn.addEventListener('click', closePartyModal));
    document.querySelectorAll('.close-storage-btn').forEach(btn => btn.addEventListener('click', closeStorageModal));
    document.querySelectorAll('.close-help-btn').forEach(btn => btn.addEventListener('click', closeHelpModal));

    document.getElementById('doBreedBtn')?.addEventListener('click', doBreed);
    document.querySelectorAll('.close-breeding-btn').forEach(btn => btn.addEventListener('click', closeBreedingModal));
    document.querySelectorAll('.close-levelup-btn').forEach(btn => btn.addEventListener('click', closeLevelUpModal));
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
    } else if (e.target.matches('.store-btn')) {
        const index = e.target.getAttribute('data-index');
        window.storeCreature(parseInt(index));
    } else if (e.target.matches('.retrieve-btn')) {
        const index = e.target.getAttribute('data-index');
        window.retrieveCreature(parseInt(index));
    }
});


window.baseCreatures = [
    {
        "id": 1,
        "name": "Flarehawk",
        "description": "A large, burly Fire-type creature. It is covered in ruby rough skin with distinct tiger stripes. Its crimson fierce eyes look out thoughtfully. It sports crimson medium leathery wings and moves gracefully. It defends itself with ruby spiraling horns. It flashes sharp teeth when threatened. It moves on 2 talons. A crimson short scaly tail trails behind it. Most notably, it possesses amber lava trail.",
        "features": [
            "horns",
            "claws",
            "fur"
        ],
        "type": "Fire",
        "stats": {
            "health": 60,
            "attack": 49
        },
        "generation": 1,
        "color": 16711680,
        "bodySize": "large",
        "bodyType": "burly",
        "uniqueFeature": "lava trail",
        "eyes": "fierce",
        "skinFurType": "rough",
        "pattern": "tiger stripes",
        "wings": "medium leathery wings",
        "clawHorn": "spiraling horns",
        "teeth": "sharp teeth",
        "limbs": "2 talons",
        "tail": "short scaly tail",
        "eyesColor": "crimson",
        "skinFurColor": "ruby",
        "wingsColor": "crimson",
        "clawHornColor": "ruby",
        "tailColor": "crimson",
        "uniqueFeatureColor": "amber"
    },
    {
        "id": 2,
        "name": "Oceanweaver",
        "description": "A rotund, sinuous Water-type creature. It is covered in turquoise scaly skin with distinct bioluminescent spots. Its sapphire watery eyes look out thoughtfully. It sports teal large fin-like wings and moves gracefully. It defends itself with teal smooth fins. A turquoise long fish-like tail trails behind it. Most notably, it possesses azure coral growths.",
        "features": [
            "glowing",
            "shell"
        ],
        "type": "Water",
        "stats": {
            "health": 60,
            "attack": 60
        },
        "generation": 1,
        "color": 255,
        "bodySize": "rotund",
        "bodyType": "sinuous",
        "uniqueFeature": "coral growths",
        "eyes": "watery",
        "skinFurType": "scaly",
        "pattern": "bioluminescent spots",
        "wings": "large fin-like wings",
        "clawHorn": "smooth fins",
        "teeth": "none",
        "limbs": "none",
        "tail": "long fish-like tail",
        "eyesColor": "sapphire",
        "skinFurColor": "turquoise",
        "wingsColor": "teal",
        "clawHornColor": "teal",
        "tailColor": "turquoise",
        "uniqueFeatureColor": "azure"
    },
    {
        "id": 3,
        "name": "Thornspine",
        "description": "A tiny, slender Nature-type creature. It is covered in tan mossy skin with distinct mossy patches. Its tan multiple eyes look out thoughtfully. It sports emerald vestigial insectoid wings and moves gracefully. It moves on 8 agile limbs. A brown prehensile bushy tail trails behind it. Most notably, it possesses lime leafy tendrils.",
        "features": [
            "shell",
            "glowing"
        ],
        "type": "Nature",
        "stats": {
            "health": 60,
            "attack": 60
        },
        "generation": 1,
        "color": 65280,
        "bodySize": "tiny",
        "bodyType": "slender",
        "uniqueFeature": "leafy tendrils",
        "eyes": "multiple",
        "skinFurType": "mossy",
        "pattern": "mossy patches",
        "wings": "vestigial insectoid wings",
        "clawHorn": "none",
        "teeth": "none",
        "limbs": "8 agile limbs",
        "tail": "prehensile bushy tail",
        "eyesColor": "tan",
        "skinFurColor": "tan",
        "wingsColor": "emerald",
        "clawHornColor": "none",
        "tailColor": "brown",
        "uniqueFeatureColor": "lime"
    },
    {
        "id": 4,
        "name": "Voltshell",
        "description": "A miniscule, sleek Electric-type creature. It is covered in yellow smooth skin with distinct glowing bands. Its white piercing eyes look out thoughtfully. It flashes needle-like teeth when threatened. It moves on 4 mechanical legs. A magenta whip-like sparking tail trails behind it. Most notably, it possesses silver static sparks.",
        "features": [
            "fangs",
            "shell",
            "glowing"
        ],
        "type": "Electric",
        "stats": {
            "health": 60,
            "attack": 31
        },
        "generation": 1,
        "color": 16776960,
        "bodySize": "miniscule",
        "bodyType": "sleek",
        "uniqueFeature": "static sparks",
        "eyes": "piercing",
        "skinFurType": "smooth",
        "pattern": "glowing bands",
        "wings": "none",
        "clawHorn": "none",
        "teeth": "needle-like teeth",
        "limbs": "4 mechanical legs",
        "tail": "whip-like sparking tail",
        "eyesColor": "white",
        "skinFurColor": "yellow",
        "wingsColor": "none",
        "clawHornColor": "none",
        "tailColor": "magenta",
        "uniqueFeatureColor": "silver"
    },
    {
        "id": 5,
        "name": "Glacemane",
        "description": "A stout, floating Ice-type creature. It is covered in snow white woolly skin with distinct frost patches. Its cyan piercing eyes look out thoughtfully. It sports translucent blue medium crystal wings and moves gracefully. It defends itself with translucent blue crystal shards. It moves on 4 sturdy legs. A translucent blue stubby clubbed tail trails behind it. Most notably, it possesses cyan icicle barrage.",
        "features": [
            "tail",
            "fangs"
        ],
        "type": "Ice",
        "stats": {
            "health": 60,
            "attack": 60
        },
        "generation": 1,
        "color": 65535,
        "bodySize": "stout",
        "bodyType": "floating",
        "uniqueFeature": "icicle barrage",
        "eyes": "piercing",
        "skinFurType": "woolly",
        "pattern": "frost patches",
        "wings": "medium crystal wings",
        "clawHorn": "crystal shards",
        "teeth": "none",
        "limbs": "4 sturdy legs",
        "tail": "stubby clubbed tail",
        "eyesColor": "cyan",
        "skinFurColor": "snow white",
        "wingsColor": "translucent blue",
        "clawHornColor": "translucent blue",
        "tailColor": "translucent blue",
        "uniqueFeatureColor": "cyan"
    },
    {
        "id": 6,
        "name": "Dunespine",
        "description": "A medium, stout Earth-type creature. It is covered in copper thick skin with distinct earthen bands. Its brown cyclopic eyes look out thoughtfully. It defends itself with amber blunt claws. It flashes blunt teeth when threatened. It moves on 4 sturdy legs. A amber massive clubbed tail trails behind it. Most notably, it possesses dusty grey crystal spikes.",
        "features": [
            "scales",
            "shell"
        ],
        "type": "Earth",
        "stats": {
            "health": 60,
            "attack": 60
        },
        "generation": 1,
        "color": 9127187,
        "bodySize": "medium",
        "bodyType": "stout",
        "uniqueFeature": "crystal spikes",
        "eyes": "cyclopic",
        "skinFurType": "thick",
        "pattern": "earthen bands",
        "wings": "none",
        "clawHorn": "blunt claws",
        "teeth": "blunt teeth",
        "limbs": "4 sturdy legs",
        "tail": "massive clubbed tail",
        "eyesColor": "brown",
        "skinFurColor": "copper",
        "wingsColor": "none",
        "clawHornColor": "amber",
        "tailColor": "amber",
        "uniqueFeatureColor": "dusty grey"
    },
    {
        "id": 7,
        "name": "Zephyrspine",
        "description": "A miniscule, graceful Wind-type creature. It is covered in pale gray smooth skin with distinct wind swirls. Its azure piercing eyes look out thoughtfully. It sports pale gray colossal feathered wings and moves gracefully. It defends itself with mint green hooked talons. It moves on 4 agile limbs. A cream long ribbon-like tail trails behind it. Most notably, it possesses silver feathery trails.",
        "features": [
            "scales",
            "claws",
            "shell"
        ],
        "type": "Wind",
        "stats": {
            "health": 60,
            "attack": 53
        },
        "generation": 1,
        "color": 13882323,
        "bodySize": "miniscule",
        "bodyType": "graceful",
        "uniqueFeature": "feathery trails",
        "eyes": "piercing",
        "skinFurType": "smooth",
        "pattern": "wind swirls",
        "wings": "colossal feathered wings",
        "clawHorn": "hooked talons",
        "teeth": "none",
        "limbs": "4 agile limbs",
        "tail": "long ribbon-like tail",
        "eyesColor": "azure",
        "skinFurColor": "pale gray",
        "wingsColor": "pale gray",
        "clawHornColor": "mint green",
        "tailColor": "cream",
        "uniqueFeatureColor": "silver"
    },
    {
        "id": 8,
        "name": "Beamhorn",
        "description": "A medium, slender Light-type creature. It is covered in yellow metallic skin with distinct glowing runes. Its yellow gentle eyes look out thoughtfully. It sports pearl majestic crystal wings and moves gracefully. It flashes flat teeth when threatened. It moves on 2 ethereal limbs. A pearl long flowing tail trails behind it. Most notably, it possesses pale yellow blinding flash.",
        "features": [
            "horns",
            "shell",
            "tail"
        ],
        "type": "Light",
        "stats": {
            "health": 60,
            "attack": 60
        },
        "generation": 1,
        "color": 16777215,
        "bodySize": "medium",
        "bodyType": "slender",
        "uniqueFeature": "blinding flash",
        "eyes": "gentle",
        "skinFurType": "metallic",
        "pattern": "glowing runes",
        "wings": "majestic crystal wings",
        "clawHorn": "none",
        "teeth": "flat teeth",
        "limbs": "2 ethereal limbs",
        "tail": "long flowing tail",
        "eyesColor": "yellow",
        "skinFurColor": "yellow",
        "wingsColor": "pearl",
        "clawHornColor": "none",
        "tailColor": "pearl",
        "uniqueFeatureColor": "pale yellow"
    },
    {
        "id": 9,
        "name": "Obsidweb",
        "description": "A immense, serpentine Dark-type creature. It is covered in obsidian armored skin with distinct shadow tribal marks. Its indigo void-like eyes look out thoughtfully. It sports charcoal asymmetrical shadow wings and moves gracefully. It defends itself with blood red curved horns. It flashes sharp teeth when threatened. It moves on 8 jointed appendages. A midnight blue prehensile barbed tail trails behind it. Most notably, it possesses dark purple abyssal gaze.",
        "features": [
            "fur",
            "fangs",
            "horns"
        ],
        "type": "Dark",
        "stats": {
            "health": 60,
            "attack": 32
        },
        "generation": 1,
        "color": 4473924,
        "bodySize": "immense",
        "bodyType": "serpentine",
        "uniqueFeature": "abyssal gaze",
        "eyes": "void-like",
        "skinFurType": "armored",
        "pattern": "shadow tribal marks",
        "wings": "asymmetrical shadow wings",
        "clawHorn": "curved horns",
        "teeth": "sharp teeth",
        "limbs": "8 jointed appendages",
        "tail": "prehensile barbed tail",
        "eyesColor": "indigo",
        "skinFurColor": "obsidian",
        "wingsColor": "charcoal",
        "clawHornColor": "blood red",
        "tailColor": "midnight blue",
        "uniqueFeatureColor": "dark purple"
    },
    {
        "id": 10,
        "name": "Orbittuft",
        "description": "A medium, graceful Cosmic-type creature. It is covered in starlight white metallic skin with distinct geometric stars. Its cyan blind eyes look out thoughtfully. It sports starlight white majestic energy wings and moves gracefully. It moves on 4 tentacles. A deep blue massive stardust tail trails behind it. Most notably, it possesses nebula pink nebula dust.",
        "features": [
            "shell",
            "scales",
            "glowing"
        ],
        "type": "Cosmic",
        "stats": {
            "health": 60,
            "attack": 59
        },
        "generation": 1,
        "color": 8388736,
        "bodySize": "medium",
        "bodyType": "graceful",
        "uniqueFeature": "nebula dust",
        "eyes": "blind",
        "skinFurType": "metallic",
        "pattern": "geometric stars",
        "wings": "majestic energy wings",
        "clawHorn": "none",
        "teeth": "none",
        "limbs": "4 tentacles",
        "tail": "massive stardust tail",
        "eyesColor": "cyan",
        "skinFurColor": "starlight white",
        "wingsColor": "starlight white",
        "clawHornColor": "none",
        "tailColor": "deep blue",
        "uniqueFeatureColor": "nebula pink"
    },
    {
        "id": 11,
        "name": "Ashbear",
        "description": "A stout, muscular Fire-type creature. It is covered in ruby scaly skin with distinct gradient colors. Its crimson fierce eyes look out thoughtfully. It sports scarlet majestic leathery wings and moves gracefully. It defends itself with charcoal curved horns. It flashes wicked fangs when threatened. It moves on 4 sturdy legs. A crimson long clubbed tail trails behind it. Most notably, it possesses charcoal ash clouds.",
        "features": [
            "flying",
            "fangs",
            "shell"
        ],
        "type": "Fire",
        "stats": {
            "health": 60,
            "attack": 44
        },
        "generation": 1,
        "color": 16711680,
        "bodySize": "stout",
        "bodyType": "muscular",
        "uniqueFeature": "ash clouds",
        "eyes": "fierce",
        "skinFurType": "scaly",
        "pattern": "gradient colors",
        "wings": "majestic leathery wings",
        "clawHorn": "curved horns",
        "teeth": "wicked fangs",
        "limbs": "4 sturdy legs",
        "tail": "long clubbed tail",
        "eyesColor": "crimson",
        "skinFurColor": "ruby",
        "wingsColor": "scarlet",
        "clawHornColor": "charcoal",
        "tailColor": "crimson",
        "uniqueFeatureColor": "charcoal"
    },
    {
        "id": 12,
        "name": "Brinecrest",
        "description": "A rotund, sinuous Water-type creature. It is covered in cyan translucent skin with distinct mottled markings. Its azure gentle eyes look out thoughtfully. It sports turquoise tiny webbed wings and moves gracefully. It defends itself with pearl hooked talons. It flashes sharp teeth when threatened. A cyan long paddle tail trails behind it. Most notably, it possesses sea green bubble clusters.",
        "features": [
            "shell",
            "claws"
        ],
        "type": "Water",
        "stats": {
            "health": 60,
            "attack": 60
        },
        "generation": 1,
        "color": 255,
        "bodySize": "rotund",
        "bodyType": "sinuous",
        "uniqueFeature": "bubble clusters",
        "eyes": "gentle",
        "skinFurType": "translucent",
        "pattern": "mottled markings",
        "wings": "tiny webbed wings",
        "clawHorn": "hooked talons",
        "teeth": "sharp teeth",
        "limbs": "none",
        "tail": "long paddle tail",
        "eyesColor": "azure",
        "skinFurColor": "cyan",
        "wingsColor": "turquoise",
        "clawHornColor": "pearl",
        "tailColor": "cyan",
        "uniqueFeatureColor": "sea green"
    },
    {
        "id": 13,
        "name": "Petalfang",
        "description": "A small, slender Nature-type creature. It is covered in brown furry skin with distinct natural camouflage. Its jade gentle eyes look out thoughtfully. It sports olive vestigial gossamer wings and moves gracefully. It moves on 4 paws. A tan stubby bushy tail trails behind it. Most notably, it possesses forest green blooming flora.",
        "features": [
            "tail",
            "flying"
        ],
        "type": "Nature",
        "stats": {
            "health": 60,
            "attack": 60
        },
        "generation": 1,
        "color": 65280,
        "bodySize": "small",
        "bodyType": "slender",
        "uniqueFeature": "blooming flora",
        "eyes": "gentle",
        "skinFurType": "furry",
        "pattern": "natural camouflage",
        "wings": "vestigial gossamer wings",
        "clawHorn": "none",
        "teeth": "none",
        "limbs": "4 paws",
        "tail": "stubby bushy tail",
        "eyesColor": "jade",
        "skinFurColor": "brown",
        "wingsColor": "olive",
        "clawHornColor": "none",
        "tailColor": "tan",
        "uniqueFeatureColor": "forest green"
    },
    {
        "id": 14,
        "name": "Chargewing",
        "description": "A small, angular Electric-type creature. It is covered in white bristly skin with distinct electric stripes. Its neon green starry eyes look out thoughtfully. It flashes sharp teeth when threatened. It moves on 4 agile limbs. A neon green twin cable-like tail trails behind it. Most notably, it possesses silver shock wave.",
        "features": [
            "fur",
            "claws",
            "scales"
        ],
        "type": "Electric",
        "stats": {
            "health": 60,
            "attack": 56
        },
        "generation": 1,
        "color": 16776960,
        "bodySize": "small",
        "bodyType": "angular",
        "uniqueFeature": "shock wave",
        "eyes": "starry",
        "skinFurType": "bristly",
        "pattern": "electric stripes",
        "wings": "none",
        "clawHorn": "none",
        "teeth": "sharp teeth",
        "limbs": "4 agile limbs",
        "tail": "twin cable-like tail",
        "eyesColor": "neon green",
        "skinFurColor": "white",
        "wingsColor": "none",
        "clawHornColor": "none",
        "tailColor": "neon green",
        "uniqueFeatureColor": "silver"
    },
    {
        "id": 15,
        "name": "Glacebeak",
        "description": "A stout, floating Ice-type creature. It is covered in translucent blue thick skin with distinct frost patches. Its frost white cold eyes look out thoughtfully. It defends itself with pale blue icy tusks. It flashes sharp teeth when threatened. It moves on 4 sturdy legs. A silver short fluffy tail trails behind it. Most notably, it possesses silver glacier shield.",
        "features": [
            "fur",
            "glowing",
            "horns"
        ],
        "type": "Ice",
        "stats": {
            "health": 60,
            "attack": 48
        },
        "generation": 1,
        "color": 65535,
        "bodySize": "stout",
        "bodyType": "floating",
        "uniqueFeature": "glacier shield",
        "eyes": "cold",
        "skinFurType": "thick",
        "pattern": "frost patches",
        "wings": "none",
        "clawHorn": "icy tusks",
        "teeth": "sharp teeth",
        "limbs": "4 sturdy legs",
        "tail": "short fluffy tail",
        "eyesColor": "frost white",
        "skinFurColor": "translucent blue",
        "wingsColor": "none",
        "clawHornColor": "pale blue",
        "tailColor": "silver",
        "uniqueFeatureColor": "silver"
    },
    {
        "id": 16,
        "name": "Claycrest",
        "description": "A medium, bulky Earth-type creature. It is covered in amber leathery skin with distinct earthen bands. Its brown blind eyes look out thoughtfully. It defends itself with amber ramming plates. It flashes crushing molars when threatened. It moves on 4 sturdy legs. A slate massive rocky tail trails behind it. Most notably, it possesses amber floating rocks.",
        "features": [
            "flying",
            "shell",
            "tail"
        ],
        "type": "Earth",
        "stats": {
            "health": 60,
            "attack": 38
        },
        "generation": 1,
        "color": 9127187,
        "bodySize": "medium",
        "bodyType": "bulky",
        "uniqueFeature": "floating rocks",
        "eyes": "blind",
        "skinFurType": "leathery",
        "pattern": "earthen bands",
        "wings": "none",
        "clawHorn": "ramming plates",
        "teeth": "crushing molars",
        "limbs": "4 sturdy legs",
        "tail": "massive rocky tail",
        "eyesColor": "brown",
        "skinFurColor": "amber",
        "wingsColor": "none",
        "clawHornColor": "amber",
        "tailColor": "slate",
        "uniqueFeatureColor": "amber"
    },
    {
        "id": 17,
        "name": "Zephyrtuft",
        "description": "A small, graceful Wind-type creature. It is covered in mint green feathered skin with distinct wind swirls. Its white piercing eyes look out thoughtfully. It sports white majestic feathered wings and moves gracefully. It defends itself with lavender smooth crest. It flashes sharp teeth when threatened. It moves on 2 agile limbs. A white long ribbon-like tail trails behind it. Most notably, it possesses cream feathery trails.",
        "features": [
            "claws",
            "horns",
            "glowing"
        ],
        "type": "Wind",
        "stats": {
            "health": 60,
            "attack": 37
        },
        "generation": 1,
        "color": 13882323,
        "bodySize": "small",
        "bodyType": "graceful",
        "uniqueFeature": "feathery trails",
        "eyes": "piercing",
        "skinFurType": "feathered",
        "pattern": "wind swirls",
        "wings": "majestic feathered wings",
        "clawHorn": "smooth crest",
        "teeth": "sharp teeth",
        "limbs": "2 agile limbs",
        "tail": "long ribbon-like tail",
        "eyesColor": "white",
        "skinFurColor": "mint green",
        "wingsColor": "white",
        "clawHornColor": "lavender",
        "tailColor": "white",
        "uniqueFeatureColor": "cream"
    },
    {
        "id": 18,
        "name": "Shineweaver",
        "description": "A graceful, radiant Light-type creature. It is covered in diamond silky skin with distinct sunburst designs. Its ivory gentle eyes look out thoughtfully. It sports peach colossal crystal wings and moves gracefully. It flashes flat teeth when threatened. It moves on 4 hovering bases. A white sweeping flowing tail trails behind it. Most notably, it possesses silver glowing markings.",
        "features": [
            "wings",
            "glowing"
        ],
        "type": "Light",
        "stats": {
            "health": 60,
            "attack": 50
        },
        "generation": 1,
        "color": 16777215,
        "bodySize": "graceful",
        "bodyType": "radiant",
        "uniqueFeature": "glowing markings",
        "eyes": "gentle",
        "skinFurType": "silky",
        "pattern": "sunburst designs",
        "wings": "colossal crystal wings",
        "clawHorn": "none",
        "teeth": "flat teeth",
        "limbs": "4 hovering bases",
        "tail": "sweeping flowing tail",
        "eyesColor": "ivory",
        "skinFurColor": "diamond",
        "wingsColor": "peach",
        "clawHornColor": "none",
        "tailColor": "white",
        "uniqueFeatureColor": "silver"
    },
    {
        "id": 19,
        "name": "Shadewhisker",
        "description": "A medium, lanky Dark-type creature. It is covered in charcoal rough skin with distinct shadowy patches. Its indigo piercing eyes look out thoughtfully. It sports blood red majestic bat-like wings and moves gracefully. It defends itself with charcoal jagged spikes. It flashes wicked fangs when threatened. It moves on 8 paws. A midnight blue whip-like barbed tail trails behind it. Most notably, it possesses midnight blue void strike.",
        "features": [
            "shell",
            "claws",
            "wings"
        ],
        "type": "Dark",
        "stats": {
            "health": 60,
            "attack": 31
        },
        "generation": 1,
        "color": 4473924,
        "bodySize": "medium",
        "bodyType": "lanky",
        "uniqueFeature": "void strike",
        "eyes": "piercing",
        "skinFurType": "rough",
        "pattern": "shadowy patches",
        "wings": "majestic bat-like wings",
        "clawHorn": "jagged spikes",
        "teeth": "wicked fangs",
        "limbs": "8 paws",
        "tail": "whip-like barbed tail",
        "eyesColor": "indigo",
        "skinFurColor": "charcoal",
        "wingsColor": "blood red",
        "clawHornColor": "charcoal",
        "tailColor": "midnight blue",
        "uniqueFeatureColor": "midnight blue"
    },
    {
        "id": 20,
        "name": "Nebulafleece",
        "description": "A medium, bipedal Cosmic-type creature. It is covered in starlight white translucent skin with distinct geometric stars. Its purple starry eyes look out thoughtfully. It flashes flat teeth when threatened. It moves on 4 pseudopods. A purple massive flowing tail trails behind it. Most notably, it possesses violet nebula dust.",
        "features": [
            "flying",
            "horns"
        ],
        "type": "Cosmic",
        "stats": {
            "health": 60,
            "attack": 43
        },
        "generation": 1,
        "color": 8388736,
        "bodySize": "medium",
        "bodyType": "bipedal",
        "uniqueFeature": "nebula dust",
        "eyes": "starry",
        "skinFurType": "translucent",
        "pattern": "geometric stars",
        "wings": "none",
        "clawHorn": "none",
        "teeth": "flat teeth",
        "limbs": "4 pseudopods",
        "tail": "massive flowing tail",
        "eyesColor": "purple",
        "skinFurColor": "starlight white",
        "wingsColor": "none",
        "clawHornColor": "none",
        "tailColor": "purple",
        "uniqueFeatureColor": "violet"
    },
    {
        "id": 21,
        "name": "Scorchihawk",
        "description": "A medium, bipedal Fire-type creature. It is covered in obsidian leathery skin with distinct ash patches. Its obsidian piercing eyes look out thoughtfully. It sports amber medium leathery wings and moves gracefully. It defends itself with orange blunt claws. It flashes protruding fangs when threatened. It moves on 4 paws. A charcoal whip-like clubbed tail trails behind it. Most notably, it possesses orange fiery breath.",
        "features": [
            "horns",
            "claws",
            "glowing"
        ],
        "type": "Fire",
        "stats": {
            "health": 60,
            "attack": 41
        },
        "generation": 1,
        "color": 16711680,
        "bodySize": "medium",
        "bodyType": "bipedal",
        "uniqueFeature": "fiery breath",
        "eyes": "piercing",
        "skinFurType": "leathery",
        "pattern": "ash patches",
        "wings": "medium leathery wings",
        "clawHorn": "blunt claws",
        "teeth": "protruding fangs",
        "limbs": "4 paws",
        "tail": "whip-like clubbed tail",
        "eyesColor": "obsidian",
        "skinFurColor": "obsidian",
        "wingsColor": "amber",
        "clawHornColor": "orange",
        "tailColor": "charcoal",
        "uniqueFeatureColor": "orange"
    },
    {
        "id": 22,
        "name": "Oceanhound",
        "description": "A colossal, sleek Water-type creature. It is covered in turquoise soft skin with distinct mottled markings. Its cyan wide eyes look out thoughtfully. It defends itself with turquoise smooth fins. It flashes needle-like teeth when threatened. A navy sweeping flowing tail trails behind it. Most notably, it possesses teal flowing water droplets.",
        "features": [
            "horns",
            "fur",
            "shell"
        ],
        "type": "Water",
        "stats": {
            "health": 60,
            "attack": 33
        },
        "generation": 1,
        "color": 255,
        "bodySize": "colossal",
        "bodyType": "sleek",
        "uniqueFeature": "flowing water droplets",
        "eyes": "wide",
        "skinFurType": "soft",
        "pattern": "mottled markings",
        "wings": "none",
        "clawHorn": "smooth fins",
        "teeth": "needle-like teeth",
        "limbs": "none",
        "tail": "sweeping flowing tail",
        "eyesColor": "cyan",
        "skinFurColor": "turquoise",
        "wingsColor": "none",
        "clawHornColor": "turquoise",
        "tailColor": "navy",
        "uniqueFeatureColor": "teal"
    },
    {
        "id": 23,
        "name": "Bloomhide",
        "description": "A petite, lanky Nature-type creature. It is covered in forest green furry skin with distinct stippled marks. Its olive calm eyes look out thoughtfully. It sports olive small leafy wings and moves gracefully. It defends itself with floral pink thorny spikes. It flashes mandibles when threatened. It moves on 4 jointed appendages. Most notably, it possesses emerald blooming flora.",
        "features": [
            "fur",
            "scales"
        ],
        "type": "Nature",
        "stats": {
            "health": 60,
            "attack": 60
        },
        "generation": 1,
        "color": 65280,
        "bodySize": "petite",
        "bodyType": "lanky",
        "uniqueFeature": "blooming flora",
        "eyes": "calm",
        "skinFurType": "furry",
        "pattern": "stippled marks",
        "wings": "small leafy wings",
        "clawHorn": "thorny spikes",
        "teeth": "mandibles",
        "limbs": "4 jointed appendages",
        "tail": "none",
        "eyesColor": "olive",
        "skinFurColor": "forest green",
        "wingsColor": "olive",
        "clawHornColor": "floral pink",
        "tailColor": "none",
        "uniqueFeatureColor": "emerald"
    },
    {
        "id": 24,
        "name": "Sparkweb",
        "description": "A small, agile Electric-type creature. It is covered in cyan bristly skin with distinct electric stripes. Its neon green electric eyes look out thoughtfully. It sports cyan asymmetrical mechanical wings and moves gracefully. It defends itself with silver crystal shards. It flashes sharp teeth when threatened. It moves on 6 agile limbs. A cyan twin barbed tail trails behind it. Most notably, it possesses yellow shock wave.",
        "features": [
            "horns",
            "fur",
            "wings"
        ],
        "type": "Electric",
        "stats": {
            "health": 60,
            "attack": 60
        },
        "generation": 1,
        "color": 16776960,
        "bodySize": "small",
        "bodyType": "agile",
        "uniqueFeature": "shock wave",
        "eyes": "electric",
        "skinFurType": "bristly",
        "pattern": "electric stripes",
        "wings": "asymmetrical mechanical wings",
        "clawHorn": "crystal shards",
        "teeth": "sharp teeth",
        "limbs": "6 agile limbs",
        "tail": "twin barbed tail",
        "eyesColor": "neon green",
        "skinFurColor": "cyan",
        "wingsColor": "cyan",
        "clawHornColor": "silver",
        "tailColor": "cyan",
        "uniqueFeatureColor": "yellow"
    },
    {
        "id": 25,
        "name": "Hailhoof",
        "description": "A medium, blocky Ice-type creature. It is covered in frost white smooth skin with distinct checkerboard patterns. Its pale blue cold eyes look out thoughtfully. It sports silver small snowy wings and moves gracefully. It defends itself with pale blue jagged spikes. It flashes sharp teeth when threatened. It moves on 2 paws. A translucent blue short crystalline tail trails behind it. Most notably, it possesses frost white freezing touch.",
        "features": [
            "flying",
            "glowing",
            "fangs"
        ],
        "type": "Ice",
        "stats": {
            "health": 60,
            "attack": 60
        },
        "generation": 1,
        "color": 65535,
        "bodySize": "medium",
        "bodyType": "blocky",
        "uniqueFeature": "freezing touch",
        "eyes": "cold",
        "skinFurType": "smooth",
        "pattern": "checkerboard patterns",
        "wings": "small snowy wings",
        "clawHorn": "jagged spikes",
        "teeth": "sharp teeth",
        "limbs": "2 paws",
        "tail": "short crystalline tail",
        "eyesColor": "pale blue",
        "skinFurColor": "frost white",
        "wingsColor": "silver",
        "clawHornColor": "pale blue",
        "tailColor": "translucent blue",
        "uniqueFeatureColor": "frost white"
    },
    {
        "id": 26,
        "name": "Stonecrest",
        "description": "A medium, rounded Earth-type creature. It is covered in copper armored skin with distinct tribal markings. Its slate blind eyes look out thoughtfully. It sports bronze heavy stone wings and moves gracefully. It defends itself with amber blunt claws. It flashes blunt teeth when threatened. It moves on 4 mechanical legs. A amber stubby spiked mace tail trails behind it. Most notably, it possesses ochre crystal spikes.",
        "features": [
            "horns",
            "wings",
            "claws"
        ],
        "type": "Earth",
        "stats": {
            "health": 60,
            "attack": 44
        },
        "generation": 1,
        "color": 9127187,
        "bodySize": "medium",
        "bodyType": "rounded",
        "uniqueFeature": "crystal spikes",
        "eyes": "blind",
        "skinFurType": "armored",
        "pattern": "tribal markings",
        "wings": "heavy stone wings",
        "clawHorn": "blunt claws",
        "teeth": "blunt teeth",
        "limbs": "4 mechanical legs",
        "tail": "stubby spiked mace tail",
        "eyesColor": "slate",
        "skinFurColor": "copper",
        "wingsColor": "bronze",
        "clawHornColor": "amber",
        "tailColor": "amber",
        "uniqueFeatureColor": "ochre"
    },
    {
        "id": 27,
        "name": "Gustscale",
        "description": "A miniscule, graceful Wind-type creature. It is covered in pale gray soft skin with distinct breezy stripes. Its azure piercing eyes look out thoughtfully. It sports silver large energy wings and moves gracefully. It defends itself with sky blue hooked talons. It moves on 4 ethereal limbs. A white twin feathered tail trails behind it. Most notably, it possesses lavender tornado tail.",
        "features": [
            "fur",
            "horns",
            "flying"
        ],
        "type": "Wind",
        "stats": {
            "health": 60,
            "attack": 60
        },
        "generation": 1,
        "color": 13882323,
        "bodySize": "miniscule",
        "bodyType": "graceful",
        "uniqueFeature": "tornado tail",
        "eyes": "piercing",
        "skinFurType": "soft",
        "pattern": "breezy stripes",
        "wings": "large energy wings",
        "clawHorn": "hooked talons",
        "teeth": "none",
        "limbs": "4 ethereal limbs",
        "tail": "twin feathered tail",
        "eyesColor": "azure",
        "skinFurColor": "pale gray",
        "wingsColor": "silver",
        "clawHornColor": "sky blue",
        "tailColor": "white",
        "uniqueFeatureColor": "lavender"
    },
    {
        "id": 28,
        "name": "Shinefin",
        "description": "A medium, graceful Light-type creature. It is covered in ivory prismatic skin with distinct radiant gradient. Its gold gentle eyes look out thoughtfully. It sports yellow oversized feathered wings and moves gracefully. It defends itself with gold glowing antlers. A ivory flowing flowing tail trails behind it. Most notably, it possesses diamond blinding glow.",
        "features": [
            "scales",
            "horns"
        ],
        "type": "Light",
        "stats": {
            "health": 60,
            "attack": 60
        },
        "generation": 1,
        "color": 16777215,
        "bodySize": "medium",
        "bodyType": "graceful",
        "uniqueFeature": "blinding glow",
        "eyes": "gentle",
        "skinFurType": "prismatic",
        "pattern": "radiant gradient",
        "wings": "oversized feathered wings",
        "clawHorn": "glowing antlers",
        "teeth": "none",
        "limbs": "none",
        "tail": "flowing flowing tail",
        "eyesColor": "gold",
        "skinFurColor": "ivory",
        "wingsColor": "yellow",
        "clawHornColor": "gold",
        "tailColor": "ivory",
        "uniqueFeatureColor": "diamond"
    },
    {
        "id": 29,
        "name": "Umbraclaw",
        "description": "A medium, lanky Dark-type creature. It is covered in blood red leathery skin with distinct dark camouflage. Its pitch black glowing eyes look out thoughtfully. It sports blood red asymmetrical shadow wings and moves gracefully. It defends itself with dark purple curved horns. It flashes wicked fangs when threatened. It moves on 6 paws. A midnight blue whip-like stinger tail trails behind it. Most notably, it possesses pitch black nightmare trails.",
        "features": [
            "fur",
            "flying",
            "shell"
        ],
        "type": "Dark",
        "stats": {
            "health": 60,
            "attack": 60
        },
        "generation": 1,
        "color": 4473924,
        "bodySize": "medium",
        "bodyType": "lanky",
        "uniqueFeature": "nightmare trails",
        "eyes": "glowing",
        "skinFurType": "leathery",
        "pattern": "dark camouflage",
        "wings": "asymmetrical shadow wings",
        "clawHorn": "curved horns",
        "teeth": "wicked fangs",
        "limbs": "6 paws",
        "tail": "whip-like stinger tail",
        "eyesColor": "pitch black",
        "skinFurColor": "blood red",
        "wingsColor": "blood red",
        "clawHornColor": "dark purple",
        "tailColor": "midnight blue",
        "uniqueFeatureColor": "pitch black"
    },
    {
        "id": 30,
        "name": "Nebulascale",
        "description": "A tiny, graceful Cosmic-type creature. It is covered in deep blue smooth skin with distinct geometric stars. Its purple glowing eyes look out thoughtfully. It sports magenta colossal energy wings and moves gracefully. It defends itself with cyan crystal shards. It moves on 100 pseudopods. A nebula pink multiple stardust tail trails behind it. Most notably, it possesses magenta floating orbs.",
        "features": [
            "horns",
            "scales",
            "tail"
        ],
        "type": "Cosmic",
        "stats": {
            "health": 60,
            "attack": 60
        },
        "generation": 1,
        "color": 8388736,
        "bodySize": "tiny",
        "bodyType": "graceful",
        "uniqueFeature": "floating orbs",
        "eyes": "glowing",
        "skinFurType": "smooth",
        "pattern": "geometric stars",
        "wings": "colossal energy wings",
        "clawHorn": "crystal shards",
        "teeth": "none",
        "limbs": "100 pseudopods",
        "tail": "multiple stardust tail",
        "eyesColor": "purple",
        "skinFurColor": "deep blue",
        "wingsColor": "magenta",
        "clawHornColor": "cyan",
        "tailColor": "nebula pink",
        "uniqueFeatureColor": "magenta"
    },
    {
        "id": 31,
        "name": "Cinderbeak",
        "description": "A massive, muscular Fire-type creature. It is covered in ruby leathery skin with distinct tiger stripes. Its obsidian fiery eyes look out thoughtfully. It defends itself with crimson curved horns. It flashes wicked fangs when threatened. It moves on 4 talons. A amber long scaly tail trails behind it. Most notably, it possesses charcoal scorching scales.",
        "features": [
            "horns",
            "tail",
            "shell"
        ],
        "type": "Fire",
        "stats": {
            "health": 60,
            "attack": 40
        },
        "generation": 1,
        "color": 16711680,
        "bodySize": "massive",
        "bodyType": "muscular",
        "uniqueFeature": "scorching scales",
        "eyes": "fiery",
        "skinFurType": "leathery",
        "pattern": "tiger stripes",
        "wings": "none",
        "clawHorn": "curved horns",
        "teeth": "wicked fangs",
        "limbs": "4 talons",
        "tail": "long scaly tail",
        "eyesColor": "obsidian",
        "skinFurColor": "ruby",
        "wingsColor": "none",
        "clawHornColor": "crimson",
        "tailColor": "amber",
        "uniqueFeatureColor": "charcoal"
    },
    {
        "id": 32,
        "name": "Tidebeak",
        "description": "A large, agile Water-type creature. It is covered in teal scaly skin with distinct dappled patterns. Its pearl wide eyes look out thoughtfully. It defends itself with aquamarine hooked talons. It flashes needle-like teeth when threatened. A aquamarine sweeping flowing tail trails behind it. Most notably, it possesses cyan bioluminescent spots.",
        "features": [
            "shell",
            "tail",
            "horns"
        ],
        "type": "Water",
        "stats": {
            "health": 60,
            "attack": 32
        },
        "generation": 1,
        "color": 255,
        "bodySize": "large",
        "bodyType": "agile",
        "uniqueFeature": "bioluminescent spots",
        "eyes": "wide",
        "skinFurType": "scaly",
        "pattern": "dappled patterns",
        "wings": "none",
        "clawHorn": "hooked talons",
        "teeth": "needle-like teeth",
        "limbs": "none",
        "tail": "sweeping flowing tail",
        "eyesColor": "pearl",
        "skinFurColor": "teal",
        "wingsColor": "none",
        "clawHornColor": "aquamarine",
        "tailColor": "aquamarine",
        "uniqueFeatureColor": "cyan"
    },
    {
        "id": 33,
        "name": "Petalwing",
        "description": "A petite, graceful Nature-type creature. It is covered in emerald leafy skin with distinct leafy speckles. Its emerald gentle eyes look out thoughtfully. It sports olive medium leafy wings and moves gracefully. It defends itself with brown thorny spikes. It flashes flat teeth when threatened. It moves on 8 paws. A brown prehensile bushy tail trails behind it. Most notably, it possesses olive thorny vines.",
        "features": [
            "claws",
            "flying",
            "fur"
        ],
        "type": "Nature",
        "stats": {
            "health": 60,
            "attack": 45
        },
        "generation": 1,
        "color": 65280,
        "bodySize": "petite",
        "bodyType": "graceful",
        "uniqueFeature": "thorny vines",
        "eyes": "gentle",
        "skinFurType": "leafy",
        "pattern": "leafy speckles",
        "wings": "medium leafy wings",
        "clawHorn": "thorny spikes",
        "teeth": "flat teeth",
        "limbs": "8 paws",
        "tail": "prehensile bushy tail",
        "eyesColor": "emerald",
        "skinFurColor": "emerald",
        "wingsColor": "olive",
        "clawHornColor": "brown",
        "tailColor": "brown",
        "uniqueFeatureColor": "olive"
    },
    {
        "id": 34,
        "name": "Statichound",
        "description": "A tiny, agile Electric-type creature. It is covered in yellow smooth skin with distinct electric stripes. Its neon green glowing eyes look out thoughtfully. It flashes sharp teeth when threatened. It moves on 6 mechanical legs. A golden whip-like sparking tail trails behind it. Most notably, it possesses electric blue shock wave.",
        "features": [
            "fur",
            "scales",
            "claws"
        ],
        "type": "Electric",
        "stats": {
            "health": 60,
            "attack": 57
        },
        "generation": 1,
        "color": 16776960,
        "bodySize": "tiny",
        "bodyType": "agile",
        "uniqueFeature": "shock wave",
        "eyes": "glowing",
        "skinFurType": "smooth",
        "pattern": "electric stripes",
        "wings": "none",
        "clawHorn": "none",
        "teeth": "sharp teeth",
        "limbs": "6 mechanical legs",
        "tail": "whip-like sparking tail",
        "eyesColor": "neon green",
        "skinFurColor": "yellow",
        "wingsColor": "none",
        "clawHornColor": "none",
        "tailColor": "golden",
        "uniqueFeatureColor": "electric blue"
    },
    {
        "id": 35,
        "name": "Wintertuft",
        "description": "A stout, blocky Ice-type creature. It is covered in cyan woolly skin with distinct checkerboard patterns. Its silver blind eyes look out thoughtfully. It sports snow white large crystal wings and moves gracefully. It defends itself with ice blue jagged spikes. It flashes tusks when threatened. It moves on 2 flippers. A snow white short fluffy tail trails behind it. Most notably, it possesses silver frost breath.",
        "features": [
            "shell",
            "scales",
            "wings"
        ],
        "type": "Ice",
        "stats": {
            "health": 60,
            "attack": 40
        },
        "generation": 1,
        "color": 65535,
        "bodySize": "stout",
        "bodyType": "blocky",
        "uniqueFeature": "frost breath",
        "eyes": "blind",
        "skinFurType": "woolly",
        "pattern": "checkerboard patterns",
        "wings": "large crystal wings",
        "clawHorn": "jagged spikes",
        "teeth": "tusks",
        "limbs": "2 flippers",
        "tail": "short fluffy tail",
        "eyesColor": "silver",
        "skinFurColor": "cyan",
        "wingsColor": "snow white",
        "clawHornColor": "ice blue",
        "tailColor": "snow white",
        "uniqueFeatureColor": "silver"
    },
    {
        "id": 36,
        "name": "Craghorn",
        "description": "A large, rounded Earth-type creature. It is covered in dusty grey thick skin with distinct mottled rocks. Its brown cyclopic eyes look out thoughtfully. It defends itself with brown ramming plates. It flashes tusks when threatened. It moves on 4 hooves. A amber stubby rocky tail trails behind it. Most notably, it possesses sand dust clouds.",
        "features": [
            "horns",
            "fur",
            "shell"
        ],
        "type": "Earth",
        "stats": {
            "health": 60,
            "attack": 50
        },
        "generation": 1,
        "color": 9127187,
        "bodySize": "large",
        "bodyType": "rounded",
        "uniqueFeature": "dust clouds",
        "eyes": "cyclopic",
        "skinFurType": "thick",
        "pattern": "mottled rocks",
        "wings": "none",
        "clawHorn": "ramming plates",
        "teeth": "tusks",
        "limbs": "4 hooves",
        "tail": "stubby rocky tail",
        "eyesColor": "brown",
        "skinFurColor": "dusty grey",
        "wingsColor": "none",
        "clawHornColor": "brown",
        "tailColor": "amber",
        "uniqueFeatureColor": "sand"
    },
    {
        "id": 37,
        "name": "Windgill",
        "description": "A slender, spindly Wind-type creature. It is covered in azure smooth skin with distinct gradient colors. Its azure narrow eyes look out thoughtfully. It sports pale gray majestic feathered wings and moves gracefully. It defends itself with cream smooth crest. It moves on 2 agile limbs. A cream twin flowing tail trails behind it. Most notably, it possesses cream hurricane eye.",
        "features": [
            "fur",
            "scales",
            "claws"
        ],
        "type": "Wind",
        "stats": {
            "health": 60,
            "attack": 60
        },
        "generation": 1,
        "color": 13882323,
        "bodySize": "slender",
        "bodyType": "spindly",
        "uniqueFeature": "hurricane eye",
        "eyes": "narrow",
        "skinFurType": "smooth",
        "pattern": "gradient colors",
        "wings": "majestic feathered wings",
        "clawHorn": "smooth crest",
        "teeth": "none",
        "limbs": "2 agile limbs",
        "tail": "twin flowing tail",
        "eyesColor": "azure",
        "skinFurColor": "azure",
        "wingsColor": "pale gray",
        "clawHornColor": "cream",
        "tailColor": "cream",
        "uniqueFeatureColor": "cream"
    },
    {
        "id": 38,
        "name": "Brightshell",
        "description": "A towering, floating Light-type creature. It is covered in ivory prismatic skin with distinct sunburst designs. Its yellow glowing eyes look out thoughtfully. It sports gold large feathered wings and moves gracefully. It defends itself with diamond crystal shards. It flashes flat teeth when threatened. It moves on 4 ethereal limbs. A peach multiple energy tail trails behind it. Most notably, it possesses gold luminous halo.",
        "features": [
            "wings",
            "flying",
            "glowing"
        ],
        "type": "Light",
        "stats": {
            "health": 60,
            "attack": 48
        },
        "generation": 1,
        "color": 16777215,
        "bodySize": "towering",
        "bodyType": "floating",
        "uniqueFeature": "luminous halo",
        "eyes": "glowing",
        "skinFurType": "prismatic",
        "pattern": "sunburst designs",
        "wings": "large feathered wings",
        "clawHorn": "crystal shards",
        "teeth": "flat teeth",
        "limbs": "4 ethereal limbs",
        "tail": "multiple energy tail",
        "eyesColor": "yellow",
        "skinFurColor": "ivory",
        "wingsColor": "gold",
        "clawHornColor": "diamond",
        "tailColor": "peach",
        "uniqueFeatureColor": "gold"
    },
    {
        "id": 39,
        "name": "Shadecrest",
        "description": "A immense, serpentine Dark-type creature. It is covered in charcoal leathery skin with distinct mottled shadows. Its onyx glowing eyes look out thoughtfully. It sports pitch black asymmetrical leathery wings and moves gracefully. It defends itself with pitch black razor-sharp claws. It flashes sharp teeth when threatened. It moves on 6 talons. A charcoal multiple barbed tail trails behind it. Most notably, it possesses obsidian abyssal gaze.",
        "features": [
            "wings",
            "flying"
        ],
        "type": "Dark",
        "stats": {
            "health": 60,
            "attack": 48
        },
        "generation": 1,
        "color": 4473924,
        "bodySize": "immense",
        "bodyType": "serpentine",
        "uniqueFeature": "abyssal gaze",
        "eyes": "glowing",
        "skinFurType": "leathery",
        "pattern": "mottled shadows",
        "wings": "asymmetrical leathery wings",
        "clawHorn": "razor-sharp claws",
        "teeth": "sharp teeth",
        "limbs": "6 talons",
        "tail": "multiple barbed tail",
        "eyesColor": "onyx",
        "skinFurColor": "charcoal",
        "wingsColor": "pitch black",
        "clawHornColor": "pitch black",
        "tailColor": "charcoal",
        "uniqueFeatureColor": "obsidian"
    },
    {
        "id": 40,
        "name": "Meteorhorn",
        "description": "A immense, bipedal Cosmic-type creature. It is covered in purple translucent skin with distinct cosmic runes. Its purple starry eyes look out thoughtfully. It sports purple oversized energy wings and moves gracefully. It flashes flat teeth when threatened. A nebula pink massive comet tail trails behind it. Most notably, it possesses amethyst meteor shower.",
        "features": [
            "wings",
            "claws",
            "flying"
        ],
        "type": "Cosmic",
        "stats": {
            "health": 60,
            "attack": 40
        },
        "generation": 1,
        "color": 8388736,
        "bodySize": "immense",
        "bodyType": "bipedal",
        "uniqueFeature": "meteor shower",
        "eyes": "starry",
        "skinFurType": "translucent",
        "pattern": "cosmic runes",
        "wings": "oversized energy wings",
        "clawHorn": "none",
        "teeth": "flat teeth",
        "limbs": "none",
        "tail": "massive comet tail",
        "eyesColor": "purple",
        "skinFurColor": "purple",
        "wingsColor": "purple",
        "clawHornColor": "none",
        "tailColor": "nebula pink",
        "uniqueFeatureColor": "amethyst"
    },
    {
        "id": 41,
        "name": "Magmafin",
        "description": "A stout, muscular Fire-type creature. It is covered in scarlet rough skin with distinct tiger stripes. Its orange fiery eyes look out thoughtfully. It sports amber majestic flame wings and moves gracefully. It defends itself with amber razor-sharp claws. It flashes protruding fangs when threatened. It moves on 6 talons. A obsidian massive scaly tail trails behind it. Most notably, it possesses crimson fiery breath.",
        "features": [
            "shell",
            "fur"
        ],
        "type": "Fire",
        "stats": {
            "health": 60,
            "attack": 59
        },
        "generation": 1,
        "color": 16711680,
        "bodySize": "stout",
        "bodyType": "muscular",
        "uniqueFeature": "fiery breath",
        "eyes": "fiery",
        "skinFurType": "rough",
        "pattern": "tiger stripes",
        "wings": "majestic flame wings",
        "clawHorn": "razor-sharp claws",
        "teeth": "protruding fangs",
        "limbs": "6 talons",
        "tail": "massive scaly tail",
        "eyesColor": "orange",
        "skinFurColor": "scarlet",
        "wingsColor": "amber",
        "clawHornColor": "amber",
        "tailColor": "obsidian",
        "uniqueFeatureColor": "crimson"
    },
    {
        "id": 42,
        "name": "Riverhawk",
        "description": "A small, sleek Water-type creature. It is covered in cyan smooth skin with distinct dappled patterns. Its sea green calm eyes look out thoughtfully. It moves on 4 webbed feet. A azure long paddle tail trails behind it. Most notably, it possesses turquoise bubble clusters.",
        "features": [
            "claws",
            "horns",
            "tail"
        ],
        "type": "Water",
        "stats": {
            "health": 60,
            "attack": 60
        },
        "generation": 1,
        "color": 255,
        "bodySize": "small",
        "bodyType": "sleek",
        "uniqueFeature": "bubble clusters",
        "eyes": "calm",
        "skinFurType": "smooth",
        "pattern": "dappled patterns",
        "wings": "none",
        "clawHorn": "none",
        "teeth": "none",
        "limbs": "4 webbed feet",
        "tail": "long paddle tail",
        "eyesColor": "sea green",
        "skinFurColor": "cyan",
        "wingsColor": "none",
        "clawHornColor": "none",
        "tailColor": "azure",
        "uniqueFeatureColor": "turquoise"
    },
    {
        "id": 43,
        "name": "Bloomweaver",
        "description": "A diminutive, slender Nature-type creature. It is covered in forest green soft skin with distinct natural camouflage. Its emerald multiple eyes look out thoughtfully. It moves on 6 agile limbs. A brown prehensile bushy tail trails behind it. Most notably, it possesses jade floral crown.",
        "features": [
            "horns",
            "fur",
            "flying"
        ],
        "type": "Nature",
        "stats": {
            "health": 60,
            "attack": 60
        },
        "generation": 1,
        "color": 65280,
        "bodySize": "diminutive",
        "bodyType": "slender",
        "uniqueFeature": "floral crown",
        "eyes": "multiple",
        "skinFurType": "soft",
        "pattern": "natural camouflage",
        "wings": "none",
        "clawHorn": "none",
        "teeth": "none",
        "limbs": "6 agile limbs",
        "tail": "prehensile bushy tail",
        "eyesColor": "emerald",
        "skinFurColor": "forest green",
        "wingsColor": "none",
        "clawHornColor": "none",
        "tailColor": "brown",
        "uniqueFeatureColor": "jade"
    },
    {
        "id": 44,
        "name": "Chargecrest",
        "description": "A miniscule, spiky Electric-type creature. It is covered in yellow metallic skin with distinct geometric patterns. Its silver electric eyes look out thoughtfully. It sports electric blue tiny energy wings and moves gracefully. It defends itself with golden crystal shards. It flashes sharp teeth when threatened. It moves on 4 paws. A silver whip-like cable-like tail trails behind it. Most notably, it possesses cyan plasma orbs.",
        "features": [
            "flying",
            "tail"
        ],
        "type": "Electric",
        "stats": {
            "health": 60,
            "attack": 48
        },
        "generation": 1,
        "color": 16776960,
        "bodySize": "miniscule",
        "bodyType": "spiky",
        "uniqueFeature": "plasma orbs",
        "eyes": "electric",
        "skinFurType": "metallic",
        "pattern": "geometric patterns",
        "wings": "tiny energy wings",
        "clawHorn": "crystal shards",
        "teeth": "sharp teeth",
        "limbs": "4 paws",
        "tail": "whip-like cable-like tail",
        "eyesColor": "silver",
        "skinFurColor": "yellow",
        "wingsColor": "electric blue",
        "clawHornColor": "golden",
        "tailColor": "silver",
        "uniqueFeatureColor": "cyan"
    },
    {
        "id": 45,
        "name": "Chillscale",
        "description": "A blocky, stout Ice-type creature. It is covered in frost white smooth skin with distinct checkerboard patterns. Its pale blue piercing eyes look out thoughtfully. It sports ice blue medium snowy wings and moves gracefully. It defends itself with translucent blue jagged spikes. It moves on 4 sturdy legs. Most notably, it possesses snow white glacier shield.",
        "features": [
            "scales",
            "horns",
            "fangs"
        ],
        "type": "Ice",
        "stats": {
            "health": 60,
            "attack": 58
        },
        "generation": 1,
        "color": 65535,
        "bodySize": "blocky",
        "bodyType": "stout",
        "uniqueFeature": "glacier shield",
        "eyes": "piercing",
        "skinFurType": "smooth",
        "pattern": "checkerboard patterns",
        "wings": "medium snowy wings",
        "clawHorn": "jagged spikes",
        "teeth": "none",
        "limbs": "4 sturdy legs",
        "tail": "none",
        "eyesColor": "pale blue",
        "skinFurColor": "frost white",
        "wingsColor": "ice blue",
        "clawHornColor": "translucent blue",
        "tailColor": "none",
        "uniqueFeatureColor": "snow white"
    },
    {
        "id": 46,
        "name": "Rockhide",
        "description": "A large, muscular Earth-type creature. It is covered in amber thick skin with distinct cracked lines. Its slate cyclopic eyes look out thoughtfully. It defends itself with bronze boulder horns. It flashes crushing molars when threatened. It moves on 6 hooves. A sand stubby spiked mace tail trails behind it. Most notably, it possesses bronze sandstone plates.",
        "features": [
            "wings",
            "scales"
        ],
        "type": "Earth",
        "stats": {
            "health": 60,
            "attack": 35
        },
        "generation": 1,
        "color": 9127187,
        "bodySize": "large",
        "bodyType": "muscular",
        "uniqueFeature": "sandstone plates",
        "eyes": "cyclopic",
        "skinFurType": "thick",
        "pattern": "cracked lines",
        "wings": "none",
        "clawHorn": "boulder horns",
        "teeth": "crushing molars",
        "limbs": "6 hooves",
        "tail": "stubby spiked mace tail",
        "eyesColor": "slate",
        "skinFurColor": "amber",
        "wingsColor": "none",
        "clawHornColor": "bronze",
        "tailColor": "sand",
        "uniqueFeatureColor": "bronze"
    },
    {
        "id": 47,
        "name": "Breezefleece",
        "description": "A miniscule, agile Wind-type creature. It is covered in sky blue soft skin with distinct gradient colors. Its azure clear eyes look out thoughtfully. It sports sky blue colossal cloud wings and moves gracefully. It defends itself with sky blue smooth crest. It flashes sharp teeth when threatened. It moves on 2 talons. A cream flowing feathered tail trails behind it. Most notably, it possesses mint green updraft currents.",
        "features": [
            "flying",
            "horns",
            "fangs"
        ],
        "type": "Wind",
        "stats": {
            "health": 60,
            "attack": 60
        },
        "generation": 1,
        "color": 13882323,
        "bodySize": "miniscule",
        "bodyType": "agile",
        "uniqueFeature": "updraft currents",
        "eyes": "clear",
        "skinFurType": "soft",
        "pattern": "gradient colors",
        "wings": "colossal cloud wings",
        "clawHorn": "smooth crest",
        "teeth": "sharp teeth",
        "limbs": "2 talons",
        "tail": "flowing feathered tail",
        "eyesColor": "azure",
        "skinFurColor": "sky blue",
        "wingsColor": "sky blue",
        "clawHornColor": "sky blue",
        "tailColor": "cream",
        "uniqueFeatureColor": "mint green"
    },
    {
        "id": 48,
        "name": "Sunscale",
        "description": "A small, slender Light-type creature. It is covered in silver translucent skin with distinct glowing runes. Its silver hypnotic eyes look out thoughtfully. It sports silver majestic crystal wings and moves gracefully. It defends itself with gold crystal shards. It moves on 4 graceful legs. A pearl multiple energy tail trails behind it. Most notably, it possesses pale yellow solar flare.",
        "features": [
            "fangs",
            "scales"
        ],
        "type": "Light",
        "stats": {
            "health": 60,
            "attack": 42
        },
        "generation": 1,
        "color": 16777215,
        "bodySize": "small",
        "bodyType": "slender",
        "uniqueFeature": "solar flare",
        "eyes": "hypnotic",
        "skinFurType": "translucent",
        "pattern": "glowing runes",
        "wings": "majestic crystal wings",
        "clawHorn": "crystal shards",
        "teeth": "none",
        "limbs": "4 graceful legs",
        "tail": "multiple energy tail",
        "eyesColor": "silver",
        "skinFurColor": "silver",
        "wingsColor": "silver",
        "clawHornColor": "gold",
        "tailColor": "pearl",
        "uniqueFeatureColor": "pale yellow"
    },
    {
        "id": 49,
        "name": "Duskshell",
        "description": "A immense, lanky Dark-type creature. It is covered in charcoal leathery skin with distinct mottled shadows. Its blood red narrow eyes look out thoughtfully. It sports obsidian large leathery wings and moves gracefully. It defends itself with charcoal jagged spikes. It flashes sharp teeth when threatened. It moves on 4 talons. A indigo whip-like stinger tail trails behind it. Most notably, it possesses obsidian shadow cloak.",
        "features": [
            "horns",
            "tail"
        ],
        "type": "Dark",
        "stats": {
            "health": 60,
            "attack": 31
        },
        "generation": 1,
        "color": 4473924,
        "bodySize": "immense",
        "bodyType": "lanky",
        "uniqueFeature": "shadow cloak",
        "eyes": "narrow",
        "skinFurType": "leathery",
        "pattern": "mottled shadows",
        "wings": "large leathery wings",
        "clawHorn": "jagged spikes",
        "teeth": "sharp teeth",
        "limbs": "4 talons",
        "tail": "whip-like stinger tail",
        "eyesColor": "blood red",
        "skinFurColor": "charcoal",
        "wingsColor": "obsidian",
        "clawHornColor": "charcoal",
        "tailColor": "indigo",
        "uniqueFeatureColor": "obsidian"
    },
    {
        "id": 50,
        "name": "Orbitspine",
        "description": "A floating, bipedal Cosmic-type creature. It is covered in purple gaseous skin with distinct geometric stars. Its violet glowing eyes look out thoughtfully. It sports violet majestic energy wings and moves gracefully. It defends itself with violet majestic horns. It flashes flat teeth when threatened. It moves on 100 tentacles. Most notably, it possesses purple galactic spiral.",
        "features": [
            "horns",
            "glowing",
            "fangs"
        ],
        "type": "Cosmic",
        "stats": {
            "health": 60,
            "attack": 60
        },
        "generation": 1,
        "color": 8388736,
        "bodySize": "floating",
        "bodyType": "bipedal",
        "uniqueFeature": "galactic spiral",
        "eyes": "glowing",
        "skinFurType": "gaseous",
        "pattern": "geometric stars",
        "wings": "majestic energy wings",
        "clawHorn": "majestic horns",
        "teeth": "flat teeth",
        "limbs": "100 tentacles",
        "tail": "none",
        "eyesColor": "violet",
        "skinFurColor": "purple",
        "wingsColor": "violet",
        "clawHornColor": "violet",
        "tailColor": "none",
        "uniqueFeatureColor": "purple"
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

// Generate dual types
(function() {
    const baseTypes = Object.keys(window.typeChart);

    // Create dual types
    for (let i = 0; i < baseTypes.length; i++) {
        for (let j = 0; j < baseTypes.length; j++) {
            if (i !== j) {
                const dualType = `${baseTypes[i]}-${baseTypes[j]}`;
                window.typeChart[dualType] = {};
            }
        }
    }

    const allTypes = Object.keys(window.typeChart);

    // Calculate modifiers
    for (const attacker of baseTypes) {
        const baseTypes = allTypes.filter(t => !t.includes('-'));
    for (const defender of baseTypes) {
            let mod = 1;

            const attackerTypes = attacker.split('-');
            const defenderTypes = defender.split('-');

            // Attack logic: take the max modifier of the attacker's component types
            let maxMod = 0;
            for (const aType of attackerTypes) {
                // Defense logic: multiply the attacker's modifier against each defending component type
                let defMod = 1;
                for (const dType of defenderTypes) {
                    let singleMod = 1;
                    if (window.typeChart[aType] && window.typeChart[aType][dType] !== undefined) {
                        singleMod = window.typeChart[aType][dType];
                    }
                    defMod *= singleMod;
                }
                if (defMod > maxMod) {
                    maxMod = defMod;
                }
            }
            window.typeChart[attacker][defender] = maxMod;
        }
    }
})();

window.getTypeModifier = function(attackType, defenseType) {
    if (window.typeChart[attackType] && window.typeChart[attackType][defenseType] !== undefined) {
        return window.typeChart[attackType][defenseType];
    }
    return 1;
};

window.getTypeTooltip = function(typeString) {
    if (!window.typeChart[typeString]) return typeString;
    const allTypes = Object.keys(window.typeChart);

    let strengths = [];
    let weaknesses = [];

    for (const defender of allTypes) {
        if (window.typeChart[typeString][defender] >= 2) {
            strengths.push(defender);
        }
    }

    for (const attacker of allTypes) {
        if (window.typeChart[attacker] && window.typeChart[attacker][typeString] >= 2) {
            weaknesses.push(attacker);
        }
    }

    let tooltip = '';
    if (strengths.length > 0) tooltip += `Strengths (2x): ${strengths.join(', ')}`;
    if (weaknesses.length > 0) {
        if (tooltip.length > 0) tooltip += ` <br> `;
        tooltip += `Weaknesses (2x from): ${weaknesses.join(', ')}`;
    }

    return tooltip || typeString;
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
        const activeParty = collectedCreatures.filter(c => !c.stored);
        creature.stored = activeParty.length >= 6;

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
    let allTypes = Object.keys(window.typeChart);
    let singleTypes = allTypes.filter(t => !t.includes('-'));
    let dualTypes = allTypes.filter(t => t.includes('-'));

    function generateChart(typesList) {
        let html = '<table style="width:100%; text-align:center; border-collapse:collapse; font-size:14px; color:#ddd;">';
        html += '<tr><th style="border-bottom:1px solid #555; position:sticky; top:0; background:#222; z-index:10;">Attacker \\ Defender</th>' + typesList.map(t => `<th style="border-bottom:1px solid #555; padding:4px; position:sticky; top:0; background:#222; z-index:10;">${t}</th>`).join('') + '</tr>';

        typesList.forEach(attacker => {
            html += `<tr><td style="border-bottom:1px solid #333; font-weight:bold; padding:4px;">${attacker}</td>`;
            typesList.forEach(defender => {
                let mod = window.typeChart[attacker][defender] !== undefined ? window.typeChart[attacker][defender] : 1;
                let bgColor = 'transparent';
                let color = '#ddd';
                let text = '1x';
                if (mod >= 2) { bgColor = 'rgba(76, 175, 80, 0.2)'; color = '#4caf50'; text = mod + 'x'; }
                else if (mod > 0 && mod < 1) { bgColor = 'rgba(244, 67, 54, 0.2)'; color = '#f44336'; text = mod + 'x'; }
                else if (mod === 0) { bgColor = 'rgba(158, 158, 158, 0.2)'; color = '#9e9e9e'; text = '0x'; }

                html += `<td style="border-bottom:1px solid #333; background:${bgColor}; color:${color}; padding:4px;">${text}</td>`;
            });
            html += '</tr>';
        });
        html += '</table>';
        return html;
    }

    let typeContainer = document.getElementById('typeChartContainer');
    if (typeContainer) typeContainer.innerHTML = generateChart(singleTypes);

    let typeGen2Container = document.getElementById('typeChartGen2Container');
    if (typeGen2Container) typeGen2Container.innerHTML = generateChart(dualTypes);

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

window.openStorageModal = function() {
    closeMenuModal();
    document.getElementById('storageModal').style.display = 'block';
    renderStorageList();
};

window.closeStorageModal = function() {
    let _m_storageModal = document.getElementById('storageModal'); _m_storageModal.children[0].classList.add('modal-fade-out'); setTimeout(() => { _m_storageModal.style.display = 'none'; _m_storageModal.children[0].classList.remove('modal-fade-out'); }, 190);
};
window.closePartyModal = function() {
    let _m_partyModal = document.getElementById('partyModal'); _m_partyModal.children[0].classList.add('modal-fade-out'); setTimeout(() => { _m_partyModal.style.display = 'none'; _m_partyModal.children[0].classList.remove('modal-fade-out'); }, 190);
};

window.renderPartyList = function() {
    const list = document.getElementById('partyList');
    list.innerHTML = '';
    const fragment = document.createDocumentFragment();

    const activeParty = collectedCreatures.filter(c => !c.stored);

    if (activeParty.length === 0) {
        list.innerHTML = '<p>Your party is empty.</p>';
        return;
    }

    const partyHeader = document.createElement('h3');
    partyHeader.innerText = "Active Party (" + activeParty.length + "/6)";
    partyHeader.style.color = "#e0e0ff";
    partyHeader.style.marginTop = "0";
    fragment.appendChild(partyHeader);

    activeParty.forEach((c) => {
        // Find original index
        const index = collectedCreatures.findIndex(orig => orig.id === c.id);
        const card = document.createElement('div');
        card.className = 'party-card' + (c.isShiny ? ' shiny' : '');

        const typeColors = {
            "Fire": "rgba(229, 57, 53, 0.8)",
            "Water": "rgba(30, 136, 229, 0.8)",
            "Nature": "rgba(67, 160, 71, 0.8)",
            "Electric": "rgba(253, 216, 53, 0.8)",
            "Ice": "rgba(3, 169, 244, 0.8)",
            "Earth": "rgba(109, 76, 65, 0.8)",
            "Rock": "rgba(117, 117, 117, 0.8)",
            "Wind": "rgba(129, 212, 250, 0.8)",
            "Light": "rgba(255, 238, 88, 0.8)",
            "Dark": "rgba(33, 33, 33, 0.8)",
            "Cosmic": "rgba(142, 36, 170, 0.8)",
            "Normal": "rgba(158, 158, 158, 0.8)"
        };
        const types = c.type ? c.type.split('-') : [];
        const color1 = typeColors[types[0]] || 'rgba(30, 60, 90, 0.8)';
        const color2 = types.length > 1 ? (typeColors[types[1]] || color1) : color1;
        card.style.backgroundImage = `linear-gradient(90deg, ${color1}, ${color2})`;
        card.style.backgroundColor = 'transparent';


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
                <h3 style="font-size: 1.2em; border-bottom: 1px solid #87CEEB; padding-bottom: 5px; margin-bottom: 10px;">${shinyPrefix}<input class="creature-name" aria-label="Creature Name" value="${c.nickname || c.name}" maxlength="20"> <button class="save-name-btn" data-index="${index}">Save</button> - <span data-tooltip="${window.getTypeTooltip(c.type)}">${c.type}</span></h3>
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
                <button class="store-btn" data-index="${index}" style="background-color: #2196F3; color: white;">Store</button>
                <button class="release-btn" data-index="${index}" style="background-color: #f44336; color: white;">Release</button>
            </div>
        `;
        fragment.appendChild(card);
    });

    list.appendChild(fragment);
};

window.renderStorageList = function() {
    const list = document.getElementById('storageList');
    list.innerHTML = '';
    const fragment = document.createDocumentFragment();

    const storageBox = collectedCreatures.filter(c => c.stored);

    if (storageBox.length === 0) {
        list.innerHTML = '<p>Your storage box is empty.</p>';
        return;
    }

    const storageGrid = document.createElement('div');
    storageGrid.style.display = 'grid';
    storageGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
    storageGrid.style.gap = '15px';
    storageGrid.style.maxHeight = '60vh';
    storageGrid.style.overflowY = 'auto';
    storageGrid.style.padding = '10px';

    storageBox.forEach((c) => {
        const index = collectedCreatures.findIndex(orig => orig.id === c.id);
        const card = document.createElement('div');
        card.className = 'party-card' + (c.isShiny ? ' shiny' : '');

        const typeColors = {
            "Fire": "rgba(229, 57, 53, 0.8)",
            "Water": "rgba(30, 136, 229, 0.8)",
            "Nature": "rgba(67, 160, 71, 0.8)",
            "Electric": "rgba(253, 216, 53, 0.8)",
            "Ice": "rgba(3, 169, 244, 0.8)",
            "Earth": "rgba(109, 76, 65, 0.8)",
            "Rock": "rgba(117, 117, 117, 0.8)",
            "Wind": "rgba(129, 212, 250, 0.8)",
            "Light": "rgba(255, 238, 88, 0.8)",
            "Dark": "rgba(33, 33, 33, 0.8)",
            "Cosmic": "rgba(142, 36, 170, 0.8)",
            "Normal": "rgba(158, 158, 158, 0.8)"
        };
        const types = c.type ? c.type.split('-') : [];
        const color1 = typeColors[types[0]] || 'rgba(30, 60, 90, 0.8)';
        const color2 = types.length > 1 ? (typeColors[types[1]] || color1) : color1;
        card.style.backgroundImage = `linear-gradient(90deg, ${color1}, ${color2})`;
        card.style.backgroundColor = 'transparent';


        const nameHtml = `<h4>${escapeHtml(c.name)} ${c.nickname ? `("${escapeHtml(c.nickname)}")` : ''}</h4>`;
        const typeHtml = `<p>Lvl ${c.level} | Type: <span data-tooltip="${window.getTypeTooltip(c.type)}">${c.type}</span> | Gen ${c.generation}</p>`;

        let actionHtml = `<div class="party-controls">`;
        actionHtml += `<button class="retrieve-btn" data-index="${index}" style="background-color: #4CAF50; color: white;">Retrieve</button>`;
        actionHtml += `<button class="release-btn" data-index="${index}" style="background-color: #f44336; color: white;">Release</button>`;
        actionHtml += `</div>`;

        card.innerHTML = nameHtml + typeHtml + actionHtml;
        storageGrid.appendChild(card);
    });

    fragment.appendChild(storageGrid);
    list.appendChild(fragment);
};

window.saveName = function(btn, index) {
    collectedCreatures[index].nickname = btn.previousElementSibling.value || collectedCreatures[index].name;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collectedCreatures));
    window.renderPartyList();
};

window.moveUp = function(index) {
    // Find the previous active creature index
    let targetIndex = -1;
    for (let i = index - 1; i >= 0; i--) {
        if (!collectedCreatures[i].stored) {
            targetIndex = i;
            break;
        }
    }

    if (targetIndex !== -1 && !collectedCreatures[index].stored) {
        let temp = collectedCreatures[index];
        collectedCreatures[index] = collectedCreatures[targetIndex];
        collectedCreatures[targetIndex] = temp;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(collectedCreatures));
        window.renderPartyList();
    }
};

window.moveDown = function(index) {
    // Find the next active creature index
    let targetIndex = -1;
    for (let i = index + 1; i < collectedCreatures.length; i++) {
        if (!collectedCreatures[i].stored) {
            targetIndex = i;
            break;
        }
    }

    if (targetIndex !== -1 && !collectedCreatures[index].stored) {
        let temp = collectedCreatures[index];
        collectedCreatures[index] = collectedCreatures[targetIndex];
        collectedCreatures[targetIndex] = temp;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(collectedCreatures));
        window.renderPartyList();
    }
};



window.storeCreature = function(index) {
    if (index < 0 || index >= collectedCreatures.length) return;
    const activeParty = collectedCreatures.filter(c => !c.stored);

    if (activeParty.length <= 1) {
        alert("You cannot store your last active party creature!");
        return;
    }

    collectedCreatures[index].stored = true;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collectedCreatures));
    window.renderPartyList();
};

window.retrieveCreature = function(index) {
    if (index < 0 || index >= collectedCreatures.length) return;

    const activeParty = collectedCreatures.filter(c => !c.stored);
    if (activeParty.length >= 6) {
        alert("Your party is full! Store a creature first.");
        return;
    }

    collectedCreatures[index].stored = false;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collectedCreatures));
    window.renderStorageList();
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
        if (document.getElementById('storageModal').style.display === 'block') {
            window.renderStorageList();
        }
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

window.closeLevelUpModal = function() {
    let _m_levelUpModal = document.getElementById('levelUpModal');
    _m_levelUpModal.children[0].classList.add('modal-fade-out');
    setTimeout(() => {
        _m_levelUpModal.style.display = 'none';
        _m_levelUpModal.children[0].classList.remove('modal-fade-out');
        inBattle = false;
        player.lastBattleTime = game.scene.scenes[0].time.now;
        if (currentEnemySprite) {
            currentEnemySprite.destroy();
        }
        respawnEnemyBase();
    }, 190);
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
        if (compatibility === 0 && !(p1.generation === 1 && p2.generation === 1)) {
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
    render: {
        roundPixels: false
    },
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

let dayNightTime = 8.0;
let dayNightOverlay;
let timeText;
let lastDayNightUpdate = 0;
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
            if (drawX > 50) {
                 ctx.beginPath();
                 ctx.moveTo(drawX - 64, blades[i].y + blades[i].height);
                 ctx.quadraticCurveTo(drawX - 64, blades[i].y + blades[i].height / 2, drawX - 64 + windOffset * (blades[i].height / 15), blades[i].y);
                 ctx.lineTo(drawX - 64 + 2, blades[i].y + blades[i].height);
                 ctx.fill();
            }
            if (drawX < 14) { // Handle left-side wrap around
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

    // Generate rounded corner cutouts
    for (let frame = 0; frame < 12; frame++) {
        const cornerPositions = [
            { dir: 'tl', x: 50, y: 50, start: Math.PI, end: Math.PI * 1.5, mx: 50, my: 0 },
            { dir: 'tr', x: 0, y: 50, start: Math.PI * 1.5, end: 0, mx: 50, my: 50 },
            { dir: 'br', x: 0, y: 0, start: 0, end: Math.PI / 2, mx: 0, my: 50 },
            { dir: 'bl', x: 50, y: 0, start: Math.PI / 2, end: Math.PI, mx: 0, my: 0 }
        ];

        cornerPositions.forEach(pos => {
            // Convex corner (outer edge of water, grass cuts into the water square)
            const convexCanvas = document.createElement('canvas');
            convexCanvas.width = 50;
            convexCanvas.height = 50;
            const convexCtx = convexCanvas.getContext('2d');
            // Draw the procedural grass texture instead of solid color
            convexCtx.drawImage(this.textures.get('grass_' + frame).getSourceImage(), 0, 0, 50, 50, 0, 0, 50, 50);
            convexCtx.globalCompositeOperation = 'destination-out';
            convexCtx.beginPath();
            convexCtx.arc(pos.x, pos.y, 50, 0, Math.PI * 2);
            convexCtx.fill();
            this.textures.addCanvas('grass_corner_convex_' + pos.dir + '_' + frame, convexCanvas);

            // Concave corner (inner edge of water, water cuts into the grass square)
            const concaveCanvas = document.createElement('canvas');
            concaveCanvas.width = 50;
            concaveCanvas.height = 50;
            const concaveCtx = concaveCanvas.getContext('2d');
            concaveCtx.drawImage(this.textures.get('grass_' + frame).getSourceImage(), 0, 0, 50, 50, 0, 0, 50, 50);
            concaveCtx.globalCompositeOperation = 'destination-in';
            concaveCtx.beginPath();
            concaveCtx.moveTo(pos.x, pos.y);
            concaveCtx.lineTo(pos.mx, pos.my);
            concaveCtx.arc(pos.x, pos.y, 50, pos.start, pos.end, false);
            concaveCtx.lineTo(pos.x, pos.y);
            concaveCtx.fill();
            this.textures.addCanvas('grass_corner_concave_' + pos.dir + '_' + frame, concaveCanvas);
        });
    }

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


    // Create obstacle
    let obs = obstaclesGroup.create(posX, posY, 'obs_tex_0');
    let gridX = (c * tileSize) % 400;
    let gridY = (r * tileSize) % 400;
    obs.setCrop(gridX, gridY, 100, 100);
    obs.setDisplayOrigin(gridX + 50, gridY + 50);
    obs.body.setSize(90, 90);
    obs.body.setOffset(5, 5);
    obs.body.x = posX - 45;
    obs.body.y = posY - 45;
    obs.anims.play('water_anim', true);
    obs.setDepth(0);
    sprites.push(obs);

    // Add overlay


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

    // Convex corners
    if (c > 0 && mapData[r][c-1] === 'grass' && r > 0 && mapData[r-1][c] === 'grass') {
        let corner = scene.add.sprite(posX - 50 + 25, posY - 50 + 25, 'grass_corner_convex_tl_0');
        corner.anims.play('grass_corner_anim_tl', true);
        corner.setDepth(0);
        sprites.push(corner);
    }
    if (c < cols-1 && mapData[r][c+1] === 'grass' && r > 0 && mapData[r-1][c] === 'grass') {
        let corner = scene.add.sprite(posX + 50 - 25, posY - 50 + 25, 'grass_corner_convex_tr_0');
        corner.anims.play('grass_corner_anim_tr', true);
        corner.setDepth(0);
        sprites.push(corner);
    }
    if (c < cols-1 && mapData[r][c+1] === 'grass' && r < rows-1 && mapData[r+1][c] === 'grass') {
        let corner = scene.add.sprite(posX + 50 - 25, posY + 50 - 25, 'grass_corner_convex_br_0');
        corner.anims.play('grass_corner_anim_br', true);
        corner.setDepth(0);
        sprites.push(corner);
    }
    if (c > 0 && mapData[r][c-1] === 'grass' && r < rows-1 && mapData[r+1][c] === 'grass') {
        let corner = scene.add.sprite(posX - 50 + 25, posY + 50 - 25, 'grass_corner_convex_bl_0');
        corner.anims.play('grass_corner_anim_bl', true);
        corner.setDepth(0);
        sprites.push(corner);
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

    let grassCornerFrames_tl = [];
    let grassCornerFrames_tr = [];
    let grassCornerFrames_br = [];
    let grassCornerFrames_bl = [];
    for(let i = 0; i < 12; i++) {
        grassCornerFrames_tl.push({ key: 'grass_corner_convex_tl_' + i });
        grassCornerFrames_tr.push({ key: 'grass_corner_convex_tr_' + i });
        grassCornerFrames_br.push({ key: 'grass_corner_convex_br_' + i });
        grassCornerFrames_bl.push({ key: 'grass_corner_convex_bl_' + i });
    }

    this.anims.create({
        key: 'water_anim',
        frames: waterFrames,
        frameRate: 8,
        repeat: -1
    });

    this.anims.create({
        key: 'grass_corner_anim_tl',
        frames: grassCornerFrames_tl,
        frameRate: 8,
        repeat: -1
    });
    this.anims.create({
        key: 'grass_corner_anim_tr',
        frames: grassCornerFrames_tr,
        frameRate: 8,
        repeat: -1
    });
    this.anims.create({
        key: 'grass_corner_anim_br',
        frames: grassCornerFrames_br,
        frameRate: 8,
        repeat: -1
    });
    this.anims.create({
        key: 'grass_corner_anim_bl',
        frames: grassCornerFrames_bl,
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

    // Generate lakes (clusters of water) using overlapping circles
    const numLakes = Math.floor((cols * rows) * 0.01); // Adjust density for larger features
    for (let l = 0; l < numLakes; l++) {
        let cx = Math.floor(Math.random() * cols);
        let cy = Math.floor(Math.random() * rows);

        let numCircles = Math.floor(Math.random() * 2) + 1; // 3 to 7 circles

        for (let i = 0; i < numCircles; i++) {
            // Offset from center to make overlapping
            let ox = cx + Math.floor(Math.random() * 9) - 4; // -4 to +4
            let oy = cy + Math.floor(Math.random() * 9) - 4; // -4 to +4
            let radius = Math.floor(Math.random() * 2) + 1; // 2 to 4 radius

            // Draw circle
            for (let y = -radius; y <= radius; y++) {
                for (let x = -radius; x <= radius; x++) {
                    if (x*x + y*y <= radius*radius) {
                        let nx = ox + x;
                        let ny = oy + y;
                        if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
                            mapData[ny][nx] = 'obs';
                        }
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

    // Day and Night Cycle
    dayNightOverlay = this.add.rectangle(0, 0, window.innerWidth, window.innerHeight, 0x000033).setOrigin(0).setScrollFactor(0).setDepth(99).setAlpha(0);
    timeText = this.add.text(20, window.innerHeight - 40, "08:00", { fontSize: '24px', fill: '#FFF' }).setScrollFactor(0).setDepth(100);

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

        if (dayNightOverlay) {
            dayNightOverlay.setSize(gameSize.width, gameSize.height);
        }
        if (timeText) {
            timeText.setPosition(20, gameSize.height - 40);
        }
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

    // Generate nature-like fantasy name based on type
    const typePrefixes = {
        "Fire": ["Ember", "Flare", "Ash", "Pyre", "Cinder", "Flame", "Ignis", "Scorchi", "Magma", "Lava"],
        "Water": ["Tide", "Aqua", "Ripple", "Surf", "Brine", "Splash", "Hydro", "Wave", "Ocean", "River"],
        "Nature": ["Moss", "Leaf", "Thorn", "Briar", "Petal", "Flora", "Bloom", "Vine", "Bark", "Root"],
        "Electric": ["Spark", "Volt", "Jolt", "Static", "Blitz", "Zap", "Wire", "Ohm", "Charge", "Amp"],
        "Ice": ["Frost", "Snow", "Chill", "Glace", "Rime", "Ice", "Polar", "Blizz", "Hail", "Winter"],
        "Earth": ["Dune", "Rock", "Terra", "Mud", "Dust", "Stone", "Crag", "Soil", "Clay", "Quake"],
        "Wind": ["Gale", "Zephyr", "Breeze", "Gust", "Aero", "Wind", "Draft", "Squall", "Hover", "Flit"],
        "Light": ["Dawn", "Lux", "Glow", "Beam", "Ray", "Sun", "Shine", "Bright", "Solar", "Halo"],
        "Dark": ["Dusk", "Umbra", "Shade", "Gloom", "Void", "Night", "Shadow", "Murk", "Grim", "Obsid"],
        "Cosmic": ["Nova", "Star", "Astro", "Cosmo", "Nebula", "Space", "Luna", "Celest", "Orbit", "Meteor"]
    };
    const suffixes = [
        "hound", "bear", "fox", "hawk", "weaver", "stalker", "strider", "glider", "horn", "shell",
        "fin", "paw", "scale", "claw", "tail", "wing", "fang", "snout", "mane", "hoof",
        "beak", "crest", "tuft", "whisker", "spine", "pelt", "fleece", "hide", "gill", "web"
    ];

    if (!clonedData.baseId) {
        clonedData.baseId = clonedData.id; // Store original base prototype ID
    }

    // Only generate a new name if it's not a bred creature (generation > 1) and not already generated
    if (!clonedData.generation || clonedData.generation === 1) {
        const pList = typePrefixes[clonedData.type] || typePrefixes["Nature"];
        const p = pList[Math.floor(Math.random() * pList.length)];
        const s = suffixes[Math.floor(Math.random() * suffixes.length)];
        clonedData.name = p + s;
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

    const modals = ['menuModal', 'partyModal', 'storageModal', 'helpModal', 'breedingModal', 'lobbyModal', 'levelUpModal'];
    const isAnyModalOpen = modals.some(id => {
        const el = document.getElementById(id);
        return el && window.getComputedStyle(el).display !== 'none';
    });
    if (isAnyModalOpen) return;

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

    window.currentBattleParty = collectedCreatures.filter(c => !c.stored);
    currentPlayer = JSON.parse(JSON.stringify(window.currentBattleParty.shift()));
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

    if (creature.currentHp <= 0) {
        logBattle(`<span style="color:#9e9e9e">${creature === currentEnemy ? 'The wild ' : ''}</span><span style="color:${color}">${creature.nickname || creature.name}</span><span style="color:#9e9e9e"> fainted!</span>`);
        return false;
    }

    return true;
}


window.currentBattleParty = [];

window.handleFaint = function(target) {
    if (target === currentEnemy) {
        endBattle('win');
        return true;
    } else {
        if (window.currentBattleParty.length > 0) {
            let next = window.currentBattleParty.shift();
            currentPlayer = JSON.parse(JSON.stringify(next));
            currentPlayer.maxHp = window.getEffectiveStat(currentPlayer, 'health');
            currentPlayer.currentHp = currentPlayer.maxHp;
            currentPlayer.isDefending = false;
            logBattle(`Go, <span style="color:#2196F3">${currentPlayer.nickname || currentPlayer.name}</span>!`);
            updateBattleUI();
            return false; // Battle continues
        } else {
            endBattle('loss');
            return true; // Battle ends
        }
    }
};

window.doPlayerAction = function(action, callback) {
    if (!inBattle) return;
    let canMove = processStatuses(currentPlayer);
    if (currentPlayer.currentHp <= 0) {
        updateBattleUI();
        if (window.handleFaint(currentPlayer)) return;
    } else if (!canMove) {
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
        if (window.handleFaint(currentEnemy)) return;
    }

    if (callback) setTimeout(callback, 1000);
};

window.doEnemyAction = function(callback) {
    if (!inBattle) return;
    let canMove = processStatuses(currentEnemy);
    if (!canMove) {
        updateBattleUI();
        if (currentPlayer.currentHp <= 0) {
            if (!window.handleFaint(currentPlayer)) {
                if (callback) setTimeout(callback, 1000);
            }
        } else if (currentEnemy.currentHp <= 0) {
            window.handleFaint(currentEnemy);
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
        if (window.handleFaint(currentPlayer)) return;
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

        if (result === 'win') {
            let xpGained = Math.floor(currentEnemy.level * 25);
            logBattle(`<span style="color:#4caf50">Gained ${xpGained} XP!</span>`);

            // Record stats before level up
            let oldStats = {};
            ['health', 'attack', 'defense', 'speed', 'specialAttack', 'specialDefense'].forEach(stat => {
                oldStats[stat] = window.getEffectiveStat(collectedCreatures[0], stat);
            });

            let leveledUp = window.gainXp(collectedCreatures[0], xpGained);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(collectedCreatures));

            if (leveledUp) {
                // Show level up modal instead of alert
                document.getElementById('levelUpTitle').innerText = `${collectedCreatures[0].nickname || collectedCreatures[0].name} reached Level ${collectedCreatures[0].level}!`;

                let statsHtml = '';
                const statColors = {health: '#4caf50', attack: '#ff9800', defense: '#9c27b0', speed: '#ffeb3b', specialAttack: '#00bcd4', specialDefense: '#e91e63'};

                ['health', 'attack', 'defense', 'speed', 'specialAttack', 'specialDefense'].forEach(stat => {
                    let newStat = window.getEffectiveStat(collectedCreatures[0], stat);
                    let diff = newStat - oldStats[stat];
                    if (diff > 0) {
                        statsHtml += `<div style="margin: 5px 0;"><span style="color:${statColors[stat]}">${stat.toUpperCase()}</span>: ${oldStats[stat].toFixed(1)} <span style="color:#4caf50">➔ ${newStat.toFixed(1)} (+${diff.toFixed(1)})</span></div>`;
                    }
                });

                document.getElementById('levelUpStats').innerHTML = statsHtml;
                document.getElementById('levelUpModal').style.display = 'block';
                // Note: inBattle remains true until the modal is closed to pause gameplay
                player.body.moves = true; // Restore player physics movement
            } else {
                inBattle = false;
                player.body.moves = true; // Restore player physics movement
                player.lastBattleTime = game.scene.scenes[0].time.now;
                currentEnemySprite.destroy();
                respawnEnemyBase();
            }
        } else {
            inBattle = false;
            player.body.moves = true; // Restore player physics movement
            player.lastBattleTime = game.scene.scenes[0].time.now;

            if (result === 'caught') {
                saveCollected(currentEnemy);
                currentEnemySprite.destroy();
                respawnEnemyBase();
            } else if (result === 'run') {
                player.x += 100;
            } else if (result === 'loss') {
                alert('All your creatures fainted. Healing up...');
                let safePos = window.getStrictSafeDryLandSpawn(currentEnemySprite);
                player.x = safePos.x;
                player.y = safePos.y;
            }
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

    // Day Night Cycle Update
    if (!lastDayNightUpdate) lastDayNightUpdate = this.time.now;
    let dt = this.time.now - lastDayNightUpdate;
    lastDayNightUpdate = this.time.now;

    // 24 hours = 20 real minutes = 1200 seconds = 1,200,000 ms
    // 1 in-game hour = 50,000 ms
    dayNightTime += (dt / 50000);
    if (dayNightTime >= 24.0) dayNightTime -= 24.0;

    let hours = Math.floor(dayNightTime);
    let minutes = Math.floor((dayNightTime % 1) * 60);
    let hStr = hours < 10 ? '0' + hours : hours.toString();
    let mStr = minutes < 10 ? '0' + minutes : minutes.toString();
    if (timeText) timeText.setText(hStr + ":" + mStr);

    // Calculate alpha
    let targetAlpha = 0;
    if (dayNightTime >= 6 && dayNightTime <= 18) {
        targetAlpha = 0;
    } else if (dayNightTime > 18 && dayNightTime < 20) {
        targetAlpha = ((dayNightTime - 18) / 2) * 0.5;
    } else if (dayNightTime >= 20 || dayNightTime <= 4) {
        targetAlpha = 0.5;
    } else if (dayNightTime > 4 && dayNightTime < 6) {
        targetAlpha = 0.5 - (((dayNightTime - 4) / 2) * 0.5);
    }
    if (dayNightOverlay) dayNightOverlay.setAlpha(targetAlpha);

    const frame = Math.floor(this.time.now / 150) % 12;
    bgGrass.setTexture('grass_' + frame);;

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
