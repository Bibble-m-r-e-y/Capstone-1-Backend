const express = require("express");
const router = express.Router();
const { Poll, User } = require("../database");

//GRAB THE WHOLE POLL
//"/:id
router.get("/:id", async (req, res) => {
  try {
    const pollId = Number(req.params.id); //grab the user id from the url and make into a number
    const polls = await Poll.findByPk(pollId); // promise to grab all the data from the polls table
    if (!polls) {
      return res.sendStatus(404);
    }
    res.sendStatus(200).json(polls); //send a suscesfull status if done correctly and send me the info.
  } catch (err) {
    //catch any errors
    console.error(err, "error"); //cout errors
    res.Status(500).send("not working");
  }
});

//DELETE route to delete poll
router.delete("/:Id", async (req, res) => {
  //create a rout id path

  try {
    const Id = Number(req.params.Id);
    const x = await Poll.findByPk(Id);
    await x.destroy(); //promise to delete all the poll info
    res.sendStatus(200); //delete records from the database
  } catch (err) {
    console.error(err, "error");
    res.sendStatus(500);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const pollToPatch = await Poll.findByPk(id);

    if (!pollToPatch) {
      res.sendStatus(200);
    }
    await pollToPatch.update({
      title: req.body.title,
    });

    await pollToPatch.update({
      options: req.body.options,
    });
    await pollToPatch.update({
      description: req.body.description,
    });

    await pollToPatch.save();
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
    console.error(err, "error");
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, options } = req.body;
    const storeClientData = req.body;

    if (!title || !description || !options || !options.length < 2) {
      res.sendStatus(400);
    }
    const createNewPoll = await Poll.create(storeClientData); // create a new poll and pass on the user info
    res.status(200).send("success");
  } catch (err) {
    console.error("does not work", err);
    res.sendStatus(404);
  }
});

router.get("/", async (req, res) => {
  try {
    const getAll = await Poll.findAll();
    res.status(200).send(getAll);
  } catch (err) {
    console.error(err, "this dont work");
    res.sendStatus(400);
  }
});

module.exports = router;
