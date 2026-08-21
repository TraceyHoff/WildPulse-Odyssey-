with open("index.html", "r") as f:
    content = f.read()

content = content.replace('"🧴 Repellent active! Wild encounters prevented for ${60 * tier} seconds."', '`🧴 Repellent active! Wild encounters prevented for ${60 * tier} seconds.`')
content = content.replace('"👣 Pedometer active! Egg hatching progress is doubled for ${60 * tier} seconds."', '`👣 Pedometer active! Egg hatching progress is doubled for ${60 * tier} seconds.`')
content = content.replace('"🧃 Jank Juice active! Wild shiny spawn rates significantly increased for ${6 * tier} minutes."', '`🧃 Jank Juice active! Wild shiny spawn rates significantly increased for ${6 * tier} minutes.`')
content = content.replace('"✨ ExPALL active! Whole active party will receive battle experience for ${180 * tier} seconds."', '`✨ ExPALL active! Whole active party will receive battle experience for ${180 * tier} seconds.`')
content = content.replace('"📡 NPC Dual Link active! Cooperative 2v2 NPC Trainer battles guaranteed for ${5 * tier} minutes."', '`📡 NPC Dual Link active! Cooperative 2v2 NPC Trainer battles guaranteed for ${5 * tier} minutes.`')
content = content.replace('"📶 Wild Dual Signal active! Wild Dual battles guaranteed for ${5 * tier} minutes."', '`📶 Wild Dual Signal active! Wild Dual battles guaranteed for ${5 * tier} minutes.`')

with open("index.html", "w") as f:
    f.write(content)
