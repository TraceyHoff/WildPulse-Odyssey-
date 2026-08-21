with open("index.html", "r") as f:
    content = f.read()

target = """    const itemsPool = ["Healing Juice Bottle", "Healing Juice Jug", "Stat Boosters", "Creature Cookie", "Repellent", "Jank Juice", "ExPALL", "Pedometer"];
    if (pLevel >= 10 && Math.random() < 0.15) {
        rewardItem = window.furniturePool[Math.floor(Math.random() * window.furniturePool.length)];
    } else if (Math.random() < 0.35) {
        rewardItem = itemsPool[Math.floor(Math.random() * itemsPool.length)];
    }"""

replacement = """    const itemsPool = ["Healing Juice Bottle", "Healing Juice Jug", "Stat Boosters", "Creature Cookie", "Repellent", "Jank Juice", "ExPALL", "Pedometer"];
    if (pLevel >= 10 && Math.random() < 0.15) {
        rewardItem = window.furniturePool[Math.floor(Math.random() * window.furniturePool.length)];
    } else if (Math.random() < 0.35) {
        let baseRewardItem = itemsPool[Math.floor(Math.random() * itemsPool.length)];
        let rewardTier = 1;
        if (Math.random() < 0.5) { // 50% chance to be tiered
            rewardTier = Math.floor(Math.random() * 4) + 2; // Tiers 2 to 5
        }
        rewardItem = rewardTier > 1 ? `${baseRewardItem} (Tier ${rewardTier})` : baseRewardItem;
    }"""

if target in content:
    content = content.replace(target, replacement)
    print("Patch successful!")
else:
    print("Target block not found in file!")

with open("index.html", "w") as f:
    f.write(content)
