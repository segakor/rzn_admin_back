const { Banner, StorageImage } = require("../database/models");

class BannerController {
  async get(_req, res) {
    try {
      const banners = await Banner.findAndCountAll({
        include: { model: StorageImage },
        order: [["id", "ASC"]],
      });

      return res.json(banners);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const banner = await Banner.findOne({
        include: { model: StorageImage },
        where: { id },
      });

      if (!banner) return res.status(404).json({ message: "not found banner" });

      return res.json(banner);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }

  async create(req, res) {
    try {
      const { title, subTitle, linkPath, sequence, imageId, isActive } =
        req.body;

      if (!linkPath || !subTitle || !title || !sequence || !imageId) {
        return res
          .status(404)
          .json({ message: "Не переданы все обязательные параметры" });
      }

      const bannerObj = await Banner.create({
        title,
        subTitle,
        linkPath,
        sequence,
        imageId,
        isActive,
      });

      if (!bannerObj)
        return res.status(404).json({ message: "bannerObj error" });

      return res.json({ message: "success" });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }

  async update(req, res) {
    try {
      const { title, subTitle, linkPath, sequence, imageId, isActive, id } =
        req.body;

      if (!linkPath || !subTitle || !title || !sequence || !imageId || !id) {
        return res
          .status(404)
          .json({ message: "Не переданы все обязательные параметры" });
      }

      const bannerObj = await Banner.findOne({ where: { id } });

      if (bannerObj) {
        await Banner.update(
          {
            title,
            subTitle,
            linkPath,
            sequence,
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

      return res.status(404).json({ message: "bannerObj not found" });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const bannerObj = await Banner.findOne({ where: { id } });

      if (bannerObj) {
        await Banner.destroy({
          where: {
            id,
          },
        });
        return res.json({ message: "success delete" });
      }
      return res.status(404).json({ message: "bannerObj not found" });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
}

module.exports = new BannerController();
