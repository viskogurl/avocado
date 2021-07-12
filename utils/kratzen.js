const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { uploadFile } = require('../coordinators/upload');
const { emit } = require('process');

const count = 0;

const scraper = async () => {
  const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();
  await page.setViewport({
    width: 4000,
    height: 12000,
  });

  page.on('response', async (response) => {
    const url = response.url();
    if (response.request().resourceType() === 'image') {
      response.buffer().then((file) => {
        const fileName = url.split('/').pop();
        const filePath = path.join(__dirname, '/images/', fileName);
        try {
          const writeStream = fs.createWriteStream(filePath);
          writeStream.write(file);
        } catch (err) {
          console.log(err);
        }
        
      });
    }
  });

  await page.goto('https://www.shutterstock.com/search/empty+room+interior?page=2');
  
  //await autoScroll(page);

  await browser.close();
};

const uploader = async () => {
  const exts = {

  }
  const dir = fs.readdirSync(path.join(__dirname, '/images/'));
  for (const filePath of dir) {
    const fileName = filePath.split('/images/').pop();
    const extname = path.extname(fileName).slice(1);
    console.log(extname);
    const Path = path.join(__dirname, '/images/', fileName);
    console.log(Path);
    const { key, url } = await uploadFile({
      fileName,
      filePath: Path,
      fileType: `image/${extname}`,
    });

    console.log(key, url);
  }
};

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          emit;
          resolve();
        }
      }, 200);
    });
  });
}

const opts = {
  scrape: scraper,
  upload: uploader,
};

opts[process.env.command]();
