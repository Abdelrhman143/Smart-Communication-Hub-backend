const { registerMessageHandlers } = require("./handlers/message.handler");
const { registerUserHandlers } = require("./handlers/user.handler");

function initializeSocket(io) {
  io.on("connection", (socket) => {
    console.log(" A user connected:", socket.id);

    registerUserHandlers(socket);

    registerMessageHandlers(socket, io);
  });
}

module.exports = { initializeSocket };
