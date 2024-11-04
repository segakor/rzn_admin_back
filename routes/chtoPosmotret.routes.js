const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/auth.middleware");

const chtoPosmotretController = require("../controller/chtoPosmotret.controller");

router.get("/chtoposmotret", chtoPosmotretController.get);
router.get("/chtoposmotret/:id", chtoPosmotretController.getById);
router.post("/chtoposmotret", chtoPosmotretController.create);
router.put("/chtoposmotret", chtoPosmotretController.update);
router.delete("/chtoposmotret/:id", chtoPosmotretController.delete);

module.exports = router;
