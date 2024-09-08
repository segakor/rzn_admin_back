class UploadController {
  async get(_req, res) {
   /*  try {
      const newsArt = await NewsArt.findAndCountAll({
        order: [["createdAt", "DESC"]],
      });
      return res.json(newsArt);
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    } */
  }

  async create(req, res) {

    try {
      const { file } = req;

      console.log(file)

      let filedata = file;
 
      if(!filedata)
        res.status(500).json({ message: "error upload" });

      return res.json({ message: "success upload" });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }

  async delete(req, res) {
    /* try {
      const id = req.params.id;
      const newsArt = await NewsArt.findOne({ where: { id } });
      if (newsArt) {
        await NewsArt.destroy({
          where: {
            id,
          },
        });
        return res.json({ message: "success delete" });
      }
      return res.status(404).json({ message: "newsArt not fount" });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    } */
  }
}

module.exports = new UploadController();
