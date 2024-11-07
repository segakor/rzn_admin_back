const { ChtoPosmotret, StorageImage } = require("../database/models");

class ChtoPosmotretController {
  async get(_req, res) {
    try {
      const chtoPosmotret = await ChtoPosmotret.findAndCountAll({
        include: { model: StorageImage },
        order: [["id", "ASC"]],
      });

      return res.json(chtoPosmotret);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const chtoPosmotret = await ChtoPosmotret.findOne({
        include: { model: StorageImage },
        where: { id },
      });

      return res.json(chtoPosmotret);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }

  async create(req, res) {
    try {
      const {
        title,
        subTitle,
        address,
        category,
        tags,
        template,
        contacts,
        imageId,
      } = req.body;

      if (
        !title ||
        !subTitle ||
        !address ||
        !category ||
        !tags ||
        !imageId ||
        !template ||
        !contacts
      ) {
        return res
          .status(404)
          .json({ message: "Не переданы все обязательные параметры" });
      }

      const chtoPosmotret = await ChtoPosmotret.create({
        title,
        subTitle,
        address,
        category,
        tags,
        template,
        contacts,
        imageId,
      });

      if (!chtoPosmotret)
        return res.status(404).json({ message: "chtoPosmotret error" });

      return res.json({ message: "success" });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }

  async update(req, res) {
    try {
      const {
        title,
        subTitle,
        address,
        category,
        tags,
        template,
        contacts,
        imageId,
        id,
      } = req.body;

      if (
        !title ||
        !subTitle ||
        !address ||
        !category ||
        !tags ||
        !imageId ||
        !template ||
        !contacts ||
        !id
      ) {
        return res
          .status(404)
          .json({ message: "Не переданы все обязательные параметры" });
      }

      const chtoPosmotret = await ChtoPosmotret.findOne({ where: { id } });

      if (chtoPosmotret) {
        await ChtoPosmotret.update(
          {
            title,
            subTitle,
            address,
            category,
            tags,
            template,
            contacts,
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

      return res.status(404).json({ message: "chtoPosmotret not found" });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const chtoPosmotret = await ChtoPosmotret.findOne({ where: { id } });

      if (chtoPosmotret) {
        await ChtoPosmotret.destroy({
          where: {
            id,
          },
        });
        return res.json({ message: "success delete" });
      }
      return res.status(404).json({ message: "chtoPosmotret not found" });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
}

module.exports = new ChtoPosmotretController();
