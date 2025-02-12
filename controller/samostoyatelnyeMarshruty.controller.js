const {
  SamostoyatelnyeMarshruty,
  StorageImage,
} = require("../database/models");

class SamostoyatelnyeMarshrutyController {
  async get(_req, res) {
    try {
      const samostoyatelnyeMarshruty =
        await SamostoyatelnyeMarshruty.findAndCountAll({
          include: { model: StorageImage },
          order: [["sequence", "DESC"]],
        });

      return res.json(samostoyatelnyeMarshruty);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const samostoyatelnyeMarshruty = await SamostoyatelnyeMarshruty.findOne({
        include: { model: StorageImage },
        where: { id },
      });

      if (!samostoyatelnyeMarshruty)
        return res
          .status(404)
          .json({ message: "not found samostoyatelnyeMarshruty" });

      return res.json(samostoyatelnyeMarshruty);
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
        category,
        tags,
        template,
        linkPath,
        imageId,
        sequence,
      } = req.body;

      if (!title || !subTitle || !category || !imageId) {
        return res
          .status(404)
          .json({ message: "Не переданы все обязательные параметры" });
      }

      const samostoyatelnyeMarshruty = await SamostoyatelnyeMarshruty.create({
        title,
        subTitle,
        category,
        tags,
        template,
        imageId,
        linkPath,
        sequence,
      });

      if (!samostoyatelnyeMarshruty)
        return res
          .status(404)
          .json({ message: "samostoyatelnyeMarshruty error" });

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
        category,
        tags,
        template,
        linkPath,
        imageId,
        id,
        sequence,
      } = req.body;

      if (!title || !subTitle || !category || !imageId || !id) {
        return res
          .status(404)
          .json({ message: "Не переданы все обязательные параметры" });
      }

      const samostoyatelnyeMarshruty = await SamostoyatelnyeMarshruty.findOne({
        where: { id },
      });

      if (samostoyatelnyeMarshruty) {
        await SamostoyatelnyeMarshruty.update(
          {
            title,
            subTitle,
            category,
            tags,
            template,
            linkPath,
            imageId,
            sequence,
          },
          {
            where: {
              id,
            },
          }
        );
        return res.json({ message: "success update" });
      }

      return res
        .status(404)
        .json({ message: "samostoyatelnyeMarshruty not found" });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const samostoyatelnyeMarshruty = await SamostoyatelnyeMarshruty.findOne({
        where: { id },
      });

      if (samostoyatelnyeMarshruty) {
        await SamostoyatelnyeMarshruty.destroy({
          where: {
            id,
          },
        });
        return res.json({ message: "success delete" });
      }
      return res
        .status(404)
        .json({ message: "samostoyatelnyeMarshruty not found" });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
}

module.exports = new SamostoyatelnyeMarshrutyController();
