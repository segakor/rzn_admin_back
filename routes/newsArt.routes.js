const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/auth.middleware");

const newsArtController = require("../controller/newsArt.controller");

router.get('/newsArt', newsArtController.get)
router.post("/newsArt", authMiddleware, newsArtController.create);
router.delete("/newsArt/:id", authMiddleware, newsArtController.delete);
router.put("/newsArt", authMiddleware, newsArtController.update);

module.exports = router;
