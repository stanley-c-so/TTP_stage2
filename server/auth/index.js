const router = require('express').Router();
const { User } = require('../db/models');
module.exports = router;

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('No such user found:', email);
      res.status(401).send('Wrong username and/or password');
    } else if (!user.correctPassword(password)) {
      console.log('Incorrect password for user:', email);
      res.status(401).send('Wrong username and/or password');
    } else {
      req.session.userId = user.id;
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  const { email, password, username } = req.body;
  try {
    const user = await User.create({
      name: username,
      password,
      email,
    });
    req.session.userId = user.id;
    res.json(user);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

router.get('/me', async (req, res, next) => {
  try {
    if (!req.session.userId) {
      const err = new Error('Not found');
      err.status = 404;
      next(err);
    } else {
      const user = await User.findByPk(req.session.userId);
      res.json(user);
    }
  } catch(err) {
    next(err);
  }
});
