const { OrganizovannyeMarshruty, StorageImage } = require("../database/models");

class OrganizovannyeMarshrutyController {
  async get(_req, res) {
    try {
      const organizovannyeMarshruty =
        await OrganizovannyeMarshruty.findAndCountAll({
          include: { model: StorageImage },
          order: [["id", "ASC"]],
        });

      return res.json(organizovannyeMarshruty);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const organizovannyeMarshruty = await OrganizovannyeMarshruty.findOne({
        include: { model: StorageImage },
        where: { id },
      });

      return res.json(organizovannyeMarshruty);
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
        email,
        dates,
        template,
        includePrice,
        price,
        days,
        imageId,
      } = req.body;

      if (
        !title ||
        !email ||
        !dates ||
        !template ||
        !includePrice ||
        !price ||
        !days ||
        !imageId
      ) {
        return res
          .status(404)
          .json({ message: "Не переданы все обязательные параметры" });
      }

      const organizovannyeMarshruty = await OrganizovannyeMarshruty.create({
        title,
        email,
        dates,
        template,
        includePrice,
        price,
        days,
        imageId,
      });

      if (!organizovannyeMarshruty)
        return res
          .status(404)
          .json({ message: "organizovannyeMarshruty error" });

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
        email,
        dates,
        template,
        includePrice,
        price,
        days,
        imageId,
        id,
      } = req.body;

      if (
        !title ||
        !email ||
        !dates ||
        !template ||
        !includePrice ||
        !price ||
        !days ||
        !imageId ||
        !id
      ) {
        return res
          .status(404)
          .json({ message: "Не переданы все обязательные параметры" });
      }

      const organizovannyeMarshruty = await OrganizovannyeMarshruty.findOne({
        where: { id },
      });

      if (organizovannyeMarshruty) {
        await OrganizovannyeMarshruty.update(
          {
            title,
            email,
            dates,
            template,
            includePrice,
            price,
            days,
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

      return res
        .status(404)
        .json({ message: "organizovannyeMarshruty not found" });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const organizovannyeMarshruty = await OrganizovannyeMarshruty.findOne({
        where: { id },
      });

      if (organizovannyeMarshruty) {
        await OrganizovannyeMarshruty.destroy({
          where: {
            id,
          },
        });
        return res.json({ message: "success delete" });
      }
      return res
        .status(404)
        .json({ message: "organizovannyeMarshruty not found" });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
}

module.exports = new OrganizovannyeMarshrutyController();
