const { NewsRegion, StorageImage } = require("../database/models");

class NewsRegionController {
  async get(_req, res) {
    try {
      const newsRegion = await NewsRegion.findAndCountAll({
        include: { model: StorageImage, required: true },
        order: [["id", "ASC"]],
      });

      return res.json(newsRegion);
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }

  async create(req, res) {
    try {
      const { title, bodyText, imageId } = req.body;

      if (!title || !bodyText || !imageId) {
        return res
          .status(404)
          .json({ message: "Не переданы все обязательные параметры" });
      }

      const news = await NewsRegion.create({
        title,
        bodyText,
        imageId,
      });

      if (!news) return res.status(404).json({ message: "create news error" });

      return res.json({ message: "success" });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const newsRegion = await NewsRegion.findOne({ where: { id } });

      if (newsRegion) {
        await NewsRegion.destroy({
          where: {
            id,
          },
        });
        return res.json({ message: "success delete" });
      }
      return res.status(404).json({ message: "newsRegion not fount" });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }

  async update(req, res) {
    try {
      const { title, bodyText, imageId, id } = req.body;

      if (!title || !bodyText || !imageId || !id) {
        return res
          .status(404)
          .json({ message: "Не переданы все обязательные параметры" });
      }

      const newsRegion = await NewsRegion.findOne({ where: { id } });

      if (newsRegion) {
        await NewsRegion.update(
          { title, bodyText, imageId },
          {
            where: {
              id,
            },
          }
        );
        return res.json({ message: "success update" });
      }

      return res.status(404).json({ message: "newsRegion not fount" });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }
}

module.exports = new NewsRegionController();
