const cors = require("cors");
const express = require("express");
const { PrismaClient } = require("@prisma/client");

const authRoutes = require("./routes/auth.routes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

app.get("/", (req, res, next) => {
  res.send("hello to server");
});

app.listen(PORT);
