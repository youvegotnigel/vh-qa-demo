import { test, expect } from "@playwright/test";

test.describe("Clock API Testing Demo", () => {

  const filePath: string = `${process.cwd()}\\pages\\clock.html`;

  test("Set Fixed Time Test", async ({ page, }, testInfo) => {
    
    // Initialize clock with some time before the test time and let the page load
    // naturally. `Date.now` will progress as the timers fire.
    await page.clock.install({ time: new Date("2024-02-02T08:00:00") });
    await page.goto(`file://${filePath}`);

    // wait for content to load
    await page.waitForLoadState("domcontentloaded");

    // Pretend that the user closed the laptop lid and opened it again at 10am,
    // Pause the time once reached that point.
    await page.clock.pauseAt(new Date("2024-02-02T10:00:00"));

    // Assert the page state.
    await expect(page.getByTestId("current-time")).toHaveText("2/2/2024, 10:00:00 AM");

    // Close the laptop lid again and open it at 10:30am.
    await page.clock.fastForward("30:00");
    await expect(page.getByTestId("current-time")).toHaveText("2/2/2024, 10:30:00 AM");
  });




  test("set fixed time", async({ page,}, testInfo) => {

    await page.clock.setFixedTime(new Date("2024-04-19T19:30:00"));
    await page.goto(`file://${filePath}`);
    await expect(page.getByTestId("current-time")).toHaveText("4/19/2024, 7:30:00 PM");

  });


});
