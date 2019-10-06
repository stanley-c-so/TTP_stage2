const router = require('express').Router();
const { User } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email'],        // only send id and email
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  const { quantity, priceAtPurchase } = req.body;
  try {
    const user = await User.findByPk(req.session.userId);
    //console.log('USER.BALANCE:', user.balance)
    const update = await user.update(
      { balance: user.balance - quantity * priceAtPurchase },
    );
    res.json(update.dataValues);
  } catch (err) {
    next(err);
  }
});