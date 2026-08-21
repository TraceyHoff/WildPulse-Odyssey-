import sys

with open("index.html", "r") as f:
    content = f.read()

search_str = """            let sellPrice = item.price ? Math.floor(item.price * 0.55) : 50;
            if (!item.price) {
                if (item.name.startsWith("Uncommon")) sellPrice = 150;
                else if (item.name.startsWith("Rare")) sellPrice = 300;
                else if (item.name.startsWith("Exquisite")) sellPrice = 500;
            }
            const canSell = ownedCount > 0;"""

replace_str = """            let sellPrice = window.getItemSellPrice ? window.getItemSellPrice(item.name) : (item.price ? Math.floor(item.price * 0.55) : 50);
            const canSell = ownedCount > 0;"""

if search_str in content:
    content = content.replace(search_str, replace_str)
    with open("index.html", "w") as f:
        f.write(content)
