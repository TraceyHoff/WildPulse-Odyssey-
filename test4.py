import re
with open('index.html', 'r') as f:
    text = f.read()

# I need to see where texture swapping is done for rotation. Memory says "Furniture rotation is applied by swapping textures (e.g., `key_90`) generated via `window.finalizeFurnitureTexture` to preserve 3D depth perspective"
# Let's search for "90" and "270"
