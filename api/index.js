const express = require("express");
const router = express.Router();
const testDbRouter = require("./test-db");
const pollsRouter = require("./polls");
const ballotSubmisson = require("./ballotSubmisson"); //imports a file

router.use("/test-db", testDbRouter);
router.use("/polls", pollsRouter);
router.use("/ballotSubmisson", ballotSubmisson); //when someone vists this with are url let the ballot
//handle it
module.exports = router;
