const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: {
    type: String,
    enum: ["Food", "Travel", "Rent", "Shopping", "Bills", "Health", "Other"],
    default: "Other"
  },
  paymentType: {
    type: String,
    enum: ["Cash", "UPI", "Card", "Bank"],
    default: "Cash"
  },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("Expense", ExpenseSchema);
