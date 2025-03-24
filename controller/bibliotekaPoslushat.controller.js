const { BibliotekaPoslushat, StorageImage } = require("../database/models");

class BibliotekaPoslushatController {
  async get(_req, res) {
    try {
      const poslushatItems = await BibliotekaPoslushat.findAndCountAll({
        include: { model: StorageImage },
        order: [["id", "ASC"]],
      });

      return res.json(poslushatItems);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const poshitatItem = await BibliotekaPoslushat.findOne({
        include: { model: StorageImage },
        where: { id },
      });

      if (!poshitatItem)
        return res.status(404).json({ message: "not found poshitatItem" });

      return res.json(poshitatItem);
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
        linkPathYa,
        linkPathIzi,
        imageId,
      } = req.body;

      if (!title || !subTitle || !imageId || !date) {
        return res
          .status(404)
          .json({ message: "Не переданы все обязательные параметры" });
      }

      const poshitatItem = await BibliotekaPoslushat.create({
        title,
        subTitle,
        prolongation,
        date,
        linkPathYa,
        linkPathIzi,
        imageId,
      });

      if (!poshitatItem)
        return res.status(404).json({ message: "poshitatItem error" });

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
        linkPathYa,
        linkPathIzi,
        imageId,
        id,
      } = req.body;

      if (!title || !subTitle || !imageId || !id) {
        return res
          .status(404)
          .json({ message: "Не переданы все обязательные параметры" });
      }

      const poshitatItem = await BibliotekaPoslushat.findOne({ where: { id } });

      if (poshitatItem) {
        await BibliotekaPoslushat.update(
          {
            title,
            subTitle,
            prolongation,
            date,
            linkPathYa,
            linkPathIzi,
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

      return res.status(404).json({ message: "poshitatItem not found" });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const poshitatItem = await BibliotekaPoslushat.findOne({ where: { id } });

      if (poshitatItem) {
        await BibliotekaPoslushat.destroy({
          where: {
            id,
          },
        });
        return res.json({ message: "success delete" });
      }
      return res.status(404).json({ message: "poshitatItem not found" });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
}

module.exports = new BibliotekaPoslushatController();
