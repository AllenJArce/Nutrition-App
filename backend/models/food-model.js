const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const foodSchema = mongoose.Schema({
  // category: { type: String, required: true },
  // name: { type: String, required: true },
  // carbs: { type: String, required: true },
  // protein: { type: String, required: true },
  // fat: { type: String, required: true },
  // kCals: { type: String, required: true },
  // serving: { type: String, required: true },
  // measurement: { type: String, required: true },
  // exchanges: { type: String, required: true }

  category: { type: String, required: true },
  type: { type: String, required: true },
  name: { type: String, required: true, unique:true },
  carbs: { type: Number, required: true },
  protein: { type: Number, required: true },
  fat: { type: Number, required: true },
  kCals: { type: Number, required: true },
  serving: { type: Number, required: true },
  measurement: { type: String, required: true },
  exchanges: { type: Number, required: true }
});

foodSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Food', foodSchema);
