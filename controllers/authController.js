const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { error, message } = require("../validation/register.validation");

const prisma = new PrismaClient();

registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    res
      .status(201)
      .json({ message: "User created successfully", userId: newUser.id });
  } catch (error) {
    res.status(500).json({
      error: "Server error during registration",
      details: error.message,
    });
  }
};

loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = prisma.user.findUnique({ where: { email } });
    if (!email) {
      res.status(400).json({ erorr: "user does not exists" });
    }
    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({ erorr: "email or password is invaild" });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successful",
      token: token,
      userId: user.id,
      name: user.name,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Server error during login", details: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
