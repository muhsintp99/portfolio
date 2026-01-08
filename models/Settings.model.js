const mongoose = require("mongoose");

const SettingsSchema = new mongoose.Schema(
  {
    appName: {
      type: String,
      default: "Admin Dashboard"
    },

    currency: {
      code: { type: String, default: "INR" },
      symbol: { type: String, default: "₹" }
    },

    expense: {
      monthlyLimit: { type: Number, default: 0 }, // 0 = no limit
      alertEnabled: { type: Boolean, default: true }
    },

    contact: {
      email: String,
      phone: String
    },

    dashboard: {
      showExpense: { type: Boolean, default: true },
      showTodos: { type: Boolean, default: true },
      showEnquiries: { type: Boolean, default: true }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Settings", SettingsSchema);
