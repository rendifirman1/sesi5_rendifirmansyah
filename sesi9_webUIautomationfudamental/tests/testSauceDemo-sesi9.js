const { Builder, By, until, Options } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');

describe('SauceDemo Automation Test ', function () {
    let driver;

    it('Should log in successfully', async function () {
        options = new chrome.Options();
        options.addArguments('--incognito');
        driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

        await driver.get('https://saucedemo.com');

        let inputUsername = await driver.findElement (By.xpath('//input[@data-test="username"]'));
        let inputPassword = await driver.findElement (By.xpath('//input[@data-test="password"]'));
        let buttonLogin = await driver.findElement (By.xpath('//input[@data-test="login-button"]'));

        await inputUsername.sendKeys('standard_user');
        await inputPassword.sendKeys('secret_sauce');
        await buttonLogin.click();

        // Validate the current URL
        const currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, 'https://www.saucedemo.com/inventory.html');

        //Validate the presence of "Products" title
        const productTitle = await driver.findElement(By.xpath("//span[@data-test='title']")).getText();
        assert.strictEqual(productTitle, 'Products');

    });

    it('Should sort product names from Z to A', async function () {
        const dropdownSort = await driver.findElement(By.xpath('//select[@data-test="product-sort-container"]'));
        await dropdownSort.click();

        // Select option “Z to A”
        const optionZA = await driver.findElement(By.xpath('//option[@value="za"]'));
        await optionZA.click();
        
        // Verify selected option value
        const selectedOption = await driver.findElement(By.xpath('//select[@data-test="product-sort-container"]')).getAttribute('value');
        assert.strictEqual(selectedOption, 'za');

        await driver.sleep(2000);
        await driver.quit();

})
});