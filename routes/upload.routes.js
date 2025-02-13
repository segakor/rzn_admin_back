const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/auth.middleware");

const uploadController = require("../controller/upload.controller");

const multer = require("multer");
const fs = require("fs");

const storageConfig = multer.diskStorage({
  destination: (req, _file, cb) => {
    const destination = `storage/image/${req.query.destination}`;

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
