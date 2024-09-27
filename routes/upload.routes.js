const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/auth.middleware");

const uploadController = require("../controller/upload.controller");

const multer = require("multer");
const fs = require("fs");

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    const destination = `storage/image/${req.query.destination}`;

    fs.mkdirSync(destination, { recursive: true });

    cb(null, destination);
  },
  filename: (req, file, cb) => {
    /* const uniqueSuffix =
      new Date().toISOString().slice(0, 10) +
      "_" +
      Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); */
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

router.post(
  "/upload/longread",
  authMiddleware,
  upload.single("upload"),
  uploadController.createForLongRead
);

router.get("/getStorage", authMiddleware, uploadController.get);

module.exports = router;
