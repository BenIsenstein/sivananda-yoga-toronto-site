import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright config for local UI checks against the built static site.
 * Serves `dist/` on :4330 and runs the mobile-menu tests. Dev-only; not shipped.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4330',
  },
  webServer: {
    command: 'python3 -m http.server 4330 --directory dist',
    url: 'http://localhost:4330',
    reuseExistingServer: true,
    timeout: 30_000,
  },
  // Both profiles run on Chromium (only browser installed) to stay lean.
  projects: [
    {
      name: 'iphone-12',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },
    {
      name: 'small-android',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 360, height: 640 },
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
});
