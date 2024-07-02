import { test, expect } from "@playwright/test";

test.describe("Clock API Testing Demo", () => {

  const filePath: string = `${process.cwd()}\\pages\\clock.html`;


  test("set fixed time", async({ page,}, testInfo) => {

    await page.clock.setFixedTime(new Date("2024-04-19T19:30:00"));
    await page.goto(`file://${filePath}`);
    await expect(page.getByTestId("current-time")).toHaveText("4/19/2024, 7:30:00 PM");

  });


  test("manually advance time", async({ page,}, testInfo) => {

    await page.clock.install({ time: new Date("2024-02-02T08:00:00") });
    await page.goto(`file://${filePath}`);

    await page.clock.pauseAt(new Date("2024-02-02T10:00:00"));
    await expect(page.getByTestId("current-time")).toHaveText("2/2/2024, 10:00:00 AM");

    await page.clock.fastForward("35:00");
    await expect(page.getByTestId("current-time")).toHaveText("2/2/2024, 10:35:00 AM");

  });




  
});
