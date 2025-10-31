const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function registerMessageHandlers(socket, io, onlineUsers) {
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
      console.log("backend recive message", data);
      const newMessage = await prisma.message.create({
        data: {
          text: messageContent,
          senderId: senderId,
          receiverId: parseInt(receiverId),
        },
      });

      const receiverSockets = onlineUsers.get(String(receiverId));
      if (receiverSockets) {
        receiverSockets.forEach((socketId) => {
          io.to(socketId).emit("receive_message", newMessage);
        });
      }

      const senderSockets = onlineUsers.get(String(senderId));
      if (senderSockets) {
        senderSockets.forEach((socketId) => {
          io.to(socketId).emit("receive_message", newMessage);
        });
      }
      console.log(`Message sent from ${senderId} to ${receiverId}`);
    } catch (error) {
      console.log("Error saving or sending message:", error);
    }
  });
}

module.exports = { registerMessageHandlers };
