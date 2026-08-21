import re

with open("index.html", "r") as f:
    content = f.read()

# Replace hardcoded strokes and glows in the SVG templates with ${glowColor} where appropriate
# We can't safely replace all of them without breaking stuff, but we can target the ones that use the hardcoded colors in the switch statement.
# Instead of doing complex regex, let's just make a function to replace specific colors with ${glowColor} in the switch block.

def replace_svg_colors(content):
    # Extract the switch block
    switch_start = content.find("switch (baseName) {")
    switch_end = content.find("return `", switch_start)

    switch_block = content[switch_start:switch_end]

    # We will replace specific hardcoded colors based on the baseName matching

    # NPC Dual Link: #00ffd2
    switch_block = switch_block.replace('#00ffd2', '${glowColor}')

    # Wild Dual Signal: #ff4400
    switch_block = switch_block.replace('#ff4400', '${glowColor}')

    # HP Booster: #00ff66
    switch_block = switch_block.replace('#00ff66', '${glowColor}')

    # Attack Booster: #ff3366
    switch_block = switch_block.replace('#ff3366', '${glowColor}')

    # Defense Booster: #0066ff
    switch_block = switch_block.replace('#0066ff', '${glowColor}')

    # Speed Booster: #ffd700
    switch_block = switch_block.replace('#ffd700', '${glowColor}')

    # Sp. Atk Booster: #ff00ff
    switch_block = switch_block.replace('#ff00ff', '${glowColor}')

    # Sp. Def Booster: #00ffff
    switch_block = switch_block.replace('#00ffff', '${glowColor}')

    # Jank Juice: #ff00ff and #ffd700 (let's only replace #ff00ff, the outline)
    # Actually for Jank juice, let's keep it simple and just do #ff00ff

    # Healing Juice Bottle: #00ff96
    switch_block = switch_block.replace('#00ff96', '${glowColor}')

    # ExPALL: #ffd700

    # Pedometer: #00ffd2

    # Nano-Nurture Serum: #ff00ff

    content = content[:switch_start] + switch_block + content[switch_end:]
    return content

content = replace_svg_colors(content)

with open("index.html", "w") as f:
    f.write(content)
