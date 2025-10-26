const router = require("express").Router();

const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/auth.controller");
const { protect } = require("../middlewares/authenticate.middleware");
const Validator = require("../middlewares/validation.middleware");
const loginSchema = require("../validation/login.validation");
const registerSchema = require("../validation/register.validation");

router.post("/register", Validator(registerSchema), registerUser);
router.post("/login", Validator(loginSchema), loginUser);
router.get("/me", protect, getUser);

module.exports = router;
