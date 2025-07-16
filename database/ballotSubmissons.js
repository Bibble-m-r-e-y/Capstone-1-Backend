const User = require("./index");
const Poll = require("./index");
const db = require("./db");
const bcrypt = require("bcrypt");
const { DataTypes } = require("sequelize");

const ballotSubmissions = db.define("user", {
  ranking: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },

  status: {
    type: DataTypes.ENUM("draft", "submitted"),
  },
});

module.exports = ballotSubmissions;
