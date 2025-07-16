const db = require("./db");
const Poll = require("./poll");
const User = require("./user");
const ballotSubmissions = require("./ballotSubmissons");

User.hasMany(Poll);
Poll.belongsTo(User, { through: ballotSubmissions });

module.exports = {
  db,
  Poll,
  User,
  ballotSubmissions,
};
