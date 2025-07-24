const db = require("./db");
const { DataTypes } = require("sequelize");

const BallotSubmission = db.define("ballotSubmission", {
  ranking: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },

  status: {
    type: DataTypes.ENUM("draft", "submitted"),
    defaultValue: "draft",
    allowNull: false,
  },
});

module.exports = BallotSubmission;
