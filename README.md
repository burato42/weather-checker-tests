# Weather Checker tests 

It's a simple BDD framework to test Weather Checker website. The test examples are focused on the main functions of the system and are based on the requirements.

Cucumber was chosen as a BDD framework as it's the only BDD framework in JavaScript world. JavaScript was chosen as a programming language as it's pretty boring to reimplement (copy-paste) the [same](https://github.com/burato42/yieldify) in Python.
Potentially, the framework could be extended with Page Object model but it's not necessary as we use Cucumber and can group steps in different files in *step_definition* folder.
The implementation is working with Chrome browser but could be easily extended with other browsers.

## Run tests locally

Prerequisites:
- Install NodeJS v10 and npm https://docs.npmjs.com/downloading-and-installing-node-js-and-npm 
- Chrome browser https://www.google.com/chrome/

Install dependencies
```
npm i
```

Run tests
```
npm test
```

Run tests in headless mode
```
./node_modules/.bin/cucumber-js --world-parameters '{"url": "https://serene-mountain-14043.herokuapp.com/","mode": "headless"}'
```
(I did't figure out how to escape quotes in JSON in package.json file :) )

## Run tests in Docker

Build a container
```
docker build -t weather-checker-tests -f Dockerfile .
```

Run the tests inside the container
```
docker run -v /dev/shm:/dev/shm -i weather-checker-tests ./node_modules/.bin/cucumber-js --world-parameters'{"url": "https://serene-mountain-14043.herokuapp.com/","mode": "headless"}'
```

## How to run test independently from the backend development pipeline
Basically, *weather-app-api* responds data about the weather at some place. The easiest way to test the frontend application is by mocking the response of the API. In our case, it should be JSON containing information we need to test our frontend application. 
One of the solutions could be the creation of a web server which the frontend application would use as a backend. 
For instance, for different inputs, it would respond with the data we want to check.
Another option is using tools like [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy) in order to manipulate traffic.


## How to run tests in a CI pipeline
These tests could be run by developers/testers at any integration point (on a push to the VCS for example) but with a mocked backend. With docker containers the delivery process should be easy as an App URL we can configure and the backend URL can be configured in the application itself.
Then the tests could be run in the CI system in the container using headless mode for example at other integration points (deployment to Dev or/and Staging environments) with a corresponding real backend.