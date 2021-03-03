const express = require("express");
const router = express.Router();

const { restricted } = require("../middleware/restricted");
const Plants = require("./plants-model");

//! need to add restricted to all endpoints!

//*Just plants 
//get all plants in the database
router.get("/", (req, res) => {
  Plants.find()
    .then((plant) => {
      res.status(201).json(plant);
    })
    .catch((err) => {
      res.json(err);
    });
});

//Get a plant by it's particular id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Plants.findByPlantId(id)
    .then((plants) => {
      res.status(201).json(plants);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

//Create a plant 
router.post("/", (req, res) => {
  const newPlant = req.body;
  Plants.insert(newPlant)
  .then((plant) => {
    res.status(201).json(plant);
  })
  .catch((err) => {
    res.status(401).json("Error adding", err.message);
  });
});

//update a plant 
router.put("/:user/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Plants.remove(id)
  .then((plant) => {
    res.status(201).json({ plant });
  })
  .catch((err) => {
    res.status(400).json({ message: "Could not delete Plant" });
  });
});

//get plant of particular user by plant_id
router.get("/:user/:id", (req, res) => {
  const user = req.params.user;
  const id = req.params.id;
  Plants.findByPlantId(user, id)
    .then((plant) => {
      res.status(200).json(plant);
    })
    .catch((err) => {
      res.status(401).json("Error getting plant", err.message);
    });
});
module.exports = router;
