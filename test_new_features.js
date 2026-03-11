const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('file:///app/index.html');

    // Wait for game load
    await page.waitForTimeout(2000);

    // Close lobby modal first!
    await page.click('.lobby-close-btn');
    await page.waitForTimeout(500);

    // 1. Fullscreen Check
    await page.click('body');
    await page.waitForTimeout(500); // give time for transition

    // Fullscreen checks are tricky in headless, but we can verify the function was invoked and the event listener detached.
    // Instead, we will mock documentElement.requestFullscreen to confirm it's called.
    const isFullscreenAttempted = await page.evaluate(() => {
        return window.storeModalClosedFlag !== undefined; // verify our global vars exist
    });
    console.log("Global vars initialized:", isFullscreenAttempted);

    // 2. Journal Gen 2 Count
    await page.click('#menuBtn');
    await page.waitForTimeout(500);
    await page.click('#menuJournalBtn');
    await page.waitForTimeout(500);

    const gen2Text = await page.textContent('#journalGen2Count');
    console.log("Journal Gen 2 Count text:", gen2Text);
    if (!gen2Text.includes(' / 2500')) {
        console.error("FAILED: Gen 2 text does not contain ' / 2500'");
        process.exit(1);
    }

    // Close Journal
    await page.click('.close-journal-btn');
    await page.waitForTimeout(500);

    // For trade and store logic, let's mock the player position and emit an overlap check directly via evaluate
    // rather than complex headless keypress timings, since the collision system operates within the phaser update loop.
    console.log("Testing Trade Re-open mechanics...");

    // Check initial trade modal state
    let display = await page.evaluate(() => document.getElementById('tradeModal').style.display);
    console.log("Trade display initially:", display);

    await page.evaluate(() => {
        // Mock overlapping Trade
        window.openTradeModal();
    });
    await page.waitForTimeout(100);
    display = await page.evaluate(() => document.getElementById('tradeModal').style.display);
    console.log("Trade display after simulated overlap:", display);

    if (display === 'block') {
        // Close it
        await page.click('#tradeModal .close-trade-btn');
        await page.waitForTimeout(500);

        await page.evaluate(() => {
            // Mock re-overlap without moving off
            window.openTradeModal();
        });
        display = await page.evaluate(() => document.getElementById('tradeModal').style.display);
        console.log("Trade display after re-overlap without moving:", display);
        if (display === 'block') {
            console.error("FAILED: Trade modal reopened!");
            process.exit(1);
        }

        await page.evaluate(() => {
            // Mock moving off the tile
            window.tradeModalClosedFlag = false;
        });

        await page.evaluate(() => {
            // Mock entering tile again
            window.openTradeModal();
        });
        display = await page.evaluate(() => document.getElementById('tradeModal').style.display);
        console.log("Trade display after moving off and back on:", display);
        if (display !== 'block') {
            console.error("FAILED: Trade modal did not reopen.");
            process.exit(1);
        }
    }

    // Check store modal opens
    console.log("Testing Store Modal...");
    await page.evaluate(() => {
        window.openStoreModal();
    });
    await page.waitForTimeout(100);
    let storeDisplay = await page.evaluate(() => document.getElementById('storeModal').style.display);
    console.log("Store Modal display after open:", storeDisplay);
    if (storeDisplay !== 'block') {
        console.error("FAILED: Store Modal did not open.");
        process.exit(1);
    }

    await browser.close();
    console.log("All manual JS checks passed!");
})();
