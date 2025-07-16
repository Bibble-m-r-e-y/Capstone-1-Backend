const db = require("./db");
const bcrypt = require("bcrypt");
const { DataTypes } = require("sequelize");
const pg = require("pg");
const { User } = require("./index");
const { ballotSubmissions } = require("./index");

const Poll = db.define("poll", {
  title: {
    type: DataTypes.STRING,
    allowNull: false, //has to filled out
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  options: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM("draft", "published", "ended", "disabled"),
    defaultValue: "draft",
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },

  filter: {
    type: DataTypes.STRING,
  },

  sumOfVotes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Poll;
