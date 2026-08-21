with open("index.html", "r") as f:
    content = f.read()

target = """            const stock = playerNum === 2 ? (window.p2StoreStock[item.name] !== undefined ? window.p2StoreStock[item.name] : 30) : (window.p1StoreStock[item.name] !== undefined ? window.p1StoreStock[item.name] : 30);"""

replacement = """            let stock = 30;
            if (item.stock !== undefined) {
                stock = item.stock; // Use synthetic stock if defined (for tiered items)
            } else {
                stock = playerNum === 2 ? (window.p2StoreStock[item.name] !== undefined ? window.p2StoreStock[item.name] : 30) : (window.p1StoreStock[item.name] !== undefined ? window.p1StoreStock[item.name] : 30);
            }"""

if target in content:
    content = content.replace(target, replacement)
    print("Patch successful!")
else:
    print("Target block not found in file!")

with open("index.html", "w") as f:
    f.write(content)
