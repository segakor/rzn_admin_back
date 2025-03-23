const { Nasledie, StorageImage } = require("../database/models");

class NasledieController {
  async get(req, res) {
    const {
      query: { category },
    } = req;
    try {
      const nasledie = await Nasledie.findAndCountAll({
        include: { model: StorageImage },
        order: [["category", "DESC"]],
        ...(category && { where: { category } }),
      });

      return res.json(nasledie);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const nasledie = await Nasledie.findOne({
        include: { model: StorageImage },
        where: { id },
      });

      if (!nasledie)
        return res.status(404).json({ message: "not found nasledie" });

      return res.json(nasledie);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }

  async create(req, res) {
    try {
      const { title, subTitle, category, template, imageId } = req.body;

      if (!title || !subTitle || !category || !imageId || !template) {
        return res
          .status(404)
          .json({ message: "Не переданы все обязательные параметры" });
      }

      const nasledie = await Nasledie.create({
        title,
        subTitle,
        category,
        template,
        imageId,
      });

      if (!nasledie) return res.status(404).json({ message: "nasledie error" });

      return res.json({ message: "success" });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }

  async update(req, res) {
    try {
      const { title, subTitle, category, template, imageId, id } = req.body;

      if (!title || !subTitle || !category || !imageId || !template || !id) {
        return res
          .status(404)
          .json({ message: "Не переданы все обязательные параметры" });
      }

      const nasledie = await Nasledie.findOne({ where: { id } });

      if (nasledie) {
        await Nasledie.update(
          {
            title,
            subTitle,
            category,
            template,
            imageId,
          },
          {
            where: {
              id,
            },
          }
        );
        return res.json({ message: "success update" });
      }

      return res.status(404).json({ message: "nasledie not found" });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const nasledie = await Nasledie.findOne({ where: { id } });

      if (nasledie) {
        await Nasledie.destroy({
          where: {
            id,
          },
        });
        return res.json({ message: "success delete" });
      }
      return res.status(404).json({ message: "nasledie not found" });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
}

module.exports = new NasledieController();
