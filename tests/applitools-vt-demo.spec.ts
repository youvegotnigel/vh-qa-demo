import { test } from '@playwright/test';
import {
    BatchInfo,
    Configuration,
    EyesRunner,
    ClassicRunner,
    Eyes,
    Target
} from '@applitools/eyes-playwright';

const URL = `file://${process.cwd()}\\pages\\riddle.html`;
const VIEWPORT_HEIGHT = 1200;
const VIEWPORT_WIDTH = 1600;

// Applitools
export let Batch: BatchInfo;
export let Config: Configuration;
export let Runner: EyesRunner;
let eyes: Eyes;
// end of Applitools


// beforeAll for Applitools
test.beforeAll(async () => {

    Runner = new ClassicRunner();
    Batch = new BatchInfo({ name: `Riddles Demo Website - Classic Runner` });
    Config = new Configuration();
    Config.setApiKey("<API-KEY>");
    Config.setBatch(Batch);
});

test.beforeEach(async ({ page }) => {
    //Applitools
    eyes = new Eyes(Runner, Config);
    await eyes.open(
        page,
        'Riddles Demo',
        test.info().title,
        { width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT }
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


test.describe('Applitools Visual Test Demo', () => {


    test('Visual Comparison', async ({ page }) => {

        await page.goto(URL);

        await eyes.check('Riddle Page', Target.window().fully());

    });

});