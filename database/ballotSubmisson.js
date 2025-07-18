const User = require("./index");
const Poll = require("./index");
const db = require("./db");
const bcrypt = require("bcrypt");
const { DataTypes } = require("sequelize");

const BallotSubmission = db.define("ballotSubmission", {
  ranking: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },

  status: {
    type: DataTypes.ENUM("draft", "submitted"),
  },

  userId: {
    type: DataTypes.INTEGER,
  },
});

module.exports = BallotSubmission;
