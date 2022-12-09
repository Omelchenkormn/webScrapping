import puppeteer from 'puppeteer';
import chalk from 'chalk';

export const LAUNCH_PUPPETEER_OPTS = {
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--disable-gpu',
    '--window-size=1920x1080'
  ]
};

export const PAGE_PUPPETEER_OPTS = {
  networkIdle2Timeout: 5000,
  waitUntil: 'networkidle2',
  timeout: 3000000
};

export async function getPageContent(url) {
  try {
    const browser = await puppeteer.launch(LAUNCH_PUPPETEER_OPTS); //create browser
    console.log(`Navigating to ${url}...`);
    const page = await browser.newPage(PAGE_PUPPETEER_OPTS); //create page
    await page.goto(url, PAGE_PUPPETEER_OPTS);
    const content = await page.content(); //load full content page
    browser.close();
    return content;

  } catch (err) {
    console.log(chalk.red('An error has occurred \n'));
    console.log(chalk.red(err))
  }
}

