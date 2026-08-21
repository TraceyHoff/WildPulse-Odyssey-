const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');
    // Start game, add egg
    await page.evaluate(() => {
        window.gameStarted = true;
        window.collectedCreatures = [
            {
                id: 'egg_123',
                name: 'Mysterious Egg',
                isEgg: true,
                eggProgress: 500,
                eggHatchSteps: 1000,
                stored: false
            },
            {
                id: 'egg_456',
                name: 'Mysterious Egg',
                isEgg: true,
                eggProgress: 1000,
                eggHatchSteps: 1000,
                stored: false
            }
        ];
        window.openInventoryModal(1);
    });
    await new Promise(r => setTimeout(r, 100000));
    await browser.close();
})();
