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
  Users.findByFilter({ username: req.body.username })
    .then((user) => {
      if (user) {
        next({ status: 409, message: "username taken" });
      } else {
        next();
      }
    })
    .catch(next);
};

module.exports = {
  bodyVerify,
  uniqueNameVerify,
};
