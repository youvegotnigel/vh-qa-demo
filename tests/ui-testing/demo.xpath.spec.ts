import { test, expect } from '@playwright/test';

test.describe('Demo XPath Tests', () => {


    test('Verify username input with relative locator', async ({ page }, testInfo) => {
        await page.goto('https://www.saucedemo.com/');

        await expect(page).toHaveTitle(/Swag Labs/);

        const userNameInput = page.locator("//input[@id='user-name']");  // Used XPath for locator
        const passwordInput = page.locator("//input[@id='password']");   // Used XPath for locator

        await userNameInput.fill("standard_user");
        // Verify input value
        await expect(userNameInput).toHaveValue("standard_user")

        await passwordInput.fill("secret_sauce");
        await page.click("#login-button")                               // used CSS Selector for click

        // Validation
        await expect(page.locator(".app_logo")).toHaveText("Swag Labs")

        await page.close();
    });


    test('Verify username input with relative locator xpath Prefix', async ({ page }, testInfo) => {
        await page.goto('https://www.saucedemo.com/');

        await expect(page).toHaveTitle(/Swag Labs/);

        const userNameInput = page.locator("xpath=.//input[@id='user-name']");   // Used XPath with prefix for locator
        const passwordInput = page.locator("xpath=.//input[@id='password']");    // Used XPath with prefix for locator
    
        await userNameInput.fill("standard_user");
        // Verify input value
        await expect(userNameInput).toHaveValue("standard_user")

        await passwordInput.fill("secret_sauce");
        await page.click("xpath=.//input[@id='login-button']")                  // Used XPath with prefix for Click

        // Validation
        await expect(page.locator(".app_logo")).toHaveText("Swag Labs")

        await page.close();
    });


    test('Verify username input with proper scoped XPath in Playwright', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        
        await expect(page).toHaveTitle(/Swag Labs/);

        // Parent container
        const loginContainer = page.locator("#login_button_container");

        // Child elements scoped to the container
        const userNameInput = loginContainer.locator("xpath=.//input[@id='user-name']");
        const passwordInput = loginContainer.locator("xpath=.//input[@id='password']");
        const loginButton   = loginContainer.locator("xpath=.//input[@id='login-button']");

        // Interactions
        await userNameInput.fill("standard_user");
        await expect(userNameInput).toHaveValue("standard_user");

        await passwordInput.fill("secret_sauce");
        await loginButton.click();

        // Validation
        await expect(page.locator(".app_logo")).toHaveText("Swag Labs");

        await page.close();
});


});