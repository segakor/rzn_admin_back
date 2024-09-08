const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/auth.middleware");

const uploadController = require("../controller/upload.controller");

const multer = require("multer");

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storageConfig, fileFilter: fileFilter });

router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  uploadController.create
);

module.exports = router;
