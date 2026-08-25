const fs = require('fs');

const abilitiesPatch = `
window.abilities = {
    "Fire": [
        {name: "Fire Strike", chance: 0.15, type: "direct_damage", value: 0.1, message: "unleashed a Fire Strike, dealing extra damage!", color: "#ff5722"},
        {name: "Inferno Charge", chance: 0.15, type: "charge_attack", value: 0.8, turns: 1, message: "is gathering intense heat for an Inferno Charge!", color: "#ff5722"},
        {name: "Flame Wall", chance: 0.15, type: "shield", value: 0.5, turns: 2, message: "summoned a Flame Wall, absorbing damage!", color: "#ff5722"},
        {name: "Scorch", chance: 0.15, type: "status_inflict", value: "Burn", message: "inflicted Burn with a Scorching aura!", color: "#ff5722"},
        {name: "Fire Burst", chance: 0.15, type: "direct_damage", value: 0.25, message: "unleashed Fire Blast, incinerating the foe!", color: "#ff5722"}
    ],
    "Water": [
        {name: "Water Strike", chance: 0.15, type: "direct_damage", value: 0.1, message: "unleashed a Water Strike, dealing extra damage!", color: "#2196f3"},
        {name: "Tsunami Gather", chance: 0.15, type: "charge_attack", value: 0.8, turns: 1, message: "is drawing water for a Tsunami!", color: "#2196f3"},
        {name: "Aqua Shield", chance: 0.15, type: "shield", value: 0.5, turns: 2, message: "formed an Aqua Shield, deflecting attacks!", color: "#2196f3"},
        {name: "Toxic Splash", chance: 0.15, type: "status_inflict", value: "Poison", message: "splashed toxic water, poisoning the foe!", color: "#2196f3"},
        {name: "Hydro Pump", chance: 0.15, type: "direct_damage", value: 0.25, message: "blasted Hydro Pump!", color: "#2196f3"}
    ],
    "Nature": [
        {name: "Nature Strike", chance: 0.15, type: "direct_damage", value: 0.1, message: "unleashed a Nature Strike, dealing extra damage!", color: "#4caf50"},
        {name: "Solar Gather", chance: 0.15, type: "charge_attack", value: 0.8, turns: 1, message: "is absorbing sunlight for a Solar Beam!", color: "#4caf50"},
        {name: "Bark Armor", chance: 0.15, type: "shield", value: 0.5, turns: 2, message: "grew Bark Armor to absorb damage!", color: "#4caf50"},
        {name: "Poison Spores", chance: 0.15, type: "status_inflict", value: "Poison", message: "released Poison Spores!", color: "#4caf50"},
        {name: "Vine Smash", chance: 0.15, type: "direct_damage", value: 0.25, message: "smashed with heavy Vines!", color: "#4caf50"}
    ],
    "Electric": [
        {name: "Electric Strike", chance: 0.15, type: "direct_damage", value: 0.1, message: "unleashed a Electric Strike, dealing extra damage!", color: "#ffeb3b"},
        {name: "Supercharge", chance: 0.15, type: "charge_attack", value: 0.8, turns: 1, message: "is storing electricity for a Supercharge!", color: "#ffeb3b"},
        {name: "Plasma Grid", chance: 0.15, type: "shield", value: 0.5, turns: 2, message: "projected a Plasma Grid to absorb damage!", color: "#ffeb3b"},
        {name: "Stun Spark", chance: 0.15, type: "status_inflict", value: "Paralyze", message: "emitted a Stun Spark, paralyzing the enemy!", color: "#ffeb3b"},
        {name: "Thunder Strike", chance: 0.15, type: "direct_damage", value: 0.25, message: "called down a Thunder Strike!", color: "#ffeb3b"}
    ],
    "Ice": [
        {name: "Ice Strike", chance: 0.15, type: "direct_damage", value: 0.1, message: "unleashed a Ice Strike, dealing extra damage!", color: "#00bcd4"},
        {name: "Glacier Form", chance: 0.15, type: "charge_attack", value: 0.8, turns: 1, message: "is forming a massive Glacier!", color: "#00bcd4"},
        {name: "Ice Barrier", chance: 0.15, type: "shield", value: 0.5, turns: 2, message: "summoned an Ice Barrier to absorb damage!", color: "#00bcd4"},
        {name: "Deep Freeze", chance: 0.15, type: "status_inflict", value: "Freeze", message: "unleashed a Deep Freeze!", color: "#00bcd4"},
        {name: "Blizzard", chance: 0.15, type: "direct_damage", value: 0.25, message: "summoned a vicious Blizzard!", color: "#00bcd4"}
    ],
    "Earth": [
        {name: "Earth Strike", chance: 0.15, type: "direct_damage", value: 0.1, message: "unleashed a Earth Strike, dealing extra damage!", color: "#795548"},
        {name: "Quake Gather", chance: 0.15, type: "charge_attack", value: 0.8, turns: 1, message: "is causing tectonic tremors to gather power!", color: "#795548"},
        {name: "Earthen Wall", chance: 0.15, type: "shield", value: 0.5, turns: 2, message: "raised an Earthen Wall to absorb attacks!", color: "#795548"},
        {name: "Dust Choke", chance: 0.15, type: "status_inflict", value: "Poison", message: "choked the air with Dust, inflicting Poison!", color: "#795548"},
        {name: "Fissure", chance: 0.15, type: "direct_damage", value: 0.25, message: "opened a Fissure beneath the enemy!", color: "#795548"}
    ],
    "Rock": [
        {name: "Rock Strike", chance: 0.15, type: "direct_damage", value: 0.1, message: "unleashed a Rock Strike, dealing extra damage!", color: "#9e9e9e"},
        {name: "Boulder Heave", chance: 0.15, type: "charge_attack", value: 0.8, turns: 1, message: "is preparing to heave a massive Boulder!", color: "#9e9e9e"},
        {name: "Stone Shield", chance: 0.15, type: "shield", value: 0.5, turns: 2, message: "formed a Stone Shield for protection!", color: "#9e9e9e"},
        {name: "Jagged Edge", chance: 0.15, type: "status_inflict", value: "Burn", message: "caused severe friction with a Jagged Edge!", color: "#9e9e9e"},
        {name: "Rock Slide", chance: 0.15, type: "direct_damage", value: 0.25, message: "brought down a Rock Slide!", color: "#9e9e9e"}
    ],
    "Normal": [
        {name: "Tackle", chance: 0.15, type: "direct_damage", value: 0.1, message: "used Tackle, dealing extra damage!", color: "#fff"},
        {name: "Power Up", chance: 0.15, type: "charge_attack", value: 0.8, turns: 1, message: "is Powering Up for a massive strike!", color: "#fff"},
        {name: "Protect", chance: 0.15, type: "shield", value: 0.5, turns: 2, message: "used Protect to absorb damage!", color: "#fff"},
        {name: "Yawn", chance: 0.15, type: "status_inflict", value: "Sleep", message: "let out a big Yawn, making the enemy sleepy!", color: "#fff"},
        {name: "Slam", chance: 0.15, type: "direct_damage", value: 0.25, message: "slammed into the opponent!", color: "#fff"}
    ]
};
`
