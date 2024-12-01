const { Answer } = require("../database/models");

class AnswerController {
  async get(_req, res) {
    try {
      const answers = await Answer.findAndCountAll({
        order: [["id", "ASC"]],
      });

      return res.json(answers);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const answers = await Answer.findOne({
        where: { id },
      });

      return res.json(answers);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }

  async create(req, res) {
    try {
      const { title, category, keywords, answers } = req.body;

      if (!title || !category || !keywords || !answers) {
        return res
          .status(404)
          .json({ message: "Не переданы все обязательные параметры" });
      }

      const answersObj = await Answer.create({
        title,
        category,
        keywords,
        answers,
      });

      if (!answersObj)
        return res.status(404).json({ message: "answersObj error" });

      return res.json({ message: "success" });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }

  async update(req, res) {
    try {
      const { title, category, keywords, answers, id } = req.body;

      if (!title || !category || !keywords || !answers || !id) {
        return res
          .status(404)
          .json({ message: "Не переданы все обязательные параметры" });
      }

      const answersObj = await Answer.findOne({ where: { id } });

      if (answersObj) {
        await Answer.update(
          {
            title,
            keywords,
            category,
            answers,
          },
          {
            where: {
              id,
            },
          }
        );
        return res.json({ message: "success update" });
      }

      return res.status(404).json({ message: "answersObj not found" });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const answersObj = await Answer.findOne({ where: { id } });

      if (answersObj) {
        await Answer.destroy({
          where: {
            id,
          },
        });
        return res.json({ message: "success delete" });
      }
      return res.status(404).json({ message: "answersObj not found" });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
}

module.exports = new AnswerController();
