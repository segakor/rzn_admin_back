const { StorageImage } = require("../database/models");
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

      return res.json({ id, imagePath });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err,
      });
    }
  }

  async delete(req, res) {
    /* try {
      const id = req.params.id;
      const newsArt = await NewsArt.findOne({ where: { id } });
      if (newsArt) {
        await NewsArt.destroy({
          where: {
            id,
          },
        });
        return res.json({ message: "success delete" });
      }
      return res.status(404).json({ message: "newsArt not fount" });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    } */
  }
}

module.exports = new UploadController();
