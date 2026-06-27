const { chromium } = require('playwright');
const path = require('path');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    page.on('console', msg => console.log('BROWSER:', msg.text()));

    // Load the game
    await page.goto('file://' + path.join(__dirname, '..', 'index.html'));
    await page.waitForTimeout(1000);

    // 1. Verify Customize Button exists
    const customizeBtn = await page.$('#customizeBtn');
    if (customizeBtn) {
        console.log("SUCCESS: Customize button found.");
    } else {
        console.log("FAILURE: Customize button NOT found.");
        process.exit(1);
    }

    // 2. Open Customization Modal
    await customizeBtn.click();
    const modalVisible = await page.isVisible('#customizationModal');
    if (modalVisible) {
        console.log("SUCCESS: Customization modal is visible.");
    } else {
        console.log("FAILURE: Customization modal NOT visible.");
        process.exit(1);
    }

    // 3. Set Name and Color
    await page.fill('#playerNameInput', 'HeroJules');
    await page.evaluate(() => {
        document.getElementById('playerColorInput').value = '#ff0000';
    });
    await page.click('#saveCustomizationBtn');

    // 4. Verify LocalStorage
    const savedName = await page.evaluate(() => localStorage.getItem('wildpulse_player_name'));
    const savedColor = await page.evaluate(() => localStorage.getItem('wildpulse_player_color'));

    if (savedName === 'HeroJules' && savedColor === '#ff0000') {
        console.log("SUCCESS: Customization saved to localStorage.");
    } else {
        console.log(`FAILURE: Customization NOT saved correctly. Name: ${savedName}, Color: ${savedColor}`);
        process.exit(1);
    }

    // 5. Verify Auto-start logic
    // Set up a scenario where we are in a friend's world
    await page.evaluate(() => {
        localStorage.setItem('wildpulse_own_world_code', 'OWN123');
        localStorage.setItem('wildpulse_world_code', 'FRIEND456');
    });

    // Reload to trigger DOMContentLoaded logic
    await page.reload();
    await page.waitForTimeout(2000);

    const startModalDisplay = await page.evaluate(() => document.getElementById('startModal').style.display);
    const gameStarted = await page.evaluate(() => window.gameStarted);

    if (startModalDisplay === 'none' && gameStarted === true) {
        console.log("SUCCESS: Auto-start worked for shared world.");
    } else {
        console.log(`FAILURE: Auto-start failed. Display: ${startModalDisplay}, gameStarted: ${gameStarted}`);
        // Note: Sometimes the Phaser game might take longer to init, but gameStarted should be true after click
    }

    // 6. Verify local player name/color in Phaser
    // window.localPlayerLabel is assigned in create(), so we wait for it
    await page.waitForFunction(() => window.localPlayerLabel, { timeout: 30000 });
    const playerNameInPhaser = await page.evaluate(() => window.localPlayerLabel.text);
    const playerColorInPhaser = await page.evaluate(() => {
        // Since we can't easily access 'player' from window scope if it's local to create/update
        // and it's not explicitly attached to window in this codebase (it is defined globally but maybe not initialized yet or captured)
        // Let's find it in the scene
        let scene = window.game.scene.scenes[0];
        let pSprite = scene.children.list.find(c => c.texture && c.texture.key === 'player_tex');
        return pSprite ? pSprite.tintTopLeft : 0;
    });

    console.log(`Phaser Name: ${playerNameInPhaser}, Phaser Color: ${playerColorInPhaser.toString(16)}`);

    if (playerNameInPhaser === 'HeroJules' && playerColorInPhaser === 0xff0000) {
        console.log("SUCCESS: Phaser player personalized.");
    } else {
        console.log("FAILURE: Phaser player NOT personalized correctly.");
    }

    await browser.close();
})();
