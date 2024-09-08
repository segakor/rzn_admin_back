const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/auth.middleware");

const authController = require("../controller/auth.controller");

router.post("/api/registration", authController.registration);
router.post("/api/login", authController.login);
router.get("/api/users", authMiddleware, authController.getUsers);

module.exports = router;
