const plan2 = `
1.  **Multiple Colors for Fireflies**:
    -   In \`index.html\`, generate multiple textures: \`firefly_particle_1\`, \`firefly_particle_2\`, \`firefly_particle_3\`, \`firefly_particle_4\`, etc., using different colors.
    -   Update \`window.fireflyEmitter\` to use an array of these textures so Phaser will randomly pick one for each particle.

2.  **Multiple Types of Butterflies**:
    -   In \`index.html\`, generate multiple textures: \`butterfly_particle_1\`, \`butterfly_particle_2\`, \`butterfly_particle_3\`, \`butterfly_particle_4\`, etc., with different shapes/colors.
    -   Update \`window.butterflyEmitter\` to use an array of these textures.
    -   *Correction*: The prompt asks: "Can butterflies land on flowers occasionally and if players are standing still Can a butterfly have a chance to land on them?". This means we probably need a custom script/manager for butterflies instead of (or in addition to) a simple particle emitter, because we need them to track flowers and players, move towards them, and land.
    -   Since Phaser 3 particles don't have built-in "seek" or "land" behaviors that track moving players or static flowers easily (particles are meant to be fire-and-forget), replacing the ambient \`butterflyEmitter\` with a custom Sprite pool (e.g., \`window.butterflySprites\`) that updates in the main \`update()\` loop is a better approach.

3.  **Butterfly Logic in \`update()\`**:
    -   Create a pool of butterfly sprites (e.g., 5-10 butterflies depending on weather/season/daytime).
    -   Each butterfly sprite will have state: \`flying\`, \`seeking_flower\`, \`landing_flower\`, \`seeking_player\`, \`landing_player\`.
    -   Find flowers: When spawning tiles, we can maintain an array of active flower sprites (since tiles are dynamically spawned and destroyed, we need to add a flag like \`sprite.isFlower = true\` and add them to \`window.activeFlowers = []\`, and remove them in \`destroyTile\`).
    -   Actually, to keep it simple, we can just randomly pick an active flower from \`activeTiles\` or let butterflies wander, and if they pass near a flower or a standing-still player, they trigger landing.
    -   Players standing still: check if \`player.body.velocity.x === 0 && player.body.velocity.y === 0\`. If so, start a timer or random chance for a butterfly to seek them.
    -   Once a butterfly lands, it stays for a bit, maybe flapping slowly, then takes off again.

Let's check how active tiles are structured to easily find flowers.
`;
console.log(plan2);
