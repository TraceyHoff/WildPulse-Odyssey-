import sys

with open("index.html", "r") as f:
    content = f.read()

search_str = """            if (item.name === "HP Booster") {
                statName = "health";
                boostAmount = 10;
                creature.bonusStats.health += boostAmount;
                const newMax = window.getEffectiveStat(creature, 'health');
                creature.currentHp = Math.min((creature.currentHp || 0) + boostAmount, newMax);
            } else if (item.name === "Attack Booster") {
                statName = "attack";
                creature.bonusStats.attack += boostAmount;
            } else if (item.name === "Defense Booster") {
                statName = "defense";
                creature.bonusStats.defense += boostAmount;
            } else if (item.name === "Speed Booster") {
                statName = "speed";
                creature.bonusStats.speed += boostAmount;
            } else if (item.name === "Sp. Atk Booster") {
                statName = "specialAttack";
                creature.bonusStats.specialAttack += boostAmount;
            } else if (item.name === "Sp. Def Booster") {
                statName = "specialDefense";
                creature.bonusStats.specialDefense += boostAmount;
            }"""

replace_str = """            let hpBoostMultiplier = 2; // HP gets double the base boost typically

            if (item.name.startsWith("Uncommon")) {
                boostAmount = 10;
            } else if (item.name.startsWith("Rare")) {
                boostAmount = 15;
            } else if (item.name.startsWith("Exquisite")) {
                boostAmount = 25;
            }

            if (item.name.includes("HP Booster")) {
                statName = "health";
                let hpBoost = item.name === "HP Booster" ? 10 : boostAmount * hpBoostMultiplier;
                creature.bonusStats.health += hpBoost;
                const newMax = window.getEffectiveStat(creature, 'health');
                creature.currentHp = Math.min((creature.currentHp || 0) + hpBoost, newMax);
            } else if (item.name.includes("Attack Booster")) {
                statName = "attack";
                creature.bonusStats.attack += boostAmount;
            } else if (item.name.includes("Defense Booster")) {
                statName = "defense";
                creature.bonusStats.defense += boostAmount;
            } else if (item.name.includes("Speed Booster")) {
                statName = "speed";
                creature.bonusStats.speed += boostAmount;
            } else if (item.name.includes("Sp. Atk Booster")) {
                statName = "specialAttack";
                creature.bonusStats.specialAttack += boostAmount;
            } else if (item.name.includes("Sp. Def Booster")) {
                statName = "specialDefense";
                creature.bonusStats.specialDefense += boostAmount;
            }"""

if search_str in content:
    print("Found! Replacing.")
else:
    print("Not found.")
