const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/auth.middleware");

const authController = require("../controller/auth.controller");

router.post("/registration", authController.registration);
router.post("/login", authController.login);
router.get("/users", authMiddleware, authController.getUsers);

module.exports = router;
