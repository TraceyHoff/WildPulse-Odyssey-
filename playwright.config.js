const { defineConfig, devices } = require('@playwright/test');
module.exports = defineConfig({
  use: {
    video: 'on',
    screenshot: 'on',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
