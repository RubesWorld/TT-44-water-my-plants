const express = require("express");
const router = express.Router();

const { restricted } = require("../middleware/restricted");
const Species = require("./plants-model");
