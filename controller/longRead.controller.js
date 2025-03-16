const { LongRead } = require("../database/models");

class LongReadController {
  async get(_req, res) {
    try {
      const longRead = await LongRead.findAndCountAll({
        order: [["id", "ASC"]],
      });

      return res.json(longRead);
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const longRead = await LongRead.findOne({
        where: { title: id },
      });

      if (!longRead)
        return res.status(404).json({ message: "not found longRead" });

      return res.json(longRead);
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }

  async create(req, res) {
    try {
      const { title, bodyText } = req.body;

      if (!title || !bodyText) {
        return res
          .status(404)
          .json({ message: "Не переданы все обязательные параметры" });
      }

      const longRead = await LongRead.create({
        title,
        bodyText,
      });

      if (!longRead)
        return res.status(404).json({ message: "create longRead error" });

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
      const longRead = await LongRead.findOne({ where: { id } });

      if (longRead) {
        await LongRead.destroy({
          where: {
            id,
          },
        });
        return res.json({ message: "success delete" });
      }
      return res.status(404).json({ message: "longRead not found" });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }

  async update(req, res) {
    try {
      const { title, bodyText } = req.body;

      if (!title || !bodyText) {
        return res
          .status(404)
          .json({ message: "Не переданы все обязательные параметры" });
      }

      const longRead = await LongRead.findOne({ where: { title } });

      if (longRead) {
        await longRead.update(
          { bodyText },
          {
            where: {
              title,
            },
          }
        );
        return res.json({ message: "success update" });
      }

      return res.status(404).json({ message: "longRead not found" });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }
}

module.exports = new LongReadController();
