const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/auth.middleware");

const nasledieController = require("../controller/nasledie.controller");

router.get("/nasledie", nasledieController.get);
router.get("/nasledie/:id", nasledieController.getById);
router.post("/nasledie", authMiddleware, nasledieController.create);
router.put("/nasledie", authMiddleware, nasledieController.update);
router.delete("/nasledie/:id", authMiddleware, nasledieController.delete);

module.exports = router;
