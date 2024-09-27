const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/auth.middleware");

const longReadController = require("../controller/longRead.controller");

router.get("/longRead", longReadController.get);
router.post("/longRead", authMiddleware, longReadController.create);
router.delete("/longRead/:id", authMiddleware, longReadController.delete);
router.get("/longRead/:id", longReadController.getById);
router.put("/longRead", authMiddleware, longReadController.update);

module.exports = router;
