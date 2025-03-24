const { BibliotekaPochitat, StorageImage } = require("../database/models");

class BibliotekaPochitatController {
  async get(_req, res) {
    try {
      const pochitatItems = await BibliotekaPochitat.findAndCountAll({
        include: { model: StorageImage },
        order: [["id", "ASC"]],
      });

      return res.json(pochitatItems);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const pochitatItem = await BibliotekaPochitat.findOne({
        include: { model: StorageImage },
        where: { id },
      });

      if (!pochitatItem)
        return res.status(404).json({ message: "not found pochitatItem" });

      return res.json(pochitatItem);
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
        linkPathOzon,
        linkPathLitres,
        linkPath,
        imageId,
      } = req.body;

      if (!title || !subTitle || !imageId) {
        return res
          .status(404)
          .json({ message: "Не переданы все обязательные параметры" });
      }

      const pochitatItem = await BibliotekaPochitat.create({
        title,
        subTitle,
        linkPathOzon,
        linkPathLitres,
        linkPath,
        imageId,
      });

      if (!pochitatItem)
        return res.status(404).json({ message: "pochitatItem error" });

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
        linkPathOzon,
        linkPathLitres,
        linkPath,
        imageId,
        id,
      } = req.body;

      if (!title || !subTitle || !imageId || !id) {
        return res
          .status(404)
          .json({ message: "Не переданы все обязательные параметры" });
      }

      const pochitatItem = await BibliotekaPochitat.findOne({ where: { id } });

      if (pochitatItem) {
        await BibliotekaPochitat.update(
          {
            title,
            subTitle,
            linkPathOzon,
            linkPathLitres,
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

      return res.status(404).json({ message: "pochitatItem not found" });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const pochitatItem = await BibliotekaPochitat.findOne({ where: { id } });

      if (pochitatItem) {
        await BibliotekaPochitat.destroy({
          where: {
            id,
          },
        });
        return res.json({ message: "success delete" });
      }
      return res.status(404).json({ message: "pochitatItem not found" });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
}

module.exports = new BibliotekaPochitatController();
