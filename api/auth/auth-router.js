const express = require("express");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const { isValid } = require("../users/users-service");

const router = express.Router();
const Users = require("../users/users-routers");

router.post("/register", (req, res) => {
  const { credentials } = req.body;

  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 9;

    //hashing occurs below
    const hash = bcryptjs.hashSync(credentials.password, rounds);

    credentials.password = hash;

    //add it to the database now
    Users.add(credentials)
      .then((user) => {
        res.status(201).json({ data: user });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } else {
    res
      .status(400)
      .json({ message: "You have not entered the proper info to register " });
  }
});

router.post("/login", (req, res) => {});

router.get("/logout", (req, res) => {});

module.exports = router;
