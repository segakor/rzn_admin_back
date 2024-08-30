const { NewsArt } = require("../database/models");

class NewsArtController {
  async get(_req, res) {
    try {
      const newsArt = await NewsArt.findAndCountAll({
        order: [["createdAt", "DESC"]],
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
      const { title, bodyText, imagePath } = req.body;

      if (!title || !bodyText || !imagePath) {
        return res
          .status(404)
          .json({ message: "Не переданы все обязательные параметры" });
      }

      await NewsArt.create({
        title,
        bodyText,
        imagePath,
      });

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
      const { title, bodyText, imagePath, id } = req.body;

      if (!title || !bodyText || !imagePath || !id) {
        return res
          .status(404)
          .json({ message: "Не переданы все обязательные параметры" });
      }

      const newsArt = await NewsArt.findOne({ where: { id } });

      if (newsArt) {
        await NewsArt.update(
          { title, bodyText, imagePath },
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
