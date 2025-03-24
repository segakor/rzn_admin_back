const Router = require("express");
const router = new Router();

const authMiddleware = require("../middleware/auth.middleware");
const deleteFileMiddleware = require("../middleware/deleteFile.middleware");

const uploadFileController = require("../controller/uploadFile.controller");

const multer = require("multer");
const fs = require("fs");

const storageConfig = multer.diskStorage({
  destination: (req, _file, cb) => {
    const destination = `storage/file`;

    fs.mkdirSync(destination, { recursive: true });

    cb(null, destination);
  },
  filename: (_req, file, cb) => {
    const fileName = Buffer.from(file.originalname, "latin1").toString("utf8");
    const uniqueName = Date.now() + "-" + fileName;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storageConfig, fileFilter });

router.post(
  "/uploadFile",
  authMiddleware,
  upload.single("file"),
  uploadFileController.create
);

router.get("/getStorageFile", authMiddleware, uploadFileController.get);

router.delete(
  "/deleteFile/:id",
  authMiddleware,
  deleteFileMiddleware,
  uploadFileController.delete
);

module.exports = router;
