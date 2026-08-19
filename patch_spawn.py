import re

with open('index.html', 'r') as f:
    content = f.read()

# We need to change the spawn condition to allow spawning on 'home_floor' and 'rift_floor' as well as 'grass'

old_code = """
    // Ensure player spawns on grass
    let pCol = Math.floor(startX / 100);
    let pRow = Math.floor(startY / 100);
    if (!mapData[pRow] || mapData[pRow][pCol] !== 'grass') {
        let safePos = window.getStrictSafeDryLandSpawn(null, { x: 10550, y: 10550 });
"""

new_code = """
    // Ensure player spawns on a valid ground tile
    let pCol = Math.floor(startX / 100);
    let pRow = Math.floor(startY / 100);
    if (!mapData[pRow] || (mapData[pRow][pCol] !== 'grass' && mapData[pRow][pCol] !== 'home_floor' && mapData[pRow][pCol] !== 'rift_floor')) {
        let safePos = window.getStrictSafeDryLandSpawn(null, { x: 10550, y: 10550 });
"""

if old_code in content:
    content = content.replace(old_code, new_code)
    with open('index.html', 'w') as f:
        f.write(content)
    print("Patched spawn condition successfully.")
else:
    print("Could not find the spawn condition code.")

