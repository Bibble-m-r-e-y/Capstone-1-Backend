const express = require("express");
const router = express.Router();
const { User } = require("../database");
const { polls, User } = reqire("../database");

//GET route that retrieves all existing polls
router.get("/", async (req, res) => {
  try {
    const polls = await polls.findALL(); // promise to grab all the data from the polls table
    res.status(200).send(polls); //send a suscesfull status if done correctly and send me the info.
  } catch (err) {
    //catch any errors
    console.log("error"); //cout errors
  }
});

//DELETE route to delete poll
router.delete("/polls/id", async (req, res) => {
  try {
    const p = await poll.destroy(); //promise to delete all the poll info
    res.send(200).send(polls); //delete records from the database
  } catch (err) {
    console.log(err, "error");
  }
});


//update polls?
router.post("/", async (req, res) => {
  try {
    const id = req.params.id;
    const pO = await poll.findByPk(Id);
    await pO.save(options);
  } catch (err) {
    console.log(err, "error");
  }
});

