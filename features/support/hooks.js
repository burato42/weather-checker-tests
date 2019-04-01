const { After, Before } = require('cucumber');

Before(async function () {
    let baseUrl;
    if (this.parameters.url) {
        baseUrl = this.parameters.url;
    } else {
        baseUrl = "https://serene-mountain-14043.herokuapp.com/";
    }
    return await this.driver.get(baseUrl);
  });

After(async function () {
    return await this.driver.quit();
  });