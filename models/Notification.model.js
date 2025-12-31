const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  title: String,
  message: String,

  type: {
    type: String,
    enum: ["Enquiry", "FollowUp", "System"],
    default: "System"
  },

  relatedId: {
    type: mongoose.Schema.Types.ObjectId
  },

  isRead: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

module.exports = mongoose.model("Notification", NotificationSchema);
