const express = require("express");

const checkAuth = require("../middleware/check-auth");

const FoodController = require("../controllers/food-controller");

const router = express.Router();

router.post("/food-create", checkAuth, FoodController.createFood);

router.put("/:id", checkAuth, FoodController.updateFood);

router.get("", FoodController.getFoods);

// router.get("/:id", FoodController.getFood);

router.delete("/:id", checkAuth, FoodController.deleteFood);

module.exports = router;
