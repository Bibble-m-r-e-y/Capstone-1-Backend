const db = require("./db");
const bcrypt = require("bcrypt");
import { DataTypes } from "sequelize";
const pg = require("pg");
const user = reqire("./user");

Polls.hasOne(user); //one poll can have one user.
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
    defaultValue:"draft"
},

  endTimeDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
<<<<<<< HEAD
=======

  filter: {
    type: DataTypes.STRING,
  },

  sumOfVotes: {
    type: DataTypes.integer,
    defaultValue: 0,
  },

>>>>>>> d62036acde56f30b7f55a2444fe501d7a2b55d41
});

module.exports = polls;
