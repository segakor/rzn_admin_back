const { BibliotekaPosmotret, StorageImage } = require("../database/models");

class BibliotekaPosmotretController {
  async get(_req, res) {
    try {
      const posmotretItems = await BibliotekaPosmotret.findAndCountAll({
        include: { model: StorageImage },
        order: [["id", "ASC"]],
      });

      return res.json(posmotretItems);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const posmotretItem = await BibliotekaPosmotret.findOne({
        include: { model: StorageImage },
        where: { id },
      });

      if (!posmotretItem)
        return res.status(404).json({ message: "not found posmotretItem" });

      return res.json(posmotretItem);
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
        prolongation,
        date,
        linkName,
        linkPath,
        imageId,
      } = req.body;

      if (!title || !subTitle || !imageId || !date) {
        return res
          .status(404)
          .json({ message: "Не переданы все обязательные параметры" });
      }

      const posmotretItem = await BibliotekaPosmotret.create({
        title,
        subTitle,
        prolongation,
        date,
        linkName,
        linkPath,
        imageId,
      });

      if (!posmotretItem)
        return res.status(404).json({ message: "posmotretItem error" });

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
        prolongation,
        date,
        linkName,
        linkPath,
        imageId,
        id,
      } = req.body;

      if (!title || !subTitle || !imageId || !id) {
        return res
          .status(404)
          .json({ message: "Не переданы все обязательные параметры" });
      }

      const posmotretItem = await BibliotekaPosmotret.findOne({
        where: { id },
      });

      if (posmotretItem) {
        await BibliotekaPosmotret.update(
          {
            title,
            subTitle,
            prolongation,
            date,
            linkName,
            linkPath,
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

      return res.status(404).json({ message: "posmotretItem not found" });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const posmotretItem = await BibliotekaPosmotret.findOne({
        where: { id },
      });

      if (posmotretItem) {
        await BibliotekaPosmotret.destroy({
          where: {
            id,
          },
        });
        return res.json({ message: "success delete" });
      }
      return res.status(404).json({ message: "posmotretItem not found" });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
}

module.exports = new BibliotekaPosmotretController();
