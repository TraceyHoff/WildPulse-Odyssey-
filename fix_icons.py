import re

with open("index.html", "r") as f:
    content = f.read()

# Remove the legacy block that overrides the tier color for tier 1
target_block_start = '    // Choose theme colors based on item type if tier is 1'
target_block_end = '        } else if (baseName.startsWith("Mini") || baseName.includes("Tile") || baseName === "Storage Chest") {\n            glowColor = \'#00ffd2\';\n        }\n    }'

# Replace that specific block
if target_block_start in content:
    idx_start = content.find(target_block_start)
    idx_end = content.find(target_block_end) + len(target_block_end)

    # We still need color assignments for Tier 1 items!
    # Let's write a replacement that applies colors for Tier 1 correctly using baseName,
    # and guarantees it only runs for Tier 1 (or we can just define the base colors then override if tier > 1).

    replacement_block = """    // Base colors (Tier 1 default)
    if (baseName.includes("Booster")) {
        if (baseName.startsWith("HP")) glowColor = '#00ff66';
        else if (baseName.startsWith("Attack")) glowColor = '#ff3366';
        else if (baseName.startsWith("Defense")) glowColor = '#0066ff';
        else if (baseName.startsWith("Speed")) glowColor = '#ffd700';
        else if (baseName.startsWith("Sp. Atk")) glowColor = '#ff00ff';
        else if (baseName.startsWith("Sp. Def")) glowColor = '#00ffff';
    } else if (baseName.includes("Healing") || baseName.includes("Serum")) {
        glowColor = '#00ff96';
    } else if (baseName === "Jank Juice") {
        glowColor = '#ff00ff';
    } else if (baseName === "Repellent") {
        glowColor = '#ff3300';
    } else if (baseName === "ExPALL") {
        glowColor = '#ffd700';
    } else if (baseName === "Creature Cookie") {
        glowColor = '#ff9f00';
    } else if (baseName === "Pedometer") {
        glowColor = '#00ffd2';
    } else if (baseName === "NPC Dual Link") {
        glowColor = '#00ffd2';
    } else if (baseName === "Wild Dual Signal") {
        glowColor = '#ff4400';
    } else if (baseName.startsWith("Mini") || baseName.includes("Tile") || baseName === "Storage Chest") {
        glowColor = '#00ffd2';
    }

    // Override colors if tiered
    if (tier === 2) glowColor = '#00ff66';
    else if (tier === 3) glowColor = '#0066ff';
    else if (tier === 4) glowColor = '#ff00ff';
    else if (tier === 5) glowColor = '#ffd700';"""

    # Remove the old override block
    content = content[:idx_start] + "/* Replaced */" + content[idx_end:]

    # And remove the original override block above it:
    old_override_start = '    // Override colors if tiered'
    old_override_end = "else if (tier === 5) glowColor = '#ffd700';"
    idx2_start = content.find(old_override_start)
    idx2_end = content.find(old_override_end) + len(old_override_end)
    content = content[:idx2_start] + replacement_block + content[idx2_end:]
    print("Patched icons")

with open("index.html", "w") as f:
    f.write(content)
