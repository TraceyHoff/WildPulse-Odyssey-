import sys

with open("index.html", "r") as f:
    content = f.read()

# Remove from updateStoreUI list (memory says they should strictly be procedural quest rewards, keeping them out of the standard store)
search_str = """        { name: "Sp. Def Booster", icon: "🧿", price: 240, desc: "Permanently raises creature's Sp. Def by 5." },
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
        { name: "Jank Juice", icon: "🧃", price: 270, desc: "Greatly increases wild shiny spawn rate for 6 minutes." },"""

replace_str = """        { name: "Sp. Def Booster", icon: "🧿", price: 240, desc: "Permanently raises creature's Sp. Def by 5." },
        { name: "Jank Juice", icon: "🧃", price: 270, desc: "Greatly increases wild shiny spawn rate for 6 minutes." },"""

if search_str in content:
    print("Found added store items! Removing to comply with memory constraints.")
    content = content.replace(search_str, replace_str)

with open("index.html", "w") as f:
    f.write(content)
