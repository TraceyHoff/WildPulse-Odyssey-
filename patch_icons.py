import re

with open("index.html", "r") as f:
    content = f.read()

target = """window.getItemIconHTML = function(itemName, size = 24) {
    let svgContent = '';
    let glowColor = '#00ffd2';
    let baseColor = '#0b1424';

    // Choose theme colors based on item type
    if (itemName.includes("Booster")) {"""

replacement = """window.getItemIconHTML = function(itemName, size = 24) {
    const baseName = window.getBaseItemName ? window.getBaseItemName(itemName) : itemName;
    const tier = window.getItemTier ? window.getItemTier(itemName) : 1;

    let svgContent = '';
    let glowColor = '#00ffd2';
    let baseColor = '#0b1424';

    // Override colors if tiered
    if (tier === 2) glowColor = '#00ff66';
    else if (tier === 3) glowColor = '#0066ff';
    else if (tier === 4) glowColor = '#ff00ff';
    else if (tier === 5) glowColor = '#ffd700';

    // Choose theme colors based on item type if tier is 1
    if (tier === 1) {
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
    }

    if (baseName.includes("Booster")) {"""

content = content.replace(target, replacement)

# Now find the switch statement
switch_target = "switch (itemName) {"
content = content.replace(switch_target, "switch (baseName) {")

with open("index.html", "w") as f:
    f.write(content)
