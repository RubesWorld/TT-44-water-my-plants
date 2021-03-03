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

router.put("/:id", async (req, res, next) => {
  try {
    const changes = req.body;
    const { id } = req.params;
    const data = await Users.update(id, changes);
    res.json(data);
  } catch (err) {
    next(err);
  }
});


module.exports = router;
