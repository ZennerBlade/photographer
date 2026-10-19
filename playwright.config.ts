import { defineConfig, devices } from '@playwright/test';

// Browser comes from PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers (chromium-1194). Never run `playwright install`.
export default defineConfig({
  testDir: './e2e',
  timeout: 60_000,
  reporter: 'list',
  use: { baseURL: 'http://localhost:4173', ...devices['Pixel 5'], viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 },
  webServer: { command: 'bun run build && bun run preview -- --port 4173', url: 'http://localhost:4173', reuseExistingServer: true, timeout: 120_000 },
});
