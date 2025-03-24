const fs = require("fs");

module.exports = function (req, res, next) {
  const { filePath } = req.query;

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Ошибка при удалении файла:", err);
      return res.status(500).json({ message: "Не удалось удалить файл" });
    }
    next();
  });
};
