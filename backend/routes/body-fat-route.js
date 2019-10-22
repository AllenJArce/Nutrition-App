const express = require("express");

const checkAuth = require("../middleware/check-auth");

const BodyFatController = require("../controllers/body-fat-controller");

const router = express.Router();

router.post("/body-fat-create", checkAuth, BodyFatController.createBodyFat);

router.put("/:id", checkAuth, BodyFatController.updateBodyFat);

router.get("", BodyFatController.getBodyFats);

router.get("/:id", BodyFatController.getBodyFat);

router.delete("/:id", checkAuth, BodyFatController.deleteBodyFat);

module.exports = router;
