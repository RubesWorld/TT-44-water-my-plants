const UsersModels = require("../users/users-models");

const validateRegister = async (req, res, next) => {
  const { username, password, phoneNumber } = req.body;
  if (!username || !phoneNumber || !password) {
    res.status(400).json({
      message: "Please ensure username, password and phone number are included",
    });
  } else if (!req.body) {
    res.status(400).json({ message: "You must enter information" });
  } else {
    next();
  }
};

const checkUsername = async (req, res, next) => {
  try {
    const check = await UsersModels.findBy({ username: req.body.username });
    if (!check.length) {
      next();
    } else {
      res.status(401).json("Username Taken");
    }
  } catch (err) {
    res.status(500).json(`Server error: ${err}`);
  }
};

const validateLogin = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({
      message: "Please ensure username and password are included",
    });
  } else if (!req.body) {
    res.status(400).json({ message: "You must enter information to login" });
  } else {
    next();
  }
};

module.exports = {
  validateRegister,
  validateLogin,
  checkUsername,
};
