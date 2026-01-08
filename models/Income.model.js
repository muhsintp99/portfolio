const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    source: {
      type: String,
      enum: ["Salary", "Business", "Freelance", "Investment", "Other"],
      default: "Other"
    },
    date: {
      type: Date,
      default: Date.now
    },
    note: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Income", IncomeSchema);
