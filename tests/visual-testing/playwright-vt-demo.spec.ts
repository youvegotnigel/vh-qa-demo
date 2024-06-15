import { test, expect } from '@playwright/test';


test.describe('Playwright Visual Test Demo', () => {


    test('Visual Comparison Failing Test', async ({ page }) => {

        const filePath: string = `${process.cwd()}\\pages\\riddle.html`;

        await page.goto(`file://${filePath}`);
        
        expect(await page.screenshot({
            fullPage: true
        })).toMatchSnapshot('riddle.png');

    });


    test('Visual Comparison Passing Test', async ({ page }) => {

        await page.goto(`https://www.vitalhub.lk/`);

        // wait for content to load
        await page.waitForLoadState('domcontentloaded');
        
        expect(await page.screenshot({
            fullPage: true
        })).toMatchSnapshot('Vitalhub Home Page.png');

    });

});