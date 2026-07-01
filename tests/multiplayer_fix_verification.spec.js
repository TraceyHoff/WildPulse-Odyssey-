const { test, expect } = require('@playwright/test');

test.describe('Multiplayer Visibility Fix Verification', () => {
  test.setTimeout(120000);

  test('Players in the same room should see each other in world and social panel', async ({ context }) => {
    const roomName = 'TEST_ROOM_' + Math.random().toString(36).substring(7);

    const setupClient = async (page, name) => {
      // Mock external CDNs to prevent timeouts in restricted environment
      await page.route('**/phaser.min.js', route => route.fulfill({ body: 'window.Phaser = { Game: class { constructor(c) { if(c.scene && c.scene.create) setTimeout(() => { const scene = { add: { sprite: () => ({ setTint: () => ({ setAlpha: () => ({ setDepth: () => ({ setBlendMode: () => ({ setVisible: () => ({ setData: () => ({ label: { destroy: () => {} }, aura: { destroy: () => {} }, destroy: () => {} }) }) }) }) }) }), text: () => ({ setOrigin: () => ({ setDepth: () => ({ setVisible: () => ({ setText: () => {} }) }) }) }), graphics: () => ({ createGeometryMask: () => ({}), clear: () => {}, fillStyle: () => {}, fillRect: () => {} }), tileSprite: () => ({ setOrigin: () => ({ setScrollFactor: () => ({ setMask: () => ({ setBlendMode: () => ({ setDepth: () => ({ setAlpha: () => ({ setVisible: () => {} }) }) }) }) }) }) }), rectangle: () => ({ setOrigin: () => ({ setScrollFactor: () => ({ setDepth: () => ({ setAlpha: () => ({ setVisible: () => ({ setPosition: () => {} }) }) }) }) }) }) }, physics: { add: { group: () => ({ setDepth: () => ({ getChildren: () => [] }), add: () => {} }), staticGroup: () => ({ getChildren: () => [] }), overlap: () => {} }, world: { setBounds: () => {} } }, cameras: { main: { setBounds: () => {}, startFollow: () => {}, stopFollow: () => {}, setScroll: () => {}, scrollX: 0, scrollY: 0, width: 800, height: 600 } }, input: { keyboard: { createCursorKeys: () => ({ left: {}, right: {}, up: {}, down: {} }) }, on: () => {}, gamepad: { total: 0 } }, time: { now: Date.now() }, tweens: { add: () => {} }, textures: { get: () => ({ getSourceImage: () => ({ getContext: () => ({ clearRect: () => {}, fillRect: () => {} }) }), refresh: () => {} }), exists: () => false, remove: () => {} }, game: { loop: { delta: 16 } } }; c.scene.create.call(scene); }, 100); } }, Math: { RandomDataGenerator: class { frac() { return 0.5; } }, Between: (a,b) => a, Clamp: (a,b,c) => a }, BlendModes: { ADD: "add" }, Geom: { Rectangle: class {} }, GameObjects: { Sprite: class {} } };' }));
      await page.route('**/Tone.js', route => route.fulfill({ body: 'window.Tone = { start: () => Promise.resolve(), Transport: { bpm: { value: 120, rampTo: () => {} }, start: () => {}, seconds: 0 }, Loop: class { start: () => {} }, Reverb: class { toDestination: () => ({ connect: () => {}, wet: { rampTo: () => {} } }) }, FeedbackDelay: class { connect: () => {} }, MembraneSynth: class { toDestination: () => {} }, NoiseSynth: class { toDestination: () => {} }, MetalSynth: class { toDestination: () => {} }, MonoSynth: class { connect: () => {} }, PolySynth: class { connect: () => {} }, Destination: { mute: false } };' }));
      await page.route('**/purify.min.js', route => route.fulfill({ body: 'window.DOMPurify = { sanitize: (t) => t };' }));

      await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });

      await page.evaluate((room) => {
        localStorage.setItem('wildpulse_world_code', room);
      }, roomName);

      await page.reload({ waitUntil: 'domcontentloaded' });

      // Trigger UI actions
      await page.evaluate((n) => {
        document.getElementById('playerNameInput').value = n;
        document.getElementById('saveCustomizationBtn').click();
        document.getElementById('startGameBtn').click();
      }, name);

      // Wait for socket
      await page.waitForFunction(() => window.socket && window.socket.connected, { timeout: 15000 });
    };

    const page1 = await context.newPage();
    const page2 = await context.newPage();

    await setupClient(page1, 'Alpha');
    await setupClient(page2, 'Beta');

    // Give time for position broadcast and mutual discovery
    await page1.waitForTimeout(3000);
    await page2.waitForTimeout(3000);

    // Verify P1 state knows about P2
    const p1State = await page1.evaluate(() => {
        const peers = Object.keys(window.remotePlayerState);
        const peerId = peers[0];
        const identity = window.remotePlayerIdentities[peerId];
        return { count: peers.length, name: identity ? identity.name : null };
    });
    console.log('P1 State:', p1State);
    expect(p1State.count).toBeGreaterThan(0);
    expect(p1State.name).toBe('Beta');

    // Verify P2 state knows about P1
    const p2State = await page2.evaluate(() => {
        const peers = Object.keys(window.remotePlayerState);
        const peerId = peers[0];
        const identity = window.remotePlayerIdentities[peerId];
        return { count: peers.length, name: identity ? identity.name : null };
    });
    console.log('P2 State:', p2State);
    expect(p2State.count).toBeGreaterThan(0);
    expect(p2State.name).toBe('Alpha');

    // Check Social UI
    const p1Social = await page1.evaluate(() => document.getElementById('playerListContainer').innerText);
    expect(p1Social).toContain('Beta');

    const p2Social = await page2.evaluate(() => document.getElementById('playerListContainer').innerText);
    expect(p2Social).toContain('Alpha');

    // Check Socket Global fix
    const p1SocketFixed = await page1.evaluate(() => window.socket === socket);
    expect(p1SocketFixed).toBe(true);
  });
});
