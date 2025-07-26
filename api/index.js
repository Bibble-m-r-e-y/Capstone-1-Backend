const express = require("express");
const router = express.Router();
const testDbRouter = require("./test-db");

const userRouter = require("./user");

router.use("/test-db", testDbRouter);
router.use("/users", userRouter);

module.exports = router;
