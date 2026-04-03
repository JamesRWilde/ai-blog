const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
  testDir: './tests',
  timeout: 60000,
  use: { baseURL: 'http://localhost:3001' },
  projects: [{ name: 'node', use: { launchOptions: { headless: true } } }],
});
