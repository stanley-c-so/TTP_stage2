const router = require('express').Router();
const { Transaction } = require('../db/models');
module.exports = router;

const { apiKeys, utilityKey } = require('../../secrets.js');
const alpha = i => require('alphavantage')({ key: apiKeys[i] });
const alphaUtil = require('alphavantage')({ key: utilityKey });

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
  const offset = Math.floor(Math.random() * apiKeys.length);
  try {
    const promises = Object.keys(parse).map((ticker, i) => alpha((i + offset) % apiKeys.length).data.quote(ticker));
    Promise.all(promises)
      .then(data => alphaUtil.util.polish(data))
      .then(polishedData => res.json(polishedData))
      .catch(err => next(err));
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  const {ticker, quantity, balance} = req.body;
  const randomKey = Math.floor(Math.random() * apiKeys.length);
  try {
    const {data} = alphaUtil.util.polish(await alpha(randomKey).data.quote(ticker));
    if (balance >= quantity * Math.round(+data.price * 100)) {
      const transaction = await Transaction.create({
        ticker,
        quantity,
        priceAtPurchase: Math.round(+data.price * 100),
        userId: req.session.userId || null,
      });
      res.json(transaction);
    } else {
      res.status(200).send('Error: Insufficient balance.');
    }
  } catch (err) {
    if (typeof err === 'string' && err.includes('Invalid API call')) {
      res.status(200).send('Error: Ticker symbol not found.');
    } else {
      next(err);
    }
  }
});