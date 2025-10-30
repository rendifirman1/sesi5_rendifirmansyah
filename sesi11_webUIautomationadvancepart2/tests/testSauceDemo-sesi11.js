import { Builder, By } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import { expect } from "chai";
import PageLogin from "../pages/page_login.js";

import fs from "fs";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

describe("SauceDemo Automation Test", function () {
  this.timeout(30000);
  let driver;

  // Hooks
  before(async function () {
    const options = new chrome.Options();
    options.addArguments("--incognito");
    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();
  });

  after(async function () {
    if (driver) {
      await driver.sleep(2000);
      await driver.quit();
    }
  });

  // Test Case 1: Login berhasil
  it("Should log in successfully", async function () {
    await driver.get("https://www.saucedemo.com");

    // POM
    const inputUsername = await driver.findElement(PageLogin.inputUsername);
    const inputPassword = await driver.findElement(PageLogin.inputPassword);
    const buttonLogin = await driver.findElement(PageLogin.buttonLogin);

    await inputUsername.sendKeys("standard_user");
    await inputPassword.sendKeys("secret_sauce");
    await buttonLogin.click();

    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.equal("https://www.saucedemo.com/inventory.html");

    const productTitle = await driver
      .findElement(By.xpath("//span[@data-test='title']"))
      .getText();
    expect(productTitle).to.equal("Products");
  });

  // Test Case 2: Sorting produk dari Z ke A
  it("Should sort product names from Z to A", async function () {
    const dropdownSort = await driver.findElement(
      By.xpath('//select[@data-test="product-sort-container"]')
    );
    await dropdownSort.click();

    const optionZA = await driver.findElement(
      By.xpath('//option[@value="za"]')
    );
    await optionZA.click();

    const selectedOption = await driver
      .findElement(By.xpath('//select[@data-test="product-sort-container"]'))
      .getAttribute("value");

    expect(selectedOption).to.equal("za");
  });

  // Test Case 3: Visual Comparison Test
  it("Should match login page visual with baseline", async function () {
    await driver.get("https://www.saucedemo.com");

    const image = await driver.takeScreenshot();
    const imgBuffer = Buffer.from(image, "base64");
    fs.writeFileSync("current.png", imgBuffer);

    if (!fs.existsSync("baseline.png")) {
      fs.copyFileSync("current.png", "baseline.png");
      console.log("Baseline image saved.");
    }

    const baseline = PNG.sync.read(fs.readFileSync("baseline.png"));
    const current = PNG.sync.read(fs.readFileSync("current.png"));
    const { width, height } = baseline;
    const diff = new PNG({ width, height });

    const numDiffPixels = pixelmatch(
      baseline.data,
      current.data,
      diff.data,
      width,
      height,
      { threshold: 0.1 } 
    );

    fs.writeFileSync("diff.png", PNG.sync.write(diff));

    if (numDiffPixels > 0) {
      console.log(`Visual differences found! Pixels different: ${numDiffPixels}`);
    } else {
      console.log("No visual differences found.");
    }

    expect(numDiffPixels).to.equal(
      0,
      `Visual difference detected! Pixels different: ${numDiffPixels}`
    );
  });
});
