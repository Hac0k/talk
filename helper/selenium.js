'use strict';

require('chromedriver');
require('geckodriver');

const { Builder, By, until, Key } = require('selenium-webdriver');

let driver;

async function setupDriver(rootUrl) {
  const driverBuilder = new Builder()
    .forBrowser('firefox');

  driver = driverBuilder.build();

  await driver.get(rootUrl);
}

async function cleanupDriver() {
  if (driver) {
    await driver.close();
    await driver.quit();
  }
}

async function refresh() {
  await driver.navigate().refresh();
}

async function stallDriver(millis) {
  await driver.sleep(millis);
}

async function getElement(method, selector) {
  const element = await driver.wait(
    until.elementLocated(method(selector)),
    2000,
  );

  return driver.wait(until.elementIsVisible(element), 2000);
}

function getElementByCssSelector(selector) {
  return getElement(By.css, selector);
}

function getElementByName(name) {
  return getElement(By.name, name);
}

function getElementById(id) {
  return getElement(By.id, id);
}

async function getCurrentUrl() {
  return await driver.getCurrentUrl();
}

async function getTitle() {
  return await driver.getTitle();
}
async function goTo(url) {
  await driver.navigate()
    .to(url)
    .catch(console.error);
}
module.exports = { stallDriver, goTo, getTitle, getElementById, refresh, setupDriver, cleanupDriver, getElementByCssSelector, getElementByName, getCurrentUrl, Key};
