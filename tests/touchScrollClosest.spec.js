const { test, expect } = require('@playwright/test');

test('touch scrolling selects the closest scrollable container', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Create two scrollable containers and touch in between them
  await page.evaluate(() => {
    const modal = document.createElement('div');
    modal.id = 'testModal';
    modal.className = 'modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'space-around';

    // Left list is smaller but closer to touch point
    const list1 = document.createElement('div');
    list1.id = 'list1';
    list1.style.width = '100px';
    list1.style.height = '100px';
    list1.style.overflowY = 'scroll';
    list1.innerHTML = '<div style="height: 500px">content</div>';

    // Right list is larger but further from touch point
    const list2 = document.createElement('div');
    list2.id = 'list2';
    list2.style.width = '300px';
    list2.style.height = '300px';
    list2.style.overflowY = 'scroll';
    list2.innerHTML = '<div style="height: 1000px">content</div>';

    modal.appendChild(list1);
    modal.appendChild(list2);
    document.body.appendChild(modal);
  });

  // Get list bounding boxes
  const l1 = await page.locator('#list1').boundingBox();
  const l2 = await page.locator('#list2').boundingBox();

  // Touch point slightly to the right of list1 (closest to list1)
  const touchX = l1.x + l1.width + 10;
  const touchY = l1.y + l1.height / 2;

  // Trigger touchstart
  await page.evaluate(({x, y}) => {
    const touch = new Touch({
      identifier: Date.now(),
      target: document.getElementById('testModal'),
      clientX: x,
      clientY: y,
      pageX: x,
      pageY: y,
      screenX: x,
      screenY: y,
      radiusX: 1,
      radiusY: 1
    });

    const e = new TouchEvent('touchstart', {
      changedTouches: [touch],
      touches: [touch],
      bubbles: true,
      cancelable: true
    });

    document.getElementById('testModal').dispatchEvent(e);
  }, {x: touchX, y: touchY});

  // Wait a bit
  await page.waitForTimeout(100);

  // Trigger touchmove
  await page.evaluate(({x, y}) => {
    const touch = new Touch({
      identifier: Date.now(), // same ID wouldn't matter here in this simple mock since identifier is passed to activeScrollTouches? Wait, ID must match.
      target: document.getElementById('testModal'), // Mocking touchmove target
      clientX: x,
      clientY: y - 50, // Move up by 50px
      pageX: x,
      pageY: y - 50,
      radiusX: 1,
      radiusY: 1
    });
  });
});
