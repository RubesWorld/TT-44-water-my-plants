const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const AuthRouter = require("./auth/auth-router");

const server = express();
server.use(express.json());
server.use("/api/auth", AuthRouter);
server.use(helmet());
server.use(cors());

server.get("*", (req, res) => {
  res.json({ PLANTS: "WATERED" });
});

module.exports = server;
