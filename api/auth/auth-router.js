const express = require("express");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const { isValid } = require("../users/users-service");
const { jwtSecret } = require("../../config/secrets");

const mw = require("../middleware/auth-middleware");

const router = express.Router();
const Users = require("../users/users-models");

router.post("/register", mw.validateRegister, mw.checkUsername, (req, res) => {
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
          .json({
            message: "there is an error during registration" + err.message,
          });
      });
  } else {
    res
      .status(400)
      .json({ message: "You have not entered the proper info to register " });
  }
});

router.post("/login", mw.validateLogin, (req, res) => {
  const { username, password } = req.body;

  if (isValid(req.body)) {
    Users.findBy({ username: username })
      .then(([user]) => {
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = makeToken(user);
          res.status(200).json({
            message: "Welcome to the API ",
            username: `${user.username}`,
            user_id: `${user.user_id}`,
            token,
          });
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

router.put(('/update/:id', (req,res)=>{
  const {id} = req.params;
  const newPassword = req.body.password;

  if(isValid(newPassword)) {
    const rounds = process.env.BCRYPT_ROUNDS || 9;
  
    //hashing occurs
    const hash = bcryptjs.hashSync(newPassword, rounds)

    newPassword = hash;

    //Add it to the database now 

    Users.UpdateProfile(id,newPassword)
      .then((user)=>{
        res.status(201).json({data:user})
      })
      .catch((err)=>{
        res.status(500).json({
          message:"There was an error updating your password" + err.message
        });
      });
  } else {
    res.status(400).json({message: "You have not entered the proper info to register"})
  }
}));

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

// router.get("/logout", (req, res) => {
//   req.user.deleteToken(req.token, (err, user) => {
//     if (err) return res.status(400).send(err);
//     res.sendStatus(200);
//   });
// });

module.exports = router;
