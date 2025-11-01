/**
 * User routes
 * Handles fetching all users (excluding current user)
 */
const express = require("express");
const { protect } = require("../middlewares/authenticate.middleware");
const { getAllUsers } = require("../controllers/user.controller");

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users except the current user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *             example:
 *               - id: 2
 *                 email: "jane@example.com"
 *                 name: "Jane Doe"
 *               - id: 3
 *                 email: "bob@example.com"
 *                 name: "Bob Smith"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", protect, getAllUsers);

module.exports = router;
