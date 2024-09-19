const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/auth.middleware");

const newsRegionController = require("../controller/newsRegion.controller");

router.get("/newsRegion", newsRegionController.get);
router.post("/newsRegion", authMiddleware, newsRegionController.create);
router.delete("/newsRegion/:id", authMiddleware, newsRegionController.delete);
router.put("/newsRegion", authMiddleware, newsRegionController.update);

module.exports = router;
