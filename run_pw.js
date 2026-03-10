const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err));

    // Convert to file URI
    const uri = 'file://' + path.resolve('./index.html');
    await page.goto(uri);

    await page.evaluate(() => {
        if (!window.collectedCreatures) console.log("Missing collectedCreatures");
        else console.log("collectedCreatures length:", window.collectedCreatures.length);

        // Let's spawn a storage creature and see if things work
        const c1 = JSON.parse(JSON.stringify(window.collectedCreatures[0]));
        c1.id = "c1"; c1.stored = true;
        const c2 = JSON.parse(JSON.stringify(window.collectedCreatures[0]));
        c2.id = "c2"; c2.stored = false;

        window.collectedCreatures.push(c1);
        window.collectedCreatures.push(c2);

        window.openPartyModal();
        let partyList = document.getElementById('partyList').innerHTML;
        console.log("Party List has " + document.querySelectorAll('.party-card').length + " cards");

        window.openStorageModal();
        console.log("Storage List has " + document.querySelectorAll('#storageModal .party-card').length + " cards");
    });

    await browser.close();
})();
