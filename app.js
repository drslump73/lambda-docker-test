const { main_pup } = require("./main_puppeteer.js");

exports.handler = async (event) => {
  // GETのパラメータ
  // console.log(event.queryStringParameters);
  // POSTのパラメータ
  // console.log(event.body);
  
  let result = await main_pup(event.queryStringParameters.q);

  const response = {
    statusCode: 200,
    body: {
      message: JSON.stringify(result)
    }
  };
  return response;
};
