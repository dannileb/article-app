import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        baseURL: process.env.DOCKER
            ? 'http://storybook:6006'
            : 'http://localhost:6006',
    },
    snapshotPathTemplate: '{testDir}/__screenshots__/{testFilePath}/{arg}{ext}',
    expect: {
        toHaveScreenshot: {
            animations: 'disabled',
            threshold: 0.2,
        },
    },
    projects: [
        {
            name: 'desktop',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'mobile',
            use: {
                ...devices['iPhone 15'],
            },
        },
    ],
    webServer: process.env.CI
        ? {
              command: 'npx http-server storybook-static -p 6006',
              url: 'http://localhost:6006',
              timeout: 60000,
              reuseExistingServer: true,
          }
        : undefined,
});
