const mongoose = require("mongoose");

const SocialSchema = new mongoose.Schema(
  {
    platform: {
      type: String,
      required: true,
      trim: true
    },
    url: {
      type: String,
      required: true
    },
    image: {
      type: String
    },
    username: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Social", SocialSchema);
