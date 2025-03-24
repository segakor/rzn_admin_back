const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/auth.middleware");

const bibliotekaPochitatController = require("../controller/bibliotekaPochitat.controller");
const bibliotekaPoslushatController = require("../controller/bibliotekaPoslushat.controller");
const bibliotekaPosmotretController = require("../controller/bibliotekaPosmotret.controller");

//pochitat
router.get("/biblioteka/pochitat", bibliotekaPochitatController.get);
router.get("/biblioteka/pochitat/:id", bibliotekaPochitatController.getById);
router.post(
  "/biblioteka/pochitat",
  authMiddleware,
  bibliotekaPochitatController.create
);
router.put(
  "/biblioteka/pochitat",
  authMiddleware,
  bibliotekaPochitatController.update
);
router.delete(
  "/biblioteka/pochitat/:id",
  authMiddleware,
  bibliotekaPochitatController.delete
);

//poslushat
router.get("/biblioteka/poslushat", bibliotekaPoslushatController.get);
router.get("/biblioteka/poslushat/:id", bibliotekaPoslushatController.getById);
router.post(
  "/biblioteka/poslushat",
  authMiddleware,
  bibliotekaPoslushatController.create
);
router.put(
  "/biblioteka/poslushat",
  authMiddleware,
  bibliotekaPoslushatController.update
);
router.delete(
  "/biblioteka/poslushat/:id",
  authMiddleware,
  bibliotekaPoslushatController.delete
);

//posmotret
router.get("/biblioteka/posmotret", bibliotekaPosmotretController.get);
router.get("/biblioteka/posmotret/:id", bibliotekaPosmotretController.getById);
router.post(
  "/biblioteka/posmotret",
  authMiddleware,
  bibliotekaPosmotretController.create
);
router.put(
  "/biblioteka/posmotret",
  authMiddleware,
  bibliotekaPosmotretController.update
);
router.delete(
  "/biblioteka/posmotret/:id",
  authMiddleware,
  bibliotekaPosmotretController.delete
);

module.exports = router;
