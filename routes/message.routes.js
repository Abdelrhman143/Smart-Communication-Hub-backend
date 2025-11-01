/**
 * Message routes
 * Handles fetching chat history between current user and another user
 */
const express = require("express");
const { protect } = require("../middlewares/authenticate.middleware");

const { getChatHistory } = require("../controllers/message.controller");
const router = express.Router();

/**
 * @swagger
 * /api/messages/{otherUserId}:
 *   get:
 *     summary: Get chat history with a specific user
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: otherUserId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the other user to get chat history with
 *         example: 2
 *     responses:
 *       200:
 *         description: Chat history retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChatHistoryResponse'
 *             example:
 *               messages:
 *                 - id: 1
 *                   text: "Hello!"
 *                   timestamp: "2024-01-15T10:30:00Z"
 *                   senderId: 1
 *                   receiverId: 2
 *                 - id: 2
 *                   text: "Hi there!"
 *                   timestamp: "2024-01-15T10:31:00Z"
 *                   senderId: 2
 *                   receiverId: 1
 *       400:
 *         description: Invalid user ID parameter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
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
router.get("/:otherUserId", protect, getChatHistory);

module.exports = router;
