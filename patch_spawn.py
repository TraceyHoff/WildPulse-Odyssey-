import re

with open('index.html', 'r') as f:
    text = f.read()

# I also need to make sure the preview and the spawned minitile use the rotated texture instead of `setAngle`!
# Let's see what they currently do.
# In `spawnMiniTiles`:
#   mSprite.setAngle(tile.rotation || 0);

# Wait, `AGENTS.md` says:
# "Furniture rotation is applied by swapping textures (e.g., `key_90`) generated via `window.finalizeFurnitureTexture` to preserve 3D depth perspective, while non-furniture items use `setAngle`."

# So instead of `mSprite.setAngle(tile.rotation || 0);`
# we do:
"""
                let rot = tile.rotation || 0;
                if (tile.type.startsWith('furniture_')) {
                    if (rot !== 0) {
                        mSprite.setTexture(textureKey + '_' + rot);
                    }
                    mSprite.setAngle(0);
                } else {
                    mSprite.setAngle(rot);
                }
"""

text = re.sub(
    r"mSprite\.setAngle\((tile\.rotation \|\| 0)\);",
    r"""let rot = tile.rotation || 0;
                if (tile.type.startsWith('furniture_')) {
                    if (rot !== 0) {
                        mSprite.setTexture(textureKey + '_' + rot);
                    }
                    mSprite.setAngle(0);
                } else {
                    mSprite.setAngle(rot);
                }""",
    text
)


# In `updatePreview` or something similar, when setting the texture, we do the same.
# Let's check `updatePreview` and `window.p1MiniTileRotation` usage.
with open('index.html', 'w') as f:
    f.write(text)
print("done")
