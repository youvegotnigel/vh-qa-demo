import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Accessibility Testing Demo", () => {


  test("CDC Dengue page should have only one WCAG violations", async ({page}, testInfo) => {
    await page.goto(`https://www.cdc.gov/dengue/about/index.html`);

    // wait for content to load
    await page.waitForLoadState("domcontentloaded");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .analyze();

    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: "application/json",
    });

    expect(accessibilityScanResults.violations).toHaveLength(2);
  });


  test("CDC Dengue page should have only two WCAG violations", async ({page}, testInfo) => {
    await page.goto(`https://www.cdc.gov/dengue/about/index.html`);

    // wait for content to load
    await page.waitForLoadState("domcontentloaded");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      // .withRules([
      //    "skip-link"
      // ])
      .analyze();

    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: "application/json",
    });

    expect(accessibilityScanResults.violations).toHaveLength(2);


    
  });



































  

  test("CDC Dengue page should have only one WCAG A and 2A violations", async ({ page }, testInfo) => {
    
    await page.goto(`https://www.cdc.gov/dengue/about/index.html`);

    // wait for content to load
    await page.waitForLoadState("domcontentloaded");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .withRules([
        "accesskeys",
        "aria-allowed-role",
        "aria-conditional-attr",
        "aria-deprecated-role",
        "aria-dialog-name",
        "aria-prohibited-attr",
        "aria-treeitem-name",
        "aria-text",
        "empty-heading",
        "heading-order",
        "html-xml-lang-mismatch",
        "identical-links-same-purpose",
        "image-redundant-alt",
        "input-button-name",
        "label-content-name-mismatch",
        "landmark-one-main",
        "link-in-text-block",
        "meta-viewport",
        "select-name",
        "skip-link",
        "tabindex",
        "table-duplicate-name",
        "table-fake-caption",
        "target-size",
        "td-has-header",
      ])
      .disableRules([
        "area-alt",
        "aria-braille-equivalent",
        "aria-roledescription",
        "audio-caption",
        "blink",
        "duplicate-id",
        "frame-focusable-content",
        "frame-title-unique",
        "marquee",
        "nested-interactive",
        "no-autoplay-audio",
        "role-img-alt",
        "scrollable-region-focusable",
        "server-side-image-map",
        "svg-img-alt",
      ])
      .analyze();

    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: "application/json",
    });

    expect(accessibilityScanResults.violations).toHaveLength(2);
  });


});
