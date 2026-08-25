const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const generateTileTexturesSearch = `
            img.onload = function() {
                ctx.drawImage(img, xOffset, yOffset, wPx, hPx);
                if (scene && scene.textures) {
                    if (scene.textures.exists(tileKey + '_tile')) scene.textures.remove(tileKey + '_tile');
                    window.finalizeFurnitureTexture(scene, tileKey + '_tile', canvas);
                }
            };
            img.src = svgDataUrl;`;

const generateTileTexturesReplace = `
            img.onload = function() {
                ctx.drawImage(img, xOffset, yOffset, wPx, hPx);
                if (scene && scene.textures) {
                    if (scene.textures.exists(tileKey + '_tile')) scene.textures.remove(tileKey + '_tile');
                    window.finalizeFurnitureTexture(scene, tileKey + '_tile', canvas);

                    // Update existing sprites that were rendered as green boxes
                    if (window.miniTilesGroup) {
                        window.miniTilesGroup.getChildren().forEach(sprite => {
                            if (sprite.miniTileType && window.typeMapLocal[sprite.miniTileType]) {
                                // Some sprites store miniTileType as the friendly name like "Neon Couch", some store as "furniture_couch"
                                // Actually, miniTileType is saved as "furniture_couch" in localStorage usually, let's just check if it matches tileKey
                                if (sprite.miniTileType === tileKey) {
                                    let rot = sprite.angle;
                                    let actualRot = (rot % 360 + 360) % 360; // Normalize
                                    if (actualRot === 0) {
                                        sprite.setTexture(tileKey + '_tile');
                                    } else {
                                        sprite.setTexture(tileKey + '_tile_' + actualRot);
                                    }
                                    sprite.setAngle(0); // finalizeFurnitureTexture bakes rotation, so angle should be 0
                                }
                            } else if (sprite.miniTileType === tileKey) { // Fallback if typeMapLocal doesn't cover it directly this way
                                let rot = sprite.angle;
                                let actualRot = (rot % 360 + 360) % 360; // Normalize
                                if (actualRot === 0) {
                                    sprite.setTexture(tileKey + '_tile');
                                } else {
                                    sprite.setTexture(tileKey + '_tile_' + actualRot);
                                }
                                sprite.setAngle(0);
                            }
                        });
                    }

                    // Update preview sprites
                    if (window.p1MiniTilePlacementMode && window.typeMapLocal[window.p1MiniTilePlacementMode] === tileKey && window.p1MiniTilePreviewSprite) {
                        let rot = window.p1MiniTileRotation || 0;
                        if (rot !== 0) {
                            window.p1MiniTilePreviewSprite.setTexture(tileKey + '_tile_' + rot);
                        } else {
                            window.p1MiniTilePreviewSprite.setTexture(tileKey + '_tile');
                        }
                        window.p1MiniTilePreviewSprite.setAngle(0);
                    }
                    if (window.p2MiniTilePlacementMode && window.typeMapLocal[window.p2MiniTilePlacementMode] === tileKey && window.p2MiniTilePreviewSprite) {
                        let rot = window.p2MiniTileRotation || 0;
                        if (rot !== 0) {
                            window.p2MiniTilePreviewSprite.setTexture(tileKey + '_tile_' + rot);
                        } else {
                            window.p2MiniTilePreviewSprite.setTexture(tileKey + '_tile');
                        }
                        window.p2MiniTilePreviewSprite.setAngle(0);
                    }
                }
            };
            img.src = svgDataUrl;`;

if (html.includes(generateTileTexturesSearch)) {
    html = html.replace(generateTileTexturesSearch, generateTileTexturesReplace);
    console.log("Successfully patched generateTileTextures.");
} else {
    console.log("Could not find generateTileTextures to patch.");
}

fs.writeFileSync('index.html', html, 'utf8');
