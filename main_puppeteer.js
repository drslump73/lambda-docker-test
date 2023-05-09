const pup_core = require("puppeteer-core");
const puppeteer = require("puppeteer");
const chromium = require("@sparticuz/chromium");

exports.main_pup = async (query) => {
  let result;
  let browser;
  
  try {
    // localテスト用
    // 本番ではfalseにする
    let is_local = process.platform !== 'linux' ? true : false;
    
    let chromium_opts = [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "-–disable-dev-shm-usage",
      "--disable-gpu",
      "--no-first-run",
      "--no-zygote",
      "--single-process",
    ];

    if (is_local) {
      browser = await puppeteer.launch({
        headless: true,
        args: chromium_opts,
      });
    } else {
      chromium.font("/usr/share/fonts/ipa-gothic/ipag.ttf");
      browser = await pup_core.launch({
        args: chromium_opts,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: true,
        ignoreHTTPSErrors: true,
      });
    }

    const page = await browser.newPage();
    await page.goto("https://www.google.com/search?q=" + query);
    // result = await page.evaluate(() => document.title);
    result = await page.evaluate(() => document.getElementById('result-stats').innerText);

    await browser.close();
  } catch (err) {
    console.log(err);
    await browser.close();
    throw new Error(err);
  }

  return result;
};
