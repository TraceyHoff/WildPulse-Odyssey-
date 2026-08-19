import re

with open('index.html', 'r') as f:
    content = f.read()

# We need to change the spawn condition to allow spawning on 'home_floor' and 'rift_floor' as well as 'grass' in window.getStrictSafeDryLandSpawn

old_code = """    } while ((enemyObj && d < 1000) || d_water < 800 || !mapData[row] || mapData[row][col] !== 'grass' || (Math.abs(row - 100) < 5 && Math.abs(col - 100) < 5));"""

new_code = """    } while ((enemyObj && d < 1000) || d_water < 800 || !mapData[row] || (mapData[row][col] !== 'grass' && mapData[row][col] !== 'home_floor' && mapData[row][col] !== 'rift_floor') || (Math.abs(row - 100) < 5 && Math.abs(col - 100) < 5));"""

if old_code in content:
    content = content.replace(old_code, new_code)
    with open('index.html', 'w') as f:
        f.write(content)
    print("Patched getStrictSafeDryLandSpawn successfully.")
else:
    print("Could not find the getStrictSafeDryLandSpawn condition code.")
