const router = require('express').Router();
const { Transaction } = require('../db/models');
module.exports = router;

const { apiKey } = require('../../secrets.js');
const alpha = require('alphavantage')({ key: apiKey });

router.get('/', async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll();
    res.json(transactions);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  const {ticker, quantity} = req.body;
  try {
    const {data} = alpha.util.polish(await alpha.data.quote(ticker));
    const transaction = await Transaction.create({
      ticker,
      quantity,
      priceAtPurchase: +data.price * 100,
      userId: req.session.userId || null,
    });
    res.json(transaction);
  } catch (err) {
    if (err.includes('Invalid API call')) {
      res.status(401).send('Ticker symbol not found.');
    } else {
      next(err);
    }
  }
})