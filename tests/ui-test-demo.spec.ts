import { test, expect } from '@playwright/test';


test.describe('Demo Tests', () => {


    test.beforeEach(async ({ page }, testInfo) => {

        await page.goto('/')

        // Capture a screenshot and attach it
        const screenshot = await page.screenshot();
        await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
        
        await expect(page).toHaveTitle(/The Internet/);
    });


    test('Hover', async ({ page }) => {

        await page.getByRole('link', { name: 'Hovers' }).click();

        await expect(page.getByText('Hovers')).toBeVisible()
        await expect(page.getByRole('heading', { name: 'Hovers' })).toBeVisible()

        await page.locator('(//*[@alt=\'User Avatar\'])[2]').hover();
        await expect(page.getByText('name: user2')).toBeVisible()
    });



    test('Login', async ({ page }) => {

        await page.getByRole('link', { name: 'Form Authentication' }).click();

        await expect(page.getByText('Login Page')).toBeVisible()
        await expect(page.getByRole('heading', { name: 'Login Page' })).toBeVisible()

        await page.locator('#username').fill("tomsmith");
        await page.locator('#password').fill("SuperSecretPassword!");
        await page.getByRole('button', { name: /Login/ }).click();

        await expect(page.getByText(/You logged into a secure area!/)).toBeVisible();
        await expect(page.locator('//h2[normalize-space()=\'Secure Area\']')).toBeVisible();
    });



    test('Dropdown', async ({ page }) => {

        await page.getByRole('link', { name: 'Dropdown' }).click();

        await expect(page.getByText('Dropdown List')).toBeVisible()
        await expect(page.getByRole('heading', { name: 'Dropdown List' })).toBeVisible()

        await page.locator('#dropdown').selectOption({ label: 'Option 2' });
        // await page.locator('#dropdown').selectOption({value:'2'});
        // await page.locator('#dropdown').selectOption({index:1}); // index will start from zero

        const value = await page.locator('#dropdown>option[selected]').textContent();
        await expect(value).toEqual('Option 2')
    });


    test('Broken Images', async ({ page, baseURL }) => {

        await page.getByRole('link', { name: 'Broken Images' }).click();
        await expect(page.getByRole('heading', { name: 'Broken Images' })).toBeVisible()
        await page.waitForLoadState('domcontentloaded');

        const images = await page.locator('img');
        const allImages = await images.all();

        for await (const img of allImages) {

            const imgSrc = await img.getAttribute('src');
            expect.soft(imgSrc?.length).toBeGreaterThan(1);

            //@ts-ignore
            if(imgSrc?.length > 1) {
                //@ts-ignore
                const res = await page.request.get(baseURL + imgSrc);
                // We can use playwright for API tests like here to validate the network status code to be 200
                expect.soft(res.status(), "Failed to load: "+ imgSrc).toBe(200);
            }
        }
    });

    
    test('Has Title', async ({ page }, testInfo) => {
        await page.goto('https://www.vitalhub.lk/');

        // Capture a screenshot and attach it
        const screenshot = await page.screenshot();
        await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });

        // Expect a title "to contain" a substring.
        await expect(page).toHaveTitle(/VitalHub Innovations Lab/);
    });
    

    test('Mutiple Windows', async ({ page }) => {

        await page.getByRole('link', { name: 'Multiple Windows' }).click();

        await expect(page.getByRole('heading', { name: 'Opening a new window' })).toBeVisible()

        await page.getByRole('link', { name: 'Click Here' }).click();

        await expect(page.getByRole('heading', { name: 'New Window' })).toBeVisible()
    });



});




