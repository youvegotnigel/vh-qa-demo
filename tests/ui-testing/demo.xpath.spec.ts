import { test, expect } from '@playwright/test';
import exp from 'constants';

test.describe('Demo XPath Tests', () => {


    test('Verify username input with relative locator', async ({ page }, testInfo) => {
        await page.goto('https://www.saucedemo.com/');

        await expect(page).toHaveTitle(/Swag Labs/);

        const userNameInput = page.locator("//input[@id='user-name']");
        const passwordInput = page.locator("//input[@id='password']");
        const loginButton = page.locator("//input[@id='login-button']");

        await userNameInput.fill("standard_user");
        // Verify input value
        await expect(userNameInput).toHaveValue("standard_user")

        await passwordInput.fill("secret_sauce");
        await page.click("#login-button")

        await expect(page.locator(".app_logo")).toHaveText("Swag Labs")
        await page.close();
    });


        test('Verify username input with relative locator xpath Prefix', async ({ page }, testInfo) => {
        await page.goto('https://www.saucedemo.com/');

        await expect(page).toHaveTitle(/Swag Labs/);

        const userNameInput = page.locator("xpath=.//input[@id='user-name']");
        const passwordInput = page.locator("xpath=.//input[@id='password']");
    
        await userNameInput.fill("standard_user");
        // Verify input value
        await expect(userNameInput).toHaveValue("standard_user")


        await passwordInput.fill("secret_sauce");
        await page.click("xpath=.//input[@id='login-button']")

        await expect(page.locator(".app_logo")).toHaveText("Swag Labs")
        await page.close();
    });

});