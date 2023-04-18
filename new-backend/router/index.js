const express = require("express");
const router = express.Router();
const dormRouter = require("./dorm");
const userRouter = require("./user");

router.use("/accommodation", dormRouter);
router.use("/user", userRouter);

module.exports = router;
