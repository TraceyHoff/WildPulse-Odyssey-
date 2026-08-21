import sys

with open("index.html", "r") as f:
    content = f.read()

search_str = """window.getItemSellPrice = function(itemName) {"""
if search_str in content:
    print("Found getItemSellPrice! Will remove it since it's hallucinated.")
else:
    print("getItemSellPrice Not found.")

search_str2 = """            let sellPrice = item.price ? Math.floor(item.price * 0.55) : 50;
            if (!item.price) {
                if (item.name.startsWith("Uncommon")) sellPrice = 150;
                else if (item.name.startsWith("Rare")) sellPrice = 300;
                else if (item.name.startsWith("Exquisite")) sellPrice = 500;
            }
            const canSell = ownedCount > 0;"""

replace_str2 = """            let sellPrice = item.price ? Math.floor(item.price * 0.55) : 50;
            if (!item.price) {
                if (item.name.startsWith("Uncommon")) sellPrice = 150;
                else if (item.name.startsWith("Rare")) sellPrice = 300;
                else if (item.name.startsWith("Exquisite")) sellPrice = 500;
            }
            const canSell = ownedCount > 0;"""

if search_str2 in content:
    print("sellPrice found")
