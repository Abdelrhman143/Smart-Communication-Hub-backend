/**
 * Main server entry point
 * Configures Express app, Socket.IO, routes, and Swagger documentation
 */
const cors = require("cors");
const http = require("http");

const express = require("express");
const { Server } = require("socket.io");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger.config");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const messageRoutes = require("./routes/message.routes");
const { initializeSocket } = require("./socket/socketHandler");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: [
      "https://smart-communication-hub.netlify.app",
      "http://localhost:3000", // Add your local frontend URL if you test locally
    ],
    credentials: true, // Allow cookies/credentials if needed
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Swagger JSON endpoint
app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "https://smart-communication-hub.netlify.app",
      "http://localhost:3000", // Add your local frontend URL if needed
    ],
    methods: ["GET", "POST"],
    credentials: true, // Allow credentials if needed
  },
});

initializeSocket(io);

server.listen(PORT, () => {
  console.log(`Server is running with Socket.IO on http://localhost:${PORT}`);
});
