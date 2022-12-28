const express = require("express");
const ctrl = require("../../controllers/auth");
const authenticate = require("../../middlewares/authenticate");

const router = express.Router();

// signup
router.post("/register", ctrl.register);

// signin
router.post("/login", ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);
module.exports = router;
