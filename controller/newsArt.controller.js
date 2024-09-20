const { NewsArt, StorageImage } = require("../database/models");

class NewsArtController {
  async get(_req, res) {
    try {
      const newsArt = await NewsArt.findAndCountAll({
        include: { model: StorageImage },
        order: [["date", "DESC"]],
      });

      return res.json(newsArt);
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }

  async create(req, res) {
    try {
      const { title, bodyText, imageId, date } = req.body;

      if (!title || !bodyText || !imageId || !date) {
        return res
          .status(404)
          .json({ message: "Не переданы все обязательные параметры" });
      }

      const news = await NewsArt.create({
        title,
        bodyText,
        imageId,
        date,
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
    }
  }

  async update(req, res) {
    try {
      const { title, bodyText, imageId, date, id } = req.body;

      if (!title || !bodyText || !imageId || !date || !id) {
        return res
          .status(404)
          .json({ message: "Не переданы все обязательные параметры" });
      }

      const newsArt = await NewsArt.findOne({ where: { id } });

      if (newsArt) {
        await NewsArt.update(
          { title, bodyText, imageId, date },
          {
            where: {
              id,
            },
          }
        );
        return res.json({ message: "success update" });
      }

      return res.status(404).json({ message: "newsArt not fount" });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }
}

module.exports = new NewsArtController();
