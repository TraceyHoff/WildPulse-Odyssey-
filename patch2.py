import sys

with open("index.html", "r") as f:
    content = f.read()

search_str = """    const itemsPool = ["Healing Juice Bottle", "Healing Juice Jug", "Stat Boosters", "Creature Cookie", "Repellent", "Jank Juice", "ExPALL", "Pedometer"];"""
replace_str = """    const itemsPool = ["Healing Juice Bottle", "Healing Juice Jug", "Stat Boosters", "Creature Cookie", "Repellent", "Jank Juice", "ExPALL", "Pedometer"];
    const uncommonStatBoosters = ["Uncommon HP Booster", "Uncommon Attack Booster", "Uncommon Defense Booster", "Uncommon Speed Booster", "Uncommon Sp. Atk Booster", "Uncommon Sp. Def Booster"];
    const rareStatBoosters = ["Rare HP Booster", "Rare Attack Booster", "Rare Defense Booster", "Rare Speed Booster", "Rare Sp. Atk Booster", "Rare Sp. Def Booster"];
    const exquisiteStatBoosters = ["Exquisite HP Booster", "Exquisite Attack Booster", "Exquisite Defense Booster", "Exquisite Speed Booster", "Exquisite Sp. Atk Booster", "Exquisite Sp. Def Booster"];
"""

if search_str in content:
    print("Found itemsPool!")
else:
    print("itemsPool Not found.")

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

if search_str2 in content:
    print("Found rewardItem generation logic!")
else:
    print("rewardItem generation logic Not found.")
