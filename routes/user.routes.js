const express = require("express");
const { protect } = require("../middlewares/authenticate.middleware");
const { getAllUsers } = require("../controllers/user.controller");

const router = express.Router();

router.get("/", protect, getAllUsers);

module.exports = router;
