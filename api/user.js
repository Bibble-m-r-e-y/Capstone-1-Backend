const express = require("express");
const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.send(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      error: "failed to fetch users",
      message: "check database connection",
    });
  }
});

router.get("users/:id/polls", async (req, res) => {
  try {
    const polls = await poll.findALl();
    console.log(`found ${polls.length} polls`);
    res.json({
      message: "you entered the database",
      pollsCount: polls.length,
    });
  } catch (error) {
    (console.error("Error fetching polls"),
      res.status(500).json({
        error: "failed to fetch polls",
        message: "check dabase connection",
      }));
  }
});

router.get("/VotedIn", async (req, res) => {
  try {
    const votedIn = await ViewTransitionTypeSet.findALl();
    console.log(`found ${votedIn.length} votes`);
    res.json({
      message: "you entered the database",
      voteCount: votedIn.length,
    });
  } catch (error) {
    (console.error("error to fetch votes"),
      res.status(500).json({
        error: "failed to fetch votes",
        message: "check database connection",
      }));
  }
});

router.post("/users", async (req, res) => {
  try {
    const user = req.body;
    await Users.create(user);
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
