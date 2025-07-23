const express = require("express");
const router = express.Router();
const { Poll, User } = require("../database");

//GRAB THE WHOLE POLL
router.get("/", async (req, res) => {
  try {
    const polls = await Poll.findAll(); // promise to grab all the data from the polls table
    res.status(200).send(polls); //send a suscesfull status if done correctly and send me the info.
  } catch (err) {
    //catch any errors
    console.log("error"); //cout errors
  }
});

//DELETE route to delete poll
router.delete("/:id", async (req, res) => {
  //create a rout id path
  const id = Number(req.params.id);
  try {
    const x = await Poll.findByPk(id);
    console.log(x);
    await x.destroy(); //promise to delete all the poll info
    res.sendStatus(200); //delete records from the database
  } catch (err) {
    console.log(err, "error");
    res.sendStatus(500);
  }
});

//update polls?
router.patch("/", async (req, res) => {
  try {
    const id = req.params.id;
    const pO = await poll.findByPk(Id);
    await pO.save(options);
  } catch (err) {
    console.log(err, "error");
  }
});

