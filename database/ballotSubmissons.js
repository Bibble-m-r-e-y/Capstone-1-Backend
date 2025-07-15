const users = require("./user");
const polls = require("./polls");
const db = require("./db");
const bcrypt = require("bcrypt");
const { DataTypes } = require("sequelize");

polls.hasOne(user); //one poll can have one user.
polls.belongToMany(user, { through: ballotSubmissions }); //through the asstion many to many creates a conjoint table

const ballotSubmissions = db.define("user", {
  ranking: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },

  status: {
    type: DataTypes.ENUM("draft", "submitted"),
  },
});
