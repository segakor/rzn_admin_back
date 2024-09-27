require("dotenv").config();

const envMode = process.env.NODE_ENV;

const SSL_D = process.env.SSL_D;
const SECRET = process.env.SECRET;
const PROD_URL = process.env.PROD_URL;

module.exports = {
  SSL_D,
  SECRET,
  envMode,
  PROD_URL,
};
