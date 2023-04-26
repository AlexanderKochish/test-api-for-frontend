const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const guard = require("../middleware/guard");
const { body } = require("express-validator");
const multer = require("multer");

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/");
  },
  filename: (req, file, cb) => {
    cb(null, file?.originalname);
  },
});

const upload = multer({ storage: storageConfig });

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
