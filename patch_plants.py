import re

with open("index.html", "r") as f:
    content = f.read()

plants_overlap = """    this.physics.add.overlap(player, window.miniTilesGroup, (pCol, tileSprite) => {
        const tileType = tileSprite.miniTileType;
        if (tileType === 'hospital') {
            healParty.call(this, pCol);
        } else if (tileType === 'store') {
            window.registerTileOverlap(1, 'store', () => openStoreModal(pCol));
        } else if (tileType === 'challenge') {
            window.registerTileOverlap(1, 'challenge', () => {
                if (window.openChallengeModal) window.openChallengeModal(pCol);
            });
        } else if (tileType === 'trade') {
            window.registerTileOverlap(1, 'trade', () => {
                if (window.openTradeModal) window.openTradeModal(pCol);
            });
        } else if (tileType === 'pvp') {"""

plants_setup = """    if (!window.plantsGroup) window.plantsGroup = this.physics.add.group();

    this.physics.add.overlap(player, window.plantsGroup, (pCol, plantSprite) => {
        if (!plantSprite.lastRustleTime || Date.now() - plantSprite.lastRustleTime > 500) {
            plantSprite.lastRustleTime = Date.now();
            if (window.WildPulseMusic && window.WildPulseMusic.synths && window.WildPulseMusic.synths.leaves) {
                try { window.WildPulseMusic.synths.leaves.triggerAttackRelease("16n", Tone.now(), Math.random() * 0.4 + 0.3); } catch(e){}
            }
            // Add a little visual wiggle
            this.tweens.add({
                targets: plantSprite,
                angle: { from: plantSprite.angle - 15, to: plantSprite.angle + 15 },
                duration: 100,
                yoyo: true,
                repeat: 1,
                ease: 'Sine.easeInOut',
                onComplete: () => {
                    plantSprite.setAngle(plantSprite.originalAngle || 0);
                }
            });
        }
    }, null, this);
"""

# Let's see where to inject plants overlap setup
# Right after:
#    // Spawn player mini-tiles
#    window.spawnMiniTiles(this);

setup_regex = r"(\s*// Overlap physics\s*this\.physics\.add\.overlap\(player, window\.homeTeleportersGroup)"
content = re.sub(setup_regex, r"\n" + plants_setup + r"\n\1", content)


plants_overlap_p2 = """    window.p2Colliders.push(scene.physics.add.overlap(window.player2, window.plantsGroup, (pCol, plantSprite) => {
        if (!plantSprite.lastRustleTime || Date.now() - plantSprite.lastRustleTime > 500) {
            plantSprite.lastRustleTime = Date.now();
            if (window.WildPulseMusic && window.WildPulseMusic.synths && window.WildPulseMusic.synths.leaves) {
                try { window.WildPulseMusic.synths.leaves.triggerAttackRelease("16n", Tone.now(), Math.random() * 0.4 + 0.3); } catch(e){}
            }
            // Add a little visual wiggle
            scene.tweens.add({
                targets: plantSprite,
                angle: { from: plantSprite.angle - 15, to: plantSprite.angle + 15 },
                duration: 100,
                yoyo: true,
                repeat: 1,
                ease: 'Sine.easeInOut',
                onComplete: () => {
                    plantSprite.setAngle(plantSprite.originalAngle || 0);
                }
            });
        }
    }, null, scene));"""

p2_setup_regex = r"(\s*// Overlaps for functional mini-tiles for Player 2)"
content = re.sub(p2_setup_regex, r"\n" + plants_overlap_p2 + r"\n\1", content)


# Now inject plants into plantsGroup when they spawn
plant_spawn_regex = r"(plant\.shadowSprite = shadow;)"
plant_spawn_inject = r"""\1
            if (window.plantsGroup) {
                plant.originalAngle = 0;
                window.plantsGroup.add(plant);
                plant.body.setCircle(20, plant.width / 2 - 20, plant.height - 20); // Make hitbox appropriate
            }"""
content = re.sub(plant_spawn_regex, plant_spawn_inject, content)

with open("index.html", "w") as f:
    f.write(content)
