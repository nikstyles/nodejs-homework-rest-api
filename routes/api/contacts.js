const express = require("express");
const ctrl = require("../../controllers");
const router = express.Router();
const isValidId = require("../../middlewares/isValidId");

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", ctrl.add);

router.patch("/:contactId/favorite", isValidId, ctrl.updateFavorite);

router.put("/:contactId", isValidId, ctrl.updateById);

router.delete("/:contactId", isValidId, ctrl.deleteById);

module.exports = router;
