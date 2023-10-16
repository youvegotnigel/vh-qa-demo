import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';


test.describe('Accessibility Testing Demo', () => {


    test('VHIL home page should not have any WCAG A violations', async ({ page }) => {

        await page.goto(`https://www.vitalhub.lk/`);

        // wait for content to load
        await page.waitForLoadState('domcontentloaded');

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

        expect(accessibilityScanResults.violations).toEqual([]);


    });

});