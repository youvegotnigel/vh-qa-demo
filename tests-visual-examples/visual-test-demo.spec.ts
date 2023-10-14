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

// const USERNAME = "problem_user";
const USERNAME = "standard_user";
const PASSWORD = "secret_sauce";
const URL = 'https://www.saucedemo.com/';
const VIEWPORT_HEIGHT = 1200;
const VIEWPORT_WIDTH  = 1600;


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
    Batch = new BatchInfo({ name: `sauce demo website - ${runnerName}` });

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
        'sauce demo',
        test.info().title,
        { width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT }
    );
    //end of Applitools

    await page.goto(URL);

    // login
    await page.locator('#user-name').fill(USERNAME);
    await page.locator('#password').fill(PASSWORD);
    await page.locator('#login-button').click();
    await expect(page).toHaveURL(/inventory.html/);
});


test.afterEach(async () => {
    await eyes.close();
});


test.afterAll(async () => {
    // forces Playwright to wait synchronously for all visual checkpoints to complete.
    const results = await Runner.getAllTestResults();
    console.log('Visual test results', results);
});


test.describe('sauce demo website', () => {

    test.use({ viewport: { width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT } });

    test('Test Inventory Page', async () => {

        // https://applitools.com/docs/api-ref/sdk-api/playwright/js-intro/checksettings#region-match-levels
        // Layout: Check only the layout and ignore actual text and graphics.
        await eyes.check('Inventory Page', Target.window().fully().layout());
    });


    test('Test Adding Items to Cart', async ({ page }) => {
        
        await page.locator('#add-to-cart-sauce-labs-backpack').click()
        await page.locator('#add-to-cart-sauce-labs-bolt-t-shirt').click()

        await eyes.check('Inventory Page with Items in Cart', Target.window().fully());
    });


    test('Test Cart Page', async ({ page }) => {

        await page.locator('#add-to-cart-sauce-labs-backpack').click()
        await page.locator('#add-to-cart-sauce-labs-bolt-t-shirt').click()

        await page.locator('#shopping_cart_container').click();
        await page.waitForLoadState('domcontentloaded');

        await eyes.check('Cart Page', Target.window().fully());
    });

});
