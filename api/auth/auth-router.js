const express = require("express");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const { isValid } = require("../users/users-service");
const { jwtSecret } = require("../../config/secrets");

const router = express.Router();
const Users = require("../users/users-models");

router.post("/register", (req, res) => {
  const credentials = req.body;

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
        res
          .status(500)
          .json({ message: "there is an error on the add" + err.message });
      });
  } else {
    res
      .status(400)
      .json({ message: "You have not entered the proper info to register " });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (isValid(req.body)) {
    Users.findBy({ username: username })
      .then(([user]) => {
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = makeToken(user);
          res
            .status(200)
            .json({ message: "Welcome to the API " + user.username, token });
        } else {
          res.status(400).json({ message: "Invalid credentials" });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } else {
    res.status(400).json({
      message: "Please provide username and password.",
    });
  }
});

function makeToken(user) {
  const payload = {
    subjectL: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: "30m",
  };
  return jwt.sign(payload, jwtSecret, options);
}

router.get("/logout", (req, res) => {});

module.exports = router;
