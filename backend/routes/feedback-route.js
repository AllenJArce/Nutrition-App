const express = require('express');

const FeedbackController = require("../controllers/feedback-controller");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", checkAuth, FeedbackController.completeForm);
