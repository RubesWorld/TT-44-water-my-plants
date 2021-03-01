const express = require("express");
const router = express.Router();

const { restricted } = require("../middleware/restricted");
const Plants = require("./plants-model");

//get all plants
router.get("/", restricted, (req, res) => {
  Plants.find()
    .then((plant) => {
      res.status(201).json(plant);
    })
    .catch((err) => {
      res.json(err);
    });
});

//get all plants from a particular user
router.get("/:id", restricted, (req, res) => {
  const { id } = req.params;
  Plants.findById(id)
    .then((plants) => {
      res.status(201).json(plants);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

router.post("/", restricted, (req, res) => {
  const newPlant = req.body;
  Plants.insert(newPlant).then((plant) => {
    res.status(201).json(plant);
  });
});

router.put("/:id", restricted, (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  Plants.update(id, changes)
    .then((plant) => {
      res.status(200).json(plant);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

router.delete("/:id", restricted, (req, res) => {
  const { id } = req.params;
  Plants.remove(id)
    .then((plant) => {
      res.status(201).json({ plant });
    })
    .catch((err) => {
      res.status(400).json({ message: "Could not delete Plant" });
    });
});

module.exports = router;
