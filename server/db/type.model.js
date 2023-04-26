const mongoose = require("mongoose");

const { Schema } = mongoose;

const TypeSchema = new Schema({
name: String,
type: {type: String},
amount: Number
});

module.exports = mongoose.model("Type", TypeSchema);