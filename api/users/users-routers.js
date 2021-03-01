const express = require("express");
const dbConfig = require("../data/db-config");
const Users = require("./users-models");

const router = express.Router();

router.get("/", (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      res.status(401).json("Error in getting errors", err.message);
    });
});

module.exports = router;
