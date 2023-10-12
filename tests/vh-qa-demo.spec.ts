import { test, expect} from '@playwright/test';


test.describe('Test VitalHub Site', () => {

    test('has title', async ({ page }, testInfo) => {
        await page.goto('https://www.vitalhub.lk/');

        // Capture a screenshot and attach it
        const screenshot = await page.screenshot();
        await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
      
        // Expect a title "to contain" a substring.
        await expect(page).toHaveTitle(/VitalHub Innovations Lab/);
    });

});


  