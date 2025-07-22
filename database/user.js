const { DataTypes } = require("sequelize");
const db = require("./db");
const bcrypt = require("bcrypt");

const User = db.define("user", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 20],
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 20],
    },
  },
  status: {
    type: DataTypes.ENUM("normal", "admin", "disabled"),
    allowNull: false,
    defaultValue: "normal",
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
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
  profileImage: {
    type: DataTypes.BLOB,
    allowNull: false,
    defaultValue: "https://picsum.photos/150/150",
    // defaultValue: async () => {
    //   const response = await fetch("https://picsum.photos/150/150");
    //   const image = await response.image();
    //   return image;
    // },
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
