const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/auth.middleware");

const organizovannyeMarshrutyController = require("../controller/organizovannyeMarshruty.controller");

router.get("/organizovannyeMarshruty", organizovannyeMarshrutyController.get);
router.post(
  "/organizovannyeMarshruty",
  authMiddleware,
  organizovannyeMarshrutyController.create
);
router.delete(
  "/organizovannyeMarshruty/:id",
  authMiddleware,
  organizovannyeMarshrutyController.delete
);
router.get(
  "/organizovannyeMarshruty/:id",
  organizovannyeMarshrutyController.getById
);
router.put(
  "/organizovannyeMarshruty",
  authMiddleware,
  organizovannyeMarshrutyController.update
);

module.exports = router;
