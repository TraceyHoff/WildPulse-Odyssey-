const { test, expect } = require('@playwright/test');

test('Delete progress clears session storage and caches', async ({ page, context }) => {
    // Start tracing and video recording
    await context.tracing.start({ screenshots: true, snapshots: true });

    await page.goto('http://localhost:3000/');

    // Bypass intro to get to the main menu
    await page.evaluate(() => {
        localStorage.setItem('wildpulse_has_seen_intro', 'true');
        localStorage.setItem('wildpulse_player_color', '#FFFFFF');
    });

    // We can just call deleteProgress directly once window is loaded
    await page.waitForFunction(() => typeof window.deleteProgress === 'function', { timeout: 10000 });

    // Set some data
    await page.evaluate(() => {
        window.coopActive = false;
        localStorage.setItem('wildpulse_test', '123');
        sessionStorage.setItem('wildpulse_session_test', '456');
    });

    // Mock caches and indexedDB
    await page.evaluate(async () => {
        if ('caches' in window) {
            const cache = await caches.open('test-cache');
            await cache.put('/test', new Response('Hello'));
        }

        return new Promise((resolve) => {
            const request = indexedDB.open('test-db', 1);
            request.onsuccess = () => {
                request.result.close();
                resolve();
            };
        });
    });

    // Mock confirm
    await page.evaluate(() => {
        window.showConfirm = (p, t, m, cb) => {
            cb();
        };
    });

    // Listen for the reload navigation
    const navigationPromise = page.waitForNavigation();

    // Call deleteProgress
    await page.evaluate(async () => {
        window.deleteProgress(1);
    });

    // Wait for the reload to complete
    await navigationPromise;

    // Verify localStorage and sessionStorage after the page reloaded
    const lsTest = await page.evaluate(() => localStorage.getItem('wildpulse_test'));
    const ssTest = await page.evaluate(() => sessionStorage.getItem('wildpulse_session_test'));

    expect(lsTest).toBeNull();
    expect(ssTest).toBeNull();

    const cachesCount = await page.evaluate(async () => {
        if ('caches' in window) {
            const keys = await caches.keys();
            return keys.length;
        }
        return 0;
    });

    expect(cachesCount).toBe(0);

    const idbCount = await page.evaluate(async () => {
        if (window.indexedDB && window.indexedDB.databases) {
            const dbs = await window.indexedDB.databases();
            return dbs.length;
        }
        return 0;
    });

    expect(idbCount).toBe(0);

    // Save screenshot
    await page.screenshot({ path: '/home/jules/verification/screenshots/delete_progress.png' });
});