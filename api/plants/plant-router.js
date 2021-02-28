const express = require("express");
const router = express.Router();

const Plants = require("./plants-model");

//get all plants
router.get("/", (req, res) => {
  Plants.find()
    .then((plant) => {
      res.status(201).json(plant);
    })
    .catch((err) => {
      res.json(err);
    });
});

//get all plants from a particular user
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Plants.findById(id)
    .then((plants) => {
      res.status(201).json(plants);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

router.post("/", (req, res) => {
  const newPlant = req.body;
  Plants.insert(newPlant).then((plant) => {
    res.status(201).json(plant);
  });
});

module.exports = router;
