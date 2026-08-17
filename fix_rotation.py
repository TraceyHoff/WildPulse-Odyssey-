import re

with open('index.html', 'r') as f:
    text = f.read()

# Instead of `scene.textures.addCanvas('key', canvas);`, we want to call `window.finalizeFurnitureTexture(scene, 'key', canvas);`
# But only for furniture. Wait, what if we define `window.finalizeFurnitureTexture`?

# Let's see what memory says exactly:
# "Furniture rotation is applied by swapping textures (e.g., `key_90`) generated via `window.finalizeFurnitureTexture` to preserve 3D depth perspective, while non-furniture items use `setAngle`."

# So we need to:
# 1. Define `window.finalizeFurnitureTexture` that takes `scene`, `baseKey`, `canvas`, adds the 0 deg base texture, and then creates rotated canvases for 90, 180, 270 degrees and adds them.
# 2. Find all `scene.textures.addCanvas('furniture_...', canvas)` and replace with `window.finalizeFurnitureTexture(scene, 'furniture_...', canvas)`
# 3. Update `spawnMiniTiles` and preview placement to use the rotated texture instead of `setAngle` if it's furniture.

print("Done")
