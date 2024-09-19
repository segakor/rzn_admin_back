require("dotenv").config();

const envMode = process.env.NODE_ENV;

const SSL_D = process.env.SSL_D;
const SECRET = process.env.SECRET;

module.exports = {
  SSL_D,
  SECRET,
  envMode,
};
