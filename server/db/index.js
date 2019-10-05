const db = require('./db');
const {
  User,
  Transaction,
} = require('./models');

Transaction.belongsTo(User);

module.exports = db;