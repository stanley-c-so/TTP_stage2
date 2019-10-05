const { apiKey } = require('../../secrets.js');
const alpha = require('alphavantage')({ key: apiKey });

let ticker = 'msft'

const test = async () => {
  const data = await alpha.data.quote(ticker);
  console.log(alpha.util.polish(data));
}

test();

// alpha.data.quote(ticker).then(data => {
//   console.log(alpha.util.polish(data));
// });