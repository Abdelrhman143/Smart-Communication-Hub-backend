/**
 * Authentication middleware
 * Verifies JWT token from Authorization header and attaches user info to request
 */
const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({
      error: "Not authorized, token failed",
      details: "no token provided",
    });
  }

  token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.userId };

    next();
  } catch (error) {
    return res.status(401).json({
      error: "Not authorized, token failed",
      details: error.message,
    });
  }
};

module.exports = { protect };
