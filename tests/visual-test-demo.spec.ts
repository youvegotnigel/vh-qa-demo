import { test, expect } from '@playwright/test';
import {
    BatchInfo,
    Configuration,
    EyesRunner,
    ClassicRunner,
    VisualGridRunner,
    BrowserType,
    DeviceName,
    ScreenOrientation,
    Eyes,
    Target
} from '@applitools/eyes-playwright';

const URL = 'https://www.ebay.com/';

// Applitools
// export const USE_ULTRAFAST_GRID: boolean = true;
export const USE_ULTRAFAST_GRID: boolean = false;
export let Batch: BatchInfo;
export let Config: Configuration;
export let Runner: EyesRunner;
let eyes: Eyes;
// end of Applitools

// beforeAll for Applitools
test.beforeAll(async () => {

    if (USE_ULTRAFAST_GRID) {
        Runner = new VisualGridRunner({ testConcurrency: 5 });
    }
    else {
        Runner = new ClassicRunner();
    }

    const runnerName = (USE_ULTRAFAST_GRID) ? 'Ultrafast Grid' : 'Classic runner';
    Batch = new BatchInfo({ name: `ebay website - ${runnerName}` });

    Config = new Configuration();
    Config.setApiKey("<API-KEY>");

    Config.setBatch(Batch);
    if (USE_ULTRAFAST_GRID) {
        Config.addBrowser(800, 600, BrowserType.CHROME);
        Config.addBrowser(1600, 1200, BrowserType.FIREFOX);
        Config.addBrowser(1024, 768, BrowserType.SAFARI);
        Config.addDeviceEmulation(DeviceName.iPhone_11_Pro, ScreenOrientation.PORTRAIT);
        Config.addDeviceEmulation(DeviceName.iPad_Pro, ScreenOrientation.LANDSCAPE);
        Config.addDeviceEmulation(DeviceName.Pixel_5, ScreenOrientation.PORTRAIT);
    }
});


test.beforeEach(async ({ page }) => {
    //Applitools
    eyes = new Eyes(Runner, Config);
    await eyes.open(
        page,
        'ebay',
        test.info().title,
        { width: 1024, height: 768 }
    );
    //end of Applitools

    await page.goto(URL);
});


test.afterEach(async () => {
    await eyes.close();
});


test.afterAll(async () => {
    // forces Playwright to wait synchronously for all visual checkpoints to complete.
    const results = await Runner.getAllTestResults();
    console.log('Visual test results', results);
});


test.describe('ebay website', () => {

    test('Test Home Page', async ({ page }) => {

        await expect(page).toHaveTitle(/Electronics, Cars, Fashion, Collectibles & More | eBay/);

        // https://applitools.com/docs/api-ref/sdk-api/playwright/js-intro/checksettings#region-match-levels
        // Ignore colors: Similar to the strict match level but ignores changes in colors.
        await eyes.check('Home Page', Target.window().fully().ignoreColors());
    });


    test('Test Electronics Page', async ({ page }) => {

        await page.getByRole('link', { name: 'Electronics' }).click();

        const title_banner = await page.locator('//h1').textContent()
        await expect(title_banner).toEqual('Electronics');
        await page.waitForLoadState('domcontentloaded');

        // https://applitools.com/docs/api-ref/sdk-api/playwright/js-intro/checksettings#region-match-levels
        // Layout: Check only the layout and ignore actual text and graphics.
        await eyes.check('Electronics Page', Target.window().fully().layout());
    });


    test('Test Register Page', async ({ page }) => {

        await page.getByRole('link', { name: 'register' }).click();
        await expect(page.getByRole('heading', { name: 'Create an account' })).toBeVisible()
        await page.waitForLoadState('domcontentloaded');

        // https://applitools.com/docs/api-ref/sdk-api/playwright/js-intro/checksettings
        await eyes.check('Register Page', Target.window().fully());
    });


});
