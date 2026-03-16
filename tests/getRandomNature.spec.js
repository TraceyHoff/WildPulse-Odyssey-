const { test, expect } = require('@playwright/test');

test.describe('window.getRandomNature', () => {
  test('handles empty window.natures array', async ({ page }) => {
    // Navigate to the index page where window.natures and getRandomNature are defined
    await page.goto('file://' + __dirname + '/../index.html');

    // Check what getRandomNature returns when natures is empty
    const result = await page.evaluate(() => {
      // Store original natures to restore later if needed
      const originalNatures = window.natures;

      try {
        // Empty the natures array
        window.natures = [];

        // Call the function and see what it returns or if it throws
        const nature = window.getRandomNature();
        return { success: true, nature };
      } catch (e) {
        return { success: false, error: e.message };
      } finally {
        // Restore
        window.natures = originalNatures;
      }
    });

    // If window.natures is empty, validNatures becomes empty.
    // validNatures.length is 0. Math.floor(Math.random() * 0) is 0.
    // validNatures[0] on an empty array returns undefined.
    // We should expect undefined.
    expect(result.success).toBe(true);
    expect(result.nature).toBeUndefined();
  });
});
