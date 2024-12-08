require("dotenv").config();

const envMode = process.env.NODE_ENV;

const SSL_D = process.env.SSL_D;
const PROD_URL = process.env.PROD_URL;
const SECRET =
  envMode === "production" ? process.env.SECRET_PROD : process.env.SECRET_DEV;

module.exports = {
  SSL_D,
  SECRET,
  envMode,
  PROD_URL,
};
