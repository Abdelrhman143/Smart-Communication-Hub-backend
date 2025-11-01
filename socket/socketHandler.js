/**
 * Socket.IO handler
 * Initializes Socket.IO connection, manages online users, and registers event handlers
 */
const { registerMessageHandlers } = require("./handlers/message.handler");
const { registerUserHandlers } = require("./handlers/user.handler");

const onlineUsers = new Map();
const brodcastOnlineUsers = (io) => {
  const onlineUsersId = Array.from(onlineUsers.keys());
  io.emit("update_online_users", onlineUsersId);
};

function initializeSocket(io) {
  io.on("connection", (socket) => {
    console.log(" A user connected:", socket.id);

    registerUserHandlers(socket, io, onlineUsers, brodcastOnlineUsers);
    registerMessageHandlers(socket, io, onlineUsers);

    socket.on("disconnect", () => {
      if (socket.userId) {
        const userIdString = String(socket.userId);
        const userSocketSet = onlineUsers.get(userIdString);

        if (userSocketSet) {
          userSocketSet.delete(socket.id);

          if (userSocketSet.size === 0) {
            onlineUsers.delete(userIdString);
          }
        }
      }
      brodcastOnlineUsers(io);
    });
  });
}

module.exports = { initializeSocket };
