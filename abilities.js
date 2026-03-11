window.abilities = {
    "Fire": [
        {name: "Blaze", chance: 0.25, type: "damage", value: 1.2, message: "Blaze flared up, increasing damage!", color: "#ff5722"},
        {name: "Flame Body", chance: 0.25, type: "status_enemy", value: "Burn", message: "Flame Body inflicted a Burn!", color: "#ff5722"},
        {name: "Flash Fire", chance: 0.20, type: "heal", value: 0.1, message: "Flash Fire absorbed heat, restoring HP!", color: "#ff5722"},
        {name: "Magma Armor", chance: 0.25, type: "defense", value: 0.8, message: "Magma Armor hardened, reducing damage!", color: "#ff5722"},
        {name: "White Smoke", chance: 0.20, type: "clear_status", value: null, message: "White Smoke cleared all status conditions!", color: "#ff5722"},
        {name: "Drought", chance: 0.25, type: "damage", value: 1.3, message: "Drought intensified the heat, dealing extra damage!", color: "#ff5722"}
    ],
    "Water": [
        {name: "Torrent", chance: 0.25, type: "damage", value: 1.2, message: "Torrent surged, increasing damage!", color: "#2196f3"},
        {name: "Water Veil", chance: 0.20, type: "clear_status", value: null, message: "Water Veil washed away status conditions!", color: "#2196f3"},
        {name: "Rain Dish", chance: 0.25, type: "heal", value: 0.1, message: "Rain Dish collected water, restoring HP!", color: "#2196f3"},
        {name: "Swift Swim", chance: 0.25, type: "speed", value: 1.2, message: "Swift Swim increased speed!", color: "#2196f3"},
        {name: "Hydration", chance: 0.20, type: "heal", value: 0.15, message: "Hydration revitalized, restoring HP!", color: "#2196f3"},
        {name: "Drizzle", chance: 0.25, type: "damage", value: 1.3, message: "Drizzle summoned a downpour, dealing extra damage!", color: "#2196f3"}
    ],
    "Nature": [
        {name: "Overgrow", chance: 0.25, type: "damage", value: 1.2, message: "Overgrow unleashed nature's fury, increasing damage!", color: "#4caf50"},
        {name: "Effect Spore", chance: 0.25, type: "status_enemy", value: "Poison", message: "Effect Spore scattered poisonous dust!", color: "#4caf50"},
        {name: "Chlorophyll", chance: 0.25, type: "speed", value: 1.2, message: "Chlorophyll absorbed sunlight, increasing speed!", color: "#4caf50"},
        {name: "Leaf Guard", chance: 0.20, type: "defense", value: 0.8, message: "Leaf Guard shielded against damage!", color: "#4caf50"},
        {name: "Sap Sipper", chance: 0.25, type: "heal", value: 0.1, message: "Sap Sipper drained energy, restoring HP!", color: "#4caf50"},
        {name: "Grassy Surge", chance: 0.25, type: "heal", value: 0.15, message: "Grassy Surge enriched the terrain, restoring HP!", color: "#4caf50"}
    ],
    "Electric": [
        {name: "Static", chance: 0.25, type: "status_enemy", value: "Paralyze", message: "Static paralyzed the opponent!", color: "#ffeb3b"},
        {name: "Volt Absorb", chance: 0.20, type: "heal", value: 0.1, message: "Volt Absorb consumed electricity, restoring HP!", color: "#ffeb3b"},
        {name: "Motor Drive", chance: 0.25, type: "speed", value: 1.3, message: "Motor Drive revved up, boosting speed!", color: "#ffeb3b"},
        {name: "Lightning Rod", chance: 0.25, type: "damage", value: 1.2, message: "Lightning Rod channeled power, increasing damage!", color: "#ffeb3b"},
        {name: "Galvanize", chance: 0.20, type: "damage", value: 1.3, message: "Galvanize electrified the attack, dealing extra damage!", color: "#ffeb3b"},
        {name: "Electric Surge", chance: 0.25, type: "status_enemy", value: "Paralyze", message: "Electric Surge shocked the battlefield!", color: "#ffeb3b"}
    ],
    "Ice": [
        {name: "Snow Cloak", chance: 0.25, type: "defense", value: 0.8, message: "Snow Cloak obscured vision, reducing damage!", color: "#00bcd4"},
        {name: "Ice Body", chance: 0.20, type: "heal", value: 0.1, message: "Ice Body gathered frost, restoring HP!", color: "#00bcd4"},
        {name: "Slush Rush", chance: 0.25, type: "speed", value: 1.2, message: "Slush Rush slid quickly, increasing speed!", color: "#00bcd4"},
        {name: "Refrigerate", chance: 0.25, type: "damage", value: 1.2, message: "Refrigerate chilled the attack, increasing damage!", color: "#00bcd4"},
        {name: "Snow Warning", chance: 0.20, type: "status_enemy", value: "Freeze", message: "Snow Warning dropped the temperature, freezing the opponent!", color: "#00bcd4"},
        {name: "Frostbite", chance: 0.25, type: "damage", value: 1.3, message: "Frostbite bit deeply, dealing extra damage!", color: "#00bcd4"}
    ],
    "Earth": [
        {name: "Sand Veil", chance: 0.25, type: "defense", value: 0.8, message: "Sand Veil kicked up dust, reducing damage!", color: "#795548"},
        {name: "Sturdy", chance: 0.20, type: "defense", value: 0.7, message: "Sturdy braced for impact, reducing damage!", color: "#795548"},
        {name: "Sand Force", chance: 0.25, type: "damage", value: 1.2, message: "Sand Force channeled grit, increasing damage!", color: "#795548"},
        {name: "Rock Head", chance: 0.25, type: "defense", value: 0.85, message: "Rock Head deflected the blow!", color: "#795548"},
        {name: "Solid Rock", chance: 0.20, type: "defense", value: 0.75, message: "Solid Rock withstood the attack!", color: "#795548"},
        {name: "Earth Eater", chance: 0.25, type: "heal", value: 0.1, message: "Earth Eater consumed soil, restoring HP!", color: "#795548"}
    ],
    "Rock": [
        {name: "Clear Body", chance: 0.25, type: "defense", value: 0.8, message: "Clear Body deflected the attack, reducing damage!", color: "#9e9e9e"},
        {name: "Rough Skin", chance: 0.25, type: "damage_recoil", value: 0.1, message: "Rough Skin scraped the attacker!", color: "#9e9e9e"},
        {name: "Guts", chance: 0.20, type: "damage", value: 1.3, message: "Guts powered through, increasing damage!", color: "#9e9e9e"},
        {name: "Intimidate", chance: 0.25, type: "defense", value: 0.8, message: "Intimidate weakened the opponent's resolve!", color: "#9e9e9e"},
        {name: "Rock Armor", chance: 0.25, type: "defense", value: 0.7, message: "Rock Armor absorbed the blow!", color: "#9e9e9e"},
        {name: "Stone Edge", chance: 0.20, type: "damage", value: 1.4, message: "Stone Edge struck true, dealing massive damage!", color: "#9e9e9e"}
    ],
    "Wind": [
        {name: "Aerilate", chance: 0.25, type: "damage", value: 1.2, message: "Aerilate caught the wind, increasing damage!", color: "#81d4fa"},
        {name: "Gale Wings", chance: 0.20, type: "speed", value: 1.3, message: "Gale Wings rode the updraft, boosting speed!", color: "#81d4fa"},
        {name: "Cloud Nine", chance: 0.25, type: "clear_status", value: null, message: "Cloud Nine blew away status conditions!", color: "#81d4fa"},
        {name: "Wind Rider", chance: 0.25, type: "speed", value: 1.2, message: "Wind Rider surfed the breeze, increasing speed!", color: "#81d4fa"},
        {name: "Tailwind", chance: 0.20, type: "speed", value: 1.4, message: "Tailwind provided a burst of speed!", color: "#81d4fa"},
        {name: "Hurricane", chance: 0.25, type: "status_enemy", value: "Confusion", message: "Hurricane disoriented the opponent!", color: "#81d4fa"}
    ],
    "Light": [
        {name: "Illuminate", chance: 0.25, type: "status_enemy", value: "Confusion", message: "Illuminate blinded the opponent!", color: "#fff59d"},
        {name: "Solar Power", chance: 0.20, type: "damage", value: 1.3, message: "Solar Power harnessed the sun, increasing damage!", color: "#fff59d"},
        {name: "Serene Grace", chance: 0.25, type: "heal", value: 0.1, message: "Serene Grace shone brightly, restoring HP!", color: "#fff59d"},
        {name: "Dazzling", chance: 0.25, type: "defense", value: 0.8, message: "Dazzling distracted the attacker, reducing damage!", color: "#fff59d"},
        {name: "Prism Armor", chance: 0.20, type: "defense", value: 0.75, message: "Prism Armor scattered the attack!", color: "#fff59d"},
        {name: "Luster Purge", chance: 0.25, type: "damage", value: 1.2, message: "Luster Purge blasted light, dealing extra damage!", color: "#fff59d"}
    ],
    "Dark": [
        {name: "Dark Aura", chance: 0.25, type: "damage", value: 1.2, message: "Dark Aura consumed the light, increasing damage!", color: "#616161"},
        {name: "Super Luck", chance: 0.20, type: "damage", value: 1.4, message: "Super Luck struck a vital point!", color: "#616161"},
        {name: "Pressure", chance: 0.25, type: "status_enemy", value: "Confusion", message: "Pressure overwhelmed the opponent!", color: "#616161"},
        {name: "Unnerve", chance: 0.25, type: "defense", value: 0.8, message: "Unnerve frightened the attacker, reducing damage!", color: "#616161"},
        {name: "Shadow Shield", chance: 0.20, type: "defense", value: 0.7, message: "Shadow Shield blocked the attack!", color: "#616161"},
        {name: "Nightmare", chance: 0.25, type: "status_enemy", value: "Sleep", message: "Nightmare induced a terrifying sleep!", color: "#616161"}
    ],
    "Cosmic": [
        {name: "Levitate", chance: 0.25, type: "defense", value: 0.8, message: "Levitate floated above danger, reducing damage!", color: "#ab47bc"},
        {name: "Magic Guard", chance: 0.20, type: "clear_status", value: null, message: "Magic Guard dispelled status conditions!", color: "#ab47bc"},
        {name: "Telepathy", chance: 0.25, type: "status_enemy", value: "Confusion", message: "Telepathy invaded the opponent's mind!", color: "#ab47bc"},
        {name: "Meteor Strike", chance: 0.25, type: "damage", value: 1.3, message: "Meteor Strike crashed down, increasing damage!", color: "#ab47bc"},
        {name: "Cosmic Power", chance: 0.20, type: "defense", value: 0.7, message: "Cosmic Power bolstered defenses!", color: "#ab47bc"},
        {name: "Stardust", chance: 0.25, type: "heal", value: 0.15, message: "Stardust shimmered, restoring HP!", color: "#ab47bc"}
    ],
    "Normal": [
        {name: "Adaptability", chance: 0.25, type: "damage", value: 1.2, message: "Adaptability shifted form, increasing damage!", color: "#9e9e9e"},
        {name: "Scrappy", chance: 0.20, type: "damage", value: 1.3, message: "Scrappy pushed through defenses!", color: "#9e9e9e"},
        {name: "Keen Eye", chance: 0.25, type: "defense", value: 0.8, message: "Keen Eye saw the attack coming, reducing damage!", color: "#9e9e9e"},
        {name: "Inner Focus", chance: 0.25, type: "clear_status", value: null, message: "Inner Focus prevented distraction, clearing status!", color: "#9e9e9e"},
        {name: "Early Bird", chance: 0.20, type: "speed", value: 1.3, message: "Early Bird reacted instantly, boosting speed!", color: "#9e9e9e"},
        {name: "Thick Fat", chance: 0.25, type: "defense", value: 0.75, message: "Thick Fat cushioned the blow!", color: "#9e9e9e"}
    ]
};
