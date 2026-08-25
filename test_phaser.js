const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3001/test_phaser.html');

  const hasGetAll = await page.evaluate(() => {
      return typeof Phaser.Input.Gamepad.GamepadPlugin.prototype.getAll === 'function';
  });
  console.log('hasGetAll:', hasGetAll);
  await browser.close();
})();
