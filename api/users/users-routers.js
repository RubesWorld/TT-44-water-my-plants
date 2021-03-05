const express = require("express");
const { whereNotExists } = require("../data/db-config");

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

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Users.findById(id)
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      res.status(401).json("Error in getting errors", err.message);
    });
});

router.put("/:id", async (req, res) => {
  try {
    const changes = req.body;
    const { id } = req.params;
    const data = await Users.updateProfile(id, changes);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json("error on phone number update", err.message);
  }
});

module.exports = router;
