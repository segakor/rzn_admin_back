const { Promturizm, StorageImage } = require("../database/models");

class PromturizmController {
  async get(_req, res) {
    try {
      const items = await Promturizm.findAndCountAll({
        include: { model: StorageImage },
        order: [["id", "ASC"]],
      });

      return res.json(items);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const item = await Promturizm.findOne({
        include: { model: StorageImage },
        where: { id },
      });

      if (!item) return res.status(404).json({ message: "not found item" });

      return res.json(item);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }

  async create(req, res) {
    try {
      const { title, subTitle, address, ageLimit, tags, template, imageId } =
        req.body;

      if (
        !address ||
        !subTitle ||
        !title ||
        !ageLimit ||
        !tags ||
        !template ||
        !imageId
      ) {
        return res
          .status(404)
          .json({ message: "Не переданы все обязательные параметры" });
      }

      const itemObj = await Promturizm.create({
        title,
        subTitle,
        address,
        ageLimit,
        tags,
        template,
        imageId,
      });

      if (!itemObj) return res.status(404).json({ message: "itemObj error" });

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
        ageLimit,
        tags,
        template,
        imageId,
        id,
      } = req.body;

      if (
        !address ||
        !subTitle ||
        !title ||
        !ageLimit ||
        !tags ||
        !template ||
        !imageId
      ) {
        return res
          .status(404)
          .json({ message: "Не переданы все обязательные параметры" });
      }

      const itemObj = await Promturizm.findOne({ where: { id } });

      if (itemObj) {
        await Promturizm.update(
          {
            title,
            subTitle,
            ageLimit,
            imageId,
            template,
            tags,
            address,
          },
          {
            where: {
              id,
            },
          }
        );
        return res.json({ message: "success update" });
      }

      return res.status(404).json({ message: "itemObj not found" });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err,
      });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const itemObj = await Promturizm.findOne({ where: { id } });

      if (itemObj) {
        await Promturizm.destroy({
          where: {
            id,
          },
        });
        return res.json({ message: "success delete" });
      }
      return res.status(404).json({ message: "itemObj not found" });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
}

module.exports = new PromturizmController();
