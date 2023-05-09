const { main_pup } = require("./main_puppeteer.js");

(async () => {
  let result = await main_pup("yahoo");
  console.log(result);
})();
