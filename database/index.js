const db = require("./db");
const Poll = require("./poll");
const User = require("./user");
const BallotSubmission = require("./ballotSubmisson");

User.hasMany(Poll);
Poll.belongsTo(User);
Poll.belongsToMany(User, { through: BallotSubmission });
User.belongsToMany(Poll, { through: BallotSubmission });

module.exports = {
  db,
  Poll,
  User,
  BallotSubmission,
};
