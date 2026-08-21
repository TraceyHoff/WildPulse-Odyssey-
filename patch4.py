import sys

with open("index.html", "r") as f:
    content = f.read()

# Fix consumeItem logic
search_str4 = """            if (item.name === "HP Booster") {
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

replace_str4 = """            let hpBoostMultiplier = 2; // HP gets double the base boost typically

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

if search_str4 in content:
    print("Found consumeItem logic!")
    content = content.replace(search_str4, replace_str4)
else:
    print("consumeItem logic Not found.")

# Fix SVG icons for Booster tiers
search_str5 = """        case "HP Booster":"""
replace_str5 = """        case "HP Booster":
        case "Uncommon HP Booster":
        case "Rare HP Booster":
        case "Exquisite HP Booster":"""

if search_str5 in content:
    print("Found HP Booster SVG!")
    content = content.replace(search_str5, replace_str5)

search_str6 = """        case "Attack Booster":"""
replace_str6 = """        case "Attack Booster":
        case "Uncommon Attack Booster":
        case "Rare Attack Booster":
        case "Exquisite Attack Booster":"""

if search_str6 in content:
    print("Found Attack Booster SVG!")
    content = content.replace(search_str6, replace_str6)

search_str7 = """        case "Defense Booster":"""
replace_str7 = """        case "Defense Booster":
        case "Uncommon Defense Booster":
        case "Rare Defense Booster":
        case "Exquisite Defense Booster":"""

if search_str7 in content:
    print("Found Defense Booster SVG!")
    content = content.replace(search_str7, replace_str7)

search_str8 = """        case "Speed Booster":"""
replace_str8 = """        case "Speed Booster":
        case "Uncommon Speed Booster":
        case "Rare Speed Booster":
        case "Exquisite Speed Booster":"""

if search_str8 in content:
    print("Found Speed Booster SVG!")
    content = content.replace(search_str8, replace_str8)

search_str9 = """        case "Sp. Atk Booster":"""
replace_str9 = """        case "Sp. Atk Booster":
        case "Uncommon Sp. Atk Booster":
        case "Rare Sp. Atk Booster":
        case "Exquisite Sp. Atk Booster":"""

if search_str9 in content:
    print("Found Sp. Atk Booster SVG!")
    content = content.replace(search_str9, replace_str9)

search_str10 = """        case "Sp. Def Booster":"""
replace_str10 = """        case "Sp. Def Booster":
        case "Uncommon Sp. Def Booster":
        case "Rare Sp. Def Booster":
        case "Exquisite Sp. Def Booster":"""

if search_str10 in content:
    print("Found Sp. Def Booster SVG!")
    content = content.replace(search_str10, replace_str10)

with open("index.html", "w") as f:
    f.write(content)
