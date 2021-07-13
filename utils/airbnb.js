'use strict';

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { uploadFile } = require('../coordinators/upload');
const { tryify } = require('./klar');

const extensions = ['.png', '.jpg', '.jpeg'];
let hrefs = [];

const scraper = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  page.on('domcontentloaded', async () => {
    try {
      if (!hrefs.length) {
        hrefs = await page.evaluate(() =>
          Array.from(document.querySelectorAll('a[href]'), (a) =>
            a.getAttribute('href')
          )
            .filter((href) => href.includes('/rooms'))
            .filter((v, i, a) => a.indexOf(v) === i)
            .map((element) => element.slice(0, 15))
        );
        console.log(hrefs);
      } else {
        console.log('\n\n\n hello \n\n\n')
      }
    } catch (error) {
      console.log('\n\n\nhellooooooooooooooo!!!!!!!!!!!!!!!!!!!!!!\n\n\n');
      console.log(error);
    }
  });

  await page.goto(
    'https://www.airbnb.com/s/Nashville--TN--United-States/homes?price_min=714'
  );
  await page.setViewport({
    width: 2000,
    height: 8000,
  });

  for (let i = 0; i < hrefs.length; i++) {
    console.log(`\n\n ${i} \n\n`);
    const page = await browser.newPage();
    await page.setViewport({
      width: 2000,
      height: 8000,
    });
    await page.goto(`https://www.airbnb.com${hrefs[i]}`);
    
    console.log(`https://www.airbnb.com${hrefs[i]}`);
    await page.waitForSelector('body');
    await sleep(10000);
    await page.close();
  }

  await page.close();
  await browser.close();
};

async function uploader() {
  const promise = await tryify(
    new Promise(async (resolve, reject) => {
      const [dirData, dirError] = await tryify(
        fs.promises.readdir(path.join(__dirname, '/images/'))
      );
      for (const filePath of dirData) {
        const fileName = filePath.split('/images/').pop();
        const extname = path.extname(fileName).slice(1);
        const Path = path.join(__dirname, '/images/', fileName);
        const [uploadData, uploadError] = await tryify(
          uploadFile({
            fileName,
            filePath: Path,
            fileType: `image/${extname}`,
          })
        );

        const [unlinkData, unlinkError] = await tryify(
          fs.promises.unlink(Path, (err) => {
            if (err) throw err;
          })
        );
      }
      resolve();
    })
  );
  return promise;
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function checkRedirect(url) {
  const urls = [
    'https://bat.bing.com/action',
    'https://pixelg.adswizz.com',
    'https://p.adsymptotic.com',
    'https://www.google.com/ads',
    'https://b97.yahoo.co.jp',
    '',
  ];

  return urls.includes(url);
}

const opts = {
  scrape: scraper,
  upload: uploader,
};

opts[process.env.command]();
