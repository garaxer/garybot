const puppeteer = require('puppeteer');

const ACCEPT_SELECTOR = '#tAndCForm\\:confirmButton';
const REGO_SELECTOR = '#vehicleSearchForm\\:plateNumber';
const SEARCH_SELECTOR = '#vehicleSearchForm\\:confirmButton';
const REGISTERED_SELECTOR = '#j_id_2a > dl:nth-child(2) > dd:nth-child(2)';
(async () => {
  const browser = await puppeteer.launch();
  //const browser = await puppeteer.launch({headless: false}); //to watch what it  does
  const page = await browser.newPage();
  await page.goto('https://www.service.transport.qld.gov.au/checkrego/application/VehicleSearch.xhtml');
  await page.waitFor(2000);
  await page.click(ACCEPT_SELECTOR);
  await page.waitForNavigation();
  await page.click(REGO_SELECTOR);
  await page.keyboard.type(query);
  await page.click(SEARCH_SELECTOR);
  await page.waitForNavigation();
  const registered = await page.evaluate((sel) => {
    let element = document.querySelector(sel);
    return element? element.innerHTML: null;
  }, REGISTERED_SELECTOR);

  console.log("Vehicle is " + registered);
  await page.screenshot({path: 'registered.png'});
  await browser.close();
  return registered;
})();
