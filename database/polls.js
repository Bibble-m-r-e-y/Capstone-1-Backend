const { DataTypes } = require("sequelize");
const db = require("./db");
const bcrypt = require("bcrypt");

const polls = db.define("polls",){
pollsID{
    type:DataTypes.intger,
},

Title{
   type: DataTypes.STRING, 
}

}