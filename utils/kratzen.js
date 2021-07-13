'use strict';

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { uploadFile } = require('../coordinators/upload');
const { tryify } = require('./klar');

const extensions = ['.png', '.jpg', '.jpeg'];

const scraper = async () => {
  const browser = await puppeteer.launch({ headless: false });

  // !!!!!!!!!!!!!!
    for (let i = 3; i <= 50; i++) {
    const page = await browser.newPage();
    await page.setViewport({
      width: 4000,
      height: 12000,
    });

    page.on('response', async (response) => {

      const status = response.status();
      if (status >= 300 && status <= 399) {
        console.log('redirect');
      }

      try {
        const url = response.url();

        if (checkRedirect(url)) {
          console.log('\n\n\nmessed up\n\n\n');
        } else if (response.request().resourceType() === 'image') {
          response.buffer().then((file) => {
            const fileName = url.split('/').pop();
            const filePath = path.join(__dirname, '/images/', fileName);
            try {
              if (extensions.includes(path.extname(fileName))) {
                const writeStream = fs.createWriteStream(filePath);
                writeStream.write(file);
              } else {
                console.log(`\n\nFaulty Extension Name:\n${url}\n\n`);
              }
            } catch (err) {
              console.log(err, '\n', url);
            }
          });
        }
      } catch (error) {
        console.log('\n\n\nhellooooooooooooooo!!!!!!!!!!!!!!!!!!!!!!\n\n\n')
      }
      
    });

    await page.goto(
      `https://www.shutterstock.com/search/empty+room+interior?page=${i}`
    );
    await sleep(5000);
    await uploader();
    await page.close();
  }

  //await autoScroll(page);

  await browser.close();
};

async function uploader() {
  const promise = await tryify(new Promise(async (resolve, reject) => {
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
  }));
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
    ''
  ];

  return urls.includes(url);
}

const opts = {
  scrape: scraper,
  upload: uploader,
};

opts[process.env.command]();
