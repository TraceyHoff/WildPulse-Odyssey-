import sys

with open("index.html", "r") as f:
    content = f.read()

search_str = """            const sellPrice = Math.floor(item.price * 0.55);
            const canSell = ownedCount > 0;"""

replace_str = """            let sellPrice = item.price ? Math.floor(item.price * 0.55) : 50;
            if (!item.price) {
                if (item.name.startsWith("Uncommon")) sellPrice = 150;
                else if (item.name.startsWith("Rare")) sellPrice = 300;
                else if (item.name.startsWith("Exquisite")) sellPrice = 500;
            }
            const canSell = ownedCount > 0;"""

if search_str in content:
    print("Found sellPrice logic!")
    content = content.replace(search_str, replace_str)
else:
    print("sellPrice logic Not found.")

search_str2 = """window.calculateCreatureSellPrice = function(c) {"""
replace_str2 = """window.getItemSellPrice = function(itemName) {
    const items = [
        { name: "Repellent", icon: "🧴", price: 170, desc: "Stops wild creature attacks for 60 seconds." },
        { name: "HP Booster", icon: "💚", price: 270, desc: "Permanently raises creature's HP by 10." },
        { name: "Attack Booster", icon: "⚔️", price: 240, desc: "Permanently raises creature's Attack by 5." },
        { name: "Defense Booster", icon: "🛡️", price: 240, desc: "Permanently raises creature's Defense by 5." },
        { name: "Speed Booster", icon: "⚡", price: 240, desc: "Permanently raises creature's Speed by 5." },
        { name: "Sp. Atk Booster", icon: "🔮", price: 240, desc: "Permanently raises creature's Sp. Atk by 5." },
        { name: "Sp. Def Booster", icon: "🧿", price: 240, desc: "Permanently raises creature's Sp. Def by 5." },
        { name: "Jank Juice", icon: "🧃", price: 270, desc: "Greatly increases wild shiny spawn rate for 6 minutes." },
        { name: "Healing Juice Bottle", icon: "🧪", price: 160, desc: "Heals one creature or revives with 50% HP." },
        { name: "Healing Juice Jug", icon: "🏺", price: 240, desc: "Fully heals and revives all active party creatures." },
        { name: "ExPALL", icon: "✨", price: 370, desc: "Allows whole party to receive battle experience for 180s." },
        { name: "Creature License", icon: "🎫", price: 295, desc: "Boosts wild capture success rate. Consumed only on success." },
        { name: "Creature Cookie", icon: "🍪", price: 150, desc: "Adds a small amount of happiness when used on a creature. (5 min cooldown)" },
        { name: "Pedometer", icon: "👣", price: 220, desc: "Gains double egg hatching progress when moving for 60 seconds." },
        { name: "Cyber-Core Upgrade", icon: "🔘", price: 320, desc: "A core upgrade chip that instantly grants 150 XP to one selected creature." },
        { name: "Nano-Nurture Serum", icon: "💉", price: 450, desc: "Advanced neon serum that completely restores happiness (100 pts) of one selected creature." },
        { name: "DNA Stabilizer", icon: "🧬", price: 420, desc: "Quantum stabilizer that instantly hatches a selected egg in your party." },
        { name: "Bundle of Wood", icon: "🪵", price: 120, desc: "A bundle of sturdy wood used for crafting home base foundations and walls." },
        { name: "Bundle of Stone", icon: "🪨", price: 180, desc: "A bundle of solid stone blocks for advanced base building." },
        { name: "Bundle of Metal", icon: "🔩", price: 250, desc: "A bundle of high-grade metal for constructing durable sci-fi base elements." },
        { name: "Holo-Wall Blueprint", icon: "🖲️", price: 350, desc: "A blueprint to project a high-tech holographic wall for your home base." },
        { name: "Solar Panel", icon: "🔋", price: 500, desc: "A solar panel that provides passive energy generation for home bases." },
        { name: "Storage Chest", icon: "🧳", price: 150, desc: "A secure chest to store items within your home base." },
        { name: "Wild Dual Signal", icon: "📶", price: 250, desc: "Guarantees encountering wild dual battles for 5 minutes." },
        { name: "NPC Dual Link", icon: "📡", price: 250, desc: "Guarantees encountering cooperative 2v2 NPC trainer battles for 5 minutes." }
    ];
    let price = 50;
    const item = items.find(i => i.name === itemName);
    if (item && item.price) {
        price = Math.floor(item.price * 0.55);
    } else {
        if (itemName.startsWith("Uncommon")) price = 150;
        else if (itemName.startsWith("Rare")) price = 300;
        else if (itemName.startsWith("Exquisite")) price = 500;
    }
    return price;
};

window.calculateCreatureSellPrice = function(c) {"""

if search_str2 in content:
    print("Found calculateCreatureSellPrice!")
    content = content.replace(search_str2, replace_str2)
else:
    print("calculateCreatureSellPrice logic Not found.")


with open("index.html", "w") as f:
    f.write(content)
