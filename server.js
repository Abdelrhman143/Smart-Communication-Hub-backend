const cors = require("cors");
const http = require("http");

const express = require("express");
const { Server } = require("socket.io");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const messageRoutes = require("./routes/message.routes");
const { initializeSocket } = require("./socket/socketHandler");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

initializeSocket(io);

server.listen(PORT, () => {
  console.log(`Server is running with Socket.IO on http://localhost:${PORT}`);
});
