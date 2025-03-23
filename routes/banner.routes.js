const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/auth.middleware");

const bannerController = require("../controller/banner.controller");

router.get("/banner", bannerController.get);
router.get("/banner/:id", bannerController.getById);
router.post("/banner", authMiddleware, bannerController.create);
router.put("/banner", authMiddleware, bannerController.update);
router.delete("/banner/:id", authMiddleware, bannerController.delete);

module.exports = router;
