const { secret } = require("../config/secret");
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  if (req.methid === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "Пользователь не авторизован" });
    }

    const decodeToken = jwt.verify(token, secret);
    req.user = decodeToken;
    next()
  } catch (error) {
    return res.status(403).json({ message: "Пользователь не авторизован" });
  }
};
