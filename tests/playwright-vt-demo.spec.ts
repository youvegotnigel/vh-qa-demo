import { test, expect } from '@playwright/test';


test.describe('Playwright Visual Test Demo', () => {


    test('Visual Comparison', async ({ page }) => {

        const filePath: string = `${process.cwd()}\\pages\\riddle.html`;

        await page.goto(`file://${filePath}`);
        
        expect(await page.screenshot({
            fullPage: true
        })).toMatchSnapshot('riddle.png');

    });

});