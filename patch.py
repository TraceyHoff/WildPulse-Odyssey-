import re

with open('index.html', 'r') as f:
    text = f.read()

# We need to find the `generateTileTextures(scene)` function and:
# 1. Add `window.finalizeFurnitureTexture` logic inside it, right at the top of the function or outside it. Let's put it globally.
# 2. But we want to modify all `scene.textures.addCanvas('furniture_...', canvas)` inside `generateTileTextures` to use it instead.

global_func = """
window.finalizeFurnitureTexture = function(scene, baseKey, canvas) {
    scene.textures.addCanvas(baseKey, canvas);

    for (let angle of [90, 180, 270]) {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const ctx = tempCanvas.getContext('2d');

        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((angle * Math.PI) / 180);
        ctx.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);

        scene.textures.addCanvas(baseKey + '_' + angle, tempCanvas);
    }
};
"""

text = re.sub(r'function generateTileTextures\(scene\)\s*\{', global_func + '\nfunction generateTileTextures(scene) {\n', text)

# Now find all `scene.textures.addCanvas('furniture_...', ...)` and replace.
def repl(m):
    key = m.group(1)
    canvas = m.group(2)
    if 'furniture_' in key:
        return f"window.finalizeFurnitureTexture(scene, '{key}', {canvas});"
    return m.group(0)

text = re.sub(r"scene\.textures\.addCanvas\('([^']+)',\s*([^)]+)\);", repl, text)

with open('index.html', 'w') as f:
    f.write(text)
print("done")
