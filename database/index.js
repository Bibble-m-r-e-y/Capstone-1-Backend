const db = require("./db");
const Poll = require("./poll");
const User = require("./user");
const BallotSubmission = require("./ballotSubmisson");

User.hasMany(Poll);
Poll.belongsTo(User);
BallotSubmission.belongsTo(User);

module.exports = {
  db,
  Poll,
  User,
  BallotSubmission,
};
