import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { createHtmlReport } from "axe-html-reporter";

test.describe("Accessibility Testing Demo", () => {
  test("CDC Dengue page should have only two WCAG violations", async ({
    page,
  }, testInfo) => {
    await page.goto(`https://www.cdc.gov/dengue/about/index.html`);

    // wait for content to load
    await page.waitForLoadState("domcontentloaded");

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    // Generate HTML report
    createHtmlReport({
      results: accessibilityScanResults,
      options: {
        projectKey: "CDC_DENGUE",
        outputDir: "accessibility-reports",
        reportFileName: `accessibility-report-${testInfo.title}.html`,
      },
    });

    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: "application/json",
    });

    expect(accessibilityScanResults.violations).toHaveLength(2);
  });

  test("CDC Dengue page should have only two WCAG A or AA violations", async ({
    page,
  }, testInfo) => {
    await page.goto(`https://www.cdc.gov/dengue/about/index.html`);

    // wait for content to load
    await page.waitForLoadState("domcontentloaded");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .options({
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa"],
        },
        rules: {
          accesskeys: { enabled: true },
          "area-alt": { enabled: false },
          "aria-allowed-role": { enabled: true },
          "aria-braille-equivalent": { enabled: false },
          "aria-conditional-attr": { enabled: true },
          "aria-deprecated-role": { enabled: true },
          "aria-dialog-name": { enabled: true },
          "aria-prohibited-attr": { enabled: true },
          "aria-roledescription": { enabled: false },
          "aria-treeitem-name": { enabled: true },
          "aria-text": { enabled: true },
          "audio-caption": { enabled: false },
          blink: { enabled: false },
          "duplicate-id": { enabled: false },
          "empty-heading": { enabled: true },
          "frame-focusable-content": { enabled: false },
          "frame-title-unique": { enabled: false },
          "heading-order": { enabled: true },
          "html-xml-lang-mismatch": { enabled: true },
          "identical-links-same-purpose": { enabled: true },
          "image-redundant-alt": { enabled: true },
          "input-button-name": { enabled: true },
          "label-content-name-mismatch": { enabled: true },
          "landmark-one-main": { enabled: true },
          "link-in-text-block": { enabled: true },
          marquee: { enabled: false },
          "meta-viewport": { enabled: true },
          // https://github.com/dequelabs/axe-core/issues/2958
          "nested-interactive": { enabled: false },
          "no-autoplay-audio": { enabled: false },
          "role-img-alt": { enabled: false },
          "scrollable-region-focusable": { enabled: false },
          "select-name": { enabled: true },
          "server-side-image-map": { enabled: false },
          "skip-link": { enabled: true },
          "svg-img-alt": { enabled: false },
          tabindex: { enabled: true },
          "table-duplicate-name": { enabled: true },
          "table-fake-caption": { enabled: true },
          "target-size": { enabled: true },
          "td-has-header": { enabled: true },
        },
      })
      .analyze();

      
    // Generate HTML report
    createHtmlReport({
      results: accessibilityScanResults,
      options: {
        projectKey: "CDC_DENGUE",
        outputDir: "accessibility-reports",
        reportFileName: `accessibility-report-${testInfo.title}.html`,
      },
    });

    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: "application/json",
    });

    expect(accessibilityScanResults.violations).toHaveLength(2);
  });
});
