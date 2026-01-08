const mongoose = require("mongoose");

const EnquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: String,
    phone: String,
    message: String,

    source: {
      type: String,
      enum: ["Website", "Call", "WhatsApp", "Email", "Other"],
      default: "Website"
    },

    status: {
      type: String,
      enum: ["New", "Contacted", "Follow-Up", "Closed"],
      default: "New"
    },

    nextFollowUpDate: Date,
    assignedTo: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enquiry", EnquirySchema);
