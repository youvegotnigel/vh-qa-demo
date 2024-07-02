// GitHub issue : https://github.com/dequelabs/axe-core-npm/issues/1085

import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Axe-Core-Playwright Issue #1085", () => {

    

  test("CDC Dengue page should have only two WCAG A or AA violations", async ({page}, testInfo) => {
    await page.goto(`https://www.cdc.gov/dengue/about/index.html`);

    // wait for content to load
    await page.waitForLoadState("domcontentloaded");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();

    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: "application/json",
    });

    expect(accessibilityScanResults.violations).toHaveLength(2);

  });


  
  test("CDC Dengue page should have only two WCAG A or AA violations with skip link rule", async ({page}, testInfo) => {
    await page.goto(`https://www.cdc.gov/dengue/about/index.html`);

    // wait for content to load
    await page.waitForLoadState("domcontentloaded");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .withRules([
         "skip-link"
      ])
      .analyze();

    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: "application/json",
    });

    expect(accessibilityScanResults.violations).toHaveLength(2);
    
  });


});
