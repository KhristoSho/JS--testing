import puppeteer from "puppeteer";
import { fork } from "child_process";
import path from "path";


jest.setTimeout(30000);

describe("valid card number", () => {
  let browser;
  let page;
  let server;
  const baseUrl = "http://localhost:9000";

  beforeAll(async () => {
    server = fork(path.join(__dirname, "../../../e2e.server.js"));

    await new Promise((resolve, reject) => {
      server.on("error", (err) => {
        console.error("Server error", err);
        reject(err);
      });
      server.on("message", (message) => {
        if (message === "ok") {
          console.log("Server started successfully");
          resolve();
        }
      });

      setTimeout(() => {
        reject(new Error("Server startup timeput"));
      }, 15000);
    });

    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    page = await browser.newPage();
    console.log("Browser launcged");
  });

  afterAll(async () => {
    if (browser) {
      await browser.close();
      console.log("Browser closed");
    }
    if (server) {
      server.kill();
      console.log("Server killed");
    }
  });

  beforeEach(async () => {
    await page.goto(baseUrl);
    await page.waitForSelector(".card-form", { timeout: 1000 });
  });

  test("Should create text if isValid", async () => {

    const form = await page.$(".card-form");
    const input = await form.$(".card-form__input");
    const button = await form.$(".card-form__button");

    await input.type("4111111111111111");
    await button.click();
    await page.waitForSelector(".valid");

    const valid = await page.$(".valid");
    expect(!!valid).toBe(true);
  });
});
