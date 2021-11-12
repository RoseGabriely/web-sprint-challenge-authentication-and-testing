const Users = require("./auth-models");

const bodyVerify = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    next({ status: 400, message: "username and password required" });
  } else {
    next();
  }
};

const uniqueNameVerify = (req, res, next) => {
  Users.findByUsername({ username: req.body.username })
    .then((user) => {
      if (user) {
        next({ status: 409, message: "username taken" });
      } else {
        next();
      }
    })
    .catch(next);
};

const usernameVerify = (req, res, next) => {
  Users.findBy({ username: req.body.username })
    .then((user) => {
      if (!user) {
        next({ status: 401, message: "invalid credentials" });
      } else {
        req.user = user[0];
        next();
      }
    })
    .catch(next);
};

module.exports = {
  bodyVerify,
  uniqueNameVerify,
  usernameVerify,
};
