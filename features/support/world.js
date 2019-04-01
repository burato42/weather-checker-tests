const { setDefaultTimeout, setWorldConstructor } = require('cucumber');
const { Builder, until } = require('selenium-webdriver');
let chrome = require('selenium-webdriver/chrome');


function CustomWorld({ parameters }) {
    this.parameters = parameters;
    // Run chrome browser either in headless or in normal mode
    if (this.parameters.mode == 'headless') {
        this.driver = new Builder()
            .forBrowser('chrome')
            .setChromeOptions(new chrome.Options()
                .addArguments('--headless', '--no-gpu', '--no-sandbox', '--window-size=1920,1080'))
            .build();
    } else {
        this.driver = new Builder()
            .forBrowser('chrome')
            .build();
    }

    // Returns a promise that resolves to the element
    this.waitForElement = function (locator) {
        var condition = until.elementLocated(locator);
        return this.driver.wait(condition);
    }
}

setDefaultTimeout(30 * 1000);
setWorldConstructor(CustomWorld);