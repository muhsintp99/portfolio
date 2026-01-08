const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },

    // admin reply
    reply: {
      type: String
    },
    repliedAt: {
      type: Date
    },
    replied: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", ContactSchema);
