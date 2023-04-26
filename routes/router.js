const express = require("express");
const router = express.Router();
const usersRoute = require("./usersRoute");
const tokenRoute = require("./tokenRoute");
const positionsRoute = require("./positionsRoute");

router.use("/", tokenRoute);
router.use("/", usersRoute);
router.use("/", positionsRoute);

module.exports = router;
