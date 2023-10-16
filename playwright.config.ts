import { defineConfig, devices } from '@playwright/test';


/* Config file for Report Portal */
const RPconfig = {
  apiKey: 'nigel-test_WS7JqeOuTfGudrPAQVis0IfkHHq2WH150XE1ia821rSmUWkSiL9EP8VGq-5ZURTd',
  endpoint: 'http://10.127.91.203:8080/api/v1',
  project: 'superadmin_personal',
  launch: 'Demo',
  attributes: [
    {
      key: 'agent',
      value: 'playwright',
    },
    {
      value: 'example',
    },
  ],
  description: 'This is an example launch with playwright tests',
  restClientConfig: {
    timeout: 0,
  },
};

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  
  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: './test-results',
  preserveOutput: 'always',

   /* Maximum time wait for the condition to be met. */
  timeout: 60*1000,

  expect: {
    timeout: 5*1000,
},

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 6,

  testMatch: [/ui-test-demo.spec.ts/],

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: 'html',

  /* JUnit reporter produces a JUnit-style xml report. */
  // reporter: [['junit', { outputFile: './test-results/results.xml' }]],

  /* Blob reports contain all the details about the test run and can be used later to produce any other report. */
  // reporter: [['blob', { outputDir: 'my-report' }]],

  /* Concise 'dot' for CI, default 'list' when running locally */
  // reporter: process.env.CI ? 'dot' : 'list',
  // reporter: [['@reportportal/agent-js-playwright', RPconfig]],

    /* You can use multiple reporters at the same time */
    reporter: [
      ['list', { printSteps: true }],
      ['html', { open: 'on-failure',  outputFolder: './html-test-results' }],
      ['json', {  outputFile: './test-results/test-results.json' }],
      ['junit', { outputFile: './test-results/results.xml' }],
      // ['blob', { outputDir: './test-results/blob-report' }],
      ['@reportportal/agent-js-playwright', RPconfig]
    ],
  

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://the-internet.herokuapp.com/',

    // headless: process.env.RUN_HEADLESS?.toLowerCase() === 'true',
    // storageState: 'storageState.json',
    actionTimeout: 10 * 1000,

    /* used to take the screenshots if test fails */
    screenshot: 'only-on-failure',
    
    /* used to record the videos of tests */
    video: 'on-first-retry',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 7'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 14'] },
    },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});


