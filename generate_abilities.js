const fs = require('fs');

const types = ["Fire", "Water", "Nature", "Electric", "Ice", "Earth", "Rock", "Wind", "Light", "Dark", "Cosmic", "Normal"];

const typeColors = {
    "Fire": "#ff5722",
    "Water": "#2196f3",
    "Nature": "#4caf50",
    "Electric": "#ffeb3b",
    "Ice": "#00bcd4",
    "Earth": "#795548",
    "Rock": "#9e9e9e",
    "Wind": "#81d4fa",
    "Light": "#fff59d",
    "Dark": "#616161",
    "Cosmic": "#ab47bc",
    "Normal": "#9e9e9e"
};

const abilities = {};

types.forEach(type => {
    let t = type;
    let c = typeColors[type];
    abilities[type] = [
        {
            name: `${t} Strike`,
            chance: 0.15,
            type: "direct_damage",
            value: 0.1,
            message: `unleashed a ${t} Strike, dealing extra damage!`,
            color: c
        },
        {
            name: `${t} Surge`,
            chance: 0.15,
            type: "raise_stat",
            stat: "attack", // Could be random or fixed, let's fix to attack for simplicity
            value: 0.15,
            message: `channeled a ${t} Surge, raising its attack!`,
            color: c
        },
        {
            name: `${t} Recovery`,
            chance: 0.15,
            type: "heal",
            value: 0.1,
            message: `used ${t} Recovery, restoring HP!`,
            color: c
        },
        {
            name: `${t} Blind`,
            chance: 0.15,
            type: "lower_enemy_accuracy",
            value: 0.1,
            message: `used ${t} Blind, lowering the enemy's accuracy!`,
            color: c
        },
        {
            name: `${t} Focus`,
            chance: 0.15,
            type: "raise_accuracy",
            value: 0.1,
            message: `used ${t} Focus, increasing its own accuracy!`,
            color: c
        },
        {
            name: `${t} Charm`,
            chance: 1.0, // Always active when catching
            type: "capture_boost",
            value: 1.2,
            message: `exudes a ${t} Charm, making the wild creature easier to catch!`,
            color: c
        }
    ];
});

fs.writeFileSync('new_abilities.json', JSON.stringify(abilities, null, 2));
