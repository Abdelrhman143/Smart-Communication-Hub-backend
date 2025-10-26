const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
  try {
    const currentUserId = req.user.userId;
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: currentUserId,
        },
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    res.status(200).json(users);
  } catch (error) {
    res.status.json({ error: "error in geting users", details: error.message });
  }
};

module.exports = { getAllUsers };
