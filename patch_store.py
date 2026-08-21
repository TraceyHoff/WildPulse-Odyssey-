with open("index.html", "r") as f:
    content = f.read()

target = """        const pLvl = playerNum === 2 ? (window.p2Level || 1) : (window.p1Level || 1);
        const activeItems = [...items];
        const homeItems = [];"""

replacement = """        const pLvl = playerNum === 2 ? (window.p2Level || 1) : (window.p1Level || 1);
        const activeItems = [...items];
        const homeItems = [];

        // Inject tiered items from inventory so they can be sold
        const currentInv = playerNum === 2 ? window.p2Inventory : window.p1Inventory;
        if (currentInv) {
            currentInv.forEach(invItem => {
                const tier = window.getItemTier ? window.getItemTier(invItem.name) : 1;
                if (tier > 1) {
                    const baseName = window.getBaseItemName ? window.getBaseItemName(invItem.name) : invItem.name;
                    // Check if already in activeItems
                    if (!activeItems.find(i => i.name === invItem.name)) {
                        const baseItem = items.find(i => i.name === baseName);
                        if (baseItem) {
                            activeItems.push({
                                name: invItem.name,
                                icon: baseItem.icon,
                                price: baseItem.price * tier * 2, // Artificial price to boost sell value
                                desc: baseItem.desc,
                                stock: 0 // Cannot be bought
                            });
                        }
                    }
                }
            });
        }"""

if target in content:
    content = content.replace(target, replacement)
    print("Patch successful!")
else:
    print("Target block not found in file!")

with open("index.html", "w") as f:
    f.write(content)
