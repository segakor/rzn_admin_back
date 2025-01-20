const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/auth.middleware");

const gidController = require("../controller/gid.controller");

router.get("/gid", gidController.get);
router.get("/gid/:id", gidController.getById);
router.post("/gid", authMiddleware, gidController.create);
router.put("/gid", authMiddleware, gidController.update);
router.delete("/gid/:id", authMiddleware, gidController.delete);

module.exports = router;
