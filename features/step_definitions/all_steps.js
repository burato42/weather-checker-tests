const assert = require('assert');
const moment = require('moment');
const { Given, When, Then } = require('cucumber');
const { By } = require('selenium-webdriver');
const match = require('./../helper.js').match


Given('the main page is open', async function () {
    await this.waitForElement(By.css('.search_3'));
});

When('the code {string} is entered', async function (postcode) {
    const inputField = await this.driver.findElement(By.css('.search_3'));
    await inputField.clear();
    await inputField.sendKeys(postcode);
    const searchButton = await this.driver.findElement(By.css('.submit_3'));
    await searchButton.click();
});

Then('{string} message is displayed', async function (message) {
    await this.waitForElement(By.css('h1'));
    const searchResult = await this.driver.findElement(By.css('h1'));
    await assert.equal(await searchResult.getText(), message);
})

Then('result table is displayed', async function () {
    await this.waitForElement(By.css('table'));
    const tableName = await this.driver.findElement(By.css('.tableHeader'));
    await assert.equal(await tableName.getText(), 'Weather details');
})

Then('current time is displayed in format {string} and it\'s correct', async function (timeFormat) {
    await this.waitForElement(By.css('table'));
    const timeValue = await this.driver.findElement(By.xpath('//tr[th="Time:"]/td'));
    const dateTime = await timeValue.getText();
    await assert.ok(Math.abs(moment(dateTime, timeFormat) - moment()) < 60 * 1000,
        `Current time ${dateTime} ins't correct`);
    await assert.ok(match(dateTime), `${dateTime} has a wrong format`);
})

Then('the property {string} is present', async function (property) {
    await this.waitForElement(By.css('table'));
    const propertyValue = await this.driver.findElement(By.xpath(`//tr[th="${property}:"]/td`));
    await assert.ok((await propertyValue).toString().trim());
})

Then('there is no property without value', async function () {
    await this.waitForElement(By.css('table'));
    const tableRows = await this.driver.findElements(By.css('tr'));
    for (const element of await tableRows) {
        let property = await element.findElement(By.css('th')).getText();
        let value = await element.findElement(By.css('td')).getText();
        await assert.ok((await value).toString().trim(), `There is no a value for the property ${property}`);
    }
})