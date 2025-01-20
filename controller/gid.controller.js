const { Gid, StorageImage } = require("../database/models");

class GidController {
  async get(_req, res) {
    try {
      const guides = await Gid.findAndCountAll({
        include: { model: StorageImage },
        order: [["id", "ASC"]],
      });

      return res.json(guides);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const gid = await Gid.findOne({
        include: { model: StorageImage },
        where: { id },
      });

      if (!gid) return res.status(404).json({ message: "not found gid" });

      return res.json(gid);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }

  async create(req, res) {
    try {
      const { fio, phone, title, bodyText, imageId, isActive } = req.body;

      if (!fio || !phone || !title || !bodyText || !imageId) {
        return res
          .status(404)
          .json({ message: "Не переданы все обязательные параметры" });
      }

      const gidObj = await Gid.create({
        fio,
        phone,
        title,
        bodyText,
        imageId,
        isActive,
      });

      if (!gidObj) return res.status(404).json({ message: "gidObj error" });

      return res.json({ message: "success" });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }

  async update(req, res) {
    try {
      const { fio, phone, title, bodyText, imageId, id, isActive } = req.body;

      if (!fio || !phone || !title || !bodyText || !imageId || !id) {
        return res
          .status(404)
          .json({ message: "Не переданы все обязательные параметры" });
      }

      const gidObj = await Gid.findOne({ where: { id } });

      if (gidObj) {
        await Gid.update(
          {
            fio,
            phone,
            title,
            bodyText,
            imageId,
            isActive,
          },
          {
            where: {
              id,
            },
          }
        );
        return res.json({ message: "success update" });
      }

      return res.status(404).json({ message: "gidObj not found" });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const gidObj = await Gid.findOne({ where: { id } });

      if (gidObj) {
        await Gid.destroy({
          where: {
            id,
          },
        });
        return res.json({ message: "success delete" });
      }
      return res.status(404).json({ message: "gidObj not found" });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
}

module.exports = new GidController();
