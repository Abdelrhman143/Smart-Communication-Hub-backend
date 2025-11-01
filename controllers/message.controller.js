/**
 * Message controller
 * Business logic for retrieving chat history between two users
 */
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getChatHistory = async (req, res) => {
  try {
    const currentUserId = req.user.userId;
    const otherUserId = parseInt(req.params.otherUserId);

    if (isNaN(otherUserId)) {
      return res.status(400).json({ error: "Invalid user ID parameter" });
    }

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: currentUserId, receiverId: otherUserId },

          { senderId: otherUserId, receiverId: currentUserId },
        ],
      },
      orderBy: {
        timestamp: "asc",
      },
    });

    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({
      error: "Server error fetching messages",
      details: error.message,
    });
  }
};

module.exports = { getChatHistory };
