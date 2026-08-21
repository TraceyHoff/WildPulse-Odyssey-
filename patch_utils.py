import re

with open("index.html", "r") as f:
    content = f.read()

utils_code = """
window.getBaseItemName = function(itemName) {
    if (!itemName) return itemName;
    const match = itemName.match(/^(.*?) \\(Tier \\d+\\)$/);
    if (match) return match[1];
    return itemName;
};

window.getItemTier = function(itemName) {
    if (!itemName) return 1;
    const match = itemName.match(/ \\(Tier (\\d+)\\)$/);
    if (match) return parseInt(match[1], 10);
    return 1;
};
"""

target = "window.phaserInitComplete = false;"
if target in content:
    content = content.replace(target, target + "\n\n" + utils_code)
else:
    print("Could not find insertion point!")

with open("index.html", "w") as f:
    f.write(content)
