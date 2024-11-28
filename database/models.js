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
    date: { type: DataTypes.STRING },
    imageId: { type: DataTypes.INTEGER },
  },
  { underscored: true, freezeTableName: true, timestamps: false }
);

const NewsRegion = sequelize.define(
  "news_region",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    bodyText: { type: DataTypes.TEXT },
    date: { type: DataTypes.STRING },
    imageId: { type: DataTypes.INTEGER },
  },
  { underscored: true, freezeTableName: true, timestamps: false }
);

const ChtoPosmotret = sequelize.define(
  "chto_posmotret",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    subTitle: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    category: { type: DataTypes.STRING },
    contacts: { type: DataTypes.TEXT },
    tags: {
      type: DataTypes.TEXT,
      get: function () {
        return JSON.parse(this.getDataValue("tags"));
      },
      set: function (value) {
        this.setDataValue("tags", JSON.stringify(value));
      },
    },
    imageId: { type: DataTypes.INTEGER },
    template: { type: DataTypes.TEXT },
  },

  { underscored: true, freezeTableName: true, timestamps: false }
);
const OrganizovannyeMarshruty = sequelize.define(
  "organizovannye_marshruty",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    subTitle: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    dates: { type: DataTypes.STRING },
    includePrice: { type: DataTypes.STRING },
    price: { type: DataTypes.STRING },
    days: { type: DataTypes.STRING },
    imageId: { type: DataTypes.INTEGER },
    template: { type: DataTypes.TEXT },
  },

  { underscored: true, freezeTableName: true, timestamps: false }
);
const SamostoyatelnyeMarshruty = sequelize.define(
  "samostoyatelnye_marshruty",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    subTitle: { type: DataTypes.STRING },
    category: { type: DataTypes.STRING },
    tags: {
      type: DataTypes.TEXT,
      get: function () {
        return JSON.parse(this.getDataValue("tags"));
      },
      set: function (value) {
        this.setDataValue("tags", JSON.stringify(value));
      },
    },
    link_path: { type: DataTypes.STRING },
    imageId: { type: DataTypes.INTEGER },
    template: { type: DataTypes.TEXT },
  },

  { underscored: true, freezeTableName: true, timestamps: false }
);

const StorageImage = sequelize.define(
  "storage_image",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    imagePath: { type: DataTypes.STRING },
  },
  { underscored: true, freezeTableName: true }
);

const LongRead = sequelize.define(
  "long_read",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    bodyText: { type: DataTypes.TEXT },
  },
  { underscored: true, freezeTableName: true }
);

NewsArt.hasOne(StorageImage, {
  foreignKey: "id",
  sourceKey: "imageId",
});

NewsRegion.hasOne(StorageImage, {
  foreignKey: "id",
  sourceKey: "imageId",
});

ChtoPosmotret.hasOne(StorageImage, {
  foreignKey: "id",
  sourceKey: "imageId",
});

SamostoyatelnyeMarshruty.hasOne(StorageImage, {
  foreignKey: "id",
  sourceKey: "imageId",
});

OrganizovannyeMarshruty.hasOne(StorageImage, {
  foreignKey: "id",
  sourceKey: "imageId",
});

//freezeTableName убирает s в название таблицы при инсерте

module.exports = {
  User,
  NewsArt,
  StorageImage,
  NewsRegion,
  LongRead,
  ChtoPosmotret,
  SamostoyatelnyeMarshruty,
  OrganizovannyeMarshruty,
};
