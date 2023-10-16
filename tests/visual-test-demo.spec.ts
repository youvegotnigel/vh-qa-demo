import { test, expect } from '@playwright/test';


test.describe('Playwright Visual Test Demo', () => {


    test('Visual Comparison', async ({ page }) => {

        await page.goto('file:///C:/dev/personal/playwright-projects/vh-qa-demo/riddle-me/riddle.html')
        //await page.goto('file://./riddle-me/riddle.html')
        
        expect(await page.screenshot({
            fullPage: true
        })).toMatchSnapshot('riddle.png');

    });

});