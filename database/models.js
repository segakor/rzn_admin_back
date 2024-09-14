const sequelize = require("./db");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "users",
  {
    userName: { type: DataTypes.STRING, primaryKey: true, unique: true },
    password: { type: DataTypes.STRING },
  },
  { underscored: true /* timestamps: false,  */ }
);

const NewsArt = sequelize.define(
  "news_art",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    bodyText: { type: DataTypes.TEXT },
    imagePath: { type: DataTypes.STRING },
  },
  { underscored: true, freezeTableName: true }
);

const StorageImage = sequelize.define(
  "storage_image",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    imagePath: { type: DataTypes.STRING },
  },
  { underscored: true, freezeTableName: true }
);

//freezeTableName убирает s в название таблицы при инсерте

module.exports = {
  User,
  NewsArt,
  StorageImage,
};
