import sys

with open("index.html", "r") as f:
    content = f.read()

search_str12 = """    const items = [
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
        { name: "Creature License", icon: "🎫", price: 295, desc: "Boosts wild capture success rate. Consumed only on success." }
    ];"""

replace_str12 = """    const items = [
        { name: "Repellent", icon: "🧴", price: 170, desc: "Stops wild creature attacks for 60 seconds." },
        { name: "HP Booster", icon: "💚", price: 270, desc: "Permanently raises creature's HP by 10." },
        { name: "Attack Booster", icon: "⚔️", price: 240, desc: "Permanently raises creature's Attack by 5." },
        { name: "Defense Booster", icon: "🛡️", price: 240, desc: "Permanently raises creature's Defense by 5." },
        { name: "Speed Booster", icon: "⚡", price: 240, desc: "Permanently raises creature's Speed by 5." },
        { name: "Sp. Atk Booster", icon: "🔮", price: 240, desc: "Permanently raises creature's Sp. Atk by 5." },
        { name: "Sp. Def Booster", icon: "🧿", price: 240, desc: "Permanently raises creature's Sp. Def by 5." },
        { name: "Uncommon HP Booster", icon: "💚", price: 400, desc: "Permanently raises creature's HP by 20." },
        { name: "Uncommon Attack Booster", icon: "⚔️", price: 350, desc: "Permanently raises creature's Attack by 10." },
        { name: "Uncommon Defense Booster", icon: "🛡️", price: 350, desc: "Permanently raises creature's Defense by 10." },
        { name: "Uncommon Speed Booster", icon: "⚡", price: 350, desc: "Permanently raises creature's Speed by 10." },
        { name: "Uncommon Sp. Atk Booster", icon: "🔮", price: 350, desc: "Permanently raises creature's Sp. Atk by 10." },
        { name: "Uncommon Sp. Def Booster", icon: "🧿", price: 350, desc: "Permanently raises creature's Sp. Def by 10." },
        { name: "Rare HP Booster", icon: "💚", price: 600, desc: "Permanently raises creature's HP by 30." },
        { name: "Rare Attack Booster", icon: "⚔️", price: 550, desc: "Permanently raises creature's Attack by 15." },
        { name: "Rare Defense Booster", icon: "🛡️", price: 550, desc: "Permanently raises creature's Defense by 15." },
        { name: "Rare Speed Booster", icon: "⚡", price: 550, desc: "Permanently raises creature's Speed by 15." },
        { name: "Rare Sp. Atk Booster", icon: "🔮", price: 550, desc: "Permanently raises creature's Sp. Atk by 15." },
        { name: "Rare Sp. Def Booster", icon: "🧿", price: 550, desc: "Permanently raises creature's Sp. Def by 15." },
        { name: "Exquisite HP Booster", icon: "💚", price: 1000, desc: "Permanently raises creature's HP by 50." },
        { name: "Exquisite Attack Booster", icon: "⚔️", price: 900, desc: "Permanently raises creature's Attack by 25." },
        { name: "Exquisite Defense Booster", icon: "🛡️", price: 900, desc: "Permanently raises creature's Defense by 25." },
        { name: "Exquisite Speed Booster", icon: "⚡", price: 900, desc: "Permanently raises creature's Speed by 25." },
        { name: "Exquisite Sp. Atk Booster", icon: "🔮", price: 900, desc: "Permanently raises creature's Sp. Atk by 25." },
        { name: "Exquisite Sp. Def Booster", icon: "🧿", price: 900, desc: "Permanently raises creature's Sp. Def by 25." },
        { name: "Jank Juice", icon: "🧃", price: 270, desc: "Greatly increases wild shiny spawn rate for 6 minutes." },
        { name: "Healing Juice Bottle", icon: "🧪", price: 160, desc: "Heals one creature or revives with 50% HP." },
        { name: "Healing Juice Jug", icon: "🏺", price: 240, desc: "Fully heals and revives all active party creatures." },
        { name: "ExPALL", icon: "✨", price: 370, desc: "Allows whole party to receive battle experience for 180s." },
        { name: "Creature License", icon: "🎫", price: 295, desc: "Boosts wild capture success rate. Consumed only on success." }
    ];"""

if search_str12 in content:
    print("Found updateStoreUI items array!")
    content = content.replace(search_str12, replace_str12)
else:
    print("updateStoreUI items array Not found.")

with open("index.html", "w") as f:
    f.write(content)
