const { StorageFile } = require("../database/models");

class UploadFileController {
  async get(_req, res) {
    try {
      const result = await StorageFile.findAndCountAll({
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

      if (!filedata)
        return res.status(500).json({ message: "error uploadFile" });

      const fileObg = await StorageFile.create({
        filePath: file.path,
      });

      if (!fileObg)
        return res.status(404).json({ message: "create fileObg error" });

      const { id, filePath } = fileObg;

      return res.json({
        id,
        filePath,
      });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const file = await StorageFile.findOne({ where: { id } });

      if (file) {
        await StorageFile.destroy({
          where: {
            id,
          },
        });
        return res.json({ message: "success delete" });
      }
      return res.status(404).json({ message: "File not found" });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }
}

module.exports = new UploadFileController();
