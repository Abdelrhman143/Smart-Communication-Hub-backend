function registerUserHandlers(socket) {
  socket.on("send_userId", (userId) => {
    socket.join(userId);
    console.log("the user id coming from front", userId);
    socket.userId = parseInt(userId);
    console.log("the user id after adding it to socket", userId);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
}

module.exports = { registerUserHandlers };
