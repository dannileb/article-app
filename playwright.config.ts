import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [['html', { open: 'never' }]],

    snapshotPathTemplate: '{testDir}/__screenshots__/{testFilePath}/{arg}{ext}',
    expect: {
        toHaveScreenshot: {
            animations: 'disabled',
            threshold: 0.2,
        },
    },

    webServer: [
        {
            command: 'npx http-server storybook-static -p 6006',
            url: 'http://localhost:6006',
            timeout: 60000,
            reuseExistingServer: true,
        },
        {
            command: 'npm run dev',
            url: 'http://localhost:3000',
            timeout: 60000,
            reuseExistingServer: true,
        },
    ],

    projects: [
        {
            name: 'setup',
            use: {
                baseURL: 'http://localhost:3000',
            },
            testMatch: /.*\.setup\.ts/,
        },
        {
            name: 'ui-desktop',
            testDir: './tests/ui',
            use: {
                ...devices['Desktop Chrome'],
                baseURL: 'http://localhost:6006',
            },
            snapshotPathTemplate:
                '{testDir}/__screenshots__/{testFilePath}/{arg}{ext}',
        },
        {
            name: 'ui-mobile',
            testDir: './tests/ui',
            use: {
                ...devices['iPhone 15'],
                baseURL: 'http://localhost:6006',
            },
            snapshotPathTemplate:
                '{testDir}/__screenshots__/{testFilePath}/{arg}{ext}',
        },

        {
            name: 'e2e-desktop',
            testDir: './tests/e2e',
            use: {
                ...devices['Desktop Chrome'],
                baseURL: 'http://localhost:3000',
                storageState: './playwright/.auth/user.json',
            },
            dependencies: ['setup'],
        },
        {
            name: 'e2e-mobile',
            testDir: './tests/e2e',
            use: {
                ...devices['iPhone 15'],
                baseURL: 'http://localhost:3000',
                storageState: './playwright/.auth/user.json',
            },
            dependencies: ['setup'],
        },
    ],
});
