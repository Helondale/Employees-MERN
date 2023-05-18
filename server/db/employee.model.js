const mongoose = require("mongoose");

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  present: {
    type: Boolean,
    default: false,
  },
  experience: Number,
  level: String,
  position: String,
  working: [{
    hours: Number,
    mode: String
  }],
  equipment: {
    name: String,
    type: {type: String},
    amount: Number
  },
  brand: String,
  notes: [String],
  created: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model("Employee", EmployeeSchema);
