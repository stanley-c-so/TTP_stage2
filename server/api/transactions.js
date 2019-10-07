const router = require('express').Router();
const { Transaction } = require('../db/models');
module.exports = router;

const { apiKey } = require('../../secrets.js');
const alpha = require('alphavantage')({ key: apiKey });

router.get('/', async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll({
      where: {userId: req.session.userId },
    });
    res.json(transactions);
  } catch (err) {
    next(err);
  }
});

router.get('/:portfolio', async (req, res, next) => {
  const parse = JSON.parse(req.params.portfolio);
  try {
    const promises = Object.keys(parse).map(ticker => alpha.data.quote(ticker));
    Promise.all(promises)
      .then(data => alpha.util.polish(data))
      .then(polishedData => res.json(polishedData));
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  const {ticker, quantity, balance} = req.body;
  try {
    const {data} = alpha.util.polish(await alpha.data.quote(ticker));
    if (balance >= quantity * +data.price * 100) {
      const transaction = await Transaction.create({
        ticker,
        quantity,
        priceAtPurchase: +data.price * 100,
        userId: req.session.userId || null,
      });
      res.json(transaction);
    } else {
      res.status(200).send('Error: Insufficient balance.');
    }
  } catch (err) {
    if (err.includes('Invalid API call')) {
      res.status(200).send('Error: Ticker symbol not found.');
    } else {
      next(err);
    }
  }
});