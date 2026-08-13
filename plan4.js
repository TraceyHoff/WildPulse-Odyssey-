const plan4 = `
Ok, here is the robust plan.

1.  **Multiple Colors for Fireflies**:
    -   Modify `window.generateParticleTextures` or where textures are made (line 24570) to create 4 firefly canvases:
        \`firefly_particle_1\` (yellow/green)
        \`firefly_particle_2\` (cyan/blue)
        \`firefly_particle_3\` (orange/red)
        \`firefly_particle_4\` (purple/pink)
    -   Change \`this.add.particles('firefly_particle')\` to pass an array of these keys to \`fireflyParticles\` (actually in Phaser 3, \`add.particles()\` accepts a single texture key. However, we can create multiple emitters or a single emitter that emits multiple frames. Wait, Phaser 3 \`add.particles()\` takes ONE texture key. But we can pack them into a spritesheet OR create multiple emitters. Since we want an easy drop-in, it's easier to create a Sprite Sheet or just use an array of texture keys in \`add.particles\` if Phaser 3.55 supports it. Wait, in Phaser 3.55 \`this.add.particles('texture1', 'texture2')\` might not work. The standard way is to use a spritesheet. Alternatively, we can just spawn Sprites instead of Particles. Wait, \`add.particles\` can take an array in some versions? No, the best way in Phaser 3.50+ is to use multiple particle managers OR one manager with multiple emitters.
    -   Let's check if \`fireflyParticles.createEmitter\` allows emitting random frames from a spritesheet. Yes! We can draw all fireflies to one wide canvas and use it as a spritesheet.

2.  **Firefly Sprite Sheet Generation**:
    -   Create a canvas \`32x8\`.
    -   Draw 4 different fireflies at \`(0,0)\`, \`(8,0)\`, \`(16,0)\`, \`(24,0)\`.
    -   Add it to \`scene.textures.addSpriteSheet('firefly_particles', canvas, { frameWidth: 8, frameHeight: 8 })\`.
    -   In \`createEmitter\`, add \`frame: [0, 1, 2, 3]\` so it randomly picks a color.

3.  **Butterfly Sprite Sheet Generation**:
    -   Create a canvas \`48x12\` (4 frames of \`12x12\`).
    -   Draw 4 different colored butterflies.
    -   Add it to \`scene.textures.addSpriteSheet('butterfly_particles', canvas, { frameWidth: 12, frameHeight: 12 })\`.
    -   In \`createEmitter\`, add \`frame: [0, 1, 2, 3]\`.
    -   *Wait*, the prompt wants butterflies to land on flowers and players. Particles CANNOT easily land. So instead of using a particle emitter for butterflies, we should create a Mock Emitter object for \`window.butterflyEmitter\` that actually manages an array of Sprite objects.

4.  **Mock Butterfly Emitter (Sprite Manager)**:
    -   We define an object \`window.butterflyEmitter = { active: false, _currentQuantity: 0, setQuantity: function(q) {...}, killAll: function() {...}, ... }\`.
    -   Inside this mock emitter, we maintain an array \`this.sprites = []\`.
    -   When \`setQuantity(q)\` is called, we create or destroy Phaser Sprites (using \`scene.add.sprite\`) to match \`q\` (scaled appropriately).
    -   We add an \`update()\` method to this mock emitter and call \`window.butterflyEmitter.update()\` in the main \`update()\` loop (around line 32800 where other updates happen).
    -   In the butterfly \`update()\`, each sprite wanders around using simple math (Math.sin/cos).
    -   **Landing on Flowers**: We can scan \`activeTiles\` periodically (e.g. once every few seconds per butterfly) to find a Sprite that has \`isPlant = true\`. If found nearby, we tween the butterfly to the plant's (x, y) and set its state to \`landing\`.
    -   **Landing on Players**: We check if \`player.body.velocity.x === 0 && player.body.velocity.y === 0\`. If the player is still for a few seconds, a butterfly might seek the player's (x, y-20) and hover/land there. If the player moves, it flies away.

Let's check how to hook into the main update loop and how to query \`activeTiles\` values safely.
`;
console.log(plan4);
