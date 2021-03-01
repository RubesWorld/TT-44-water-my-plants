const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const AuthRouter = require("./auth/auth-router");
const PlantRouter = require("./plants/plant-router");
const SpeciesRouter = require("./species/species-router");

const server = express();
server.use(express.json());

//setting up router
server.use("/api/auth", AuthRouter);
server.use("/api/plants", PlantRouter);
server.use("/api/species", SpeciesRouter);

server.use(helmet());
server.use(cors());

server.get("*", (req, res) => {
  res.json({ PLANTS: "WATERED" });
});

module.exports = server;
