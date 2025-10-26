const router = require("express").Router();

const { registerUser, loginUser } = require("../controllers/authController");
const Validator = require("../middlewares/validation.middleware");
const loginSchema = require("../validation/login.validation");
const registerSchema = require("../validation/register.validation");

router.post("/register", Validator(registerSchema), registerUser);
router.post("/login", Validator(loginSchema), loginUser);

module.exports = router;
