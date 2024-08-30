const { Sequelize } = require("sequelize");

const DB_NAME = "rzntourism";
const DB_USER = "root";
const DB_PASSWORD = "root";
const DB_HOST = "localhost";
const DB_PORT = 5432;

module.exports = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: "postgres",
  host: DB_HOST,
  port: DB_PORT,
});
