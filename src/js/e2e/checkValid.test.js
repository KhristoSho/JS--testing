import puppeteer from "puppeteer";

describe("valid card number", () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      devtools: true,
    });
    page = await browser.newPage();
  });

  test("Should create text if isValid", async () => {
    jest.setTimeout(5000);
    await page.goto("http://localhost:9000");
    await page.waitFor(".card-form");

    const form = await page.$(".card-form");
    const input = await form.$(".card-form__input");
    const button = await form.$(".card-form__button");

    await input.fill("4111111111111111");
    await button.click();
    await page.waitFor(".valid");

    const valid = await page.$(".valid");
    expect(valid.textContent).toBe("Номер карты валиден");
  });

  afterEach(async () => {
    await browser.close();
  });
});
