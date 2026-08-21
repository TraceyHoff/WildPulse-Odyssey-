import sys

with open("index.html", "r") as f:
    content = f.read()

search_str11 = """        "ExPALL": "✨",
        "Creature License": "🎫","""

replace_str11 = """        "ExPALL": "✨",
        "Creature License": "🎫",
        "Uncommon HP Booster": "💚",
        "Uncommon Attack Booster": "⚔️",
        "Uncommon Defense Booster": "🛡️",
        "Uncommon Speed Booster": "⚡",
        "Uncommon Sp. Atk Booster": "🔮",
        "Uncommon Sp. Def Booster": "🧿",
        "Rare HP Booster": "💚",
        "Rare Attack Booster": "⚔️",
        "Rare Defense Booster": "🛡️",
        "Rare Speed Booster": "⚡",
        "Rare Sp. Atk Booster": "🔮",
        "Rare Sp. Def Booster": "🧿",
        "Exquisite HP Booster": "💚",
        "Exquisite Attack Booster": "⚔️",
        "Exquisite Defense Booster": "🛡️",
        "Exquisite Speed Booster": "⚡",
        "Exquisite Sp. Atk Booster": "🔮",
        "Exquisite Sp. Def Booster": "🧿","""

if search_str11 in content:
    print("Found itemIcons!")
    content = content.replace(search_str11, replace_str11)
else:
    print("itemIcons Not found.")

with open("index.html", "w") as f:
    f.write(content)
