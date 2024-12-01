const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/auth.middleware");

const answersController = require("../controller/answers.controller");

router.get("/answer", answersController.get);
router.get("/answer/:id", answersController.getById);
router.post("/answer", authMiddleware, answersController.create);
router.put("/answer", authMiddleware, answersController.update);
router.delete("/answer/:id", authMiddleware, answersController.delete);

module.exports = router;
