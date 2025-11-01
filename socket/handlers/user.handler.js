/**
 * Socket user handlers
 * Handles user connection/disconnection, manages online user tracking
 */
function registerUserHandlers(socket, io, onlineUsers, broadcastOnlineUsers) {
  socket.on("send_userId", (userId) => {
    const userIdString = String(userId);
    // Join room using string to ensure consistency with message emission
    socket.join(userIdString);
    socket.userId = parseInt(userId);

    if (!onlineUsers.has(userIdString)) {
      onlineUsers.set(userIdString, new Set());
    }
    onlineUsers.get(userIdString).add(socket.id);
    console.log(
      `User ${userIdString} is now connected. Total sockets: ${
        onlineUsers.get(userIdString).size
      } and total online users ${onlineUsers.size}`
    );
    broadcastOnlineUsers(io);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
}

module.exports = { registerUserHandlers };
