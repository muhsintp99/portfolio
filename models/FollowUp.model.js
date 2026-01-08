const mongoose = require("mongoose");

const FollowUpSchema = new mongoose.Schema(
  {
    enquiryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enquiry",
      required: true
    },
    note: String,
    followUpDate: { type: Date, required: true },
    createdBy: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("FollowUp", FollowUpSchema);
