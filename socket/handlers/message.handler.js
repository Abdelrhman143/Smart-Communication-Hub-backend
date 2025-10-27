const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function registerMessageHandlers(socket, io) {
  socket.on("send_message", async (data) => {
    const { messageContent, receiverId } = data;

    const senderId = socket.userId;

    console.log("from messagehandle", senderId);

    if (!senderId) {
      console.log("Error: Sender ID not found on socket.");
      return;
    }

    try {
      // adding message to database
      const newMessage = await prisma.message.create({
        data: {
          text: messageContent,
          senderId: senderId,
          receiverId: receiverId,
        },
      });

      io.to(receiverId).emit("receive_message", newMessage);
      io.to(senderId).emit("receive_message", newMessage);
      console.log(`Message sent from ${senderId} to ${receiverId}`);
    } catch (error) {
      console.log("Error saving or sending message:", error);
    }
  });
}

module.exports = { registerMessageHandlers };
