const db = require("./db");
const bcrypt = require("bcrypt");
import { DataTypes } from "sequelize";
const pg = require("pg");
const user = reqire("./user");

Polls.hasOne(user);
Polls.belongToMany(user, { through: ballotSubmissions }); //through the asstion many to many creates a conjoint table

const polls = db.define("polls", {
  pollsID: {
    type: DataTypes.integer,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false, //has to filled out
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  options: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM("draft", "published", "ended", "disabled"),
  },

  endTimeDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

module.exports = polls;
