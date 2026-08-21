with open("index.html", "r") as f:
    content = f.read()

target_block = """    if (item.name === "Bundle of Wood") {"""

replacement_block = """    const baseName = window.getBaseItemName ? window.getBaseItemName(item.name) : item.name;
    const tier = window.getItemTier ? window.getItemTier(item.name) : 1;

    if (baseName === "Bundle of Wood") {"""

content = content.replace(target_block, replacement_block)


def replace_name_checks(text):
    text = text.replace('item.name === "Repellent"', 'baseName === "Repellent"')
    text = text.replace('item.name === "Pedometer"', 'baseName === "Pedometer"')
    text = text.replace('item.name === "Jank Juice"', 'baseName === "Jank Juice"')
    text = text.replace('item.name === "ExPALL"', 'baseName === "ExPALL"')
    text = text.replace('item.name === "NPC Dual Link"', 'baseName === "NPC Dual Link"')
    text = text.replace('item.name === "Wild Dual Signal"', 'baseName === "Wild Dual Signal"')
    text = text.replace('item.name === "Healing Juice Jug"', 'baseName === "Healing Juice Jug"')
    text = text.replace('item.name === "Healing Juice Bottle"', 'baseName === "Healing Juice Bottle"')
    text = text.replace('item.name.endsWith("Booster")', 'baseName.endsWith("Booster")')
    text = text.replace('item.name === "HP Booster"', 'baseName === "HP Booster"')
    text = text.replace('item.name === "Attack Booster"', 'baseName === "Attack Booster"')
    text = text.replace('item.name === "Defense Booster"', 'baseName === "Defense Booster"')
    text = text.replace('item.name === "Speed Booster"', 'baseName === "Speed Booster"')
    text = text.replace('item.name === "Sp. Atk Booster"', 'baseName === "Sp. Atk Booster"')
    text = text.replace('item.name === "Sp. Def Booster"', 'baseName === "Sp. Def Booster"')
    text = text.replace('item.name === "Creature Cookie"', 'baseName === "Creature Cookie"')
    text = text.replace('item.name === "Cyber-Core Upgrade"', 'baseName === "Cyber-Core Upgrade"')
    text = text.replace('item.name === "Nano-Nurture Serum"', 'baseName === "Nano-Nurture Serum"')
    text = text.replace('item.name === "DNA Stabilizer"', 'baseName === "DNA Stabilizer"')

    text = text.replace('+ 60000;', '+ (60000 * tier);')
    text = text.replace('prevented for 60 seconds.', 'prevented for ${60 * tier} seconds.')
    text = text.replace('doubled for 60 seconds.', 'doubled for ${60 * tier} seconds.')
    text = text.replace('+ 360000;', '+ (360000 * tier);')
    text = text.replace('for 6 minutes.', 'for ${6 * tier} minutes.')
    text = text.replace('+ 180000;', '+ (180000 * tier);')
    text = text.replace('for 180 seconds.', 'for ${180 * tier} seconds.')
    text = text.replace('+ 300000;', '+ (300000 * tier);')
    text = text.replace('for 5 minutes.', 'for ${5 * tier} minutes.')

    text = text.replace('let boostAmount = 5;', 'let boostAmount = 5 * tier;')
    text = text.replace('boostAmount = 10;', 'boostAmount = 10 * tier;')

    text = text.replace('window.adjustHappiness(creature, 6, playerNum);', 'window.adjustHappiness(creature, 6 * tier, playerNum);')
    text = text.replace('window.adjustHappiness(creature, 10, playerNum);', 'window.adjustHappiness(creature, 10 * tier, playerNum);')

    text = text.replace('creature.currentHp = Math.floor(0.5 * maxHp);', 'creature.currentHp = Math.floor(Math.min(1.0, 0.4 + (0.1 * tier)) * maxHp);')
    text = text.replace("'revived with 50% HP'", '`revived with ${Math.round(Math.min(100, 40 + (10 * tier)))}% HP`')

    text = text.replace('window.gainXp(creature, 150);', 'window.gainXp(creature, 150 * tier);')
    text = text.replace('gained 150 XP', 'gained ${150 * tier} XP')

    return text

content = replace_name_checks(content)

with open("index.html", "w") as f:
    f.write(content)
