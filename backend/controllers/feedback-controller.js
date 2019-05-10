const Feedback = require("../models/feedback-model");

exports.completeForm = (req, res, next) => {
  const feedback = new Feedback({
    creator: req.userData.userId,
    date: req.body.date,
    sleep: req.body.sleep,
    awakeStatus: req.body.awakeStatus,
    breakfast: req.body.breakfast,
    waterBreakfast: req.body.waterBreakfast,
    snack1: req.body.snack1,
    waterSnack1: req.body.snack1,
    lunch: req.body.lunch,
    waterLunch: req.body.waterLunch,
    snack2: req.body.snack2,
    waterSnack2: req.body.waterSnack2,
    dinner: req.body.dinner,
    waterDinner: req.body.waterDinner,
    snack3: req.body.snack3,
    waterSnack3: req.body.waterSnack3,
    plan: req.body.plan,
    workout: req.body.workout,
    energy: req.body.energy,
    happiness: req.body.happiness,
    stress: req.body.stress,
    comments: req.body.comments
  });
  feedback
    .save()
    .then(createdForm => {
      res.status(201).json({
        message: "Form uploaded successfully!",
        feedback: {
          ...createdForm,
          id: createdForm._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Failed to upload form!"
      });
    });
};
