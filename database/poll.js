const db = require("./db");
const { DataTypes } = require("sequelize");

const Poll = db.define("poll", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
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
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },

  filter: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false,
  },

  sumOfVotes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Poll;
