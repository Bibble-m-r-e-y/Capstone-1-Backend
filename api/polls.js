const express = require("express");
const router = express.Router();
const { User } = require("../database");
const { polls, User } = reqire("../database");
router.get("/", async (req, res) => {
  try {
    const polls = await polls.findALL(); // promise to grab all the data from the polls table
    res.status(200).send(polls); //send a suscesfull status if done correctly and send me the info.
  } catch (err) { //catch any errors
    console.log("error"); //cout errors
  }
});


