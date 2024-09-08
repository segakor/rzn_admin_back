const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/auth.middleware");

const newsArtController = require("../controller/newsArt.controller");

router.get('/api/newsArt', newsArtController.get)
router.post("/api/newsArt", authMiddleware, newsArtController.create);
router.delete("/api/newsArt/:id", authMiddleware, newsArtController.delete);
router.put("/api/newsArt", authMiddleware, newsArtController.update);

module.exports = router;
