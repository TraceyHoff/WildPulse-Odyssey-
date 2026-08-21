const { test, expect } = require('@playwright/test');

test.describe('Tiered Items Test', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');

        await page.evaluate(() => {
            localStorage.setItem('wildpulse_has_seen_intro', 'true');
            localStorage.setItem('wildpulse_player_color', '#FFFFFF');
            localStorage.setItem('wildpulse_p1_level', '10');
            localStorage.setItem('wildpulse_stats', JSON.stringify({ coins: 1000 }));
            // Add a tiered item to inventory to test store integration
            localStorage.setItem('wildpulse_inventory', JSON.stringify([{ name: 'Healing Juice Bottle (Tier 3)', quantity: 1 }]));
        });

        await page.reload();
        await page.click('#startGameBtn');
        await page.waitForFunction(() => window.gameStarted === true);
    });

    test('Verify tiered item appears in store sell list', async ({ page }) => {
        await page.waitForTimeout(1000);

        // Let's forcefully display the modal and call updateStoreUI.
        await page.evaluate(() => {
            const modal = document.getElementById('storeModal');
            if (modal) {
                modal.style.display = 'block';
                window.p1ActiveModal = 'storeModal';
                if (window.updateStoreUI) window.updateStoreUI();
            }
        });

        await page.waitForSelector('#storeModal', { state: 'visible' });

        // Find the specific text inside the store content
        const storeContent = await page.locator('#storeContent').innerHTML();
        expect(storeContent).toContain('Healing Juice Bottle (Tier 3)');
        expect(storeContent).toContain('Sold Out'); // Buy button should say this since stock is 0

        console.log("Test passed!");
    });
});
