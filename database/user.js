const { DataTypes } = require("sequelize");
const db = require("./db");
const bcrypt = require("bcrypt");
const pg = require("pg");
const poll = require("./polls");
const vote = require("./vote");

User.hasMany(poll,{ through: ballotSubmissions });
User.hasMany(vote,{ through: ballotSubmissions }); //through the asstion many to many creates a conjoint table

const User = db.define("user", {
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 20],
    },
  },  
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 20],
    },
  },
  age18plus:{
    type: DataTypes.BOOLEAN,
  },
  status: {
    type: DataTypes.ENUM("normal", "admin", "disabled"),
    allowNull: false,
    defaultValue:"normal",
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  auth0Id: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  profileimage: {
    tyle: DataTypes.BLOB,
    allowNull:false,
  },
});

// Instance method to check password
User.prototype.checkPassword = function (password) {
  if (!this.passwordHash) {
    return false; // Auth0 users don't have passwords
  }
  return bcrypt.compareSync(password, this.passwordHash);
};

// Class method to hash password
User.hashPassword = function (password) {
  return bcrypt.hashSync(password, 10);
};

module.exports = User;
