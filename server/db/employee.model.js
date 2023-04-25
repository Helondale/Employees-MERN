const mongoose = require("mongoose");
const type = require()

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  level: String,
  position: String,
  //
  equipment: {
    name: String,
    type: String,
    amount: Number
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
