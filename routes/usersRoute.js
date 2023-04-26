const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const guard = require("../middleware/guard");
const { body } = require("express-validator");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

if (!fs.existsSync("./public")) {
  fs.mkdirSync("./public");
}

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/");
  },
  filename: (req, file, cb) => {
    cb(null, file?.originalname);
  },
});

const upload = multer({
  storage: storageConfig,
  limits: { fileSize: 500000 },
  fileFilter: (req, file, cb) => {
    let mim = file.mimetype;
    if (mim === "image/jpeg" || mim === "image/jpg" || mim === "image/png") {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Error: allowed file types are only files with extension - jpeg, jpg, png."
        ),
        false
      );
    }
  },
});

router.get(/^\/users\/?$/, usersController.getAllUsers);
router.get("/users/:id", usersController.getOneUser);
router.post(
  /^\/users\/?$/,
  guard,
  body("name").isLength({ min: 3, max: 12 }).trim(),
  body("email").isEmail(),
  upload.single("photo"),
  usersController.createUser
);

module.exports = router;
