const cors = require("cors");
const express = require("express");

const app = express();
const port = 5000;

app.use(express.json());
// this what we will do now
app.use(cors());

app.get("/", (req, res, next) => {
  res.send("hello to server");
});

app.listen(port);
