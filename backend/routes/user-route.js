const express = require("express");

const UserController = require("../controllers/user-controller");
// const UserController = require("../controllers/user");

const router = express.Router();

router.post("/signup", UserController.createUser);

router.post("/login", UserController.userLogin);

router.post("/user-create", UserController.editUser);

router.get("/:id", UserController.getUser);

// router.get("/user-info/:id", UserController.getUser);

module.exports = router;
