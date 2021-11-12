const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./secret");

module.exports = function tokenBuilder(userInfo) {
  const payload = {
    subject: userInfo.id,
    username: userInfo.username,
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, JWT_SECRET, options);
};
