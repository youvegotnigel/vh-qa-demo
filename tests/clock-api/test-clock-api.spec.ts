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


  test("Synopsis advance time to verify logout", async({ page,}, testInfo) => {

    await page.clock.install({ time: new Date("2024-02-02T08:00:00") });
    await page.goto(`http://www.betterpreop.com/Log.do`);

    // await page.clock.pauseAt(new Date("2024-02-02T10:00:00"));
    // await expect(page.getByTestId("current-time")).toHaveText("2/2/2024, 10:00:00 AM");
    await page.locator("[name=userName]").fill("AmilaS");
    await page.locator("[name=password]").fill("amila@123");
    await page.locator("[name=method]").click();

    await expect(page.getByText('Hello Amila Silantha, welcome to Synopsis iQ')).toBeVisible()

    await page.clock.fastForward("59:00");

    await expect(page.getByText('Hello Amila Silantha, welcome to Synopsis iQ')).toBeVisible()

  });


  test("TREAT advance time to verify logout", async({ page,}, testInfo) => {

    await page.clock.install({ time: new Date("2024-07-03T12:00:00") });
    await page.goto(`http://vhvmdvtrtqaapp7.vh.local:8080/treat/logon`);


    await page.locator("#orgUserID").fill("NSDCS");
    await page.locator("#btnContinue").click();

    await page.locator("#username").fill("hinext_automation");
    await page.locator("#password").fill("password");
    await page.getByRole('button', { name: 'Log On' }).click({ timeout: 60000 });


    await expect(page.getByText('Automation User, NSDCS')).toBeVisible()

    await page.clock.fastForward("30:00");

    await expect(page.getByText('Automation User, NSDCS')).toBeVisible()

  });




  
});
