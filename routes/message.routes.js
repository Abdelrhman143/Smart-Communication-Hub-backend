const express = require("express");
const { protect } = require("../middlewares/authenticate.middleware");

const { getChatHistory } = require("../controllers/message.controller");
const router = express.Router();

router.get("/:otherUserId", protect, getChatHistory);

module.exports = router;
