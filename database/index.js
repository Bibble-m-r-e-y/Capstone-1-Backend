const db = require("./db");
const Poll = require("./poll");
const User = require("./user");

User.hasMany(Poll);
Poll.belongsTo(User);

module.exports = {
  db,
  Poll,
  User,
};
