const { chromium } = require('playwright');
(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // Add console listener
    page.on('console', msg => console.log('BROWSER:', msg.text()));

    const html = `
    <!DOCTYPE html>
    <html>
    <head><script src="https://cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser.min.js"></script></head>
    <body>
    <script>
        new Phaser.Game({
            type: Phaser.HEADLESS,
            physics: { default: 'arcade' },
            scene: {
                create: function() {
                    let group = this.physics.add.staticGroup();

                    // Create texture
                    let g = this.add.graphics();
                    g.fillStyle(0xff0000);
                    g.fillRect(0, 0, 400, 400);
                    g.generateTexture('tex', 400, 400);

                    let sprite = group.create(150, 150, 'tex');
                    sprite.setCrop(50, 50, 100, 100);
                    sprite.setDisplayOrigin(50 + 50, 50 + 50);

                    sprite.body.setSize(100, 100);
                    sprite.body.setOffset(50, 50);

                    console.log("Body bounds (setSize+setOffset):", sprite.body.x, sprite.body.y, sprite.body.width, sprite.body.height);

                    // Let's manually set body.x and body.y instead, which is known to work for static bodies in Phaser 3.55
                    sprite.body.x = 100;
                    sprite.body.y = 100;
                    sprite.body.width = 100;
                    sprite.body.height = 100;
                    console.log("After manual body setting:", sprite.body.x, sprite.body.y, sprite.body.width, sprite.body.height);
                }
            }
        });
    </script>
    </body>
    </html>
    `;

    await page.setContent(html);
    await page.waitForTimeout(2000);

    await browser.close();
})();
