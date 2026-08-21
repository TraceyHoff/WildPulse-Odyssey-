import sys

with open("index.html", "r") as f:
    content = f.read()

search_str = """    const itemsPool = ["Healing Juice Bottle", "Healing Juice Jug", "Stat Boosters", "Creature Cookie", "Repellent", "Jank Juice", "ExPALL", "Pedometer"];"""
replace_str = """    const itemsPool = ["Healing Juice Bottle", "Healing Juice Jug", "Stat Boosters", "Creature Cookie", "Repellent", "Jank Juice", "ExPALL", "Pedometer"];"""

search_str2 = """    if (pLevel >= 10 && Math.random() < 0.15) {
        rewardItem = window.furniturePool[Math.floor(Math.random() * window.furniturePool.length)];
    } else if (Math.random() < 0.35) {
        rewardItem = itemsPool[Math.floor(Math.random() * itemsPool.length)];
    }"""
replace_str2 = """    if (pLevel >= 10 && Math.random() < 0.15) {
        rewardItem = window.furniturePool[Math.floor(Math.random() * window.furniturePool.length)];
    } else if (Math.random() < 0.35) {
        rewardItem = itemsPool[Math.floor(Math.random() * itemsPool.length)];
        if (rewardItem === "Stat Boosters") {
            const tiers = [
                { items: ["HP Booster", "Attack Booster", "Defense Booster", "Speed Booster", "Sp. Atk Booster", "Sp. Def Booster"], weight: 50 },
                { items: ["Uncommon HP Booster", "Uncommon Attack Booster", "Uncommon Defense Booster", "Uncommon Speed Booster", "Uncommon Sp. Atk Booster", "Uncommon Sp. Def Booster"], weight: 30 },
                { items: ["Rare HP Booster", "Rare Attack Booster", "Rare Defense Booster", "Rare Speed Booster", "Rare Sp. Atk Booster", "Rare Sp. Def Booster"], weight: 15 },
                { items: ["Exquisite HP Booster", "Exquisite Attack Booster", "Exquisite Defense Booster", "Exquisite Speed Booster", "Exquisite Sp. Atk Booster", "Exquisite Sp. Def Booster"], weight: 5 }
            ];
            const rand = Math.random() * 100;
            let currentWeight = 0;
            for (const tier of tiers) {
                currentWeight += tier.weight;
                if (rand < currentWeight) {
                    rewardItem = tier.items[Math.floor(Math.random() * tier.items.length)];
                    break;
                }
            }
        }
    }"""

search_str3 = """    // Choose theme colors based on item type
    if (itemName.includes("Booster")) {
        if (itemName.startsWith("HP")) glowColor = '#00ff66';
        else if (itemName.startsWith("Attack")) glowColor = '#ff3366';
        else if (itemName.startsWith("Defense")) glowColor = '#0066ff';
        else if (itemName.startsWith("Speed")) glowColor = '#ffd700';
        else if (itemName.startsWith("Sp. Atk")) glowColor = '#ff00ff';
        else if (itemName.startsWith("Sp. Def")) glowColor = '#00ffff';
    }"""
replace_str3 = """    // Choose theme colors based on item type
    if (itemName.includes("Booster")) {
        if (itemName.includes("HP")) glowColor = '#00ff66';
        else if (itemName.includes("Attack")) glowColor = '#ff3366';
        else if (itemName.includes("Defense")) glowColor = '#0066ff';
        else if (itemName.includes("Speed")) glowColor = '#ffd700';
        else if (itemName.includes("Sp. Atk")) glowColor = '#ff00ff';
        else if (itemName.includes("Sp. Def")) glowColor = '#00ffff';

        if (itemName.startsWith("Uncommon")) {
            strokeColor = '#00ccff'; // Cyan for Uncommon
            baseColor = '#0f1f3f';
        } else if (itemName.startsWith("Rare")) {
            strokeColor = '#ff00ff'; // Magenta for Rare
            baseColor = '#2a0a2a';
        } else if (itemName.startsWith("Exquisite")) {
            strokeColor = '#ffcc00'; // Gold for Exquisite
            baseColor = '#3a2a00';
        }
    }"""

if search_str3 in content:
    print("Found getItemIconHTML Booster coloring logic!")
else:
    print("getItemIconHTML Booster coloring logic Not found.")

content = content.replace(search_str2, replace_str2)
content = content.replace(search_str3, replace_str3)

with open("index.html", "w") as f:
    f.write(content)
