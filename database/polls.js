const db = require("./db");
const bcrypt = require("bcrypt");
import { DataTypes } from "sequelize";
const pg = require("pg");

const polls = db.define("polls", {
  pollsID: {
    type: DataTypes.integer,
    const: DataTypes.integer,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false, //has to filled out
  },
});
