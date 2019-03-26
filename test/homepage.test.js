'use strict';
const { stallDriver, goTo, setupDriver, cleanupDriver, getElementByName, getElementByCssSelector, Key, getTitle } = require('../helper/selenium');

describe('test hompage',  () => {
  beforeEach(() => setupDriver('http://www.google.com'));
  afterEach(() => cleanupDriver());

  it('test open', async () => {
    const search = await getElementByName('q');

    await search.sendKeys('intellisys', Key.ENTER);
    expect(await getTitle()).toEqual('intellisys - Buscar con Google');
  });

  it('test search', async () => {
    const search = await getElementByName('q');

    await search.sendKeys('intellisys', Key.ENTER);
    await stallDriver(1000);
    const webpage = await getElementByCssSelector('.g > link'),
      link = await webpage.getAttribute('href');


    await goTo(link);
    expect(await getTitle()).toEqual('intellisys - Buscar con Google');
  });
});
