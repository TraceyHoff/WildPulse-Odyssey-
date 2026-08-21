import re

with open('index.html', 'r') as f:
    content = f.read()

search = """    const typeMap = {
        "Mini Hospital": "hospital",
        "Mini Store": "store","""

replace = """    const typeMap = {
        "Mini Hospital": "hospital",
        "Mini Store": "store","""

# Let's insert before miniTiles.push({ type: tileType, x: snappedX, y: snappedY, rotation: window[`p${playerNum}MiniTileRotation`] });
search2 = """    const tileType = typeMap[itemName];

    miniTiles.push({ type: tileType, x: snappedX, y: snappedY, rotation: window[`p${playerNum}MiniTileRotation`] });
    localStorage.setItem(miniTilesKey, JSON.stringify(miniTiles));"""

replace2 = """    const tileType = typeMap[itemName];

    const storageTypes = ['storage_chest', 'furniture_filingcabinet', 'furniture_displaycabinet', 'furniture_shelf', 'furniture_wardrobe'];
    if (storageTypes.includes(tileType)) {
        const count = miniTiles.filter(t => t.type === tileType).length;
        if (count >= 2) {
            window.showModernNotification(`${window.getLockIconHTML(16)} You can only place a maximum of 2 ${itemName}s in your home.`, 4000, playerNum);
            return;
        }
    }

    miniTiles.push({ type: tileType, x: snappedX, y: snappedY, rotation: window[`p${playerNum}MiniTileRotation`] });
    localStorage.setItem(miniTilesKey, JSON.stringify(miniTiles));"""

content = content.replace(search2, replace2)

with open('index.html', 'w') as f:
    f.write(content)
