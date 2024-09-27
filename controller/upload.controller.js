const { StorageImage } = require("../database/models");
const { envMode, PROD_URL } = require("../env_var");
class UploadController {
  async get(_req, res) {
    try {
      const result = await StorageImage.findAndCountAll({
        order: [["createdAt", "DESC"]],
      });
      return res.json(result);
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }

  async create(req, res) {
    try {
      const { file } = req;

      let filedata = file;

      if (!filedata) return res.status(500).json({ message: "error upload" });

      const image = await StorageImage.create({
        imagePath: file.path,
      });

      if (!image)
        return res.status(404).json({ message: "create image error" });

      const { id, imagePath } = image;

      return res.json({
        id,
        imagePath,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err,
      });
    }
  }

  async createForLongRead(req, res) {
    try {
      const { file } = req;

      let filedata = file;

      if (!filedata) return res.status(500).json({ message: "error upload" });

      const image = await StorageImage.create({
        imagePath: file.path,
      });

      const baseUrl =
        envMode === "production"
          ? `${PROD_URL}/api-v2`
          : "http://localhost:5001/api-v2";

      if (!image)
        return res.status(404).json({ message: "create image error" });

      return res.json({
        uploaded: 1,
        url: `${baseUrl}/${file.path}`,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        uploaded: 0,
        url: `${baseUrl}/${file.path}`,
        error: "Ошибка",
        message: "Ошибка",
      });
    }
  }
}

module.exports = new UploadController();
