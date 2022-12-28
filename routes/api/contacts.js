const express = require("express");
const ctrl = require("../../controllers/contacts");
const router = express.Router();
const isValidId = require("../../middlewares/isValidId");
const authenticate = require("../../middlewares/authenticate");

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, ctrl.add);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  ctrl.updateFavorite
);

router.put("/:contactId", authenticate, isValidId, ctrl.updateById);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteById);

module.exports = router;
