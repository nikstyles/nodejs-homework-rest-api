const express = require("express");
const ctrl = require("../../controllers/auth");
const { authenticate, resizeImage, upload } = require("../../middlewares");

const router = express.Router();

// signup
router.post("/register", ctrl.register);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

// signin
router.post("/login", ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  resizeImage,
  ctrl.updateAvatar
);
module.exports = router;
