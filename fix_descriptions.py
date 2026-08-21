with open("index.html", "r") as f:
    content = f.read()

content = content.replace('desc: "Stops wild creature attacks for ${60 * tier} seconds."', 'desc: "Stops wild creature attacks for 60 seconds."')
content = content.replace('desc: "Greatly increases wild shiny spawn rate for ${6 * tier} minutes."', 'desc: "Greatly increases wild shiny spawn rate for 6 minutes."')
content = content.replace('desc: "Allows whole party to receive battle experience for ${180 * tier} seconds."', 'desc: "Allows whole party to receive battle experience for 180 seconds."')
content = content.replace('desc: "Gains double egg hatching progress when moving for ${60 * tier} seconds."', 'desc: "Gains double egg hatching progress when moving for 60 seconds."')
content = content.replace('desc: "Guarantees a 100% chance of an NPC Trainer Dual Battle for ${5 * tier} minutes."', 'desc: "Guarantees a 100% chance of an NPC Trainer Dual Battle for 5 minutes."')
content = content.replace('desc: "Guarantees a 100% chance of a wild creature Dual Battle for ${5 * tier} minutes."', 'desc: "Guarantees a 100% chance of a wild creature Dual Battle for 5 minutes."')

with open("index.html", "w") as f:
    f.write(content)
