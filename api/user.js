const express = require("express");
const router = express.Router();
const { User, Poll } = require("../database");
const { authenticateJWT } = require("../auth");

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
    const polls = user.polls;
    if (!polls) {
      res.status(404).json({ message: "User has not voted in any polls!" });
    }
    const ballots = polls.map((poll) => poll.ballotSubmission);
    res.status(200).json(ballots);
  } catch (error) {
    console.error("Error fetching user ballots: ", error);
    res.status(500).json("Failed to fetch all user ballots!");
  }
});

// This route is a little complex, but essentially will block users 
router.patch("/status", authenticateJWT, async (req, res) => {
  try {
    const authUser = req.user;
    const { status, id } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    if (authUser.status !== "admin" && status === "admin") {
      return res.status(403).json({ message: "Unauthorized!" });
    } else if (authUser.id !== user.id && authUser.status !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    } else {
      user.update({ status: status });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating account status: ", error);
  }
});

router.patch("/admin/status", authenticateJWT, async (req, res) => {
  try {
    if (req.user.status !== "admin") {
      return res.status(403).json({ message: "Forbidden!" });
    }
  } catch (error) {
    console.error("Error updating account status: ", error);
  }
});

module.exports = router;
