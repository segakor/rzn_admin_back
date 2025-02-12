const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/auth.middleware");

const promturizmController = require("../controller/promturizm.controller");

router.get("/promturizm", promturizmController.get);
router.get("/promturizm/:id", promturizmController.getById);
router.post("/promturizm", authMiddleware, promturizmController.create);
router.put("/promturizm", authMiddleware, promturizmController.update);
router.delete("/promturizm/:id", authMiddleware, promturizmController.delete);

module.exports = router;
