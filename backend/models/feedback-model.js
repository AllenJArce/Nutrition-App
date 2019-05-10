const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required : true },
  date: { type: Date, required: true },
  sleep: { type: Number, required: true },
  awakeStatus: { type: String, required: true },
  breakfast: { type: String, required: true },
  waterBreakfast: { type: Number, required: true },
  snack1: { type: String, required: true },
  waterSnack1: { type: Number, required: true },
  lunch: { type: String, required: true },
  waterLunch: { type: Number, required: true },
  snack2: { type: String, required: true },
  waterSnack2: { type: Number, required: true },
  dinner: { type: String, required: true },
  waterDinner: { type: Number, required: true },
  snack3: { type: String, required: true },
  waterSnack3: { type: Number, required: true },
  plan: { type: String, required: true },
  workout: { type: String, required: true },
  energy: { type: String, required: true },
  happiness: { type: String, required: true },
  stress: { type: String, required: true },
  comments: { type: String, required: true }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
