const { chromium } = require('playwright');

async function run() {
    console.log("Launching browser...");
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        recordVideo: {
            dir: '/home/jules/verification/videos'
        },
        viewport: { width: 1280, height: 720 }
    });

    // Setup start screen bypass so we go straight to the game map
    await context.addInitScript(() => {
        localStorage.clear();
        sessionStorage.setItem('wildpulse_skip_start_modal', 'true');
        sessionStorage.setItem('wildpulse_started_once', 'true');
    });

    const page = await context.newPage();

    console.log("Navigating to local game server...");
    await page.goto('http://localhost:3000');

    // Wait a moment during the custom loading screen to capture running creatures
    console.log("Capturing custom animated loading screen...");
    await page.waitForTimeout(1000);
    await page.screenshot({ path: '/home/jules/verification/screenshots/loading_screen.png' });
    await page.waitForTimeout(1500);

    // Wait for the game to start and players/creatures to initialize
    console.log("Waiting for game to finish preloading...");
    await page.waitForFunction(() => window.gameStarted === true, { timeout: 15000 });
    await page.waitForTimeout(1000);

    // Setup creatures in party so we can engage in battle
    console.log("Setting up active creatures in party...");
    await page.evaluate(() => {
        if (window.collectedCreatures.length === 0) {
            window.collectedCreatures.push({
                id: 'p1_test',
                name: 'Volt-Pike',
                level: 5,
                currentHp: 40,
                maxHp: 40,
                type: 'Electric',
                color: '#ffeb3b',
                xp: 0
            });
        }
    });

    // Start a trainer duel which triggers our entry transition overlay
    console.log("Triggering Trainer Field Duel battle...");
    await page.evaluate(() => {
        window.startNpcDualBattle(window.player, 'npc_trainer_5', 'Morpheus');
    });

    // Instantly wait a small fraction of a second to snap the entry transition glitch/skew effect
    await page.waitForTimeout(200);
    console.log("Capturing entry transition overlay...");
    await page.screenshot({ path: '/home/jules/verification/screenshots/entry_transition.png' });

    // Wait for battle to render fully
    await page.waitForTimeout(1500);
    console.log("Capturing active battle modal...");
    await page.screenshot({ path: '/home/jules/verification/screenshots/active_battle.png' });

    // Exit battle to trigger the exit transition fade out
    console.log("Exiting battle to trigger exit transition overlay...");
    await page.evaluate(() => {
        if (window.closeBattleModal) window.closeBattleModal();
    });

    // Capture exit transition overlay text ("BATTLE TERMINATED")
    await page.waitForTimeout(1500);
    console.log("Capturing exit transition complete state...");
    await page.screenshot({ path: '/home/jules/verification/screenshots/exit_transition_complete.png' });

    console.log("Closing browser and saving video...");
    await context.close();
    await browser.close();
    console.log("Visual verification script completed successfully!");
}

run().catch(err => {
    console.error("Error running verification script:", err);
    process.exit(1);
});
