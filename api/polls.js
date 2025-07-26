const express = require("express");
const router = express.Router();
const { Poll, User } = require("../database");

//GRAB THE WHOLE POLL
//"/:id is a dymanic parmater and it changes depening on witch poll we want that is one of the many reasons
//why we use it to extract a sepefic parmater that is dynamic so we can grab that user 
router.get("/:id", async (req, res) => {
  const pollId = Number(req.params.id); //grab the user id from the url and make into a number
  console.log(pollId);
  try {
    const polls = await Poll.findByPk(pollId); // promise to grab all the data from the polls table
    console.log(polls);
    if (!polls) {
      return res.sendStatus(404);
    }
    res.sendStatus(200); //send a suscesfull status if done correctly and send me the info.
  } catch (err) {
    //catch any errors
    console.log("error"); //cout errors
    res.sendStatus(500, "this aint working bro");
  }
});

//DELETE route to delete poll
router.delete("/:Id", async (req, res) => {
  //create a rout id path
  const Id = Number(req.params.Id);
  try {
    const x = await Poll.findByPk(Id);
    await x.destroy(); //promise to delete all the poll info
    res.sendStatus(200); //delete records from the database
  } catch (err) {
    console.log(err, "error");
    res.sendStatus(500);
  }
});

router.patch("/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const pollToPatch = await Poll.findByPk(id);
    await pollToPatch.update({
      title: req.body.title,
    });

    await pollToPatch.update({
      options: req.body.options,
    });

    await pollToPatch.save();
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(404);
    console.log(err, "error");
  }
});



module.exports = router;
