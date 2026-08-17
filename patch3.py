import re

with open('index.html', 'r') as f:
    text = f.read()

# Replace setAngle calls for preview rotation

# 1. In gamepad handling:
text = text.replace(
    "window[previewSpriteId].setAngle(window[`p${playerNum}MiniTileRotation`]);",
    """let rot = window[`p${playerNum}MiniTileRotation`];
                let textureKey = window[previewSpriteId].texture.key.replace(/_\\d+$/, '');
                if (textureKey.startsWith('furniture_')) {
                    if (rot !== 0) {
                        window[previewSpriteId].setTexture(textureKey + '_' + rot);
                    } else {
                        window[previewSpriteId].setTexture(textureKey);
                    }
                    window[previewSpriteId].setAngle(0);
                } else {
                    window[previewSpriteId].setAngle(rot);
                }"""
)

# 2. In keyboard p1 handling:
text = text.replace(
    "window.p1MiniTilePreviewSprite.setAngle(window.p1MiniTileRotation);",
    """let rot = window.p1MiniTileRotation;
                    let textureKey = window.p1MiniTilePreviewSprite.texture.key.replace(/_\\d+$/, '');
                    if (textureKey.startsWith('furniture_')) {
                        if (rot !== 0) {
                            window.p1MiniTilePreviewSprite.setTexture(textureKey + '_' + rot);
                        } else {
                            window.p1MiniTilePreviewSprite.setTexture(textureKey);
                        }
                        window.p1MiniTilePreviewSprite.setAngle(0);
                    } else {
                        window.p1MiniTilePreviewSprite.setAngle(rot);
                    }"""
)

# 3. In keyboard p2 handling:
text = text.replace(
    "window.p2MiniTilePreviewSprite.setAngle(window.p2MiniTileRotation);",
    """let rot = window.p2MiniTileRotation;
                    let textureKey = window.p2MiniTilePreviewSprite.texture.key.replace(/_\\d+$/, '');
                    if (textureKey.startsWith('furniture_')) {
                        if (rot !== 0) {
                            window.p2MiniTilePreviewSprite.setTexture(textureKey + '_' + rot);
                        } else {
                            window.p2MiniTilePreviewSprite.setTexture(textureKey);
                        }
                        window.p2MiniTilePreviewSprite.setAngle(0);
                    } else {
                        window.p2MiniTilePreviewSprite.setAngle(rot);
                    }"""
)

with open('index.html', 'w') as f:
    f.write(text)
print("done")
