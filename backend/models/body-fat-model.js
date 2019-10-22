const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const bodyFatSchema = mongoose.Schema({
  date: { type: Date, required: true },
  weight: { type: Number, required: true },
  weightChange: { type: Number, required: true },
  fatPercent: { type: Number, required: true },
  percentChange: { type: Number, required: true },
  fatMass: { type: Number, required: true },
  fatChange: { type: Number, required: true },
  leanMass: { type: Number, required: true },
  leanChange: { type: Number, required: true }
});

bodyFatSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Body Fat', bodyFatSchema);
