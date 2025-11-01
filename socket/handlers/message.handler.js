/**
 * Socket message handlers
 * Handles real-time message sending via WebSocket and saves messages to database
 */
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

    // Validate receiverId
    if (!receiverId) {
      console.log("Error: Receiver ID is required.");
      return;
    }

    const parsedReceiverId = parseInt(receiverId);
    if (isNaN(parsedReceiverId)) {
      console.log("Error: Invalid receiver ID format.");
      return;
    }

    try {
      // adding message to database
      console.log("backend recive message", data);
      const newMessage = await prisma.message.create({
        data: {
          text: messageContent,
          senderId: senderId,
          receiverId: parsedReceiverId,
        },
      });

      // Emit message only to receiver's room (not broadcasting to all users)
      io.to(String(parsedReceiverId)).emit("receive_message", newMessage);
      console.log(`Message emitted to receiver room: ${parsedReceiverId}`);

      // Emit message to sender's room so sender sees their own message
      // Only skip if sender and receiver are the same (prevent duplicates in same-user chats)
      if (senderId !== parsedReceiverId) {
        io.to(String(senderId)).emit("receive_message", newMessage);
        console.log(`Message emitted to sender room: ${senderId}`);
      }
      console.log(`Message sent from ${senderId} to ${parsedReceiverId}`);
    } catch (error) {
      console.log("Error saving or sending message:", error);
    }
  });
}

module.exports = { registerMessageHandlers };
