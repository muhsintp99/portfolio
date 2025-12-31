const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  startDate: Date,
  endDate: Date,
  currentlyWorking: { type: Boolean, default: false },
  description: String
}, { timestamps: true });

module.exports = mongoose.model("Experience", ExperienceSchema);
