import sys

with open("index.html", "r") as f:
    content = f.read()

search_str = """        if (itemName.startsWith("Uncommon")) {
            strokeColor = '#00ccff'; // Cyan for Uncommon
            baseColor = '#0f1f3f';
        } else if (itemName.startsWith("Rare")) {
            strokeColor = '#ff00ff'; // Magenta for Rare
            baseColor = '#2a0a2a';
        } else if (itemName.startsWith("Exquisite")) {
            strokeColor = '#ffcc00'; // Gold for Exquisite
            baseColor = '#3a2a00';
        }"""

replace_str = """        if (itemName.startsWith("Uncommon")) {
            glowColor = '#00ccff'; // Cyan for Uncommon
            baseColor = '#0f1f3f';
        } else if (itemName.startsWith("Rare")) {
            glowColor = '#ff00ff'; // Magenta for Rare
            baseColor = '#2a0a2a';
        } else if (itemName.startsWith("Exquisite")) {
            glowColor = '#ffcc00'; // Gold for Exquisite
            baseColor = '#3a2a00';
        }"""

if search_str in content:
    content = content.replace(search_str, replace_str)
    with open("index.html", "w") as f:
        f.write(content)
