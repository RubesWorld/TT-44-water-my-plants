const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const AuthRouter = require("./auth/auth-router");
const PlantRouter = require("./plants/plant-router");
const SpeciesRouter = require("./species/species-router");
const UserRouter = require("./users/users-routers");

const server = express();
server.use(express.json());
server.use(cors());
server.use(helmet());

//setting up router
server.use("/api/auth", AuthRouter);
server.use("/api/plants", PlantRouter);
server.use("/api/species", SpeciesRouter);
server.use("/api/users", UserRouter);

server.get("*", (req, res) => {
  res.json({ PLANTS: "WATERED" });
});

module.exports = server;
