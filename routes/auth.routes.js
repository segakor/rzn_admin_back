const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/auth.middleware");

const authController = require("../controller/auth.controller");

router.post("/registration", authMiddleware, authController.registration);
router.post("/login", authController.login);
router.get("/users", authMiddleware, authController.getUsers);
router.get("/me", authMiddleware, authController.checkAuth);

module.exports = router;
