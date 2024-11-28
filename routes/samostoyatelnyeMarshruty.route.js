const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/auth.middleware");

const samostoyatelnyeMarshrutyController = require("../controller/samostoyatelnyeMarshruty.controller");

router.get("/samostoyatelnyeMarshruty", samostoyatelnyeMarshrutyController.get);
router.get(
  "/samostoyatelnyeMarshruty/:id",
  samostoyatelnyeMarshrutyController.getById
);
router.post(
  "/samostoyatelnyeMarshruty",
  authMiddleware,
  samostoyatelnyeMarshrutyController.create
);
router.put(
  "/samostoyatelnyeMarshruty",
  authMiddleware,
  samostoyatelnyeMarshrutyController.update
);
router.delete(
  "/samostoyatelnyeMarshruty/:id",
  authMiddleware,
  samostoyatelnyeMarshrutyController.delete
);

module.exports = router;
