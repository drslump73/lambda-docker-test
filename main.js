// taiko用実装
// 動きが不安定なので使わない
// 参考としておいておく


const { openBrowser, goto, closeBrowser, evaluate } = require("taiko");
const pup_core = require("puppeteer-core");
const puppeteer = require("puppeteer");
const chromium = require("@sparticuz/chromium");

exports.main = async () => {
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
      "--remote-debugging-port=9222",
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
    await openBrowser({
      host: "127.0.0.1",
      port: 9222,
    }).catch((error) => {
      throw new Error(error);
    });

    await goto(`https://qiita.com/nodokamome/items/8a7e895185146c133b5b`).catch(
      (error) => {
        throw new Error(error);
      }
    );
    result = await evaluate(() => document.title);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  } finally {
    await browser.close();
  }

  return result;
};
