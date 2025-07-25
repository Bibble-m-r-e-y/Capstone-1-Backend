const express = require("express");
const router = express.Router();
const { User, Poll } = require("../database");

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
    if (!users) {
      return res.status(404).send(null);
    }
  } catch (error) {
    console.error("Error fetching all users: ", error);
    res.status(500).json({ error: "Failed to fetch all users!" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send(null);
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching this user: ", error);
    res.status(500).json({ error: "Failed to fetch this user!" });
  }
});

router.get("/:id/polls", async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send(null);
    }
    const polls = await user.getPolls();
    if (!polls) {
      res.status(404).send({ message: "User has not created any polls!" });
    }
    res.status(200).json(polls);
  } catch (error) {
    console.error("Error fetching polls", error);
    res.status(500).json({ error: "Failed to fetch polls!" });
  }
});

router.get("/:id/ballots", async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const user = await User.findByPk(userId, { include: Poll });
    if (!user) {
      return res.status(404).send(null);
    }
    const ballots = user.polls;
    if (!ballots) {
      res.status(404).json({ message: "User has not voted in any polls!" });
    }
    res.status(200).json(ballots);
  } catch (error) {
    console.error("Error fetching user ballots: ", error);
    res.status(500).json("Failed to fetch all user ballots!");
  }
});

router.post("/users", async (req, res) => {
  try {
    const user = req.body;
    await User.create(user);
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
