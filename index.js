import express from 'express';
const app = express();
const port = 3010;
import path from 'path';
import puppeteer from 'puppeteer';

app.use(express.static('static'));

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch({ headless: false });

  // Create a page
  const page = await browser.newPage();

  // Go to your site
  await page.goto('https://identity.wpengine.com/');

  // Query for an element handle.
  const element = await page.waitForSelector('input > #idp-discovery-username');
  const next = await page.waitForSelector('input > #idp-discovery-submit');

  await element.fill('jonas.mooney@mtec.edu');

  await next.click();

  // Dispose of handle
  await element.dispose();

  // Close browser.
  await browser.close();
})();
